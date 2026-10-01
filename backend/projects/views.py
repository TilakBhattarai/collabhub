from rest_framework.permissions import IsAuthenticated
from .models import Project, JoinRequest, ProjectMember
from .serializers import (
    ProjectSerializer,
    JoinRequestSerializer,
    ProjectMemberSerializer,
)
from django.db.models import Q
from connection.models import Connection
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from notifications.models import Notification
from django.shortcuts import get_object_or_404


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    lookup_value_regex = r"\d+"

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=["get"])
    def my_projects(self, request):
        projects = Project.objects.filter(owner=request.user)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def members(self, request, pk=None):
        project = self.get_object()
        if project.visibility == "PRIVATE" and project.owner != request.user:
            return Response(
                {"error": "You do not have permission to view this project's members."},
                status=status.HTTP_403_FORBIDDEN,
            )

        members = ProjectMember.objects.filter(project=project)

        serializer = ProjectMemberSerializer(members, many=True)

        data = serializer.data

        for member_data in data:
            member_id = member_data["user"]["id"]
            connection_exisits = Connection.objects.filter(
                Q(sender=request.user, receiver_id=member_id)
                | Q(sender_id=member_id, receiver=request.user),
            ).exists()

            request_sent = Connection.objects.filter(
                sender=request.user,
                receiver_id=member_id,
                status="PENDING",
            ).exists()

            member_data["connection_exists"] = connection_exisits
            member_data["request_sent"] = request_sent

        return Response(data)

    @action(
        detail=True, methods=["delete"], url_path=r"remove_member/(?P<member_id>\d+)"
    )
    def remove_member(self, request, pk=None, member_id=None):
        project = self.get_object()  # Project.objects.get(pk=.., member_id=..)

        if project.owner != request.user:
            return Response(
                {"error": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN,
            )

        member = get_object_or_404(
            ProjectMember,
            project=project,
            user_id=member_id,
        )

        member.delete()
        JoinRequest.objects.filter(
            project=project,
            sender_id=member_id,
        ).delete()

        Notification.objects.create(
            recipient_id=member_id,
            message=f"You have been removed from the project {project.title}",
            actor_id=project.owner.id,
            notification_type="PROJECT_REMOVED",
            is_read=False,
        )

        return Response(
            {
                "message": "Member deleted successfully",
            },
            status=status.HTTP_200_OK,
        )

    def partial_update(self, request, *args, **kwargs):
        project = self.get_object()

        if project.owner != request.user:
            return Response(
                {
                    "error": "You do not have the permission to update this project",
                },
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = ProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Project updated successfully",
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def destroy(self, request, *args, **kwargs):
        project = self.get_object()

        if project.owner != request.user:
            return Response(
                {"error": "You do not have permission to delete this project"},
                status=status.HTTP_403_FORBIDDEN,
            )

        project.delete()
        return Response(
            {
                "message": "Successfully deleted the project",
            },
            status=status.HTTP_200_OK,
        )


class JoinRequestViewSet(ModelViewSet):
    queryset = JoinRequest.objects.all()
    serializer_class = JoinRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if self.action == "list":
            return JoinRequest.objects.filter(sender=user)

        return JoinRequest.objects.filter(Q(sender=user) | Q(project__owner=user))

    def perform_create(self, serializer):
        project = serializer.validated_data["project"]

        if project.owner.id == self.request.user.id:
            raise ValidationError(
                {"error": "You cannot send the request to your own project"}
            )

        if project.visibility == "PRIVATE":
            raise ValidationError(
                {
                    "error": "This project is private. You cannot send a request to it.",
                }
            )

        if JoinRequest.objects.filter(
            sender=self.request.user,
            project=project,
            status="PENDING",
        ).exists():
            raise ValidationError(
                {"error": "You already have a pending request for this project."}
            )

        if ProjectMember.objects.filter(
            project=project,
            user=self.request.user,
        ).exists():
            raise ValidationError(
                {"error": "You are already a member of this project"},
            )

        serializer.save(sender=self.request.user, status="PENDING")
        Notification.objects.create(
            recipient=project.owner,
            actor=self.request.user,
            notification_type="JOIN_REQUEST",
            is_read=False,
            message=f"New join request from {self.request.user.username} for '{project.title}'",
        )

    @action(detail=False, methods=["get"])
    def owner_requests(self, request):
        requests = JoinRequest.objects.filter(
            project__owner=request.user, status="PENDING"
        )
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def accept(self, request, pk=None):
        join_request = self.get_object()

        if join_request.project.owner.id != request.user.id:
            return Response(
                {
                    "error": "Only the project owner can accept join requests for this project."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if join_request.status != "PENDING":
            return Response(
                {
                    "error": f"This request has already been {join_request.status.lower()}"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        join_request.status = "ACCEPTED"
        join_request.save()

        ProjectMember.objects.create(
            project=join_request.project, user=join_request.sender
        )

        Notification.objects.get_or_create(
            actor=join_request.project.owner,
            recipient=join_request.sender,
            message=f"{join_request.project.owner.username} accepted your request to join '{join_request.project.title}'!",
            notification_type="JOIN_ACCEPTED",
            is_read=False,
        )
        return Response(
            {"message": "Request accepted successfully."},
            status=status.HTTP_202_ACCEPTED,
        )

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        join_request = self.get_object()

        if join_request.project.owner.id != request.user.id:
            return Response(
                {
                    "error": "Only the project owner can reject join requests for this project."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if join_request.status != "PENDING":
            return Response(
                {
                    "error": f"This request has already been {join_request.status.lower()}"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        join_request.status = "REJECTED"
        join_request.save()

        Notification.objects.create(
            actor=join_request.project.owner,
            recipient=join_request.sender,
            message=f"{join_request.project.owner.username} rejected your request to join '{join_request.project.title}'!",
            notification_type="JOIN_REJECTED",
            is_read=False,
        )

        return Response(
            {"message": "Request rejected successfully."},
            status=status.HTTP_200_OK,
        )

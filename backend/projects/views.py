from rest_framework.permissions import IsAuthenticated
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


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

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.db.models import Q

from .models import Connection
from .serializers import ConnectionSerializer, MyConnectionSerializer
from profiles.models import Profile
from profiles.serializers import ProfileSerializer
from notifications.models import Notification

User = get_user_model()


class ConnectionRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        receiver_id = request.data.get("receiver")

        if not receiver_id:
            return Response(
                {"error": "Receiver is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            receiver_id = int(receiver_id)
        except (TypeError, ValueError):
            return Response(
                {"error": "Invalid receiver ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if receiver_id == request.user.id:
            return Response(
                {"error": "You cannot connect with yourself"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        existing_connection = Connection.objects.filter(
            Q(sender=request.user, receiver=receiver)
            | Q(sender=receiver, receiver=request.user)
        ).first()

        if existing_connection:
            if existing_connection.status == "REJECTED":
                if existing_connection.sender != request.user:
                    return Response(
                        {"error": "You cannot resend this request"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                existing_connection.status = "PENDING"
                existing_connection.save(update_fields=["status"])

                Notification.objects.create(
                    recipient=receiver,
                    is_read=False,
                    message=(
                        f"{request.user.username} sent you " "a connection request."
                    ),
                    notification_type="CONNECTION_REQUEST",
                    actor=request.user,
                )

                return Response(
                    ConnectionSerializer(existing_connection).data,
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"error": "Connection already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        connection = Connection.objects.create(
            sender=request.user,
            receiver=receiver,
        )

        Notification.objects.create(
            recipient=receiver,
            is_read=False,
            message=(f"{request.user.username} sent you " "a connection request."),
            notification_type="CONNECTION_REQUEST",
            actor=request.user,
        )

        serializer = ConnectionSerializer(connection)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    def get(self, request):
        requests = Connection.objects.filter(
            receiver=request.user,
            status="PENDING",
        )

        serializer = ConnectionSerializer(requests, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


class MyConnectionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        my_connections = Connection.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user),
            status="ACCEPTED",
        )

        serializer = MyConnectionSerializer(
            my_connections,
            many=True,
            context={"request": request},
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


class AcceptConnectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        connection_id = request.data.get("connection_id")

        try:
            connection_id = int(connection_id)
        except (TypeError, ValueError):
            return Response(
                {"error": "Invalid connection ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            connection = Connection.objects.get(
                id=connection_id,
                receiver=request.user,
                status="PENDING",
            )
        except Connection.DoesNotExist:
            return Response(
                {"error": "Pending connection request not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        connection.status = "ACCEPTED"
        connection.save(update_fields=["status"])

        Notification.objects.create(
            actor=request.user,
            recipient=connection.sender,
            message=(f"{request.user.username} accepted " "your connection request."),
            notification_type="CONNECTION_ACCEPTED",
            is_read=False,
        )

        return Response(
            {"message": "Connection accepted successfully"},
            status=status.HTTP_200_OK,
        )


class RejectConnectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        connection_id = request.data.get("connection_id")

        try:
            connection_id = int(connection_id)
        except (TypeError, ValueError):
            return Response(
                {"error": "Invalid connection ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            connection = Connection.objects.get(
                id=connection_id,
                receiver=request.user,
                status="PENDING",
            )
        except Connection.DoesNotExist:
            return Response(
                {"error": "Pending connection request not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        connection.status = "REJECTED"
        connection.save(update_fields=["status"])

        Notification.objects.create(
            actor=request.user,
            recipient=connection.sender,
            message=(f"{request.user.username} rejected " "your connection request."),
            notification_type="CONNECTION_REJECTED",
            is_read=False,
        )

        return Response(
            {"message": "Connection rejected successfully"},
            status=status.HTTP_200_OK,
        )


class RemoveConnectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        connection_id = request.data.get("connectionId")

        try:
            connection_id = int(connection_id)
        except (TypeError, ValueError):
            return Response(
                {"error": "Invalid connection ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            connection = Connection.objects.get(
                Q(sender=request.user) | Q(receiver=request.user),
                id=connection_id,
                status="ACCEPTED",
            )
        except Connection.DoesNotExist:
            return Response(
                {"error": "Accepted connection not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        connection.delete()

        return Response(
            {"message": "Connection removed successfully"},
            status=status.HTTP_200_OK,
        )


class ConnectionProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            profile = Profile.objects.get(user=user)
        except User.DoesNotExist:
            return Response(
                {"error": "User does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {"error": "Profile does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ProfileSerializer(profile)

        is_connected = Connection.objects.filter(
            Q(sender=request.user, receiver=user)
            | Q(sender=user, receiver=request.user),
            status="ACCEPTED",
        ).exists()

        data = serializer.data
        data["is_connected"] = is_connected

        return Response(
            data,
            status=status.HTTP_200_OK,
        )

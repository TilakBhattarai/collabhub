from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Connection
from .serializers import ConnectionSerializer, MyConnectionSerializer
from django.db.models import Q

User = get_user_model()


class ConnectionRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        receiver_id = request.data.get("receiver")

        if not receiver_id:
            return Response(
                {
                    "error": "Receiver is required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            receiver_id = int(receiver_id)
        except (TypeError, ValueError):
            return Response(
                {"error": "Invalid receiver ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if int(receiver_id) == request.user.id:
            return Response(
                {"error": "You cannot connect with yourself"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User doesnot exist"}, status=status.HTTP_404_NOT_FOUND
            )
        existing_connection = Connection.objects.filter(
            Q(sender=request.user, receiver=receiver)
            | Q(sender=receiver, receiver=request.user)
        ).first()

        connection = Connection.objects.create(
            sender=request.user,
            receiver=receiver,
        )

        if existing_connection:
            return Response(
                {"error": "Connection already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ConnectionSerializer(connection)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
        myConnections = Connection.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user),
            status="ACCEPTED",
        )

        serializer = MyConnectionSerializer(
            myConnections,
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
        connection = Connection.objects.get(id=connection_id, status="PENDING")
        connection.status = "ACCEPTED"
        connection.save()
        return Response(
            {"message": "Connection Accepted"},
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
        connection = Connection.objects.get(id=connection_id, status="PENDING")
        connection.status = "REJECTED"
        connection.save()
        return Response(
            {"message": "Connection Rejected"},
            status=status.HTTP_200_OK,
        )

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Connection
from .serializers import ConnectionSerializer

User = get_user_model()


class ConnectionView(APIView):
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
        connection = Connection.objects.create(
            sender=request.user,
            receiver=receiver,
        )

        serializer = ConnectionSerializer(connection)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

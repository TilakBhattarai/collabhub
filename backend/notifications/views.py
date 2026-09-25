from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import NotificationSerializer
from .models import Notification
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class NotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(
            recipient=request.user,
        ).order_by("-created_at")

        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    def patch(self, request, pk):
        notification = get_object_or_404(Notification, pk=pk, recipient=request.user)

        notification.is_read = True
        notification.save()

        return Response(
            {"message": "Notification marked as read"}, status=status.HTTP_200_OK
        )

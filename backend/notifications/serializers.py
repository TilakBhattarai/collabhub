from .models import Notification
from rest_framework import serializers
from accounts.serializers import UserSerializer


class NotificationSerializer(serializers.ModelSerializer):
    actor = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = [
            "id",
            "recipient",
            "message",
            "actor",
            "notification_type",
            "created_at",
            "is_read",
        ]

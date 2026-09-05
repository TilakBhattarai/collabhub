from rest_framework import serializers
from .models import Connection
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer

User = get_user_model()


class ConnectionSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Connection
        fields = ["id", "sender", "receiver", "status", "created_at"]

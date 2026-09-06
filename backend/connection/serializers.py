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


class MyConnectionSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Connection
        fields = ["id", "user", "status", "created_at"]

    def get_user(self, obj):
        request = self.context["request"]

        if obj.sender == request.user:
            return UserSerializer(obj.receiver).data

        return UserSerializer(obj.sender).data

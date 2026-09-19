from .models import Project, JoinRequest
from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.serializers import ProjectOwnerSerializer
from accounts.serializers import UserSerializer

User = get_user_model()


class ProjectSerializer(serializers.ModelSerializer):

    owner = ProjectOwnerSerializer(read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "required_skills",
            "visibility",
            "status",
            "owner",
            "created_at",
            "updated_at",
        ]

        read_only_fields = ["owner", "created_at", "updated_at", "owner"]


class JoinRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = JoinRequest
        fields = ["sender", "status", "sender", "created_at", "project"]

        read_only_fields = ["created_at", "sender", "status"]

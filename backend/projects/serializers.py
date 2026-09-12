from .models import Project
from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.serializers import ProjectOwnerSerializer

User = get_user_model()


class ProjectSerializer(serializers.ModelSerializer):

    owner = ProjectOwnerSerializer(read_only=True)

    class Meta:
        model = Project
        fields = [
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

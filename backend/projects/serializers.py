from .models import Project, JoinRequest, ProjectMember, Task
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
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    project_details = ProjectSerializer(source="project", read_only=True)
    sender = UserSerializer(read_only=True)

    class Meta:
        model = JoinRequest
        fields = ["id", "sender", "status", "created_at", "project", "project_details"]
        read_only_fields = ["id", "sender", "status", "created_at"]


class ProjectMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = ProjectMember
        fields = ["id", "project", "user", "role", "joined_at"]
        read_only_fields = ["id", "joined_at", "role"]


class TaskSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(read_only=True)

    project_details = ProjectSerializer(source="project", read_only=True)

    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        source="assigned_to",
        queryset=User.objects.all(),
        write_only=True,
        allow_null=True,
        required=False,
    )
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "project",
            "assigned_to",
            "assigned_to_id",
            "created_by",
            "status",
            "category",
            "priority",
            "due_date",
            "created_at",
            "updated_at",
            "project_details",
        ]
        read_only_fields = ["id", "created_at", "created_by"]

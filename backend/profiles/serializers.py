from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = [
            "bio",
            "role",
            "user",
            "skills",
            "profile_picture",
            "experience",
            "location",
            "github",
            "portfolio",
            "availability",
            "looking_for",
            "created_at",
            "updated_at",
        ]

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

PROFILE_FIELDS = [
    "bio",
    "role",
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


class UserBasicSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username"]


class ProfileNestedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = PROFILE_FIELDS


class ProfileSerializer(serializers.ModelSerializer):

    user = UserBasicSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ["user"] + PROFILE_FIELDS


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileNestedSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "profile"]

from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "user",
            "bio",
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

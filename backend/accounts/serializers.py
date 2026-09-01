from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("Passwords do not match")

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError(
                {"email": "A user with this email already exists"}
            )

        validate_password(data["password1"])

        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        password = validated_data.pop("password1")

        user = User.objects.create_user(
            password=password,
            **validated_data,
        )

        return user

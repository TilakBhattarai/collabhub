from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import status
from rest_framework.response import Response


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return Response(
                {"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.viewsets import ModelViewSet


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    lookup_value_regex = r"\d+"

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


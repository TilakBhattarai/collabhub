from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Project(models.Model):
    VISIBILITY_CHOICES = [
        ("PUBLIC", "Public"),
        ("PRIVATE", "Private"),
    ]
    STATUS_CHOICES = [
        ("LOOKING_FOR_CONTRIBUTERS", "Looking for Contributors"),
        ("IN_PROGRESS", "In Progress"),
        ("COMPLETED", "Completed"),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    required_skills = models.TextField()
    visibility = models.CharField(
        max_length=10,
        choices=VISIBILITY_CHOICES,
    )
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="projects",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.owner.username} created {self.title}"

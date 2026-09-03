from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):

    AVAILABILITY_CHOICES = [
        ("0-5", "0-5 hrs/week"),
        ("5-10", "5-10 hrs/week"),
        ("10-20", "10-20 hrs/week"),
        ("20+", "20+ hrs/week"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    bio = models.TextField(blank=True)
    role = models.CharField(max_length=100)
    profile_picture = models.ImageField(
        upload_to="profile_picture/",
        blank=True,
    )
    location = models.CharField(max_length=100, blank=True)
    experience = models.CharField(max_length=255, blank=True)
    github = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)
    availability = models.CharField(
        max_length=15,
        choices=AVAILABILITY_CHOICES,
        blank=True,
    )
    looking_for = models.CharField(
        max_length=255,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

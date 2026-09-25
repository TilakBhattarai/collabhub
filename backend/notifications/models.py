from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Notification(models.Model):
    NOTIFICATION_TYPE_CHOICES = [
        ("JOIN_REQUEST", "Join Request"),
        ("JOIN_ACCEPTED", "Join Accepted"),
        ("JOIN_REJECTED", "Join Rejected"),
        ("CONNECTION_REQUEST", "Connection Request"),
        ("CONNECTION_ACCEPTED", "Connection Accepted"),
        ("CONNECTION_REJECTED", "Connection Rejected"),
    ]
    recipient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications",
    )
    message = models.CharField(max_length=255)
    actor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="triggered_notifications",
    )
    notification_type = models.CharField(
        max_length=20,
        choices=NOTIFICATION_TYPE_CHOICES,
    )
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Project(models.Model):
    VISIBILITY_CHOICES = [
        ("PUBLIC", "Public"),
        ("PRIVATE", "Private"),
    ]
    STATUS_CHOICES = [
        ("LOOKING_FOR_CONTRIBUTORS", "Looking for Contributors"),
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


class JoinRequest(models.Model):

    STATUS_CHOICES = [
        ("ACCEPTED", "Accepted"),
        ("REJECTED", "Rejected"),
        ("PENDING", "Pending"),
    ]

    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="join_requests"
    )

    status = models.CharField(
        choices=STATUS_CHOICES,
        max_length=10,
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="join_requests",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["sender", "project"],
                name="unique_request",
            )
        ]

    def __str__(self):
        return f"{self.sender} requested on project {self.project.title}"


class ProjectMember(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="members",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="project_memberships",
    )
    role = models.CharField(
        max_length=20,
        default="MEMBER",
    )
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "project"],
                name="unique_project_member",
            )
        ]


class Task(models.Model):

    STATUS_CHOICES = [
        ("TODO", "To Do"),
        ("IN_PROGRESS", "In Progress"),
        ("COMPLETED", "Completed"),
    ]

    CATEGORY_CHOICES = [
        ("BACKEND", "Backend"),
        ("FRONTEND", "Frontend"),
        ("DESIGN", "Design"),
        ("SETUP", "Setup"),
        ("OTHER", "Other"),
    ]

    PRIOTITY_CHOICES = [
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="tasks",
    )

    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_tasks",
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_tasks",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="TODO",
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="OTHER",
    )

    priority = models.CharField(
        max_length=20,
        default="MEDIUM",
        choices=PRIOTITY_CHOICES,
    )

    due_date = models.DateField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} - {self.project.title}"

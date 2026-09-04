from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "role",
        "location",
        "availability",
        "created_at",
    )

    ordering = ("-created_at",)

    search_fields = (
        "user__username",
        "role",
        "location",
    )

    list_filter = ("availability",)

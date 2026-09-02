# from django.contrib import admin

# from .models import Profile


# @admin.register(Profile)
# class AdminProfile(admin.ModelAdmin):
#     list_display = [
#         "user",
#         "experience",
#         "availability",
#         "looking_for",
#         "created_at",
#         "updated_at",
#     ]

#     ordering = ["-created_at"]

#     search_fields = [
#         "user__username",
#         "user__email",
#         "experience",
#         "looking_for",
#     ]

#     list_filter = [
#         "availability",
#         "created_at",
#         "updated_at",
#     ]

#     readonly_fields = [
#         "created_at",
#         "updated_at",
#     ]

from rest_framework.routers import SimpleRouter
from .views import ProjectViewSet, JoinRequestViewSet, TaskViewSet
from django.urls import path

router = SimpleRouter()
router.register("", ProjectViewSet, basename="project")
router.register("request", JoinRequestViewSet, basename="request")

urlpatterns = [
    path(
        "joined/",
        ProjectViewSet.as_view(
            {"get": "joined_projects"},
        ),
        name="joined_projects",
    ),
    path(
        "<int:project_id>/tasks/",
        TaskViewSet.as_view(
            {"get": "list", "post": "create"},
        ),
        name="project_tasks",
    ),
    path(
        "<int:project_id>/tasks/<int:pk>/",
        TaskViewSet.as_view({"delete": "destroy", "put": "update"}),
        name="project_task_detail",
    ),
] + router.urls

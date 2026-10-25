from rest_framework.routers import SimpleRouter
from .views import ProjectViewSet, JoinRequestViewSet, TaskViewSet
from django.urls import path

router = SimpleRouter()
router.register("", ProjectViewSet, basename="project")
router.register("request", JoinRequestViewSet, basename="request")

urlpatterns = [
    path(
        "<int:project_id>/tasks/",
        TaskViewSet.as_view(
            {"get": "list", "post": "create"},
        ),
        name="project_tasks",
    ),
    path(
        "<int:project_id>/tasks/<int:pk>/",
        TaskViewSet.as_view({"delete": "destroy"}),
        name="project_task_detail",
    ),
] + router.urls

from rest_framework.routers import SimpleRouter
from .views import ProjectViewSet, JoinRequestViewSet, TaskViewSet
from django.urls import path

router = SimpleRouter()
router.register("", ProjectViewSet, basename="project")
router.register("request", JoinRequestViewSet, basename="request")

urlpatterns = [
    path(
        "<int:project_id>/tasks/",
        TaskViewSet.as_view({"get": "list"}),
        name="project_tasks",
    )
] + router.urls

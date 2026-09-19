from rest_framework.routers import SimpleRouter
from .views import ProjectViewSet, JoinRequestViewSet

router = SimpleRouter()
router.register("", ProjectViewSet, basename="project")
router.register("request", JoinRequestViewSet, basename="request")

urlpatterns = router.urls

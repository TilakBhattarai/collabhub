from django.urls import path
from .views import ProfileView, DiscoverView

urlpatterns = [
    path("", ProfileView.as_view(), name="profile"),
    path("edit/", ProfileView.as_view(), name="profile_edit"),
    path("discover/", DiscoverView.as_view(), name="discover"),
]

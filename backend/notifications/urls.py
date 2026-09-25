from django.urls import path
from .views import NotificationView

urlpatterns = [
    path("", NotificationView.as_view(), name="notifications"),
    path(
        "<int:pk>/read/",
        NotificationView.as_view(),
        name="unread_notification",
    ),
]

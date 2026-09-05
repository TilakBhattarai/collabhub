from django.urls import path
from . import views

urlpatterns = [
    path("", views.ConnectionView.as_view(), name="connections"),
    path("requests/", views.ConnectionView.as_view(), name="connection_requests"),
]

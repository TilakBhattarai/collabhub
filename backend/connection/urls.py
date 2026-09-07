from django.urls import path
from . import views

urlpatterns = [
    path("", views.ConnectionRequestsView.as_view(), name="connections"),
    path(
        "requests/", views.ConnectionRequestsView.as_view(), name="connection_requests"
    ),
    path(
        "requests/accept",
        views.AcceptConnectionView.as_view(),
        name="accept_connection_request",
    ),
    path(
        "requests/reject",
        views.RejectConnectionView.as_view(),
        name="reject_connection_request",
    ),
    path("my-connections/", views.MyConnectionsView.as_view(), name="my_connections"),
    path(
        "my-connections/remove/",
        views.RemoveConnectionView.as_view(),
        name="remove_connection",
    ),
    path(
        "my-connections/profile/<int:id>/",
        views.ConnectionProfileView.as_view(),
        name="my_connection_profile",
    ),
]

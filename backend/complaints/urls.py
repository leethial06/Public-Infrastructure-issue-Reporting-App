from django.urls import path

from .views import (
    ComplaintListCreateView,
    ComplaintStatusUpdateView,
    AdminComplaintListView,
    AdminComplaintStatusUpdateView,
)

urlpatterns = [
    path(
        "",
        ComplaintListCreateView.as_view(),
        name="complaints",
    ),

    path(
        "<int:pk>/update/",
        ComplaintStatusUpdateView.as_view(),
        name="complaint-update",
    ),

    path(
        "admin/",
        AdminComplaintListView.as_view(),
        name="admin-complaints",
    ),

    path(
        "admin/<int:pk>/update/",
        AdminComplaintStatusUpdateView.as_view(),
        name="admin-complaint-update",
    ),
]
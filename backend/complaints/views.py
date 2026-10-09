
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Complaint
from .serializers import ComplaintSerializer
from notifications.models import Notification
from civic_points.models import CivicPoint


class ComplaintListCreateView(generics.ListCreateAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Complaint.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        complaint = serializer.save(
            user=self.request.user
        )

        Notification.objects.create(
            user=self.request.user,
            message=(
                f"Your {complaint.get_category_display()} "
                "complaint has been submitted successfully."
            ),
            notification_type="complaint"
        )

        # Add 10 Civic Points for reporting a complaint
        civic_point, created = CivicPoint.objects.get_or_create(
            user=self.request.user
        )

        civic_point.points += 10
        civic_point.save()


class ComplaintStatusUpdateView(generics.UpdateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Complaint.objects.filter(
            user=self.request.user
        )

    def perform_update(self, serializer):
        complaint = serializer.save()

        Notification.objects.create(
            user=self.request.user,
            message=(
                f"Your {complaint.get_category_display()} "
                f"complaint status is now {complaint.status}."
            ),
            notification_type="status_update"
        )


# Admin API: View all users' complaints
class AdminComplaintListView(generics.ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return Complaint.objects.all().order_by("-created_at")


# Admin API: Update any complaint status
class AdminComplaintStatusUpdateView(generics.UpdateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def perform_update(self, serializer):
        complaint = serializer.save()

        Notification.objects.create(
            user=complaint.user,
            message=(
                f"Your {complaint.get_category_display()} "
                f"complaint status is now {complaint.get_status_display()}."
            ),
            notification_type="status_update"
        )

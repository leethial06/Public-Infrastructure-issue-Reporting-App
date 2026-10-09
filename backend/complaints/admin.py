
from django.contrib import admin
from .models import Complaint
from notifications.models import Notification


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "category",
        "priority",
        "status",
        "created_at",
    )

    list_filter = (
        "category",
        "priority",
        "status",
        "created_at",
    )

    search_fields = (
        "description",
        "address",
        "user__username",
        "user__email",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)

    def save_model(self, request, obj, form, change):

        old_status = None

        if change:
            old_complaint = Complaint.objects.get(pk=obj.pk)
            old_status = old_complaint.status

        super().save_model(request, obj, form, change)

        if change and old_status != obj.status:

            Notification.objects.create(
                user=obj.user,
                message=(
                    f"Your {obj.get_category_display()} complaint "
                    f"status is now {obj.get_status_display().lower()}."
                ),
                notification_type="status_update",
            )

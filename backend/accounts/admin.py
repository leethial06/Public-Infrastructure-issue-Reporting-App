
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Department, Area


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name",)


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "is_active")
    list_filter = ("city", "is_active")
    search_fields = ("name", "city")


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Additional Information", {
            "fields": (
                "phone",
                "role",
                "city",
                "civic_points",
                "approval_status",
                "department",
                "assigned_area",
            ),
        }),
    )

    list_display = (
        "username",
        "email",
        "role",
        "approval_status",
        "department",
        "assigned_area",
        "is_staff",
    )

    list_filter = (
        "role",
        "approval_status",
        "department",
        "assigned_area",
        "is_staff",
    )

    search_fields = ("username", "email", "phone")
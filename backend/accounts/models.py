
from django.db import models
from django.contrib.auth.models import AbstractUser


class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Area(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100, default="Devakottai")
    is_active = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "city"],
                name="unique_area_name_city",
            )
        ]
        ordering = ["city", "name"]

    def __str__(self):
        return f"{self.name}, {self.city}"


class User(AbstractUser):

    ROLE_CHOICES = (
        ("CITIZEN", "Citizen"),
        ("OFFICER", "Officer"),
        ("ADMIN", "Admin"),
    )

    APPROVAL_CHOICES = (
        ("NOT_REQUIRED", "Not Required"),
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    )

    phone = models.CharField(max_length=15, blank=True)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="CITIZEN",
    )

    city = models.CharField(max_length=100, blank=True)
    civic_points = models.IntegerField(default=0)

    approval_status = models.CharField(
        max_length=20,
        choices=APPROVAL_CHOICES,
        default="NOT_REQUIRED",
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="members",
    )

    assigned_area = models.ForeignKey(
        Area,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="members",
    )

    def __str__(self):
        return self.username
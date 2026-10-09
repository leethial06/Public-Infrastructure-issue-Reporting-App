from django.db import models
from django.conf import settings


class Complaint(models.Model):

    CATEGORY_CHOICES = [
        ('pothole', 'Pothole'),
        ('road', 'Damaged Road'),
        ('street_light', 'Street Light'),
        ('garbage', 'Garbage'),
        ('drainage', 'Drainage'),
        ('water_leakage', 'Water Leakage'),
        ('other', 'Other'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='complaints'
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='medium'
    )

    description = models.TextField()

    image = models.ImageField(
        upload_to='complaints/',
        blank=True,
        null=True
    )

    address = models.CharField(
        max_length=255,
        blank=True
    )

    latitude = models.DecimalField(
        max_digits=12,
        decimal_places=7,
        blank=True,
        null=True
    )

    longitude = models.DecimalField(
        max_digits=12,
        decimal_places=7,
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.category} - {self.user.username}"
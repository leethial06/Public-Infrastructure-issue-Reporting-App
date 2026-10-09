from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include('accounts.urls')),
    path('api/complaints/', include('complaints.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/civic-points/', include('civic_points.urls')),
]
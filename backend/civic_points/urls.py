from django.urls import path
from .views import CivicPointView


urlpatterns = [
    path('', CivicPointView.as_view(), name='civic-points'),
]
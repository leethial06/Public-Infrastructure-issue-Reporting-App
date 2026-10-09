from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import CivicPoint
from .serializers import CivicPointSerializer


class CivicPointView(generics.RetrieveAPIView):
    serializer_class = CivicPointSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        civic_point, created = CivicPoint.objects.get_or_create(
            user=self.request.user
        )
        return civic_point
from rest_framework import serializers
from .models import CivicPoint


class CivicPointSerializer(serializers.ModelSerializer):

    class Meta:
        model = CivicPoint
        fields = '__all__'
        read_only_fields = ['user', 'updated_at']
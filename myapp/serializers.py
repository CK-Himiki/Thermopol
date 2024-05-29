from rest_framework import serializers
from .models import Substance
from .models import Source

class SubstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Substance
        fields = '__all__'




class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = '__all__'
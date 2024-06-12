from rest_framework import serializers
from .models import *


class SubstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Substance
        fields = '__all__'

class SubstanceClassSerializer(serializers.ModelSerializer):
    class Meta:
        modeol= SubstanceClass
        fields = '__all__'



class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = '__all__'




class TransitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transition
        fields = '__all__'


class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = '__all__'
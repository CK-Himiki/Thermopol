from django.db import models
from enum import Enum
from django.contrib.postgres.fields import ArrayField

from django.contrib.auth.models import User


class TypeEnum(Enum):
    Мономер = "Мономер"
    Полимер = "Полимер"
    Олигомер = "Олигомер"
    неизвестно = "неизвестно"


# Create your models here.
class SubstanceClass(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "класс вещества"
        verbose_name_plural = "классы веществ"


class Source(models.Model):
    description = models.TextField()
    url = models.URLField(null=True, blank=True)
    doi = models.CharField(max_length=100)

    class Meta:
        verbose_name = "литература"
        verbose_name_plural = "список литературы"


class Substance(models.Model):
    substance_class = models.ForeignKey(SubstanceClass, on_delete=models.CASCADE)
    substance_type = models.CharField(
        max_length=20, choices=[(tag.value, tag.name) for tag in TypeEnum]
    )
    name = models.CharField(max_length=150)
    formula = models.CharField(max_length=100)
    source = models.CharField(max_length=100, default="", null=True, blank=True)
    literatura = models.ManyToManyField(Source, null=True, blank=True)
    cas = models.CharField(max_length=100, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "соединение"
        verbose_name_plural = "соединения"


class State(models.Model):
    substance = models.OneToOneField(Substance, on_delete=models.CASCADE)


class PhaseEnum(Enum):
    Crystal = "Crystal"
    Liquid = "Liquid"
    Gas = "Gas"
    Glass = "Glass"
    High_elastic = "High elastic"
    Condensed = "Condensed"
    Devitrified = "Devitrified"


class Number_phase(Enum):
    I = 1
    II = 2
    III = 3
    IV = 4
    V = 5
    VI = 6
    VII = 7
    VIII = 8
    IX = 9
    X = 10


class Phase(models.Model):
    # General
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    agregate_state = models.CharField(
        max_length=20, choices=[(tag.value, tag.name) for tag in PhaseEnum]
    )
    number_phase = models.IntegerField(choices=[(tag.value, tag.name) for tag in Number_phase])
    degree_of_crystallinity = models.FloatField(default=0)
    # Standard properties
    enthalpy_of_combustion = models.FloatField(default=0)
    enthalpy_of_combustion_err = models.FloatField(default=0)
    enthalpy_of_formation = models.FloatField(default=0)
    enthalpy_of_formation_err = models.FloatField(default=0)
    entropy_of_formation = models.FloatField(default=0)
    entropy_of_formation_err = models.FloatField(default=0)
    gibbs_energy_of_formation = models.FloatField(default=0)
    gibbs_energy_of_formation_err = models.FloatField(default=0)
    lnK = models.FloatField(default=0)
    # Specific properties at 0 K
    residual_entropy_at_0_k = models.FloatField(default=0)
    residual_entropy_at_0_k_err = models.FloatField(default=0)
    configurational_entropy = models.FloatField(default=0)
    configurational_entropy_err = models.FloatField(default=0)
    difference_of_zero = models.FloatField(default=0)
    difference_of_zero_err = models.FloatField(default=0)
    # Table of function
    T = ArrayField(models.FloatField(), default=list, blank=True, null=True)
    Cp = ArrayField(models.FloatField(), default=list, blank=True, null=True)
    HT_H0 = ArrayField(models.FloatField(), default=list, blank=True, null=True)
    ST = ArrayField(models.FloatField(), default=list, blank=True, null=True)
    GT = ArrayField(models.FloatField(), default=list, blank=True, null=True)


class Transition(models.Model):
    state = models.OneToOneField(State, on_delete=models.CASCADE)


class PhaseTransition(models.Model):
    transition = models.ForeignKey(Transition, on_delete=models.CASCADE)
    source_phase = models.CharField(
        max_length=20, choices=[(tag.value, tag.name) for tag in PhaseEnum]
    )
    target_phase = models.CharField(
        max_length=20, choices=[(tag.value, tag.name) for tag in PhaseEnum]
    )
    source_phase_number = models.IntegerField(choices=[(tag.value, tag.name) for tag in Number_phase])
    target_phase_number = models.IntegerField(choices=[(tag.value, tag.name) for tag in Number_phase])
    temperature = models.FloatField(default=0)
    temperature_err = models.FloatField(default=0)

    enthalpy_transition = models.FloatField(default=0)
    enthalpy_transition_err = models.FloatField(default=0)

    entropy_transition = models.FloatField(default=0)
    entropy_transition_err = models.FloatField(default=0)
    jump_heat_capacity = models.FloatField(default=0)

    start_temperature = models.FloatField(default=0)
    end_temperature = models.FloatField(default=0)

from django.db import models
from enum import Enum


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


class Literature(models.Model):
    description = models.TextField()

    class Meta:
        verbose_name = "источник"
        verbose_name_plural = "источники"


class Substance(models.Model):
    substance_class = models.ForeignKey(SubstanceClass, on_delete=models.CASCADE)
    substance_type = models.CharField(
        max_length=20, choices=[(tag.value, tag.name) for tag in TypeEnum]
    )
    name = models.CharField(max_length=150)
    formula = models.CharField(max_length=100)
    source = models.CharField(max_length=100, default="", null=True, blank=True)
    literatura = models.ManyToManyField(Literature, null=True, blank=True)

    class Meta:
        verbose_name = "соединение"
        verbose_name_plural = "соединения"

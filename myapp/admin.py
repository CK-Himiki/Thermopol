from django.contrib import admin

# Register your models here.
from .models import SubstanceClass, Substance, Source, State, Phase, Transition, PhaseTransition


@admin.register(SubstanceClass)
class SubstanceClassAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Substance)
class SubstanceAdmin(admin.ModelAdmin):
    list_display = ("formula", "name", "substance_class")


@admin.register(Source)
class LiteratureAdmin(admin.ModelAdmin):
    list_display = ("description",)


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ("substance",)


@admin.register(Phase)
class PhaseAdmin(admin.ModelAdmin):
    list_display = ("agregate_state","number_phase",)

@admin.register(Transition)
class TransitionAdmin(admin.ModelAdmin):
    list_display = ("state",)

@admin.register(PhaseTransition)
class PhaseTransitionAdmin(admin.ModelAdmin):
    list_display = ("transition",)

admin.site.site_header = "Администрирование Thermopol"

from django.contrib import admin

# Register your models here.
from .models import SubstanceClass, Substance, Source, Phase, Transition


@admin.register(SubstanceClass)
class SubstanceClassAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Substance)
class SubstanceAdmin(admin.ModelAdmin):
    list_display = ("formula", "name", "substance_class")


@admin.register(Source)
class LiteratureAdmin(admin.ModelAdmin):
    list_display = ("description",)





@admin.register(Phase)
class PhaseAdmin(admin.ModelAdmin):
    list_display = ("agregate_state","number_phase",)

@admin.register(Transition)
class TransitionAdmin(admin.ModelAdmin):
    list_display = ("source_phase","target_phase",)



admin.site.site_header = "Администрирование Thermopol"

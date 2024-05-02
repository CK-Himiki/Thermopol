from django.contrib import admin

# Register your models here.
from .models import SubstanceClass, Substance, Literature


@admin.register(SubstanceClass)
class SubstanceClassAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Substance)
class SubstanceAdmin(admin.ModelAdmin):
    list_display = ("formula", "name", "substance_class")


@admin.register(Literature)
class LiteratureAdmin(admin.ModelAdmin):
    list_display = ("description",)


admin.site.site_header = "Администрирование Thermopol"

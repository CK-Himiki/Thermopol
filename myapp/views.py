from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import SubstanceClass


def home(request):
    return render(request, "index.html", None)


def append(request):
    context = {
        "types": ["Мономер", "Полимер", "Олигомер", "неизвестно"],
        "classes": SubstanceClass.objects.all(),
    }
    return render(request, "append.html", context)

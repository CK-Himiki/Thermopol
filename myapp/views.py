from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def home(request):

    context = {
        "title": "Главная страница",
    }

    return render(request, "base.html", context)

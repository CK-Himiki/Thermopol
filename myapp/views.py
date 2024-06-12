from django.shortcuts import render, redirect

# Create your views here.
from django.http import HttpResponse
from .models import SubstanceClass

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

from django.http import JsonResponse

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import Group


from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


def home(request):
    return render(request, "index.html", None)


def append(request):
    context = {
        "types": ["Мономер", "Полимер", "Олигомер", "неизвестно"],
        "classes": SubstanceClass.objects.all(),
        "phases": ["Crystal", "Liquid", "Gas", "Glass", "High elastic", "Condensed", "Devitrified"],
        "phase_numbers": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
    }
    return render(request, "append.html", context)


def stream(request):
    context = {
        "substances": Substance.objects.all(),
    }
    return render(request, "stream.html", context)


def edit(request, pkey):
    context = {
        "substance": Substance.objects.get(id=pkey),
    }
    return render(request, "edit.html", context)


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)

        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("append")
            # Redirect to a success page or home page
    else:
        form = AuthenticationForm()

    return render(request, 'login.html', {'form': form})


def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect("append")


def me(request):
    context = {
        "substances": Substance.objects.filter(user=request.user.id),
    }
    return render(request, "me.html", context)


def delete_substance(request, pkey):
    Substance.objects.get(id=pkey).delete()
    return redirect("me")


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.is_staff = True
            group = Group.objects.get(name="Сотрудники")
            group.user_set.add(user)
            user.save()
            login(request, user)
            return redirect("append")  # Перенаправляем на страницу входа
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

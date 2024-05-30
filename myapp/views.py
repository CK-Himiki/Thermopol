from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import SubstanceClass

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Substance
from .serializers import SubstanceSerializer

from django.http import JsonResponse


from .models import Source
from .serializers import SourceSerializer

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return render(request, "index.html", None)


def append(request):
    context = {
        "types": ["Мономер", "Полимер", "Олигомер", "неизвестно"],
        "classes": SubstanceClass.objects.all(),
        "phases": [ "Crystal","Liquid","Gas","Glass","High elastic", "Condensed", "Devitrified"],
        "phase_numbers":[ "I","II" ,"III" ,"IV" ,"V","VI","VII","VIII" ,"IX","X" ],
    }
    return render(request, "append.html", context)

def stream(request):
    context={
        "substances": Substance.objects.all(),
    }
    return render(request, "stream.html", context)


def edit(request,pkey):
    context = {
        "substance": Substance.objects.get(id=pkey),
    }
    return render(request, "edit.html", context)


class SourceView(APIView):
    authentication_classes = []

    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    @csrf_exempt
    def post(self, request):
        if request.method == 'POST':
            try:
                literature_list = request.data.get('literatureList', [])
                for item in literature_list:
                    serializer = SourceSerializer(data=item)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return JsonResponse(serializer.errors, status=400)
                return JsonResponse({'status': 'success'}, status=200)
            except Exception as e:

                return JsonResponse({'error': str(e)}, status=500)
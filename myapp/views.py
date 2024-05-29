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
    }
    return render(request, "append.html", context)

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
from django.shortcuts import render, redirect

# Create your views here.
from django.http import HttpResponse
from .models import SubstanceClass

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import Group


from django.http import HttpResponse
from django.template.loader import get_template

from weasyprint import HTML

from django.shortcuts import render, get_object_or_404

from django.shortcuts import render
from .models import Substance, Phase, Source, Transition








from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def receive_data(request):

    return JsonResponse({'status': 'fail', 'message': 'Invalid request'}, status=400)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def handle_post_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            column1 = data['column1']
            column2 = data['column2']

            # Пример обработки данных
            column3 = [x.upper() for x in column1]  # Пример преобразования данных для колонки 3
            column4 = [x.lower() for x in column2]  # Пример преобразования данных для колонки 4
            column5 = [len(x) for x in column1]    # Пример преобразования данных для колонки 5

            # Формируем объект для отправки обратно на клиент
            response_data = {
                'column3': column3,
                'column4': column4,
                'column5': column5
            }

            # Возвращаем успешный ответ с данными
            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Ошибка декодирования JSON.'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': 'Отсутствует ожидаемое поле в JSON.'}, status=400)
    else:
        return JsonResponse({'error': 'Метод не поддерживается.'}, status=405)


@csrf_exempt
def handle_post_data_table(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            column1 = data['column1']
            column2 = data['column2']
            column3 = data['column3']
            column4 = data['column4']
            column5 = data['column5']
            # Пример обработки данных

            column3 = [x.upper() for x in column1]  # Пример преобразования данных для колонки 3
            column4 = [x.lower() for x in column2]  # Пример преобразования данных для колонки 4
            column5 = [len(x) for x in column1]    # Пример преобразования данных для колонки 5

            # Формируем объект для отправки обратно на клиент
            response_data = {
                'column1': column1,
                'column2': column2,
                'column3': column3,
                'column4': column4,
                'column5': column5,
                'Error': 4.95 # процент ошибки
            }

            # Возвращаем успешный ответ с данными
            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Ошибка декодирования JSON.'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': 'Отсутствует ожидаемое поле в JSON.'}, status=400)
    else:
        return JsonResponse({'error': 'Метод не поддерживается.'}, status=405)


@csrf_exempt
def handle_post_data_table_Error(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Обработка данных, например:
        column1 = data['column1']
        column2 = data['column2']
        column3 = data['column3']
        column4 = data['column4']
        column5 = data['column5']


        response_number = 4.95 # процент ошибки

        return JsonResponse({'Error': response_number})

    return JsonResponse({'error': 'Invalid request'}, status=400)



def home(request):
    return render(request, "index.html", None)


def append(request):
    context = {
        "types": ["Мономер", "Полимер", "Олигомер", "неизвестно"],
        "classes": SubstanceClass.objects.all(),
        "states": ["Crystal", "Liquid", "Gas", "Glass", "High elastic", "Condensed", "Devitrified"],
        "state_nambers": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
    }
    return render(request, "appendSubstance.html", context)

def stream(request):
    context = {
        "substances": Substance.objects.all(),
    }
    return render(request, "stream.html", context)

#Временно отключено
def edit(request, pkey):
    context = {
        "substance": Substance.objects.get(id=pkey),
    }
    return render(request, "edit.html", context)

def generate_pdf(request, substance_id):
    substance = get_object_or_404(Substance, id=substance_id)
    states = Phase.objects.filter(substance=substance)
    literature = Source.objects.filter(substance=substance)
    transitions = Transition.objects.filter(substance=substance)

    # Example data for states
    states_data = []
    for state in states:
        state_dict = {
            'agregate_state': state.agregate_state,
            'number_phase': state.number_phase,
            'degree_of_crystallinity': state.degree_of_crystallinity,
            'enthalpy_of_combustion': state.enthalpy_of_combustion,
            'enthalpy_of_combustion_err': state.enthalpy_of_combustion_err,
            'enthalpy_of_formation': state.enthalpy_of_formation,
            'enthalpy_of_formation_err': state.enthalpy_of_formation_err,
            'entropy_of_formation': state.entropy_of_formation,
            'entropy_of_formation_err': state.entropy_of_formation_err,
            'gibbs_energy_of_formation': state.gibbs_energy_of_formation,
            'gibbs_energy_of_formation_err': state.gibbs_energy_of_formation_err,
            'lnK': state.lnK,
            'residual_entropy_at_0_k': state.residual_entropy_at_0_k,
            'residual_entropy_at_0_k_err': state.residual_entropy_at_0_k_err,
            'configurational_entropy': state.configurational_entropy,
            'configurational_entropy_err': state.configurational_entropy_err,
            'difference_of_zero': state.difference_of_zero,
            'difference_of_zero_err': state.difference_of_zero_err,
            'T': state.T,
            'Cp': state.Cp,
            'HT_H0': state.HT_H0,
            'ST': state.ST,
            'GT': state.GT,
        }
        states_data.append(state_dict)

    # Example data for transitions
    transitions_data = []
    for transition in transitions:
        transition_dict = {
            'source_phase': transition.source_phase,
            'target_phase': transition.target_phase,
            'source_phase_number': transition.source_phase_number,
            'target_phase_number': transition.target_phase_number,
            'temperature': transition.temperature,
            'temperature_err': transition.temperature_err,
            'enthalpy_transition': transition.enthalpy_transition,
            'enthalpy_transition_err': transition.enthalpy_transition_err,
            'entropy_transition': transition.entropy_transition,
            'entropy_transition_err': transition.entropy_transition_err,
            'jump_heat_capacity': transition.jump_heat_capacity,
            'start_temperature': transition.start_temperature,
            'end_temperature': transition.end_temperature,
        }
        transitions_data.append(transition_dict)

    # Prepare functions_data for the table
    functions_data = []
    for state in states_data:
        functions_data.append(['', '', f"{state['agregate_state']} {state['number_phase']}", '', ''])
        max_length = max(len(state['T']), len(state['Cp']), len(state['HT_H0']), len(state['ST']), len(state['GT']))
        for i in range(max_length):
            functions_data.append([
                state['T'][i] if i < len(state['T']) else '',
                state['Cp'][i] if i < len(state['Cp']) else '',
                state['HT_H0'][i] if i < len(state['HT_H0']) else '',
                state['ST'][i] if i < len(state['ST']) else '',
                state['GT'][i] if i < len(state['GT']) else '',
            ])

    template = get_template('pdfReport.html')
    html = template.render({
        'substance': substance,
        'states': states_data,
        'transitions': transitions_data,
        'literature': literature,
        'functions_data': functions_data,
    })

    # Generate PDF using WeasyPrint
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="substance_details_{substance_id}.pdf"'

    HTML(string=html).write_pdf(response)

    return response

def substance_detail(request, substance_id):
    substance = Substance.objects.get(id=substance_id)
    states = Phase.objects.filter(substance=substance)
    literature = Source.objects.filter(substance=substance)

    # Example test data for states
    states_data = [
        {
            'agregate_state': state.agregate_state,
            'number_phase': state.number_phase,
            'degree_of_crystallinity': state.degree_of_crystallinity,
            'enthalpy_of_combustion': state.enthalpy_of_combustion,
            'enthalpy_of_combustion_err': state.enthalpy_of_combustion_err,
            'enthalpy_of_formation': state.enthalpy_of_formation,
            'enthalpy_of_formation_err': state.enthalpy_of_formation_err,
            'entropy_of_formation': state.entropy_of_formation,
            'entropy_of_formation_err': state.entropy_of_formation_err,
            'gibbs_energy_of_formation': state.gibbs_energy_of_formation,
            'gibbs_energy_of_formation_err': state.gibbs_energy_of_formation_err,
            'lnK': state.lnK,
            'residual_entropy_at_0_k': state.residual_entropy_at_0_k,
            'residual_entropy_at_0_k_err': state.residual_entropy_at_0_k_err,
            'configurational_entropy': state.configurational_entropy,
            'configurational_entropy_err': state.configurational_entropy_err,
            'difference_of_zero': state.difference_of_zero,
            'difference_of_zero_err': state.difference_of_zero_err,
            'T': state.T,
            'Cp': state.Cp,
            'HT_H0': state.HT_H0,
            'ST': state.ST,
            'GT': state.GT,
        }
        for state in states
    ]

    # Example test data for transitions
    transitions_data = [
        {
            'source_phase': transition.source_phase,
            'target_phase': transition.target_phase,
            'source_phase_number': transition.source_phase_number,
            'target_phase_number': transition.target_phase_number,
            'temperature': transition.temperature,
            'temperature_err': transition.temperature_err,
            'enthalpy_transition': transition.enthalpy_transition,
            'enthalpy_transition_err': transition.enthalpy_transition_err,
            'entropy_transition': transition.entropy_transition,
            'entropy_transition_err': transition.entropy_transition_err,
            'jump_heat_capacity': transition.jump_heat_capacity,
            'start_temperature': transition.start_temperature,
            'end_temperature': transition.end_temperature,
        }
        for transition in Transition.objects.filter(substance=substance)
    ]

    # Prepare functions_data for the table
    functions_data = []
    for state in states_data:
        functions_data.append(['','', state['agregate_state'] + ' '+ str(state['number_phase']),'',''])
        max_length = max(len(state['T']), len(state['Cp']), len(state['HT_H0']), len(state['ST']), len(state['GT']))
        for i in range(max_length):
            functions_data.append([
                state['T'][i] if i < len(state['T']) else '',
                state['Cp'][i] if i < len(state['Cp']) else '',
                state['HT_H0'][i] if i < len(state['HT_H0']) else '',
                state['ST'][i] if i < len(state['ST']) else '',
                state['GT'][i] if i < len(state['GT']) else '',
            ])

    context = {
        'substance': substance,
        'states': states_data,
        'transitions': transitions_data,
        'literature': literature,
        'functions_data': functions_data,
    }

    return render(request, 'substance_detail.html', context)

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

def guest(request):
    context = {
        "types": ["Мономер", "Полимер", "Олигомер", "неизвестно"],
        "classes": SubstanceClass.objects.all(),
        "phases": ["Crystal", "Liquid", "Gas", "Glass", "High elastic", "Condensed", "Devitrified"],
        "phase_numbers": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
    }
    return render(request, "guest.html", context)

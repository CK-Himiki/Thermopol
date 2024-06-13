from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import *
from .serializers import *


class SourceView(APIView):
    authentication_classes = []

    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        try:
            data = request.data
            # Сохранение вещества
            substance_data = {
                'substance_class': SubstanceClass.objects.get(name=data.get('substance_class')).id,  # ПОПРАВИТЬ
                'substance_type': data.get('substance_type'),                    'name': data.get('name'),
                'formula': data.get('formula'),
                'source': data.get('source'),
                'cas': data.get('cas'),
                'user': request.user.id
            }
            substance_serializer = SubstanceSerializer(data=substance_data)
            if substance_serializer.is_valid():
                substance = substance_serializer.save()
            else:
                return Response(substance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # Сохранение в промежутоыную таблицу State
            state_data = {'substance': substance.id}
            states_agregate = StateSerializer(data=state_data)
            if states_agregate.is_valid():
                states_index = states_agregate.save()
            else:
                return Response(states_agregate.errors, status=status.HTTP_400_BAD_REQUEST)

            # Сохранение списка агрегатных состояний
            agregate_states_list = data.get('AggregateState', [])
            saved_states = []
            for item in agregate_states_list:
                item['state'] = states_index.id
                state_serializer = PhaseSerializer(data=item)
                if state_serializer.is_valid():
                    saved_state = state_serializer.save()
                    saved_states.append(saved_state)
                else:
                    return Response(state_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # Сохранение в промежутоыную таблицу Transition
            transition_data = {'state': states_index.id}
            states_agregate = TransitionSerializer(data=transition_data)
            if states_agregate.is_valid():
                states_index = states_agregate.save()
            else:
                return Response(states_agregate.errors, status=status.HTTP_400_BAD_REQUEST)

            # Сохранение списка переходов
            transactions_list = data.get('transactions_list', [])
            saved_transactions = []
            for item in transactions_list:
                item['transition'] = states_index.id
                transition_serializer = PhaseTransitionSerializer(data=item)
                if transition_serializer.is_valid():
                    saved_transaction = transition_serializer.save()
                    saved_transactions.append(saved_transaction)
                else:
                    return Response(transition_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # Сохранение списка литературы
            literature_list = data.get('literature', [])
            saved_sources = []
            for item in literature_list:
                source_serializer = SourceSerializer(data=item)
                if source_serializer.is_valid():
                    saved_source = source_serializer.save()
                    saved_sources.append(saved_source)
                else:
                    return Response(source_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({'status': 'success', 'saved_states': [state.id for state in saved_states]},
                                status=status.HTTP_200_OK)

        except Exception as e:
            print("Exception:", str(e))  # Отладка: вывод исключения
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



   
class SubstanceListView(generics.ListAPIView):
    queryset = Substance.objects.all()
    serializer_class = SubstanceSerializer

class SubstanceDetailView(generics.RetrieveAPIView):
    queryset = Substance.objects.all()
    serializer_class = SubstanceSerializer

class SubstanceClassListView(generics.ListAPIView):
    queryset = SubstanceClass.objects.all()
    serializer_class = SubstanceClassSerializer

class PhaseListView(generics.ListAPIView):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer

class TransitionListView(generics.ListAPIView):
    queryset = Transition.objects.all()
    serializer_class = TransitionSerializer
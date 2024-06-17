from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import *
from .serializers import *
from .mymath import extrapol,m4


class SourceView(APIView):
    authentication_classes = []

    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        # import debug
        try:


            data = request.data

            # Сохранение списка литературы
            literature_list = data.get('literature', [])
            saved_sources = []
            literatura_ids=[]
            for item in literature_list:
                source_serializer = SourceSerializer(data=item)
                if source_serializer.is_valid():
                    saved_source = source_serializer.save()
                    literatura_ids.append(saved_source.id)
                    saved_sources.append(saved_source)
                else:
                    return Response(source_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


            try:
                substance_class=SubstanceClass.objects.get(name=data.get('substance_class'))

            except SubstanceClass.DoesNotExist:
                SubstanceClass(name=data.get('substance_class')).save()
                substance_class =SubstanceClass.objects.get(name=data.get('substance_class'))

                # Phases
            agregate_states_list = data.get('AggregateState', [])
            saved_states = []
            phases_ids=[]
            for item in agregate_states_list:
                state_serializer = PhaseSerializer(data=item)
                if state_serializer.is_valid():
                    saved_state = state_serializer.save()
                    phases_ids.append(saved_state.id)
                    saved_states.append(saved_state)
                else:
                    return Response(state_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # Transitional
            transactions_list = data.get('transactions_list', [])
            transition_ids=[]
            saved_transactions = []
            for item in transactions_list:
                transition_serializer = TransitionSerializer(data=item)
                if transition_serializer.is_valid():
                    saved_transaction = transition_serializer.save()
                    transition_ids.append(saved_transaction.id)
                    saved_transactions.append(saved_transaction)
                else:
                    return Response(transition_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            print("test compl")
            # Сохранение вещества
            substance_data = {
                'substance_class': substance_class.id, # ПОПРАВИТЬ
                'substance_type': data.get('substance_type'),
                'name': data.get('name'),
                'formula': data.get('formula'),
                'source': data.get('source'),
                'cas': data.get('cas'),
                'user': request.user.id,
                'literatura': literatura_ids,
                'phases': phases_ids,
                'transitions': transition_ids
            }
            print("test compl")
            substance_serializer = SubstanceSerializer(data=substance_data)
            if substance_serializer.is_valid():
                print("test compl TRUE")
                substance = substance_serializer.save()
                print("test compl TRUEEEEE")

            else:
                return Response(substance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


            return Response({'status': 'success', 'substance': substance_serializer.data}, status=status.HTTP_200_OK)

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


class MathView(APIView):
    def post(self,request):

        try:
            # import debug
            data = request.data

            agregate_states_list = data.get('AggregateState', [])
            lst_t=[list(filter(None,i['T'])) for i in agregate_states_list]
            lst_cp=[list(filter(None,i['Cp'])) for i in agregate_states_list]
            lst_t=[i for i in lst_t if i]
            lst_cp=[i for i in lst_cp if i]
            lst_t=[list(map(float,i)) for i in lst_t]
            lst_cp=[list(map(float,i)) for i in lst_cp]
            t,cp,a,b,err=extrapol(lst_t[0],lst_cp[0])
            lst_t[0]=t
            lst_cp[0]=cp

            transactions_list = data.get('transactions_list', [])
            coeff=[i['enthalpyTransition'] for i in transactions_list]

            h,s,g=m4(lst_t,lst_cp,coeff)


            return Response({'status': 'success',
                             "a":a,
                             "b":b,
                             "mse_err":err,
                             "t":lst_t,
                             "cp":lst_cp,
                             "h":h,
                             "s":s,
                             "g":g
                             }, status=status.HTTP_200_OK)

        except Exception as e:
            print("Exception:", str(e))  # Отладка: вывод исключения
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



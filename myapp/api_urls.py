from django.urls import path
from .api import SourceView, SubstanceListView, SubstanceDetailView, PhaseListView, TransitionListView,MathView



app_name = 'myapp'






urlpatterns = [
    path('getsubstance/', SubstanceListView.as_view(), name='substance_list'),
    path('getsubstance/<pk>/', SubstanceDetailView.as_view(), name='substance_detail'),
    path('getphase/', PhaseListView.as_view(), name='phase_list'),
    path('gettransition/', TransitionListView.as_view(), name='transition_list'),
    path('calc/',MathView.as_view(), name='calc'),
    path('append/', SourceView.as_view(), name='append'),
]

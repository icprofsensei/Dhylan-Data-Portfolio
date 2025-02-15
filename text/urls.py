from django.urls import path

from . import views

app_name = "text"
urlpatterns = [
    path('', views.lander, name='landingpage'),
    path("newpred/", views.add_prediction, name = "newpred"),
    path("newpred/confirmed/", views.Output, name = "predictionoutput"),
]
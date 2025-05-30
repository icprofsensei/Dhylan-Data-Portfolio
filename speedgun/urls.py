from django.urls import path

from . import views

app_name = "speedgun"
urlpatterns = [
    path('', views.lander, name='landingpage'),
]
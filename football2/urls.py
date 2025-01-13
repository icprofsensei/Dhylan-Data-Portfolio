from django.urls import path

from . import views

app_name = "football2"
urlpatterns = [
    path('', views.lander, name='landingpage'),
]
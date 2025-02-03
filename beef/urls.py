from django.urls import path

from . import views

app_name = "beef"
urlpatterns = [
    path('', views.lander, name='landingpage'),
]
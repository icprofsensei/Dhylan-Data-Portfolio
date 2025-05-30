from django.shortcuts import render, redirect
from django.contrib import messages
from django.views import generic
import os

# Create your views here.
def lander(request):
    return render(request, 'speedgun/index.html')
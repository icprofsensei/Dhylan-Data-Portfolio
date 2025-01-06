from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from datetime import date
from django.views import generic
from .forms import skillnetworkForm
import os
from django.conf import settings
import numpy as np

def home(request):
    return render(request, 'home.html')  # Renders the home.html template
def purpose(request):
    return render(request, 'purpose.html')
def skills(request):
    return render(request, 'skills.html')
def datacomms(request):
    return render(request, 'datacomms.html')




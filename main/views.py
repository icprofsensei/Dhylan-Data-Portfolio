from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from datetime import date


def home(request):
    return render(request, 'home.html')  # Renders the home.html template
def purpose(request):
    return render(request, 'purpose.html')
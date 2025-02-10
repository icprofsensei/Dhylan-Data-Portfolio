from django.shortcuts import render, redirect

# Create your views here.
def lander(request):
    return render(request, 'text/index.html')
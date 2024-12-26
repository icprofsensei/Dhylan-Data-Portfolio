from django.shortcuts import render, redirect
from django.views import generic
from .forms import dtreeForm
import os
from django.conf import settings
from joblib import load
import numpy as np

# Create your views here.
def lander(request):
    return render(request, 'dtree/index.html')

def add_prediction(request):
    if request.method == 'POST':
        form = dtreeForm(request.POST)
        if form.is_valid():
            # Do something with data
            Nitrogen = form.cleaned_data['Nitrogen']
            Phosphorus = form.cleaned_data['Phosphorus']
            Potassium = form.cleaned_data['Potassium']
            Temperature = form.cleaned_data['Temperature']
            Humidity = form.cleaned_data['Humidity']
            pH_Value = form.cleaned_data['pH_Value']
            Rainfall = form.cleaned_data['Rainfall']
            prediction = predict(Nitrogen, Phosphorus, Potassium, Temperature, Humidity, pH_Value, Rainfall)
            return render(request, "dtree/output.html", {'result': {'Nitrogen': Nitrogen, 'Phosphorus':Phosphorus, 'Potassium': Potassium, 'Temperature':Temperature, 'Humidity': Humidity, 'pH_Value':pH_Value, 'Rainfall': Rainfall, 'Prediction': prediction}}) 
    else:
        form = dtreeForm()  # Display an empty form if the request is GET

    return render(request, 'dtree/dataentry.html', {'form': form})

def Output(request):
    return render(request, "dtree/output.html")





def predict(NI, PHO, PO, TE, HU, PH, RA):
    clf = load('dtree/treemodels/decision_tree_crops.joblib')
    PREDICTION = clf.predict(np.array([NI, PHO, PO, TE, HU, PH, RA]).reshape(1, -1))
    return PREDICTION[0]

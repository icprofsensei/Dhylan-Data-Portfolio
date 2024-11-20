from django.shortcuts import render, redirect
from django.views import generic
from .forms import Startup1Form
import os
from django.conf import settings
import torch
import torch.nn as nn
import torch.nn.functional as F

# Create your views here.
def lander(request):
    return render(request, 'startup1/index.html')

def add_prediction(request):
    if request.method == 'POST':
        form = Startup1Form(request.POST)
        if form.is_valid():
            # Do something with data
            funding_total_final = form.cleaned_data['funding_total_final']
            seed = form.cleaned_data['seed']
            roundA = form.cleaned_data['roundA']
            roundB = form.cleaned_data['roundB']
            roundC = form.cleaned_data['roundC']
            roundD = form.cleaned_data['roundD']
            roundE = form.cleaned_data['roundE']
            roundF = form.cleaned_data['roundF']
            roundG = form.cleaned_data['roundG']
            roundH = form.cleaned_data['roundH']
            category_list = form.cleaned_data['category_list']
            return render(request, "startup1/output.html", {'result': {'funding_total_final': funding_total_final, 'seed':seed, 'roundA': roundA, 'roundB':roundB, 'roundC': roundC, 'roundD':roundD, 'roundE':roundE, 'roundF':roundF, 'roundG':roundG, 'roundH':roundH, 'category_list':category_list}}) 
    else:
        form = Startup1Form()  # Display an empty form if the request is GET

    return render(request, 'startup1/dataentry.html', {'form': form})

def Output(request):
    return render(request, "startup1/output.html")



# ML Predictions
class Model(nn.Module):
    # Input layer has 39 neurons
    # Hidden layer
    # h1 = 30
    # h2 = 10
    # Output 'status' has 3 classes = acquired, closed, operating
    def __init__(self, in_features=4, h1 = 10, h2 = 10, out_features = 3):
        #fc1 = fully conntected
        super().__init__() # This is a required step in OOP
        self.fc1 = nn.Linear(in_features, h1)
        self.fc2 = nn.Linear(h1, h2)
        self.out = nn.Linear(h2, out_features)
    def forward(self, x):
        #relu = rectified linear unit
        # Start with layer 1 move to layer 2
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.out(x)

        return(x)

def valconv (val):
            if val ==0:
                x = 'Iris-setosa'
            elif val == 1:
                x= 'Iris-versicolor'
            else:
                x = 'Iris-virginica'
            return x

def predict(sl, sw, pl, pw):
    old_model = Model()
    model_path = os.path.join(settings.BASE_DIR, 'iris/models/basic_iris_model.pt')
    old_model.load_state_dict(torch.load(model_path))
    new_iris = torch.tensor([sl, sw, pl, pw])
    with torch.no_grad():
        return valconv(old_model(new_iris).argmax().item())

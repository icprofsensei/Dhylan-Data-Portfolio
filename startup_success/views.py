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
            sepal_length = form.cleaned_data['sepal_length']
            sepal_width = form.cleaned_data['sepal_width']
            petal_length = form.cleaned_data['petal_length']
            petal_width = form.cleaned_data['petal_width']
            prediction = predict(sepal_length, sepal_width, petal_length, petal_width)
            return render(request, "iris/output.html", {'result': {'sepal_length': sepal_length, 'sepal_width':sepal_width, 'petal_length': petal_length, 'petal_width':petal_width, 'prediction': prediction}}) 
    else:
        form = Startup1Form()  # Display an empty form if the request is GET

    return render(request, 'iris/dataentry.html', {'form': form})

def Output(request):
    return render(request, "iris/output.html")



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

from django.shortcuts import render, redirect
from django.contrib import messages
from django.views import generic
from .forms import Startup1Form
import os
from django.conf import settings
import torch
import torch.nn as nn
import torch.nn.functional as F
import pandas as pd

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
            
            yearfounded = form.cleaned_data['yearfounded']
            yearffunded = form.cleaned_data['yearffunded']
            yearlfunded = form.cleaned_data['yearlfunded']
            category_list = form.cleaned_data['category_list']
            if seed + roundA + roundB + roundC + roundD + roundE + roundF + roundG + roundH > funding_total_final:
                messages.error(request, "Funds must all sum to the funding total")
                return redirect('startup1:newpred')
            prediction = predict(funding_total_final, seed, roundA, roundB, roundC, roundD, roundE, roundF, roundG, roundH, yearfounded, yearffunded, yearlfunded, category_list)
            return render(request, "startup1/output.html", {'result': {'funding_total_final': funding_total_final, 'seed':seed,
                                                                        'roundA': roundA, 'roundB':roundB, 'roundC': roundC, 'roundD':roundD, 'roundE':roundE, 'roundF':roundF, 'roundG':roundG, 'roundH':roundH, 
                                                                        'category_list':category_list, 'yearfounded': yearfounded, 'yearffunded': yearffunded, 'yearlfunded': yearlfunded, 'prediction': prediction}}) 
    else:
        form = Startup1Form()  # Display an empty form if the request is GET

    return render(request, 'startup1/dataentry.html', {'form': form})

def Output(request):
    return render(request, "startup1/output.html")



# ML Predictions
class Model(nn.Module):
    # Input layer has 26 neurons
    # Hidden layer
    # h1 = 100
    # h2 = 100
    # Output 'status' has 3 classes = acquired, closed, operating
    def __init__(self, in_features=26, h1 = 100, h2 = 100, out_features = 3):
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
                x = 'closed'
            elif val == 1:
                x= 'operating'
            else:
                x = 'acquired'
            return x

def predict(ft, s, A, B, C, D, E, F, G, H, yf, yff, ylf, cl):
    old_model = Model()
    yf = int(yf)
    yff = int(yff)
    ylf = int(ylf)
    ff = yff - yf
    fd = ylf - yff
    stocks= pd.read_csv(os.path.join(settings.BASE_DIR,"startup1/data/annualstockprices.csv"))
    stock_dict = stocks.set_index('Year').to_dict(orient='index')
    cn = len(cl)

    categories= pd.read_csv(os.path.join(settings.BASE_DIR,"startup1/data/marketpopularity2024.csv"))
    cat_dict = categories.set_index("Name")["Total_Google_Results_for_query_Nov_2024"].to_dict()
    hitlist = []
    for cat in cl:
         hitlist.append(cat_dict[cat])
    
    model_path = os.path.join(settings.BASE_DIR, 'startup1/models/full_26_startup_success_model.pt')
    old_model.load_state_dict(torch.load(model_path))
    new_iris = torch.tensor([ft, s, A, B, C, D, E, F, G, H, ff, max(hitlist), cn, yf, yff, ylf, fd,  
                             stock_dict[yf]['S&P500'],stock_dict[yf]['USComposite'], stock_dict[yf]['DOW'],
                             stock_dict[yff]['S&P500'],stock_dict[yff]['USComposite'], stock_dict[yff]['DOW'],
                             stock_dict[ylf]['S&P500'],stock_dict[ylf]['USComposite'], stock_dict[ylf]['DOW'], ])
    with torch.no_grad():
        return valconv(old_model(new_iris).argmax().item())

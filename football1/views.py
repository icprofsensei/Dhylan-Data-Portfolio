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
from sklearn.preprocessing import StandardScaler

# Create your views here.
def lander(request):
    return render(request, 'football1/index.html')


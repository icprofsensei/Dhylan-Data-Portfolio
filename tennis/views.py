from django.shortcuts import render, redirect
from django.contrib import messages
from django.views import generic
import os
from django.conf import settings
import torch
import torch.nn as nn
import torch.nn.functional as F

# Create your views here.
def lander(request):
    return render(request, 'tennis/index.html')

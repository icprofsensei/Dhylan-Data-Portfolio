from django.shortcuts import render, redirect
import pandas as pd
import plotly.figure_factory as ff
import plotly.express as px
import os
from django.conf import settings
import json
from django.http import JsonResponse
import numpy as np
from pathlib import Path
from .forms import TextForm

# Disable GPU to avoid high memory usage
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

import tensorflow as tf
from tensorflow.keras.models import load_model
import pickle

# Paths for saved model and vectorizer
MODEL_PATH = Path(settings.BASE_DIR) / "text/models/model.h5"
VECTORISER_PATH = Path(settings.BASE_DIR) / "text/models/vectorizer_vocab.pkl"

# Lazy load model to avoid keeping it in memory unnecessarily
def load_text_model():
    model = load_model(str(MODEL_PATH))
    with open(VECTORISER_PATH, "rb") as f:
        vocab = pickle.load(f)
    
    for layer in model.layers:
        if isinstance(layer, tf.keras.layers.TextVectorization):
            text_vectorizer = layer
            break
    text_vectorizer.set_vocabulary(vocab)
    
    return model, text_vectorizer

@tf.function  # Optimize execution speed
def predict(text):
    label_map = {1: 'Sport', 2: 'Climate', 0: 'War'}
    model, text_vectorizer = load_text_model()
    text_tensor = tf.constant([text])  
    prediction = model.predict(text_tensor)
    del model, text_vectorizer  # Free memory after prediction
    predicted_index = int(np.argmax(prediction))
    return label_map[predicted_index]

def lander(request):
    # Load data efficiently
    matrix_path = Path(settings.BASE_DIR) / "static/text/data/matrix.csv"
    mat = pd.read_csv(matrix_path, dtype=str)  # Use dtype=str to reduce memory usage

    titles = mat.iloc[:, 0].tolist()
    distance_matrix = 30 - mat.iloc[:, 1:].astype(float).values  # Convert only needed columns

    # Generate dendrogram
    dendfig = ff.create_dendrogram(distance_matrix, orientation='left', labels=titles)
    dendfig.update_layout(
        title_text='Dendrogram of Semantic Search Theme Similarity',
        autosize=True, margin={"r": 0, "t": 160, "l": 0, "b": 60},
        height=500
    )
    plot_div = dendfig.to_html(full_html=False, include_plotlyjs=False)

    # Training accuracy plot
    trainingdf = pd.DataFrame([
        {'Epoch': 0, 'Training Accuracy': 0.855, 'Validation Accuracy': 0.934},
        {'Epoch': 1, 'Training Accuracy': 0.989, 'Validation Accuracy': 0.929},
        {'Epoch': 2, 'Training Accuracy': 0.991, 'Validation Accuracy': 0.940},
        {'Epoch': 3, 'Training Accuracy': 0.992, 'Validation Accuracy': 0.935},
        {'Epoch': 4, 'Training Accuracy': 0.992, 'Validation Accuracy': 0.944}
    ])
    accuracyfig = px.line(trainingdf, x='Epoch', y=['Training Accuracy', 'Validation Accuracy'], 
                          title='Training Accuracy of RNN Model', markers=True)
    accuracyfig.update_layout(
        autosize=True, margin={"r": 0, "t": 160, "l": 0, "b": 60}, height=500,
        legend=dict(orientation="h", yanchor="top", y=-0.3)
    )
    accuracy_div = accuracyfig.to_html(full_html=False, include_plotlyjs=False)

    # Loss plot
    lossdf = pd.DataFrame([
        {'Epoch': 0, 'Training Loss': 0.36, 'Validation Loss': 0.19},
        {'Epoch': 1, 'Training Loss': 0.051, 'Validation Loss': 0.201},
        {'Epoch': 2, 'Training Loss': 0.041, 'Validation Loss': 0.241},
        {'Epoch': 3, 'Training Loss': 0.031, 'Validation Loss': 0.232},
        {'Epoch': 4, 'Training Loss': 0.035, 'Validation Loss': 0.237}
    ])
    lossfig = px.line(lossdf, x='Epoch', y=['Training Loss', 'Validation Loss'], 
                      title='Loss During RNN Training', markers=True)
    lossfig.update_layout(
        autosize=True, margin={"r": 0, "t": 160, "l": 0, "b": 60}, height=500,
        legend=dict(orientation="h", yanchor="top", y=-0.3)
    )
    loss_div = lossfig.to_html(full_html=False, include_plotlyjs=False)

    return render(request, 'text/index.html', {
        "plot_div": plot_div, 
        "accuracy_div": accuracy_div, 
        "loss_div": loss_div
    })

def add_prediction(request):
    if request.method == 'POST':
        form = TextForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data['text_input']
            prediction = predict(text)
            return render(request, "text/output.html", {'result': {'Text': text, 'Prediction': prediction}}) 
    else:
        form = TextForm()

    return render(request, 'text/dataentry.html', {'form': form})

def Output(request):
    return render(request, "text/output.html")

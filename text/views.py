from django.shortcuts import render
import pandas as pd
import plotly.figure_factory as ff
import plotly.express as px
import os
from django.conf import settings
import json
import numpy as np
import pickle
from pathlib import Path
from .forms import TextForm
import tensorflow.lite as tflite

# Paths for TFLite model and vectorizer
MODEL_PATH = Path(settings.BASE_DIR) / "text/models/model.tflite"
VECTORISER_PATH = Path(settings.BASE_DIR) / "text/models/vectorizer_vocab.pkl"

# Load vectorizer once
with open(VECTORISER_PATH, "rb") as f:
    vocab = pickle.load(f)

# Load TFLite model and create an interpreter
interpreter = tflite.Interpreter(model_path=str(MODEL_PATH))
interpreter.allocate_tensors()

# Get input and output tensor indices
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def predict(text):
    """Perform inference using the TFLite model."""
    label_map = {1: 'Sport', 2: 'Climate', 0: 'War'}

    # Convert text input to NumPy array
    text_tensor = np.array([text], dtype=np.object_)

    # Set input tensor
    interpreter.set_tensor(input_details[0]['index'], text_tensor)

    # Run inference
    interpreter.invoke()

    # Get prediction
    prediction = interpreter.get_tensor(output_details[0]['index'])

    # Get class with highest probability
    predicted_index = int(np.argmax(prediction))
    return label_map[predicted_index]

def lander(request):
    """Load dataset and render the index page."""
    matrix_path = Path(settings.BASE_DIR) / "static/text/data/matrix.csv"
    mat = pd.read_csv(matrix_path, dtype=str)

    titles = mat.iloc[:, 0].tolist()
    distance_matrix = 30 - mat.iloc[:, 1:].astype(float).values

    # Generate dendrogram
    dendfig = ff.create_dendrogram(distance_matrix, orientation='left', labels=titles)
    dendfig.update_layout(
        title_text='Dendrogram of Semantic Search Theme Similarity',
        autosize=True, margin={"r": 0, "t": 160, "l": 0, "b": 60}, height=500
    )
    plot_div = dendfig.to_html(full_html=False, include_plotlyjs=False)

    # Training Accuracy Plot
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

    # Loss Plot
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
    """Handle text prediction form submission."""
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
    """Render the output page."""
    return render(request, "text/output.html")

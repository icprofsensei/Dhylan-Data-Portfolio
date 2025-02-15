from django.shortcuts import render, redirect
import pandas as pd
import plotly.figure_factory as ff
import plotly.express as px
import os
from django.conf import settings
import json
from django.http import JsonResponse
import numpy as np
import scipy.cluster.hierarchy as sch
import tensorflow as tf
from tensorflow.keras.models import load_model
from .forms import TextForm
import pickle

# Disable OneDNN optimizations for compatibility
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Paths for saved model and vectorizer
import os
import pickle
import numpy as np
import tensorflow as tf
from django.conf import settings  # Assuming it's a Django project

# Paths for saved model and vectorizer
MODEL_PATH = os.path.join(settings.BASE_DIR, "text/models/model.h5")
VECTORISER_PATH = os.path.join(settings.BASE_DIR, "text/models/vectorizer_vocab.pkl")

# Load the saved vocabulary
with open(VECTORISER_PATH, "rb") as f:
    vocab = pickle.load(f)

model = tf.keras.models.load_model(MODEL_PATH)

for layer in model.layers:
    if isinstance(layer, tf.keras.layers.TextVectorization):
        text_vectorizer = layer
        break
text_vectorizer.set_vocabulary(vocab)

def predict(text):
    label_map = {1: 'Sport', 2: 'Climate', 0: 'War'}
    text_tensor = tf.constant([text])  # Convert input to tensor
    prediction = model.predict(text_tensor)  # Predict class probabilities
    predicted_index = int(np.argmax(prediction))  # Get class with highest probability
    predicted_label = label_map[predicted_index]  # Map index to label
    return predicted_label




def lander(request):
    # Load data for dendrogram
    matrix_path = os.path.join(settings.BASE_DIR, "static/text/data/matrix.csv")
    mat = pd.read_csv(matrix_path)
    titles = list(mat['Unnamed: 0'])

    rlshplsog = []
    for index, row in mat.iterrows():
        r = [30 if row['Unnamed: 0'] == t else row[t] for t in titles]
        rlshplsog.append(r)
    
    distance_matrix = 30 - np.array(rlshplsog)
    
    dendfig = ff.create_dendrogram(distance_matrix, orientation='left', labels=titles)
    dendfig.update_layout(
        title_text='Dendrogram of Semantic Search Theme Similarity',
        autosize=True,
        margin={"r": 0, "t": 160, "l": 0, "b": 60},
        height=500
    )
    plot_div = dendfig.to_html(full_html=False, include_plotlyjs=False)

    trainingdf = pd.DataFrame([
        {'Epoch': 0, 'Training Accuracy': 0.854981541633606, 'Validation Accuracy': 0.9336283206939697},
        {'Epoch': 1, 'Training Accuracy': 0.9889298677444458, 'Validation Accuracy': 0.9292035102844238},
        {'Epoch': 2, 'Training Accuracy': 0.9911438822746277, 'Validation Accuracy': 0.9395280480384827},
        {'Epoch': 3, 'Training Accuracy': 0.992250919342041, 'Validation Accuracy': 0.9351032376289368},
        {'Epoch': 4, 'Training Accuracy': 0.992250919342041, 'Validation Accuracy': 0.9439527988433838}
    ])
    accuracyfig = px.line(trainingdf, x='Epoch', y=['Training Accuracy', 'Validation Accuracy'], 
                          title='Training Accuracy of RNN Model', markers=True)
    accuracyfig.update_layout(
        autosize=True, margin={"r": 0, "t": 160, "l": 0, "b": 60}, height=500,
        legend=dict(
        orientation="h",  # Horizontal legend
        yanchor="top", 
        y=-0.3  # Move it below the axes
    )
    )
    accuracy_div = accuracyfig.to_html(full_html=False, include_plotlyjs=False)

    lossdf = pd.DataFrame([
        {'Epoch': 0, 'Training Loss': 0.36008715629577637, 'Validation Loss': 0.18979710340499878},
        {'Epoch': 1, 'Training Loss': 0.05138423666357994, 'Validation Loss': 0.20064795017242432},
        {'Epoch': 2, 'Training Loss': 0.04122254252433777, 'Validation Loss': 0.24116705358028412},
        {'Epoch': 3, 'Training Loss': 0.031437989324331284, 'Validation Loss': 0.23176957666873932},
        {'Epoch': 4, 'Training Loss': 0.03485777601599693, 'Validation Loss': 0.23693472146987915}
    ])
    lossfig = px.line(lossdf, x='Epoch', y=['Training Loss', 'Validation Loss'], 
                      title='Loss During RNN Training', markers=True)
    lossfig.update_layout(
        autosize=True, margin={"r": 0, "t": 160, "l": 0, "b": 60}, height=500,
        legend=dict(
        orientation="h",  # Horizontal legend
        yanchor="top", 
        y=-0.3  # Move it below the axes
    )
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
        form = TextForm()  # Empty form for GET requests

    return render(request, 'text/dataentry.html', {'form': form})

# View for displaying prediction output
def Output(request):
    return render(request, "text/output.html")

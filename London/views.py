from django.shortcuts import render
import pandas as pd
import plotly.express as px
import os
from django.conf import settings

def index(request):
    file_path = os.path.join(settings.BASE_DIR,"static/London/data/tfl-journeys-type.csv")
    data = pd.read_csv(file_path)
    fig = px.line(data, x = 'Period ending', y = 'Bus journeys (m)', title = "Bus Journeys in London")
    plot_div = fig.to_html(full_html=False, include_plotlyjs=False)
    return render (request, "London/index.html", {"plot_div": plot_div})
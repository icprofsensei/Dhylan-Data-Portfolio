from django.shortcuts import render
import pandas as pd
import plotly.express as px
import os
from django.conf import settings
import json
from django.http import JsonResponse


def demo(request):
    file_path = os.path.join(settings.BASE_DIR,"static/London/data/tfl-journeys-type.csv")
    data = pd.read_csv(file_path)
    fig = px.line(data, x = 'Period ending', y = 'Bus journeys (m)', title = "Bus Journeys in London")
    plot_div = fig.to_html(full_html=False, include_plotlyjs=False)
    return render (request, "London/demo.html", {"plot_div": plot_div})

def index(request):



    # Loading
    linchar_path = os.path.join(settings.BASE_DIR,"static/London/data/months.csv")
    json_path = os.path.join(settings.BASE_DIR,"static/London/data/bor.geojson")
    totalcrimescsv_path = os.path.join(settings.BASE_DIR, "static/London/data/crimes.csv")
    violcrimescsv_path = os.path.join(settings.BASE_DIR, "static/London/data/violence.csv")
    theftcrimescsv_path = os.path.join(settings.BASE_DIR, "static/London/data/theft.csv")
    westmin_path = os.path.join(settings.BASE_DIR, "static/London/data/westmin.csv")
    denscsv_path = os.path.join(settings.BASE_DIR, "static/London/data/popdens.csv")
    ldnboroughs = json.load(open(json_path, "r"))
    for feature in ldnboroughs["features"]:
        feature["id"] = feature["properties"]["name"]

    # Line chart 

    monthlycrimes = pd.read_csv(linchar_path)
    fig1 = px.line(monthlycrimes, x = 'date', y = 'crimes', title = "London crimes 2023-25")
    fig1.update_layout(margin={"r":0,"t":160,"l":0,"b":0})
    plot_div1 = fig1.to_html(full_html = False, include_plotlyjs = False)

    # Map 1 

    totalcrimes = pd.read_csv(totalcrimescsv_path)
    fig2 = px.choropleth(
            totalcrimes,
            locations="Borough",
            geojson=ldnboroughs,
            color="Criminal Offences 2023-25",
            hover_name="Borough",
            hover_data=["Criminal Offences 2023-25"],
            title="Total Crime 2023-25",
            
        )
    fig2.update_geos(fitbounds="locations", visible=False)
    fig2.update_layout(autosize = True, margin={"r":0,"t":100,"l":0,"b":0}, coloraxis_colorbar = None)
    plot_div2 = fig2.to_html(full_html=False, include_plotlyjs=False)

    # Bar chart 1 

    westmin = pd.read_csv(westmin_path)
    fig3 = px.bar(westmin, 
                  x= "Crime Type",
                  y = "Total Count",
                  title="Westminster crime type 2023-25",
                  )
    fig3.update_layout(margin={"r":0,"t":160,"l":0,"b":60}, height = 500)
    plot_div3 = fig3.to_html(full_html = False, include_plotlyjs = False)

    # Map 2 

    theft = pd.read_csv(theftcrimescsv_path)
    fig4 = px.choropleth(
            theft,
            locations="Borough",
            geojson=ldnboroughs,
            color="Theft-related Criminal Acts",
            hover_name="Borough",
            hover_data=["Theft-related Criminal Acts"],
            title="Theft related crime 2023-25",
        )
    fig4.update_geos(fitbounds="locations", visible=False)
    fig4.update_layout(margin={"r":0,"t":100,"l":0,"b":0}, 
                       coloraxis_colorbar = None)
    plot_div4 = fig4.to_html(full_html=False, include_plotlyjs=False)

    # Map 3 

    violence = pd.read_csv(violcrimescsv_path)
    fig5 = px.choropleth(
            violence,
            locations="Borough",
            geojson=ldnboroughs,
            color="Violent Criminal Acts",
            hover_name="Borough",
            hover_data=["Violent Criminal Acts"],
            title="(Intention to perform) violent crime 2023-25",
        )
    fig5.update_geos(fitbounds="locations", visible=False)
    fig5.update_layout(margin={"r":0,"t":100,"l":0,"b":0},coloraxis_colorbar = None)
    plot_div5 = fig5.to_html(full_html=False, include_plotlyjs=False)

    # Map 4 

    dens = pd.read_csv(denscsv_path)
    fig6 = px.choropleth(
            dens,
            locations="Borough",
            geojson=ldnboroughs,
            color="Population Density/sqr km",
            hover_name="Borough",
            hover_data=["Population Density/sqr km"],
            title="Population Density/sqr km 2022",
        )
    fig6.update_geos(fitbounds="locations", visible=False)
    fig6.update_layout(margin={"r":0,"t":100,"l":0,"b":0}, coloraxis_colorbar = None)
    plot_div6 = fig6.to_html(full_html=False, include_plotlyjs=False)


    return render (request, "London/index.html", {"plot_div1": plot_div1, "plot_div2": plot_div2, "plot_div3": plot_div3,  "plot_div4": plot_div4, "plot_div5": plot_div5, "plot_div6": plot_div6})
from django import forms
import os
import pandas as pd
from django.conf import settings
categorydf= pd.read_csv(os.path.join(settings.BASE_DIR,"startup1/data/marketpopularity2024.csv"))
# Actual inputs required: seed, funding for 8 rounds, funding total final, category list (category number and google hits), year founded, year first funded, year last funded
catls = list(categorydf['Name'])
CATEGORY_CHOICES = [(index, value) for index, value in enumerate(catls)]
class Startup1Form(forms.Form):
    funding_total_final = forms.FloatField(label='Total funding')
    seed = forms.FloatField(label='Seed')
    roundA = forms.FloatField(label='Round A')
    roundB = forms.FloatField(label='Round B')
    roundC = forms.FloatField(label='Round C')
    roundD = forms.FloatField(label='Round D')
    roundE = forms.FloatField(label='Round E')
    roundF = forms.FloatField(label='Round F')
    roundG = forms.FloatField(label='Round G')
    roundH = forms.FloatField(label='Round H')
    category_list = forms.MultipleChoiceField(
        label="Pick the appropriate categories:",
        choices=CATEGORY_CHOICES,
        widget=forms.CheckboxSelectMultiple(attrs={'class': 'checkbox-group'})
    )

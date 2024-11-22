from django import forms
import os
import pandas as pd
from django.conf import settings
categorydf= pd.read_csv(os.path.join(settings.BASE_DIR,"startup1/data/marketpopularity2024.csv"))
# Actual inputs required: seed, funding for 8 rounds, funding total final, category list (category number and google hits), year founded, year first funded, year last funded
catls = list(categorydf['Name'])
CATEGORY_CHOICES = [(value, value) for  value in catls]
YEARS = [(int(year), year) for year in ['1975', '1976','1977','1978','1979','1980','1981','1982','1983','1984','1985',
         '1986','1987','1988','1989','1990','1991','1992','1993','1994','1995',
         '1996','1997','1998','1999','2000','2001','2002','2003','2004','2005',
         '2006','2007','2008','2009','2010','2011','2012','2013','2014','2015',
         '2016','2017','2018','2019','2020','2021','2022']]
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
    yearfounded = forms.CharField(
        label ="What year was the start-up founded?", 
        widget = forms.Select(choices = YEARS)
    )
    yearffunded = forms.CharField(
        label ="What year was the start-up first funded?", 
        widget = forms.Select(choices = YEARS)
    )
    yearlfunded = forms.CharField(
        label ="What year was the start-up last funded?", 
        widget = forms.Select(choices = YEARS)
    )
    category_list = forms.MultipleChoiceField(
        label="Pick the appropriate categories:",
        choices=CATEGORY_CHOICES,
        widget=forms.CheckboxSelectMultiple(attrs={'class': 'checkbox-group'})
    )
    
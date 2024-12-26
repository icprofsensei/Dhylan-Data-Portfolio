from django import forms

class dtreeForm(forms.Form):
    Nitrogen = forms.FloatField(label='Nitrogen')
    Phosphorus = forms.FloatField(label='Phosphorus')
    Potassium = forms.FloatField(label='Potassium')
    Temperature = forms.FloatField(label='Temperature')
    Humidity = forms.FloatField(label = 'Humidity')
    pH_Value = forms.FloatField(label = 'pH_Value')
    Rainfall = forms.FloatField(label = 'Rainfall')

    def __init__(self, *args, **kwargs):
        super(dtreeForm, self).__init__(*args, **kwargs)
        self.fields['Nitrogen'].widget.attrs['placeholder'] = 39
        self.fields['Phosphorus'].widget.attrs['placeholder'] = 37
        self.fields['Potassium'].widget.attrs['placeholder'] = 25
        self.fields['pH_Value'].widget.attrs['placeholder'] = 7
        self.fields['Temperature'].widget.attrs['placeholder'] = 13.3
        self.fields['Humidity'].widget.attrs['placeholder'] = 75
        self.fields['Rainfall'].widget.attrs['placeholder'] = 72.1

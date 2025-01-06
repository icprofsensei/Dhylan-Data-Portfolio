from django import forms

class skillnetworkForm(forms.Form):
    inputlayer = forms.IntegerField(label='Input Layer Neurons')
    hiddenlayer1 = forms.IntegerField(label='Hidden Layer 1 Neurons')
    hiddenlayer2 = forms.IntegerField(label='Hidden Layer 2 Neurons')
    outputlayer = forms.IntegerField(label='Output Layer Neurons')

    def __init__(self, *args, **kwargs):
        super(skillnetworkForm, self).__init__(*args, **kwargs)
        self.fields['inputlayer'].widget.attrs['placeholder'] = 3
        self.fields['hiddenlayer1'].widget.attrs['placeholder'] = 8
        self.fields['hiddenlayer2'].widget.attrs['placeholder'] = 7
        self.fields['outputlayer'].widget.attrs['placeholder'] = 2

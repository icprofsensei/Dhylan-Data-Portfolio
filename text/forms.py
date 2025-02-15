from django import forms

class TextForm(forms.Form):
    text_input = forms.CharField(
        label="Enter your text\n",
        widget=forms.Textarea(attrs={'placeholder': 'Type up to 50 words...', 'rows': 4}),
    )

    def clean_text_input(self):
        text = self.cleaned_data.get("text_input")
        word_count = len(text.split())

        if word_count > 50:
            raise forms.ValidationError("Please limit your input to 50 words.")

        return text

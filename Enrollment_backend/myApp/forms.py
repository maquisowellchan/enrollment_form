from django import forms
from .models import Enrollment

class EnrollmentForm(forms.ModelForm):
    class Meta:
        model = Enrollment
        fields = ['subjects', ...] # include other fields in the model
        widgets = {
            'subjects': forms.CheckboxSelectMultiple(choices=Enrollment.SUBJECT_CHOICES),
        }
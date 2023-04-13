from rest_framework import serializers
from .models import Enrollment

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ('firstname', 'middlename', 'lastname', 'suffix', 
                  'dateofbirth', 'gender', 'yearlevel', 'lrn', 
                  'address', 'subjects', 'emailaddress', 'contactnumber')
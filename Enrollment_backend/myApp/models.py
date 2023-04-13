from django.db import models
from multiselectfield import MultiSelectField

# Create your models here.

GENDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
]

YEARLEVEL_CHOICES = [
    ('1st Year', '1st Year'),
    ('2nd Year', '2nd Year'),
    ('3rd Year', '3rd Year'),
    ('4th Year', '4th Year'),
]

SUBJECT_CHOICES = [
    (1, 'Introduction to Computing'),
    (2, 'Computer Programming'),
    (3, 'Data Structure and Algorithm'),
    (4, 'Science Technology and Society'),
    (5, 'Networking I'),
]


class Enrollment(models.Model):
    firstname = models.CharField(max_length=50)
    middlename = models.CharField(max_length=20)
    lastname = models.CharField(max_length=50)
    suffix = models.CharField(max_length=3)
    dateofbirth = models.DateTimeField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default= "Male")
    yearlevel = models.CharField(max_length=20, choices=YEARLEVEL_CHOICES, default= "1st Year")
    lrn = models.BigIntegerField()
    address = models.CharField(max_length=50)
    subjects = MultiSelectField(choices= SUBJECT_CHOICES, max_choices=5, max_length=100)
    emailaddress = models.EmailField(max_length=50,)
    contactnumber = models.BigIntegerField()

   


from django.db import models

class Instructor(models.Model):
    MAJOR_CHOICES = [
        ('Introduction to Computing', 'Introduction to Computing'),
        ('Computer Programming', 'Computer Programming'),
        ('Data Structure and Algorithm', 'Data Structure and Algorithm'),
        ('Science Technology and Society', 'Science Technology and Society'),
        ('Networking I', 'Networking I'),
    ]
    instructorid = models.IntegerField(null=True)
    name = models.CharField(max_length=50, null=True)
    major = models.CharField(choices=MAJOR_CHOICES, max_length=50)
    contactnumber = models.IntegerField()

    def __str__(self):
        return self.name


class Subject(models.Model):
    id = models.IntegerField(primary_key=True)
    subjectcode = models.CharField(max_length=50)
    subjectname = models.CharField(max_length=50)
    instructorname = models.CharField(null=True, max_length=50)
    schedule = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.subjectname

    
class Student(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),  
        ('F', 'Female'),
    ]

    YEARLEVEL_CHOICES = [
        ('1stYear', '1st Year'),
        ('2ndYear', '2nd Year'),
        ('3rdYear', '3rd Year'),
        ('4thYear', '4th Year'),
    ]

    firstname = models.CharField(max_length=50)
    middlename = models.CharField(max_length=20)
    lastname = models.CharField(max_length=50)
    suffix = models.CharField(max_length=3, blank=True)
    dateofbirth = models.DateField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default="Male")
    yearlevel = models.CharField(max_length=20, choices=YEARLEVEL_CHOICES, default="1stYear")
    lrn = models.BigIntegerField()
    address = models.CharField(max_length=50)
    emailaddress = models.EmailField(max_length=50)
    contactnumber = models.BigIntegerField()
    subjects = models.ManyToManyField(Subject, blank=True)

    def __str__(self):
        return self.firstname + " " + self.lastname


class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollment')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True, blank=True)
    date_enrolled = models.DateTimeField(auto_now_add=True)
    instructor = models.ForeignKey(Instructor,on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.student} enrolled in {self.subject} on {self.date_enrolled}"
    

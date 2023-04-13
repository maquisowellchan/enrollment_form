from django.contrib import admin
from .models import Enrollment

class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('firstname', 'middlename', 'lastname', 'suffix', 
                  'dateofbirth', 'gender', 'yearlevel', 'lrn', 
                  'address', 'subjects', 'emailaddress', 'contactnumber')

# Register your models here.

admin.site.register(Enrollment, EnrollmentAdmin)
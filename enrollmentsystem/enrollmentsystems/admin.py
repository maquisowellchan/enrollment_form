from django.contrib import admin
from .models import Subject, Student, Enrollment, Instructor

admin.site.register(Instructor)
admin.site.register(Subject)
admin.site.register(Student)
admin.site.register(Enrollment)
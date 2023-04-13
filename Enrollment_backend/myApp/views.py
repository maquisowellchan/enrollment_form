from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EnrollmentSerializer
from .models import Enrollment
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from myApp.models import Enrollment
import json

# Create your views here.

class EnrollmentView(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    queryset = Enrollment.objects.all()

def my_view(request):
    data = {
        'foo': 'bar',
    }
    response = Response(data)
    response['Access-Control-Allow-Origin'] = '*'
    return response

@csrf_exempt
def add_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        subjects = json.loads(data['subjects'])
        firstname = request.POST.get('firstname')
        middlename = request.POST.get('middlename')
        lastname = request.POST.get('lastname')
        suffix = request.POST.get('suffix')
        dateofbirth = request.POST.get('dateofbirth')
        gender = request.POST.get('gender')
        yearlevel = request.POST.get('yearlevel')
        lrn = request.POST.get('lrn')
        address = request.POST.get('address')
        subjects = request.POST.get('subjects')
        emailaddress = request.POST.get('emailaddress')
        contactnumber = request.POST.get('contactnumber')
        user = Enrollment(firstname=firstname, middlename=middlename, lastname=lastname, 
                             suffix=suffix, dateofbirth=dateofbirth, gender=gender,yearlevel=yearlevel,
                          lrn=lrn,address=address,subjects=subjects,emailaddress=emailaddress,contactnumber=contactnumber)
        user.save()
        return JsonResponse({'message': 'User added successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
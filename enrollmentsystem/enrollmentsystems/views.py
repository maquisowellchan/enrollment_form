from rest_framework import generics
from .models import Student, Subject, Enrollment, Instructor
from .serializers import StudentSerializer, SubjectSerializer, EnrollmentSerializer,YearLevelCountSerializer, StudentCountSerializer, GenderCountSerializer, InstructorSerializer, SubjectCountSerializer, OverallSubjectCountSerializer, InstructorCountSerializer
from django.db.models import Count
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from django.db.models.functions import Coalesce
from rest_framework.views import APIView
from rest_framework import status
import json
from django.db.models import Count
from rest_framework.parsers import JSONParser


class SubjectDeleteView(generics.DestroyAPIView):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()


class InstructorListCreateView(generics.ListCreateAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

def delete_student(request, id):
    try:
        student = Student.objects.get(id=id)
        student.delete()
        return JsonResponse({'success': True})
    except Student.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Student does not exist'})


def update_student(request, pk):
    student = Student.objects.get(pk=pk)
    student.firstname = request.POST.get('firstname', student.firstname)
    student.middlename = request.POST.get('middlename', student.middlename)
    student.lastname = request.POST.get('lastname', student.lastname)
    student.suffix = request.POST.get('suffix', student.suffix)
    student.dateofbirth = request.POST.get('dateofbirth', student.dateofbirth)
    student.gender = request.POST.get('gender', student.gender)
    student.yearlevel = request.POST.get('yearlevel', student.yearlevel)
    student.lrn = request.POST.get('lrn', student.lrn)
    student.address = request.POST.get('address', student.address)
    student.emailaddress = request.POST.get('emailaddress', student.emailaddress)
    student.contactnumber = request.POST.get('contactnumber', student.contactnumber)
    student.save()
    return JsonResponse({'message': 'Student updated successfully'})


class EnrolledStudentsCountView(generics.ListAPIView):
    serializer_class = StudentCountSerializer

    def get_queryset(self):
        return Student.objects.all()

    def list(self, request):
        queryset = self.get_queryset().exclude(enrollment__isnull=False)
        count = queryset.count()
        serializer = self.get_serializer({"count": count})
        return Response(serializer.data)
    
class EnrolledInstructorCountView(generics.ListAPIView):
    serializer_class = InstructorCountSerializer

    def get_queryset(self):
        return Instructor.objects.all()

    def list(self, request):
        queryset = self.get_queryset().exclude(enrollment__isnull=False)
        count = queryset.count()
        serializer = self.get_serializer({"count": count})
        return Response(serializer.data)

class EnrolledSubjectsCountView(generics.ListAPIView):
    serializer_class = OverallSubjectCountSerializer

    def get_queryset(self):
        return Subject.objects.all()

    def list(self, request):
        queryset = self.get_queryset().exclude(enrollment__isnull=False)
        count = queryset.count()
        serializer = self.get_serializer({"count": count})
        return Response(serializer.data)

class StudentYearLevelCountAPIView(APIView):
    def get(self, request):
        yearlevel_counts = Student.objects.values('yearlevel').annotate(count=Count('id'))
        serializer = YearLevelCountSerializer(yearlevel_counts, many=True)
        return Response(serializer.data)

class SubjectCountAPIView(APIView):
    def get(self, request):
        subjects = Subject.objects.all()
        counts = []
        for subject in subjects:
            count = subject.student_set.count()
            counts.append({'subjectname': subject.subjectname, 'count': count})
        return Response(counts)


    
class StudentGenderCountAPIView(APIView):
    def get(self, request):
        gender_counts = Student.objects.values('gender').annotate(count=Count('id'))
        serializer = GenderCountSerializer(gender_counts, many=True)
        return Response(serializer.data)

class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'pk'


class SubjectListCreateView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    


class SubjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    lookup_field = 'id'


class EnrollmentListCreateView(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer


class EnrollmentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer


class InstructorRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    lookup_field = 'id'

    
class SubjectUpdateView(generics.UpdateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    lookup_field = 'id'


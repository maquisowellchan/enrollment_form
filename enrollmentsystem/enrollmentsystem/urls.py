from django.contrib import admin
from enrollmentsystems import views
from rest_framework import routers
from django.urls import path, include
from enrollmentsystems.views import (
StudentListCreateView,
StudentRetrieveUpdateDestroyView,
SubjectListCreateView,
SubjectRetrieveUpdateDestroyView,
EnrollmentListCreateView,
EnrollmentRetrieveUpdateDestroyView, StudentYearLevelCountAPIView, EnrolledStudentsCountView,
StudentGenderCountAPIView, update_student, delete_student, InstructorListCreateView,SubjectCountAPIView,EnrolledSubjectsCountView, 
InstructorRetrieveUpdateDestroyView, EnrolledInstructorCountView, SubjectUpdateView,
)





urlpatterns = [
path('students/', StudentListCreateView.as_view(), name='student_list_create'),
path('students/<int:pk>/', StudentRetrieveUpdateDestroyView.as_view(), name='student_retrieve_update_destroy'),
path('enrollments/', EnrollmentListCreateView.as_view(), name='enrollment_list_create'),
path('enrollments/int:pk/', EnrollmentRetrieveUpdateDestroyView.as_view(), name='enrollment_retrieve_update_destroy'),
path('admin/', admin.site.urls),
path('yearlevel-count/', StudentYearLevelCountAPIView.as_view(), name='yearlevel_count'),
path('students/count/', EnrolledStudentsCountView.as_view(), name='enrollment_count'),
path('gender-count/', StudentGenderCountAPIView.as_view(), name='yearlevel_count'),
path('delete-student/<int:id>/', views.delete_student, name='delete_student'),
path('instructors/', InstructorListCreateView.as_view(), name='create_instructor'),
path('subjects/', SubjectListCreateView.as_view(), name='subject-list-create'),
path('subjects/<int:id>/', SubjectUpdateView.as_view(), name='subject-retrieve-update-delete'),
path('subjects/update/<int:id>/', SubjectRetrieveUpdateDestroyView.as_view(), name='subject-detail'),
path('everysubject/count/', SubjectCountAPIView.as_view(), name='subjectname_count'),
path('subjects/count/', EnrolledSubjectsCountView.as_view(), name='subjectname_count'),
path('instructor/<int:id>/', InstructorRetrieveUpdateDestroyView.as_view(), name='instructor-retrieve-update-delete'),
path('instructor/count/', EnrolledInstructorCountView.as_view(), name='instructor_count'),
]
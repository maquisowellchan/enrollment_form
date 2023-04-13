from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from myApp import views
from myApp.views import add_user

router = routers.DefaultRouter()
router.register(r'enrollment', views.EnrollmentView, 'myApp')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/enrollment', add_user),
]
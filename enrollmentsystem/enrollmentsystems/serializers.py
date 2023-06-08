from rest_framework import serializers
from .models import Student, Subject, Enrollment, Instructor
from django.db.models import Count


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = '__all__'

class YearLevelCountSerializer(serializers.Serializer):
    yearlevel = serializers.CharField()
    count = serializers.IntegerField()

    def get_count(self, obj):
        return obj['count']

    class Meta:
        model = Student
        fields = ('yearlevel', 'count')

    @classmethod
    def setup_eager_loading(cls, queryset):
        queryset = queryset.annotate(yearlevel_count=Count('yearlevel')).values('yearlevel', 'yearlevel_count')
        return queryset


class StudentYearLevelCountSerializer(serializers.ModelSerializer):
    enrollment_count = YearLevelCountSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('yearlevel', 'enrollment_count')

class SubjectCountSerializer(serializers.Serializer):
    subjectname = serializers.CharField()
    count = serializers.IntegerField()

    def get_count(self, obj):
        return obj['count']

    class Meta:
        model = Subject
        fields = ('subjectname', 'count')

    @classmethod
    def setup_eager_loading(cls, queryset):
        queryset = queryset.annotate(subjectname_count=Count('subjectname')).values('subjectname', 'subjectname_count')
        return queryset


class SubjectSerializerCount(serializers.ModelSerializer):
    count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Subject
        fields = ('subjectname', 'count')

class StudentSerializerCount(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'firstname', 'lastname', 'subjects')


class StudentCountSerializer(serializers.Serializer):
    count = serializers.IntegerField()

    def to_representation(self, instance):
        return instance

    def create(self, validated_data):
        return validated_data.get("count")

class OverallSubjectCountSerializer(serializers.Serializer):
    count = serializers.IntegerField()

    def to_representation(self, instance):
        return instance

    def create(self, validated_data):
        return validated_data.get("count")

class GenderCountSerializer(serializers.Serializer):
    gender = serializers.CharField()
    count = serializers.IntegerField()

    def get_count(self, obj):
        return obj['count']

    class Meta:
        model = Student
        fields = ('gender', 'count')

    @classmethod
    def setup_eager_loading(cls, queryset):
        queryset = queryset.annotate(gender_count=Count('gender')).values('gender', 'gender_count')
        return queryset


class StudentGenderCountSerializer(serializers.ModelSerializer):
    enrollment_count = YearLevelCountSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ('gender', 'gender_count')


class InstructorCountSerializer(serializers.Serializer):
    count = serializers.IntegerField()

    def to_representation(self, instance):
        return instance

    def create(self, validated_data):
        return validated_data.get("count")
    


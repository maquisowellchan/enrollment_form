# Generated by Django 4.1.7 on 2023-03-09 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0003_alter_enrollment_subjects_alter_enrollment_suffix'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enrollment',
            name='suffix',
            field=models.CharField(max_length=5),
        ),
    ]

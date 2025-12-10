from django.db import models
from django.contrib.auth.models import User, AbstractUser
import datetime
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class Building(models.Model):
    id_building = models.BigAutoField(primary_key=True)
    room_count = models.IntegerField()
    building_name = models.CharField(max_length = 50)
    building_address = models.CharField(max_length=50)

    class Meta:
        db_table = "Building"

    def __str__(self):
        return self.building_name

class Classroom(models.Model):
    id_classroom = models.BigAutoField(primary_key=True)
    id_building = models.ForeignKey(Building, on_delete=models.CASCADE, db_column="id_building")
    room_number = models.IntegerField()
    capacity = models.IntegerField()

    class Meta:
        db_table = "Classroom"

    def __str__(self):
        return str(self.id_classroom)

class Department(models.Model):
    dept_name = models.CharField(max_length=50, primary_key=True)
    id_building = models.ForeignKey(Building, on_delete=models.CASCADE, db_column="id_building")
    budget = models.IntegerField()
    contact_email = models.CharField(max_length=50)

    class Meta:
        db_table = "Department"

    def __str__(self):
        return self.dept_name

class Equipment(models.Model):
    id_equipment = models.BigAutoField(primary_key=True)
    id_classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, db_column="id_classroom")
    whiteboard_count = models.IntegerField()
    projector_count = models.IntegerField()
    marker_count = models.IntegerField()
    desk = models.IntegerField()

    class Meta:
        db_table = "Equipment"

    def __str__(self):
        return str(self.id_equipment)

class Section(models.Model):
    id_section = models.BigAutoField(primary_key=True)
    id_classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, db_column="id_classroom")
    semester = models.CharField(max_length=50)
    year = models.IntegerField()
    section_number = models.IntegerField()

    class Meta:
        db_table = "Section"

    def __str__(self):
        return str(self.id_section)

class Course(models.Model):
    id_course = models.BigAutoField(primary_key=True)
    id_section = models.ForeignKey(Section, on_delete=models.CASCADE, db_column="id_section")
    dept_name = models.ForeignKey(Department, on_delete=models.CASCADE, db_column="dept_name")
    title = models.CharField(max_length=50)
    course_number = models.IntegerField()
    credits = models.IntegerField()

    class Meta:
        db_table = "Course"

    def __str__(self):
        return str(self.id_course)

class Time_Section(models.Model):
    id_time_section = models.BigAutoField(primary_key=True)
    id_section = models.ForeignKey(Section, on_delete=models.CASCADE, db_column="id_section")
    start_time = models.TimeField()
    finish_time = models.TimeField()
    duration = models.IntegerField()
    days = models.CharField(max_length=50)

    class Meta:
        db_table = "Time_Section"

    def __str__(self):
        return str(self.id_time_section)

class Blackout_Hour(models.Model):
    id_blackout_hour = models.BigAutoField(primary_key=True)
    id_classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, db_column="id_classroom")
    id_time_slot = models.ForeignKey(Time_Section, on_delete=models.CASCADE, db_column="id_time_slot")
    reason = models.CharField(max_length=50)
    effective_date = models.CharField(max_length=50)

    class Meta:
        db_table = "Blackout_Hour"

    def __str__(self):
        return str(self.id_blackout_hour)


class Classroom_Request(models.Model):
    id_classroom_request = models.BigAutoField(primary_key=True)
    id_classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, db_column="id_classroom")
    dept_name = models.ForeignKey(Department, on_delete=models.CASCADE, db_column="dept_name")
    preferred_building_id = models.IntegerField()
    preferred_start = models.TimeField()
    preferred_end = models.TimeField()
    status = models.CharField(max_length=50)
    id_course = models.ForeignKey(Course, on_delete=models.CASCADE, db_column="id_course")
    requested_whiteboards = models.IntegerField()
    requested_projectors = models.IntegerField()
    requested_markers = models.IntegerField()
    requested_desks = models.IntegerField()

    class Meta:
        db_table = "Classroom_Request"

    def __str__(self):
        return str(self.id_classroom_request)

class Conflict_Log(models.Model):
    id_conflict = models.BigAutoField(primary_key=True)
    id_classroom_request = models.ForeignKey(Classroom_Request, on_delete=models.CASCADE, db_column="id_classroom_request")
    conflict_type = models.CharField(max_length=50)
    resolution_method = models.CharField(max_length=50)
    timestamp = models.TimeField()

    class Meta:
        db_table = "Conflict_Log"

    def __str__(self):
        return str(self.id_conflict)

class User(models.Model):
    id_user = models.BigAutoField(primary_key=True)
    dept_name = models.ForeignKey(Department, on_delete=models.CASCADE, db_column="dept_name")
    name = models.CharField(max_length=50)
    credits = models.IntegerField()
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    role = models.CharField(max_length=50)
    salary = models.IntegerField()

    class Meta:
        db_table = "User"

    def __str__(self):
        return self.name
    
from django.db import models
from django.contrib.auth.models import User, AbstractUser
import datetime
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from datetime import datetime, time, timedelta

class Building(models.Model):
    id_building = models.AutoField(primary_key=True)
    room_count = models.PositiveIntegerField()
    building_name = models.CharField(max_length=45, null=True, blank=True)
    building_address = models.CharField(max_length=45, null=True, blank=True)

    class Meta:
        db_table = "Building"

    def __str__(self):
        return str(self.building_name)

class Classroom(models.Model):
    id_classroom = models.AutoField(primary_key=True)
    id_building = models.ForeignKey(Building, on_delete=models.DO_NOTHING, db_column="id_building")
    room_number = models.PositiveIntegerField()
    capacity = models.PositiveIntegerField()

    class Meta:
        db_table = "Classroom"

    def __str__(self):
        return str(self.id_classroom)

class Time_Section(models.Model):
    id_time_section = models.AutoField(primary_key=True)
    start_time = models.DateTimeField()
    finish_time = models.DateTimeField()
    duration = models.PositiveIntegerField()
    days = models.CharField(max_length=45)

    class Meta:
        db_table = "Time_Section"

    def __str__(self):
        return str(self.id_time_section)

class Department(models.Model):
    dept_name = models.CharField(max_length=45, primary_key=True)
    id_building = models.ForeignKey(Building, on_delete=models.DO_NOTHING, db_column="id_building")
    budget = models.IntegerField()
    contact_email = models.CharField(max_length=45)
    head = models.CharField(max_length=45)

    class Meta:
        db_table = "Department"

    def __str__(self):
        return self.dept_name

class Course(models.Model):
    id_course = models.AutoField(primary_key=True)
    dept_name = models.ForeignKey(Department, on_delete=models.DO_NOTHING, db_column="dept_name")
    title = models.CharField(max_length=45)
    course_code = models.CharField(max_length=45, unique=True)
    credits = models.PositiveIntegerField()

    class Meta:
        db_table = "Course"

    def __str__(self):
        return str(self.id_course)

class Section(models.Model):
    id_section = models.AutoField(primary_key=True)
    id_time_section = models.ForeignKey(Time_Section, on_delete=models.DO_NOTHING, db_column="id_time_section",
                                        null=True, blank=True)
    id_course = models.ForeignKey(Course, on_delete=models.DO_NOTHING, db_column="id_course",
                                  null=True, blank=True)
    id_classroom = models.ForeignKey(Classroom, on_delete=models.DO_NOTHING, db_column="id_classroom")
    semester = models.CharField(max_length=45)
    year = models.PositiveIntegerField()
    section_number = models.PositiveIntegerField(unique=True)
    instructor = models.CharField(max_length=45, null=True, blank=True)

    class Meta:
        db_table = "Section"

    def __str__(self):
        return str(self.id_section)

class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    dept_name = models.ForeignKey(Department, on_delete=models.DO_NOTHING, db_column="dept_name")
    name = models.CharField(max_length=45)
    credits = models.PositiveIntegerField(null=True, blank=True)
    username = models.CharField(max_length=45, unique=True)
    password = models.CharField(max_length=45)
    role = models.CharField(max_length=45)
    salary = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        db_table = "User"

    def __str__(self):
        return self.username

class Equipment(models.Model):
    id_equipment = models.AutoField(primary_key=True)
    id_classroom = models.ForeignKey(Classroom, on_delete=models.DO_NOTHING, db_column="id_classroom")
    whiteboard_count = models.PositiveIntegerField(null=True, blank=True)
    projector_count = models.PositiveIntegerField(null=True, blank=True)
    marker_count = models.PositiveIntegerField(null=True, blank=True)
    desk = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        db_table = "Equipment"

    def __str__(self):
        return str(self.id_equipment)

class Blackout_Hour(models.Model):
    id_blackout_hours = models.AutoField(primary_key=True)
    id_classroom = models.ForeignKey(Classroom, on_delete=models.DO_NOTHING, db_column="id_classroom")
    reason = models.CharField(max_length=45, null=True, blank=True)
    effective_date = models.CharField(max_length=45, null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "Blackout_Hour"

    def __str__(self):
        return str(self.id_blackout_hours)

class Classroom_Request(models.Model):
    id_classroom_request = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column="id_user")
    request_type = models.CharField(max_length=45)
    details = models.CharField(max_length=45)
    id_classroom = models.ForeignKey(Classroom, on_delete=models.DO_NOTHING, db_column="id_classroom")
    dept_name = models.ForeignKey(Department, on_delete=models.DO_NOTHING, db_column="dept_name")
    preferred_building_id = models.ForeignKey(
        Building,
        on_delete=models.DO_NOTHING,
        db_column="preferred_building_id",
        null=True,
        blank=True
    )
    status = models.CharField(max_length=45)
    requested_desks = models.PositiveIntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(null=True, blank=True)
    course_code = models.ForeignKey(
        Course,
        to_field="course_code",
        db_column="course_code",
        on_delete=models.DO_NOTHING,
        null=True,
        blank=True
    )
    id_section = models.ForeignKey(
        Section,
        on_delete=models.DO_NOTHING,
        db_column="id_section"
    )

    class Meta:
        db_table = "Classroom_Request"

    def __str__(self):
        return str(self.id_classroom_request)

class Conflict_Log(models.Model):
    id_conflict = models.AutoField(primary_key=True)
    id_classroom_request = models.ForeignKey(Classroom_Request, on_delete=models.DO_NOTHING, db_column="id_classroom_request")
    description = models.CharField(max_length=45)
    timestamp = models.DateTimeField()
    resolved = models.BooleanField()

    class Meta:
        db_table = "Conflict_Log"

    def __str__(self):
        return str(self.id_conflict)
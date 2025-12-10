import django
from django.shortcuts import get_object_or_404, render, redirect
from django.views import generic
from django.views.generic import View, ListView, DetailView
from .models import *
import os
from dotenv import load_dotenv
load_dotenv()

def index(request):
    courses = Course.objects.order_by("id_course")
    context={'courses':courses}
    return render(request, 'index.html', context)

class SectionsView(generic.DetailView):
    model = Section
    template_name = "sections.html"


def buildings(request):
    buildings = Building.objects.order_by("id_building")
    context = {'buildings':buildings}
    return render(request, 'buildings.html', context)

def classrooms(request):
    classrooms = Classroom.objects.order_by("id_classroom")
    context = {'classrooms': classrooms}
    return render(request, 'classrooms.html', context)

def departments(request):
    departments = Department.objects.order_by("dept_name")
    context = {'departments': departments}
    return render(request, 'departments.html', context)

def time_slots(request):
    time_slots = Time_Section.objects.order_by("id_time_section")
    context = {'time_slots': time_slots}
    return render(request, 'time_slots.html', context)
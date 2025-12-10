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

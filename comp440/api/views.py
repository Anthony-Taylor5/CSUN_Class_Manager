from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

@api_view(["GET"])
def test(request):
    return Response({"message": "Hello from Django!"})
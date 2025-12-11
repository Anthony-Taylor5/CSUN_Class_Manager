from django.contrib import admin
from .models import *
    
class CourseAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Department", {"fields": ["dept_name"]}),
        ("Title", {"fields": ["title"]}),
        ("Course Number", {"fields": ["course_number"]}),
        ("Credits For Taking Course", {"fields": ["credits"]}),
    ]

    list_display = ["id_course", "dept_name", "title", "course_number", "credits"]
    list_filter = ["title"]
    search_fields = ["title", "course_number"]

class BuildingAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Number of Rooms", {"fields": ["room_count"]}),
        ("Name of Building", {"fields": ["building_name"]}),
        ("Address of building", {"fields": ["building_address"]}),
    ]
    list_display = ["id_building", "room_count", "building_name", "building_address"]
    search_fields = ["id_building", "building_name"]

class ClassroomAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Building ID", {"fields": ["id_building"]}),
        ("Room Number", {"fields": ["room_number"]}),
        ("Maximum Capacity of Room", {"fields": ["capacity"]}),
    ]

    list_display = ["id_classroom", "id_building", "room_number", "capacity"]
    list_filter = ["id_building"]
    search_fields = ["id_classroom", "room_number"]

class DepartmentAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Department Name", {"fields": ["dept_name"]}),
        ("Building ID", {"fields": ["id_building"]}),
        ("Department's Budget", {"fields": ["budget"]}),
        ("Contact Email for Department", {"fields": ["contact_email"]}),
    ]

    list_display = ["dept_name", "id_building", "budget", "contact_email"]
    list_filter = ["id_building"]
    search_fields = ["dept_name", "id_building"]

class EquipmentAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Classroom ID", {"fields": ["id_classroom"]}),
        ("Amount of Whiteboards assigned to classroom", {"fields": ["whiteboard_count"]}),
        ("Amount of projectors assigned to classroom", {"fields": ["projector_count"]}),
        ("Amount of markers assigned to classroom", {"fields": ["marker_count"]}),
        ("Amount of desks assigned to classroom", {"fields": ["desk"]}),
    ]

    list_display = ["id_equipment", "id_classroom", "whiteboard_count", "projector_count", "marker_count", "desk"]
    list_filter = ["id_classroom"]
    search_fields = ["id_equipment", "id_classroom"]

class SectionAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Classroom ID", {"fields": ["id_classroom"]}),
        ("Course ID", {"fields": ["id_course"]}),
        ("Time Section", {"fields": ["id_time_section"]}),
        ("Semester in which section takes place", {"fields": ["semester"]}),
        ("Year in which section takes place", {"fields": ["year"]}),
        ("Section Number", {"fields": ["section_number"]}),
    ]

    list_display = ["id_section", "id_classroom", "semester", "year", "section_number"]
    list_filter = ["id_classroom", "semester", "year"]
    search_fields = ["id_section", "id_classroom", "section_number"]

class TimeSectionAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Start time of Class", {"fields": ["start_time"]}),
        ("Finish time of Class", {"fields": ["finish_time"]}),
        ("Duration of Class", {"fields": ["duration"]}),
        ("Which days the class takes place", {"fields": ["days"]}),
    ]

    list_display = ["id_time_section", "start_time", "finish_time", "duration", "days"]
    search_fields = ["id_time_section"]

class BlackoutHourAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Classroom ID", {"fields": ["id_classroom"]}),
        ("Time Slot", {"fields": ["id_time_slot"]}),
        ("Reason for blackout", {"fields": ["reason"]}),
        ("Which date the blackout hours occur", {"fields": ["effective_date"]}),
    ]

    list_display = ["id_blackout_hours", "id_classroom", "id_time_slot", "reason", "effective_date"]
    list_filter = ["id_classroom"]
    search_fields = ["id_blackout_hours", "id_classroom"]

class ClassroomRequestAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Classroom ID", {"fields": ["id_classroom"]}),
        ("Department Name", {"fields": ["dept_name"]}),
        ("Preferred Building", {"fields": ["preferred_building_id"]}),
        ("Preferred start time of class", {"fields": ["preferred_start"]}),
        ("Preferred end t ime of class", {"fields": ["preferred_end"]}),
        ("Status of Request", {"fields": ["status"]}),
        ("Course ID", {"fields": ["id_course"]}),
        ("Requested number of whiteboards", {"fields": ["requested_whiteboards"]}),
        ("Requested number of projectors", {"fields": ["requested_projectors"]}),
        ("Requested number of markers", {"fields": ["requested_markers"]}),
        ("Requested number of desk", {"fields": ["requested_desks"]}),
    ]

    list_display = ["id_classroom_request", "id_classroom", "dept_name", "preferred_building_id", "preferred_start", "preferred_end", "status", "id_course", "requested_whiteboards", "requested_projectors", "requested_markers", "requested_desks"]
    list_filter = ["id_classroom"]
    search_fields = ["id_classroom_request", "id_classroom"]

class ConflictLogAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Classroom Request ID", {"fields": ["id_classroom_request"]}),
        ("Type of conflict", {"fields": ["conflict_type"]}),
        ("Method used to resolve conflict", {"fields": ["resolution_method"]}),
        ("Time in which conflict occured", {"fields": ["timestamp"]})
    ]

    list_display = ["id_conflict", "id_classroom_request", "conflict_type", "resolution_method", "timestamp"]
    list_filter = ["id_classroom_request", "conflict_type"]
    search_fields = ["id_conflict", "id_classroom_request"]

class UserAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Department that user belongs to", {"fields": ["dept_name"]}),
        ("Name of user", {"fields": ["name"]}),
        ("Credits held by user if user is student", {"fields": ["credits"]}),
        ("Username", {"fields": ["username"]}),
        ("Password", {"fields": ["password"]}),
        ("Role of user", {"fields": ["role"]}),
        ("Salary of user if user is staff", {"fields": ["salary"]}),
    ]

    list_display = ["id_user", "dept_name", "name", "credits", "username", "password", "role", "salary"]
    list_filter = ["dept_name", "role"]
    search_fields = ["id_user", "name", "username"]


# Registers these models on the admin site
# admin.site.register(Course,CourseAdmin)
# admin.site.register(Building,BuildingAdmin)
# admin.site.register(Classroom,ClassroomAdmin)
# admin.site.register(Department,DepartmentAdmin)
# admin.site.register(Equipment,EquipmentAdmin)
# admin.site.register(Section,SectionAdmin)
# admin.site.register(Time_Section,TimeSectionAdmin)
# admin.site.register(Blackout_Hour,BlackoutHourAdmin)
# admin.site.register(Classroom_Request,ClassroomRequestAdmin)
# admin.site.register(Conflict_Log, ConflictLogAdmin)
# admin.site.register(User,UserAdmin)
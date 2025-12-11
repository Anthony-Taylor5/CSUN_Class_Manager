

"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { scheduledClasses, buildings, classrooms, departments } from "@/lib/placeholder-data";
import { useToast } from "@/hooks/use-toast";
import type { ScheduledClass, Building, Classroom, Department } from "@/lib/types";

const searchCategories = [
  "Buildings",
  "Classrooms",
  "Courses",
  "Departments",
  "Sections",
  "Equipment",
  "Blackout hours",
  "Requests",
  "Conflict logs",
  "Time Sections",
];

const timeSlots = [
    { label: "8:00 AM - 9:30 AM", start: 8, end: 9.5 },
    { label: "9:30 AM - 11:00 AM", start: 9.5, end: 11 },
    { label: "11:00 AM - 12:30 PM", start: 11, end: 12.5 },
    { label: "12:30 PM - 2:00 PM", start: 12.5, end: 14 },
    { label: "2:00 PM - 3:30 PM", start: 14, end: 15.5 },
    { label: "3:30 PM - 5:00 PM", start: 15.5, end: 17 },
];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("Courses");
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const getBuildingResults = (buildingList: Building[]) => buildingList.map(building => ({
        ...building,
        sections: scheduledClasses.filter(sc => {
            const classroom = classrooms.find(c => c.id === sc.classroomId);
            return classroom?.buildingId === building.id;
        })
    }));

    const getClassroomResults = (classroomList: Classroom[]) => classroomList.map(classroom => ({
        ...classroom,
        sections: scheduledClasses.filter(sc => sc.classroomId === classroom.id)
    }));
    
    const getDepartmentResults = (departmentList: Department[]) => departmentList.map(department => ({
        ...department,
        sections: scheduledClasses.filter(sc => sc.departmentName === department.name)
    }));


    if (searchCategory === "Courses") {
      const filtered = scheduledClasses.filter(
        (c) =>
          c.courseName.toLowerCase().includes(term) ||
          c.courseCode.toLowerCase().includes(term)
      );
      setResults(term ? filtered : scheduledClasses);
    } else if (searchCategory === "Sections") {
       const filtered = scheduledClasses.filter(
        (c) =>
          c.courseName.toLowerCase().includes(term) ||
          c.courseCode.toLowerCase().includes(term) ||
          c.instructorName.toLowerCase().includes(term)
      );
      setResults(term ? filtered : scheduledClasses);
    } else if (searchCategory === "Buildings") {
        if (term) {
            const filteredBuildings = buildings.filter(b => b.name.toLowerCase().includes(term));
            setResults(getBuildingResults(filteredBuildings));
        } else {
            setResults(getBuildingResults(buildings));
        }
    } else if (searchCategory === "Classrooms") {
        if (term) {
            const filteredClassrooms = classrooms.filter(c => c.name.toLowerCase().includes(term));
            setResults(getClassroomResults(filteredClassrooms));
        } else {
            setResults(getClassroomResults(classrooms));
        }
    } else if (searchCategory === 'Departments') {
        if (term) {
            const filteredDepartments = departments.filter(d => d.name.toLowerCase().includes(term));
            setResults(getDepartmentResults(filteredDepartments));
        } else {
            setResults(getDepartmentResults(departments));
        }
    } else if (searchCategory === "Time Sections") {
        const results = daysOfWeek.map(day => ({
            day,
            timeSlots: timeSlots.map(slot => {
                const classes = scheduledClasses.filter(sc => {
                    const classDate = new Date(sc.startTime);
                    const classDay = classDate.getDay();
                    const classStartHour = classDate.getHours() + classDate.getMinutes() / 60;
                    return classDay === daysOfWeek.indexOf(day) && classStartHour >= slot.start && classStartHour < slot.end;
                }).filter(c => c.courseName.toLowerCase().includes(term) || c.courseCode.toLowerCase().includes(term));
                return {
                    ...slot,
                    sections: classes
                }
            })
        }));
        setResults(results);
    }
    else {
      setResults([]);
    }
  }, [searchTerm, searchCategory]);
  
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDay = (dateString: string) => {
    return daysOfWeek[new Date(dateString).getDay()];
  }

  const addToSchedule = (course: ScheduledClass) => {
    const currentSchedule: ScheduledClass[] = JSON.parse(localStorage.getItem('userSchedule') || '[]');
    if (currentSchedule.some(c => c.id === course.id)) {
      toast({
        variant: "destructive",
        title: "Already in Schedule",
        description: `${course.courseCode} is already in your schedule.`,
      });
      return;
    }
    const newSchedule = [...currentSchedule, course];
    localStorage.setItem('userSchedule', JSON.stringify(newSchedule));
    toast({
      title: "Course Added",
      description: `${course.courseCode} has been added to your schedule.`,
    });
  };

  const renderResults = () => {
    if (results.length === 0) {
      return <p className="text-sm text-muted-foreground mt-2">No results found.</p>;
    }

    switch (searchCategory) {
      case 'Courses':
        return (
          <ul className="mt-4 space-y-4">
            {results.map((course: ScheduledClass) => (
              <li key={course.id} className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">{course.courseCode} - {course.courseName}</p>
                </div>
                <Button onClick={() => addToSchedule(course)}>Add to Schedule</Button>
              </li>
            ))}
          </ul>
        );
      case 'Sections':
        return (
            <ul className="mt-4 space-y-4">
              {results.map((course: ScheduledClass) => {
                const classroom = classrooms.find(c => c.id === course.classroomId);
                const building = classroom ? buildings.find(b => b.id === classroom.buildingId) : undefined;
                return (
                  <li key={course.id} className="p-4 border rounded-md flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{course.courseCode} - {course.courseName}</p>
                      <p className="text-sm text-muted-foreground">{course.instructorName}</p>
                      <p className="text-sm text-muted-foreground">{formatDay(course.startTime)} {formatTime(course.startTime)} - {formatTime(course.endTime)}</p>
                      <p className="text-sm text-muted-foreground">{building?.name} {classroom?.name}</p>
                    </div>
                    <Button onClick={() => addToSchedule(course)}>Add to Schedule</Button>
                  </li>
                );
              })}
            </ul>
        );
       case 'Buildings':
        return (
            <div className="mt-4 space-y-6">
                {results.map((building: Building & { sections?: ScheduledClass[] }) => (
                    <div key={building.id}>
                        <h3 className="text-lg font-semibold">{building.name}</h3>
                        {(building.sections ?? []).length > 0 ? (
                           <ul className="mt-2 space-y-2">
                                {(building.sections ?? []).map(course => {
                                     const classroom = classrooms.find(c => c.id === course.classroomId);
                                     return (
                                        <li key={course.id} className="p-3 border rounded-md flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{course.courseCode} - {course.courseName}</p>
                                                <p className="text-sm text-muted-foreground">{course.instructorName}</p>
                                                <p className="text-sm text-muted-foreground">{formatDay(course.startTime)} {formatTime(course.startTime)} - {formatTime(course.endTime)} ({classroom?.name})</p>
                                            </div>
                                            <Button size="sm" onClick={() => addToSchedule(course)}>Add</Button>
                                        </li>
                                     )
                                 })}
                           </ul>
                        ) : <p className="text-sm text-muted-foreground mt-2">No sections found for this building.</p>}
                    </div>
                ))}
            </div>
        );
        case 'Classrooms':
            return (
                <div className="mt-4 space-y-6">
                    {results.map((classroom: Classroom & { sections?: ScheduledClass[] }) => (
                        <div key={classroom.id}>
                            <h3 className="text-lg font-semibold">{classroom.name}</h3>
                            {(classroom.sections ?? []).length > 0 ? (
                               <ul className="mt-2 space-y-2">
                                    {(classroom.sections ?? []).map(course => (
                                        <li key={course.id} className="p-3 border rounded-md flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{course.courseCode} - {course.courseName}</p>
                                                <p className="text-sm text-muted-foreground">{course.instructorName}</p>
                                                <p className="text-sm text-muted-foreground">{formatDay(course.startTime)} {formatTime(course.startTime)} - {formatTime(course.endTime)}</p>
                                            </div>
                                            <Button size="sm" onClick={() => addToSchedule(course)}>Add</Button>
                                        </li>
                                    ))}
                               </ul>
                            ) : <p className="text-sm text-muted-foreground mt-2">No sections found for this classroom.</p>}
                        </div>
                    ))}
                </div>
            );
        case 'Departments':
            return (
                <div className="mt-4 space-y-6">
                    {results.map((department: Department & { sections?: ScheduledClass[] }) => (
                        <div key={department.id}>
                            <h3 className="text-lg font-semibold">{department.name}</h3>
                            {(department.sections ?? []).length > 0 ? (
                               <ul className="mt-2 space-y-2">
                                    {(department.sections ?? []).map(course => {
                                        const classroom = classrooms.find(c => c.id === course.classroomId);
                                        const building = classroom ? buildings.find(b => b.id === classroom.buildingId) : undefined;
                                        return (
                                            <li key={course.id} className="p-3 border rounded-md flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold">{course.courseCode} - {course.courseName}</p>
                                                    <p className="text-sm text-muted-foreground">{course.instructorName}</p>
                                                    <p className="text-sm text-muted-foreground">{formatDay(course.startTime)} {formatTime(course.startTime)} - {formatTime(course.endTime)} ({building?.name} {classroom?.name})</p>
                                                </div>
                                                <Button size="sm" onClick={() => addToSchedule(course)}>Add</Button>
                                            </li>
                                        );
                                    })}
                               </ul>
                            ) : <p className="text-sm text-muted-foreground mt-2">No sections found for this department.</p>}
                        </div>
                    ))}
                </div>
            );
        case 'Time Sections':
            return (
                <div className="mt-4 space-y-8">
                    {results.map(dayResult => (
                        <div key={dayResult.day}>
                            <h3 className="text-xl font-semibold border-b pb-2 mb-4">{dayResult.day}</h3>
                            {dayResult.timeSlots.filter((ts: any) => ts.sections.length > 0).length > 0 ? (
                                dayResult.timeSlots.map((slot: any) => slot.sections.length > 0 && (
                                    <div key={`${dayResult.day}-${slot.label}`} className="mb-6">
                                        <h4 className="text-md font-medium text-muted-foreground mb-2">{slot.label}</h4>
                                        <ul className="space-y-2">
                                            {slot.sections.map((course: ScheduledClass) => {
                                                const classroom = classrooms.find(c => c.id === course.classroomId);
                                                const building = classroom ? buildings.find(b => b.id === classroom.buildingId) : undefined;
                                                return (
                                                <li key={course.id} className="p-3 border rounded-md flex justify-between items-center">
                                                    <div>
                                                        <p className="font-semibold">{course.courseCode} - {course.courseName}</p>
                                                        <p className="text-sm text-muted-foreground">{course.instructorName}</p>
                                                        <p className="text-sm text-muted-foreground">{building?.name} {classroom?.name}</p>
                                                    </div>
                                                    <Button size="sm" onClick={() => addToSchedule(course)}>Add</Button>
                                                </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                ))
                            ) : <p className="text-sm text-muted-foreground">No classes scheduled for this day.</p>}
                        </div>
                    ))}
                </div>
            );

      default:
        return (
          <p className="text-sm text-muted-foreground mt-2">
            Select a category to start searching.
          </p>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">Search</h1>
        <p className="text-muted-foreground">
          Find anything across the system.
        </p>
      </div>

      <div className="border rounded-lg">
        <div className="p-6">
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-48 justify-between">
                  {searchCategory}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {searchCategories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onSelect={() => setSearchCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              type="text"
              placeholder={`Search for ${searchCategory.toLowerCase()}...`}
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      
      <div className="border rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">
            {searchTerm ? `Search Results for "${searchTerm}" in ${searchCategory}` : `All ${searchCategory}`}
          </h2>
          {renderResults()}
        </div>
      </div>
      
    </div>
  );
}

    
    

'use client';
import { useState, useEffect } from 'react';
import { scheduledClasses as initialScheduledClasses, classrooms, buildings } from "@/lib/placeholder-data";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ScheduledClass } from '@/lib/types';

export default function SchedulePage() {
  const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedSchedule = localStorage.getItem('userSchedule');
    if (storedSchedule) {
      setScheduledClasses(JSON.parse(storedSchedule));
    } else {
      setScheduledClasses(initialScheduledClasses);
    }
  }, []);

  const updateSchedule = (newSchedule: ScheduledClass[]) => {
    setScheduledClasses(newSchedule);
    localStorage.setItem('userSchedule', JSON.stringify(newSchedule));
  };
  
  const handleRemoveClass = (classId: string) => {
    const newSchedule = scheduledClasses.filter(c => c.id !== classId);
    updateSchedule(newSchedule);
     toast({
      title: "Class removed",
      description: "The class has been removed from your schedule.",
    });
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Classroom Schedule</h1>
          <p className="text-muted-foreground">
            Your weekly class schedule.
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Weekly View</h2>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-8">
            {daysOfWeek.map((day, index) => {
              const classesForDay = scheduledClasses
                .filter((c) => {
                  const classDate = new Date(c.startTime);
                  return classDate.getDay() === index;
                })
                .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

              return (
                <div key={day}>
                  <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                    {day}
                  </h3>
                  {classesForDay.length > 0 ? (
                    <ul className="space-y-4">
                      {classesForDay.map((sClass) => {
                        const classroom = classrooms.find(c => c.id === sClass.classroomId);
                        const building = classroom ? buildings.find(b => b.id === classroom.buildingId) : undefined;
                        return (
                        <li key={sClass.id} className="group relative p-4 border rounded-md hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between">
                            <div>
                                <p className="font-semibold">{sClass.courseCode} - {sClass.courseName}</p>
                                <p className="text-sm text-muted-foreground">
                                    {sClass.instructorName}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">
                                    {new Date(sClass.startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - {new Date(sClass.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {classroom?.name} {building && `(${building.name})`}
                                </p>
                            </div>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="icon" 
                            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveClass(sClass.id)}
                            aria-label="Remove class"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      )})}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No classes scheduled for this day.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

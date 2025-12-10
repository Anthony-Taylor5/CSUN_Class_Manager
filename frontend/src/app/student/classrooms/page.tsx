'use client';
import { useState } from 'react';
import { buildings, classrooms, scheduledClasses } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Classroom, ScheduledClass } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function generateTimeSlots() {  
  const slots = [];
  for (let hour = 7; hour < 22; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
}

const timeSlots = generateTimeSlots();


const ClassroomSchedule = ({ classroom, classes }: { classroom: Classroom, classes: ScheduledClass[] }) => {
    const getScheduledClassForSlot = (dayIndex: number, time: string) => {
        const [hour, minute] = time.split(':').map(Number);

        return classes.find(c => {
            const classDate = new Date(c.startTime);
            const classDay = classDate.getDay();
            
            if (classDay !== dayIndex) return false;

            const startTime = new Date(c.startTime);
            const endTime = new Date(c.endTime);

            const slotTime = new Date();
            slotTime.setHours(hour, minute, 0, 0);

            const classStartTime = new Date();
            classStartTime.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
            
            const classEndTime = new date();
            classEndTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
            
            return slotTime >= classStartTime && slotTime < classEndTime;
        });
    };

    return (
        <div className="overflow-auto max-h-[70vh]">
            <table className="w-full min-w-[1200px] border-collapse">
                <thead className="sticky top-0 bg-background">
                    <tr className="border-b">
                        <th className="p-2 border w-32">Time</th>
                        {daysOfWeek.map(day => <th key={day} className="p-2 border">{day}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map(time => (
                        <tr key={time} className="border-b">
                            <td className="p-2 border text-center text-sm font-mono">{new Date(`1970-01-01T${time}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
                            {daysOfWeek.map((day, dayIndex) => {
                                const scheduledClass = getScheduledClassForSlot(dayIndex, time);
                                return (
                                    <td key={`${day}-${time}`} className={`p-1 border h-8 ${scheduledClass ? 'bg-primary/20' : ''}`}>
                                        {scheduledClass && (
                                            <div className="text-xs p-1 bg-primary text-primary-foreground rounded-md h-full flex flex-col justify-center">
                                                <p className="font-bold">{scheduledClass.courseCode}</p>
                                                <p>{scheduledClass.courseName}</p>
                                            </div>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};


export default function ClassroomsPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

  const filteredClassrooms = classrooms
    .filter(c => selectedBuilding === 'all' || c.buildingId === selectedBuilding)
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDetailsClick = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
  };
  
  const classesForSelectedRoom = selectedClassroom ? scheduledClasses.filter(c => c.classroomId === selectedClassroom.id) : [];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-headline font-bold">Classrooms</h1>
        <p className="text-muted-foreground">View classroom details and weekly schedules.</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
            <div className="flex gap-4">
                <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                    <SelectTrigger className="w-64">
                        <SelectValue placeholder="Filter by building..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Buildings</SelectItem>
                        {buildings.map(b => (
                            <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <input
                  type="text"
                  placeholder="Search by classroom name..."
                  className="w-full p-2 border rounded"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassrooms.map(classroom => (
            <Card key={classroom.id}>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>{classroom.name}</span>
                         <Button variant="outline" size="sm" onClick={() => handleDetailsClick(classroom)}>Details</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{buildings.find(b => b.id === classroom.buildingId)?.name}</p>
                    <p className="text-sm">Capacity: {classroom.capacity}</p>
                    <div className="mt-2">
                        <h4 className="font-semibold text-sm">Equipment:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {classroom.equipment.map(e => <li key={e}>{e}</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
      {filteredClassrooms.length === 0 && <p className="text-muted-foreground">No classrooms match your criteria.</p>}
      
       <Dialog open={!!selectedClassroom} onOpenChange={(open) => !open && setSelectedClassroom(null)}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Weekly Schedule for {selectedClassroom?.name}</DialogTitle>
          </DialogHeader>
          {selectedClassroom && <ClassroomSchedule classroom={selectedClassroom} classes={classesForSelectedRoom} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

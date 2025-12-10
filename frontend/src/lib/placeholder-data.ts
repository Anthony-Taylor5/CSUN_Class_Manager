import type { User, Department, Building, Classroom, ScheduledClass, ConflictLog, Blackout, Request } from './types';

export const users: User[] = [
  { id: 'usr_1', name: 'Alice Johnson', email: 'alice.j@csun.edu', role: 'administrator', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
  { id: 'usr_2', name: 'Bob Williams', email: 'bob.w@csun.edu', role: 'secretary', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
  { id: 'usr_3', name: 'Charlie Brown', email: 'charlie.b@csun.edu', role: 'student', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
  { id: 'usr_4', name: 'Diana Miller', email: 'diana.m@csun.edu', role: 'secretary', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
  { id: 'usr_5', name: 'Ethan Davis', email: 'ethan.d@csun.edu', role: 'administrator', avatarUrl: 'https://picsum.photos/seed/user5/100/100' },
];

export const departments: Department[] = [
  { id: 'dpt_1', name: 'Computer Science', budget: 500000, contactInfo: 'cs@csun.edu', head: 'Dr. Smith' },
  { id: 'dpt_2', name: 'Mechanical Engineering', budget: 750000, contactInfo: 'me@csun.edu', head: 'Dr. Jones' },
  { id: 'dpt_3', name: 'Art', budget: 300000, contactInfo: 'art@csun.edu', head: 'Prof. Garcia' },
];

export const buildings: Building[] = [
  { id: 'bld_1', name: 'Jacaranda Hall', address: '18111 Nordhoff St, Northridge, CA', roomCount: 150 },
  { id: 'bld_2', name: 'Sierra Hall', address: '18115 Nordhoff St, Northridge, CA', roomCount: 200 },
  { id: 'bld_3', name: 'Manzanita Hall', address: '18100 Nordhoff St, Northridge, CA', roomCount: 120 },
];

export const classrooms: Classroom[] = [
  { id: 'cls_1', name: 'JD 1600', buildingId: 'bld_1', capacity: 40, equipment: ['Projector', 'Whiteboard', 'PC Lab'] },
  { id: 'cls_2', name: 'JD 2214', buildingId: 'bld_1', capacity: 35, equipment: ['Projector', 'Whiteboard'] },
  { id: 'cls_3', name: 'SH 105', buildingId: 'bld_2', capacity: 100, equipment: ['Projector', 'Lecture Hall Seating'] },
  { id: 'cls_4', name: 'SH 210', buildingId: 'bld_2', capacity: 50, equipment: ['Projector', 'Whiteboard', 'Speakers'] },
  { id: 'cls_5', name: 'MZ 101', buildingId: 'bld_3', capacity: 25, equipment: ['Easel', 'Studio Lighting'] },
];

const getDayWithTime = (dayOfWeek: number, hour: number, minute: number) => {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    const currentDay = date.getDay();
    const distance = dayOfWeek - currentDay;
    date.setDate(date.getDate() + distance);
    return date.toISOString();
}


export const scheduledClasses: ScheduledClass[] = [
  { id: 'scl_1', courseName: 'Intro to Programming', courseCode: 'COMP 110', instructorName: 'Dr. Smith', departmentName: 'Computer Science', classroomId: 'cls_1', startTime: getDayWithTime(1, 9,0), endTime: getDayWithTime(1, 10, 15) },
  { id: 'scl_2', courseName: 'Data Structures', courseCode: 'COMP 282', instructorName: 'Dr. Alan', departmentName: 'Computer Science', classroomId: 'cls_2', startTime: getDayWithTime(1, 11,0), endTime: getDayWithTime(1, 12, 15) },
  { id: 'scl_3', courseName: 'Thermodynamics', courseCode: 'ME 309', instructorName: 'Dr. Jones', departmentName: 'Mechanical Engineering', classroomId: 'cls_3', startTime: getDayWithTime(2, 13,0), endTime: getDayWithTime(2, 14, 30) },
  { id: 'scl_4', courseName: 'Drawing I', courseCode: 'ART 101', instructorName: 'Prof. Garcia', departmentName: 'Art', classroomId: 'cls_5', startTime: getDayWithTime(2, 10,0), endTime: getDayWithTime(2, 13, 0) },
  { id: 'scl_5', courseName: 'Software Engineering', courseCode: 'COMP 482', instructorName: 'Dr. Smith', departmentName: 'Computer Science', classroomId: 'cls_1', startTime: getDayWithTime(3, 14,0), endTime: getDayWithTime(3, 15, 15) },
  { id: 'scl_6', courseName: 'Senior Design', courseCode: 'ME 490', instructorName: 'Dr. Jones', departmentName: 'Mechanical Engineering', classroomId: 'cls_4', startTime: getDayWithTime(4, 9,30), endTime: getDayWithTime(4, 12, 0) },
];

export const conflictLogs: ConflictLog[] = [
    { id: 'log_1', description: 'COMP 110 in JD 1600 conflicts with maintenance schedule.', resolved: false, timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString() },
    { id: 'log_2', description: 'ART 101 in MZ 101 requests PC Lab, which is not available.', resolved: true, timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
    { id: 'log_3', description: 'Double booking for SH 105 on Tuesday at 2 PM.', resolved: false, timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString() },
];

export const blackoutHours: Blackout[] = [
    { id: 'blk_1', classroomId: 'cls_1', startTime: getDayWithTime(5, 16, 0), endTime: getDayWithTime(5, 17, 0), reason: 'Scheduled maintenance' },
    { id: 'blk_2', classroomId: 'cls_3', startTime: getDayWithTime(5, 8, 0), endTime: getDayWithTime(5, 9, 0), reason: 'Special event setup' },
];

export const requests: Request[] = [
  { 
    id: 'req_1', 
    userName: 'Diana Miller', 
    userRole: 'secretary', 
    requestType: 'Room Change', 
    details: 'Requesting to move COMP 282 to a larger room if possible.', 
    status: 'pending', 
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    courseCode: 'COMP 282',
    sectionNumber: 'scl_2',
    departmentName: 'Computer Science',
    classroomId: 'cls_2',
    requested_desks: 40,
    preferred_building_id: 'bld_1'
  },
  { 
    id: 'req_2', 
    userName: 'Diana Miller', 
    userRole: 'secretary', 
    requestType: 'Equipment', 
    details: 'Need an extra projector for a guest speaker.', 
    status: 'approved', 
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    courseCode: 'COMP 110',
    sectionNumber: 'scl_1',
    departmentName: 'Computer Science',
    classroomId: 'cls_1',
    requested_projectors: 2,
    requested_markers: 10
  },
  { 
    id: 'req_3', 
    userName: 'Diana Miller', 
    userRole: 'secretary', 
    requestType: 'New Class', 
    details: 'Requesting after-hours access to labs for COMP 482 students.', 
    status: 'denied', 
    timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    departmentName: 'Computer Science',
    courseCode: 'COMP 482',
    sectionNumber: 'scl_5',
    classroomId: 'cls_1',
    preferred_start: getDayWithTime(3, 18, 0),
    preferred_end: getDayWithTime(3, 20, 0)
  },
  { 
    id: 'req_4', 
    userName: 'Diana Miller', 
    userRole: 'secretary', 
    requestType: 'New Class', 
    details: 'Requesting a new section for COMP 380, requires a PC Lab.', 
    status: 'pending', 
    timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    courseCode: 'COMP 380',
    sectionNumber: '01',
    departmentName: 'Computer Science',
    // This one is left more empty on purpose
  },
];

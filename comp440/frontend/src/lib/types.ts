export type UserRole = "student" | "secretary" | "administrator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export interface Department {
  id: string;
  name: string;
  budget: number;
  contactInfo: string;
  head: string;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  roomCount: number;
}

export interface Classroom {
  id: string;
  name: string;
  buildingId: string;
  capacity: number;
  equipment: string[];
}

export interface ScheduledClass {
  id: string;
  courseName: string;
  courseCode: string;
  instructorName: string;
  departmentName: string;
  classroomId: string;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
}

export interface ConflictLog {
    id: string;
    description: string;
    resolved: boolean;
    timestamp: string; // ISO 8601
}

export interface Blackout {
  id: string;
  classroomId: string;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  reason: string;
}

export type RequestStatus = "pending" | "approved" | "denied";

export interface Request {
  id: string;
  userName: string;
  userRole: UserRole;
  requestType: "Room Change" | "Equipment" | "Access" | "New Class";
  details: string;
  status: RequestStatus;
  timestamp: string; // ISO 8601
  courseCode?: string;
  sectionNumber?: string;
  departmentName?: string;
  classroomId?: string;
  requested_whiteboards?: number;
  requested_projectors?: number;
  requested_markers?: number;
  requested_desks?: number;
  preferred_building_id?: string;
  preferred_start?: string; // ISO 8601
  preferred_end?: string; // ISO 8601
}

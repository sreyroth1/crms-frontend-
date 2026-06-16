export interface Student {
  id: string;
  name: string;
  classId: string;
  status?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject?: string;
}

export interface ClassItem {
  id: string;
  name: string;
  teacherId?: string;
}

export interface CleaningSchedule {
  id: string;
  name: string;
  date: string;
}

export interface CleaningTask {
  id: string;
  title: string;
  description?: string;
}

export interface Punishment {
  id: string;
  studentName: string;
  reason: string;
  status: string;
}

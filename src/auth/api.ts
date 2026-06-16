import {
  ClassItem,
  CleaningSchedule,
  CleaningTask,
  Punishment,
  Student,
  Teacher,
} from "../types";

const BASE_URL = "/api";

async function request<T>(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    },
    credentials: "include",
    ...options,
  });

  const text = await response.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const errorMessage =
      typeof data === "object"
        ? data?.message || data?.error || JSON.stringify(data)
        : data || response.statusText;
    throw new Error(errorMessage);
  }

  return data as T;
}

export async function login(email: string, password: string) {
  return request<{ token: string; user: { id: string; role: string } }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
  );
}

export async function register(
  username: string,
  name: string,
  email: string,
  password: string,
  role: string,
) {
  return request<{ token: string; user: { id: string; role: string } }>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify({ username, name, email, password, role }),
    },
  );
}

export async function fetchStudents() {
  return request<Student[]>("/students");
}

export async function fetchTeachers() {
  return request<Teacher[]>("/teachers");
}

export async function fetchClasses() {
  return request<ClassItem[]>("/classes");
}

export async function fetchCleaningSchedules() {
  return request<CleaningSchedule[]>("/cleaning/schedules");
}

export async function fetchCleaningTasks() {
  return request<CleaningTask[]>("/cleaning/tasks");
}

export async function fetchPunishments() {
  return request<Punishment[]>("/punishments");
}

export async function fetchDashboardStats() {
  return request<{ totalStudents?: number; totalTeachers?: number; totalClasses?: number; pendingPunishments?: number }>(
    "/dashboard/stats",
  );
}

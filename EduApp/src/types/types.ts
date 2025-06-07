import type React from "react";
import type { JSX } from "react";

export interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export interface SidebarItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface User {
  
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface Course {
  courseId: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  createdBy: string;
}

export interface Lesson {
  lessonId: string;
  lessonTitle: string;
  lessonCategory: string;
  lessonMaterials: string;
  lessonTutorials: string;
  lessonStartDate: string;
  lessonEndDate: string;
  createdBy: string;
  courseId: string;
}

export interface Assignment {
  assignmentId: string;
  assignmentTitle: string;
  assignmentStartDate: string;
  assignmentEndDate: string;
  assignmentMaterials: string;
  lessonId: string;
  assignmentDescription: string;
}

export interface contextType {
  selectedCategory: string;
}

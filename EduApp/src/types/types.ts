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


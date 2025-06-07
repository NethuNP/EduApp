import type { SidebarItem } from '../types/types';
import { FileText,  LayoutDashboard, UserCog } from 'lucide-react';



export const eduAdminsidebar: SidebarItem[] = [
      {label: 'Dashboard', path:'/eduAdmin/eduDashboard', icon:<LayoutDashboard />},
      {label: 'My Courses', path:'/eduAdmin/myCourses', icon:<FileText />},
      {label : 'My Account', path: '/eduAdmin/myAccount', icon: <UserCog />},
   



]
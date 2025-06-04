import type { SidebarItem } from '../types/types';
import dashboard from "../assets/icons/dashboard.png"
import courses from "../assets/icons/courses.png"



export const eduAdminsidebar: SidebarItem[] = [
      {label: 'Dashboard', path:'/eduAdmin/eduDashboard', icon:<img src={dashboard} alt="Dashboard" className="md:w-6 md:h-6 w-4 h-4 rounded-full" />},
      {label: 'My Courses', path:'/eduAdmin/myCourses', icon:<img src={courses} alt="Courses" className="md:w-6 md:h-6 w-4 h-4 rounded-full" />},
   



]
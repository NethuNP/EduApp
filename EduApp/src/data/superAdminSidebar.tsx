import type { SidebarItem } from '../types/types';
import img1 from "../assets/icons/dashboard.png"
import img2 from "../assets/icons/super-admin.png"
import img3 from "../assets/icons/students.png"
import img4 from "../assets/icons/courses.png"

export const superAdminSidebar: SidebarItem[] = [
    {label: 'Dashboard', path:'/superadmin/dashboard', icon:<img src={img1} alt="Dashboard" className="md:w-6 md:h-6 w-4 h-4 rounded-full" />},
    {label: 'Admins' , path:'/superadmin/allAdmins', icon:<img src={img2} alt="Admins" className="md:w-6 md:h-6 w-4 h-4 rounded-full" />},
    {label: 'Students', path:'/superadmin/allStudents', icon:<img src={img3} alt="Students" className="md:w-6 md:h-6 w-4 h-4 rounded-full" />},
    {label: 'Courses', path:'/superadmin/allCourses', icon:<img src={img4} alt="Courses" className="md:w-6 md:h-6 w-4 h-4 rounded-full" />},

]


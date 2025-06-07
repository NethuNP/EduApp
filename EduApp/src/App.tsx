import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import { ToastContainer } from "react-toastify";

import CreateAdmin from "./pages/superAdmin/createAdmin";
import SuperAdminLayout from "./layouts/superAdminLayout";
import Dashboard from "./pages/superAdmin/dashboard";
import AllAdmins from "./pages/superAdmin/allAdmins";
import AllStudents from "./pages/superAdmin/allStudents";
import AllCourses from "./pages/superAdmin/allCourses";

import EduAdminLayout from "./layouts/eduAdminLayout";
import EduDashboard from "./pages/eduAdmin/eduDashboard";
import MyCourses from "./pages/eduAdmin/myCourses";
import CreateCourse from "./pages/eduAdmin/createCourse";
import ViewCourse from "./pages/eduAdmin/viewCourse";
import CreateLesson from "./pages/eduAdmin/createLesson";
import CreateAssignment from "./pages/eduAdmin/createAssignment";

import StudentLayout from "./layouts/studentLayout";
import StudentDashboard from "./pages/student/stuDashboard";
import StudentMyCourses from "./pages/student/stuMycourses";
import CourseContent from "./pages/student/stuCoursecontent";
import StudentLessons from "./pages/student/stuLessons";
import LessonContent from "./pages/student/stuLessonContent";

import { ProtectedRoute } from "./components/protectedRoutes";
import ViewLesson from "./pages/eduAdmin/viewLessons";
import { Home } from "lucide-react";
import ViewAssignment from "./pages/eduAdmin/viewAssignment";
import MyAccount from "./components/myProfile";

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Super Admin Routes */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute allowedRoles={["superAdmin"]}>
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="createAdmin" element={<CreateAdmin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="allAdmins" element={<AllAdmins />} />
          <Route path="allStudents" element={<AllStudents />} />
          <Route path="allCourses" element={<AllCourses />} />
        </Route>

        {/* Education Admin Routes */}
        <Route
          path="/eduAdmin"
          element={
            <ProtectedRoute allowedRoles={["eduAdmin"]}>
              <EduAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="eduDashboard" element={<EduDashboard />} />
          <Route path="myCourses" element={<MyCourses />} />
          <Route path="myAccount" element ={<MyAccount/>} />
          <Route path="createCourse" element={<CreateCourse />} />
          <Route path="myCourses/:id" element={<ViewCourse />} />
          <Route
            path="myCourses/:id/lessons/:lessonId"
            element={<ViewLesson />}
          />
          <Route path="myCourses/:id/lessons/:lessonId/assignments/:assignmentId" element= {<ViewAssignment/>}/>
          <Route path="myCourses/:id/lessons" element={<CreateLesson />} />
          <Route
            path="myCourses/:id/lessons/:lessonId/assignments"
            element={<CreateAssignment />}
          />
          <Route path="enrollments" element={<AllStudents />} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="stuDashboard" element={<StudentDashboard />} />
          <Route path="stuMycourses" element={<StudentMyCourses />} />
          <Route path="home" element={<Home />} />
          <Route path="stuMycourses/:courseId" element={<CourseContent />} />
          <Route
            path="stuMycourses/:courseId/lessons/:lessonId"
            element={<StudentLessons />}
          />
          <Route
            path="stuMycourses/:courseId/lessons/:lessonId/content/:contentId"
            element={<LessonContent />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

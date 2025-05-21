import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import { ToastContainer } from "react-toastify";
import  CreateAdmin  from "./pages/superAdmin/createAdmin";
import SuperAdminLayout from "./layouts/superAdminLayout";
import Dashboard from "./pages/superAdmin/dashboard";
import AllAdmins from "./pages/superAdmin/allAdmins";
import AllStudents from "./pages/superAdmin/allStudents";
import AllCourses from "./pages/superAdmin/allCourses";

function App() {
  return (
  <> <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>}/>
      <Route path= "/signup" element={<Register/>}/>
      

      <Route path="/super" element={<SuperAdminLayout/>}>
      <Route path="createAdmin" element={<CreateAdmin/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="allAdmins" element ={<AllAdmins/>}/>
      <Route path="allStudents" element ={<AllStudents/>}/>
      <Route path="allCourses" element={<AllCourses/>}/>
      </Route>
    </Routes>
    <ToastContainer/> </>

  );
}

export default App;

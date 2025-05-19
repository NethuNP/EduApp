import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import { ToastContainer } from "react-toastify";
import SuperAdmin from "./pages/superAdmin";

function App() {
  return (
  <> <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>}/>
      <Route path= "/signup" element={<Register/>}/>
      <Route path="/super" element={<SuperAdmin/>}/>
    </Routes>
    <ToastContainer/> </>

  );
}

export default App;

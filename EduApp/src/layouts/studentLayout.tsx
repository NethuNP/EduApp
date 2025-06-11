import React from "react";
import Sidebar from "../components/sideBar";
import { studentSidebar } from "../data/studentSidebar";
import { Outlet } from "react-router-dom";
import user from "../assets/icons/user.png";
import { useAuth } from "../context/authContext";

const StudentLayout: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar items={studentSidebar} title="Student" />
      <main className="flex-1 flex flex-col">
        {/*  Header */}
        <div className="md:h-[200px] h-[150px] bg-[#309898] text-white font-semibold rounded-b-3xl flex items-center px-6 md:text-lg text-sm justify-end">

          <div className="flex items-end justify-end text-end text-white md:text-lg text-sm">
            <img
              src={user}
              alt="User"
              className="md:w-6 md:h-6 w-4 h-4 rounded-full mr-2"
            />
            Welcome {currentUser ? currentUser.firstName : ""}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;

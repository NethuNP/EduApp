import React from "react";
import Sidebar from "../components/sideBar";
import { eduAdminsidebar } from "../data/eduAdminSidebar";
import { Outlet } from "react-router-dom";
import user from "../assets/icons/user.png";
import { useAuth } from "../context/authContext";

const EduAdminLayout: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <div className="flex h-screen">
      <Sidebar items={eduAdminsidebar} title="Edu Admin" />
      <main className="flex-1">
        <div className="md:h-[200px] h-[150px] bg-[#309898] text-white font-bold text-xl rounded-b-3xl bg-fixed">
          <div className="flex items-center justify-end mr-6 h-full px-6 font-normal md:text-lg text-sm ">
            <img
              src={user}
              alt="User"
              className="md:w-6 md:h-6 w-4 h-4 rounded-full mr-2 "
            />
            Welcome {currentUser ? currentUser.firstName : ""}
          </div>
        </div>
        <div className="-mt-16 px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default EduAdminLayout;

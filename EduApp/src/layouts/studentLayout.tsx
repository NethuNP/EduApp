import React, { useState } from "react";
import Sidebar from "../components/sideBar";
import { studentSidebar } from "../data/studentSidebar";
import { Outlet } from "react-router-dom";
import user from "../assets/icons/user.png";
import { useAuth } from "../context/authContext";

const StudentLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const [selected, setSelected] = useState("Certificate");
  const categories = ["Certificate", "Diploma", "Degree"];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar items={studentSidebar} title="Student" />
      <main className="flex-1 flex flex-col">
        {/*  Header */}
        <div className="md:h-[200px] h-[150px] bg-[#309898] text-white font-semibold rounded-b-3xl flex items-center px-6 md:text-lg text-sm justify-between">
          <div className="flex justify-start items-start mb-6">
            <div className="flex rounded-full bg-[#e6f7f7] p-1 shadow-inner">
              {categories.map((label) => (
                <button
                  key={label}
                  onClick={() => setSelected(label)}
                  className={`px-4 py-2 text-xs md:text-sm lg:text-base rounded-full transition-all font-medium ${
                    selected === label
                      ? "bg-[#309898] text-white shadow cursor-pointer"
                      : "text-[#309898] hover:bg-[#dff5f5] cursor-pointer"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex text-end text-white md:text-lg text-sm">
            <img
              src={user}
              alt="User"
              className="md:w-6 md:h-6 w-4 h-4 rounded-full mr-2"
            />
            Welcome {currentUser ? currentUser.firstName : ""}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;

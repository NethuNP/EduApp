import React, { useState } from "react";
import Sidebar from "../components/sideBar";
import { superAdminSidebar } from "../data/superAdminSidebar";
import { Outlet } from "react-router-dom";
import user from "../assets/icons/user.png";
import { useAuth } from "../context/authContext";
import { BookText, Menu, ShieldUser, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

const SuperAdminLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenu = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "#" },
    { label: "Admins", icon: <ShieldUser />, path: "#" },
    { label: "Students", icon: <Users />, path: "#" },
    { label: "Courses", icon: <BookText />, path: "#" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block  bg-white shadow-lg">
        <Sidebar items={superAdminSidebar} title="Super Admin" />
      </div>

      {/* Mobile Slide Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-2xl rounded-r-2xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* <div className="flex items-center justify-between px-4 py-3 border-b text-teal-500">
                <span className="text-lg font-semibold">Welcome</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div> */}
              <ul className="flex flex-col mt-10  text-teal-400">
                {mobileMenu.map((item, index) => (
                  <li
                    key={index}
                    className="px-5 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {" "}
                    <div className="flex gap-4">
                      {item.icon}
                      {item.label}{" "}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="md:h-[200px] h-[150px] bg-[#309898] text-white font-bold text-xl rounded-b-3xl shadow-md">
          <div className="flex items-center justify-between h-full px-6 font-normal md:text-lg text-sm">
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:block" />

            {/* User Info */}
            <div className="flex items-center space-x-2">
              <img
                src={user}
                alt="User"
                className="md:w-8 md:h-8 w-6 h-6 rounded-full"
              />
              <span>
                Welcome {currentUser ? currentUser.firstName : "Guest"}
              </span>
            </div>
          </div>
        </div>

        {/* Routed Page Content */}
        <div className="-mt-16 px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLayout;

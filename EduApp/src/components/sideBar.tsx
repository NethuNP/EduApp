import type { SidebarItem } from "../types/types";
import logout from "../assets/icons/logout.png";
import { signOutUser } from "../lib/userController";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  items: SidebarItem[];
  icon?: React.ReactNode;
  title: string;
}

const SideBar: React.FC<SideBarProps> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="min-h-screen flex-col items-center bg-[#309898] md:block hidden ">
        <div className="flex flex-col items-center bg-[#ffffff] w-full h-[750px] rounded-b-3xl">
          <div className="flex flex-col items-center justify-center">
            <ul className="flex flex-col gap-4 font-semibold text-[#6B7C93] mt-20">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 py-4 px-10 rounded-lg cursor-pointer relative group hover:bg-[#f0fdfa]"
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#309898] rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
                  <a href={item.path} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>{" "}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="flex items-center justify-center text-white md:mt-8 cursor-pointer"
          onClick={() => {
            signOutUser();
            navigate("/");
          }}
        >
          <img
            src={logout}
            alt="Logout"
            className="md:w-6 md:h-6 w-4 h-4 rounded-full  mr-2"
          />{" "}
          Logout
        </div>
      </div>
    </div>
  );
};

export default SideBar;

import students from "../../assets/icons/student.png";
import course from "../../assets/icons/doc.png";
import admin from "../../assets/icons/admin.png";
import { UserRoundPlus, UserRoundX } from "lucide-react";
import { useEffect, useState } from "react";
import { getCourseCount } from "../../lib/courseController";
import { getStudentCount } from "../../lib/userController";
import { getAdminCount } from "../../lib/userController";

function Dashboard() {
  const [courseCount, setCourseCount] = useState(0);
  const [studentsCount, setStudentCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    const fetchInfo = async () => {
      setCourseCount(await getCourseCount());
      setStudentCount(await getStudentCount());
      setAdminCount(await getAdminCount());
    };
    fetchInfo();
  }, []);

  const data = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      status: "Pending",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      status: "Pending",
    },
    {
      firstName: "Johne",
      lastName: "Smith",
      email: "johne.smith@example.com",
      status: "Pending",
    },
    {
      firstName: "Johne",
      lastName: "Smith",
      email: "johne.smith@example.com",
      status: "Pending",
    },
  ];
  const stats = [
    { label: "Total Courses", value: courseCount, icon: course },
    { label: "Total Students", value: studentsCount, icon: students },
    { label: "Total Admins", value: adminCount, icon: admin },
    { label: "Total Students", value: 3356, icon: students },
  ];

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 md:p-7 flex flex-col items-center text-center hover:shadow-sm transition-all duration-300 hover:scale-105 border border-teal-100"
          >
            <div className="bg-teal-50 p-3 md:p-4 rounded-full mb-3">
              <img
                src={stat.icon}
                alt={stat.label}
                className="w-6 h-6 md:w-10 md:h-10 text-teal-600"
              />
            </div>
            <div className="text-xl md:text-3xl font-bold text-teal-700 ">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-teal-500 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full  rounded-xl mt-4 md:mt-8 text-[#309898]">
        <div className="flex justify-between ">
          <h2 className="text-lg md:text-2xl font-semibold mb-4">
            User Approvals
          </h2>
          <div className="hover:underline cursor-pointer hover:font-semibold">
            View All
          </div>
        </div>
        <div className="space-y-4 text-[#6B7C93]">
          {data.map((user, index) => (
            <div
              key={index}
              className="flex flex-wrap md:flex-nowrap justify-between items-center  border-[#D9E2EC] rounded-2xl  border-b pb-2 text-xs md:text-base p-4 md:p-6 bg-white"
            >
              <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items-start">
                {user.firstName}
                {user.lastName}
              </div>
              <div className="w-full lg:w-1/4  md:w-2/3  flex md:items-center md:justify-center justify-start items md:mt-0 mt-2">
                {user.email}
              </div>
              <div className="w-full lg:w-1/4  md:w-2/3   flex md:items-center md:justify-center justify-start items ">
                <button className="md:px-4 px-2 text-yellow-600 bg-yellow-100 rounded-2xl mt-2 md:mt-0">
                  {user.status}
                </button>
              </div>
              <div className="w-full lg:w-1/4  md:w-2/3  flex items-end justify-end md:items-center md:justify-center md:space-x-4 space-x-2">
                <button>
                  {" "}
                  <UserRoundPlus className="text-[#309898] cursor-pointer md:w-6 md:h-6 w-4 h-4 transition duration-300  hover:scale-120 md:mt-0 -mt-12" />
                </button>
                <button>
                  <UserRoundX className="text-red-700 cursor-pointer md:w-6 md:h-6 w-4 h-4 transition duration-300  hover:scale-120 md:mt-0 -mt-12" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { UserRoundPlus, UserRoundX } from "lucide-react";

function EduDashboard() {
  const data = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      courseName: "Maths",
      status: "Pending",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      courseName: "English",
      email: "jane.smith@example.com",
      status: "Pending",
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-md lg:p-10 p-4">
      <div className="w-full overflow-x-auto">
        <div className="w-full  rounded-xl mt-4">
          <h2 className="text-[#309898] text-lg md:text-2xl font-semibold mb-4">
            Course Enrollments
          </h2>
          <div className="space-y-4 text-[#6B7C93]">
            {data.map((user, index) => (
              <div
                key={index}
                className="flex flex-wrap md:flex-nowrap justify-between items-center  border-[#D9E2EC] rounded-2xl  border-b pb-2 text-xs md:text-base  bg-white md:gap-4"
              >
                <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items-start">
                  {user.firstName}
                  {user.lastName}
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3 flex md:items-center md:justify-center justify-start items">
                  {user.email}
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3 flex md:items-center md:justify-center justify-start items">
                  {user.courseName}
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3  flex md:items-center md:justify-center justify-start items ">
                  <button className="md:px-4 px-2 text-yellow-600 bg-yellow-100 rounded-2xl mt-2 md:mt-0">
                    {user.status}
                  </button>
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3 flex items-end justify-end md:items-center md:justify-center md:space-x-4 space-x-2">
                  <button>
                    <UserRoundPlus className="cursor-pointer md:w-6 md:h-6 w-4 h-4 text-[#309898] transition duration-300  hover:scale-120"/>
                  </button>
                  <button>
                    <UserRoundX className="cursor-pointer md:w-6 md:h-6 w-4 h-4 text-red-700 transition duration-300  hover:scale-120"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EduDashboard;

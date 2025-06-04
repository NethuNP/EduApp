import { useEffect, useState } from "react";
import type { User } from "../../types/types";
import { getAllStudents } from "../../lib/userController";

const AllStudents: React.FC = () => {
  const [student, setStudent] = useState<User[]>([]);

  useEffect(() => {
    getAllStudents(setStudent);
  }, []);

  return (
    <div>
      <div className="w-full bg-white rounded-lg md:p-10 p-4">
        <div className="w-full  rounded-xl">
          <h2 className="text-[#309898] text-lg md:text-2xl font-semibold mb-4">
            All Students
          </h2>
          <div className=" bg-teal-50 text-gray-500 md:py-2 py-1 justify-between rounded-xl md:flex hidden">
          <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items-start">Name</div>
          <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items">Contact</div>
          <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items">Email</div>
        </div>
          <div className="space-y-4 text-[#6B7C93]">
            {student.map((user, index) => (
              <div
                key={index}
                className="flex flex-wrap md:flex-nowrap justify-between items-center  border-[#D9E2EC] rounded-2xl   border-b  text-xs md:text-base  md:p-4 bg-white"
              >
                <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items-start">
                  {user.firstName}{" "}{user.lastName}
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3 flex md:items-center md:justify-center justify-start items">
                  {user.contact}
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3 flex md:items-center md:justify-center justify-start items">
                  {user.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllStudents;

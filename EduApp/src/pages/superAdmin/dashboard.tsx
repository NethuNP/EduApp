import arrow from "../../assets/icons/arrow.png";
import students from "../../assets/icons/student.png";
import course from "../../assets/icons/doc.png";
import admin from "../../assets/icons/admin.png";

function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-4 md:text-xl text-sm font-semibold text-[#309898]">
        <div className="bg-white w-full h-auto rounded-lg md:p-6 p-4 grid grid-cols-2  items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src={course}
              alt="course"
              className="md:w-12 md:h-12 w-10 h-10"
            />
          </div>
          <div className="text-center md:text-2xl text-sm font-semibold">
           124
            <div className="flex items-center justify-center md:mt-2 md:text-lg text-sm text-[#6B7C93] font-normal">
              Total Courses
            </div>
          </div>
        </div>
        <div className="bg-white w-full h-auto rounded-lg md:p-6 p-4 grid grid-cols-2  items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src={students}
              alt="Document"
              className="md:w-16 md:h-16 w-10 h-10 rounded-full"
            />
          </div>
          <div className="text-center md:text-3xl text-sm font-semibold">
            3356
            <div className="flex items-center justify-center md:mt-2 md:text-lg text-sm text-[#6B7C93] font-normal">
              Total Students
            </div>
          </div>
        </div>
        <div className="bg-white w-full h-auto rounded-lg md:p-6 p-4 grid grid-cols-2  items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src={admin}
              alt="Document"
              className="md:w-16 md:h-16 w-10 h-10 rounded-full"
            />
          </div>
          <div className="text-center md:text-3xl text-sm font-semibold">
            150
            <div className="flex items-center justify-center md:mt-2 md:text-lg text-sm text-[#6B7C93] font-normal">
              Total Admins
            </div>
          </div>
        </div>

        <div className="bg-white w-full h-auto rounded-lg md:p-6 p-4 grid grid-cols-2  items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src={students}
              alt="Document"
              className="md:w-16 md:h-16 w-10 h-10 rounded-full"
            />
          </div>
          <div className="text-center md:text-3xl text-sm font-semibold">
            3356
            <div className="flex items-center justify-center md:mt-2 md:text-lg text-sm text-[#6B7C93] font-normal">
              Total Students
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white mt-10 rounded-lg md:p-6 p-4 text-[#309898] font-semibold md:text-xl text-sm">
        <div>Approve Students</div>
        <div className="flex items-end justify-end md:mt-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="text-[#309898] font-normal  text-sm">Show All</div>
            <img src={arrow} alt="arrow" className="md:w-6 md:h-6 w-4 h-4" />
          </div>
        </div>
        <table className="w-full mt-4 border border-[#D9E2EC] rounded-lg">
          <thead>
            <tr>
              <th className="md:text-lg text-sm text-[#6B7C93] font-semibold">
                Name
              </th>
              <th className="md:text-lg text-sm text-[#6B7C93] font-semibold">
                Email
              </th>
              <th className="md:text-lg text-sm text-[#6B7C93] font-semibold">
                Contact
              </th>
              <th className="md:text-lg text-sm text-[#6B7C93] font-semibold">
                Status
              </th>
              <th className="md:text-lg text-sm text-[#6B7C93] font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;

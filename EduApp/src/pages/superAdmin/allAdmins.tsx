import { useNavigate } from "react-router-dom"

function AllAdmins() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full bg-white rounded-lg md:p-10 p-4">
        <div className="flex items-end justify-end">
          <button className="bg-[#309898] hover:bg-[#00796B] text-white md:text-lg text-sm md:px-4 md:py-2 px-2 py-1 rounded-lg font-semibold cursor-pointer"
          
          onClick={() => navigate("/super/createAdmin")}>
            New Admin +

          </button>
        </div>
        <div className="md:text-2xl text-sm font-semibold text-[#309898] ">All Admins</div>
        <div>
          <table className="w-full mt-4 text-[#6B7C93] border border-[#D9E2EC] md:text-lg text-sm">
            <thead>
              <tr>
                <th className="py-2">First Name </th>
                <th className="py-2">Last Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Contact</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllAdmins;

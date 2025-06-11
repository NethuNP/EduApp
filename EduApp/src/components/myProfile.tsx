import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { getCurrentUserDetails } from "../lib/userController";
import type { User } from "../types/types";
import Loader from "./loader";
import { SubmitButton } from "./button";

function MyAccount() {
  const [user, setUser] = useState<User | null>(null);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userData = await getCurrentUserDetails(userId);
        setUser(userData as User);
      }
    };

    fetchUser();
  }, [userId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div className="bg-white items-center justify-center container mx-auto h-auto rounded-lg md:p-10 p-4">
      <div>
        <h2 className="text-2xl font-bold md:text-start text-center text-[#309898]">My Account</h2>

        <div className="flex items-center justify-center md:mt-2 mt-4">
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] bg-[#D9F0F0] rounded-full flex items-center justify-center text-teal-600">
              {/* <img
                src={"/" }
                alt="Profile"
                className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] rounded-full"
              /> */}
              Upload
            </div>
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-6 mt-4">
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={user.firstName}
                  className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#309898] md:mt-4 mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 md:mt-6 mt-4">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#309898] md:mt-4 mt-2"
                />
              </div>
              
            </div>
            <div>
              <div className="">
                <label className="block text-sm font-medium text-gray-600 ">
                  Last Name
                </label>
                <input
                  type="text"
                  value={user.lastName}
                  className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#309898] md:mt-4 mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 md:mt-6 mt-4">
                  Contact
                </label>
                <input
                  type="text"
                  value={user.contact}
                  className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#309898] md:mt-4 mt-2"
                />
              </div>
            </div>

            </div>
      
        ) : (
          <Loader />
        )}
      </div>
      <div>
        <SubmitButton/>
      </div>
    </div>
  );
}

export default MyAccount;

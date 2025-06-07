import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { getAllUsers, getCurrentUserDetails } from "../lib/userController";
import type {User} from "../types/types";
import { Field } from "formik";

function MyAccount() {
  const [user , setUser] = useState <User[]>([]);
  const userId = auth.currentUser?.uid;
  

  console.log(userId)
  useEffect(() => {
  const getUsers = async () => {
    if (userId) {
      const userData = await getCurrentUserDetails(userId);
      if (userData) {
        setUser([userData]);
      } else {
        setUser([]); 
      }
    }
  };
  getUsers();
}, [userId]);
  return (
    <div className="bg-white items-center justify-center container mx-auto h-auto rounded-lg md:p-10 p-4">
      <div className="flex items-center justify-center font-semibold text-[#309898] md:text-xl text-sm">
        My Profile
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div>
          
          <div className="flex items-start justify-center font-semibold text-[#309898] md:text-lg text-sm">
           {user.map((user) => (
            <div key={user.uid}>
             <div className="flex"> 
                <label>User Name  </label>
                <input
                  type="text"
                  name="name"
                  placeholder={user.firstName}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                </div>
            </div>
           ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;

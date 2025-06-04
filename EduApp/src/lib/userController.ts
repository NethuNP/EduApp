import { addDoc, collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import type { User } from "../types/types";
import app from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const auth = getAuth();

export const firestore = getFirestore(app);

//users collection

export const usersCollection = collection(firestore, "users");

// Add a new user to user collection

export const addUser = async (user: User) => {
  const newUser = await addDoc(usersCollection, { ...user });
  console.log(newUser);
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
      toast.success("User signed out successfully");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

//get all users from the collection
export const getAllUsers = (setUsers: any) => {
  const usersRef = collection(firestore, "users");
  const unsubscribe = onSnapshot(usersRef, (snapshot) => {
    const usersData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersData);
  });

  return unsubscribe;
};

//get all students from the collection

export const getAllStudents = (setStudents:any) => {
  const studentsRef = collection(firestore, "users");
  const allStudents = onSnapshot(studentsRef, (snapshot) => {
    const studentsData = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data() as User,
      }))
      .filter((user: User) => user.role?.includes("student"));
    setStudents(studentsData);
  });

  return allStudents;
}

//get student count

export const getStudentCount = async () => {
  const studentsRef = collection(firestore, "users");
  const snapshot =await getDocs(studentsRef);
  const studentsData = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data() as User,
    }))
    .filter((user: User) => user.role?.includes("student"));
    
  return studentsData.length
}

//get all admins from the collection

export const getAllAdmins = (setAdmins: any) => {
  const adminsRef = collection(firestore, "users");
  const allAdmins = onSnapshot(adminsRef, (snapshot) => {
    const adminsData = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data() as User,
      }))
      .filter((user: User) => user.role?.includes("eduAdmin"));
    setAdmins(adminsData);
  });

  return allAdmins;
}

//get admin count
export const getAdminCount = async () => {
  const adminsRef = collection(firestore, "users");
  const snapshot = await getDocs(adminsRef);
  const adminsData = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data() as User,
    }))
    .filter((user: User) => user.role?.includes("eduAdmin"));
    
  return adminsData.length;
}
  





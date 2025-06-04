import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import app, { db } from "./firebase";
import type { Course } from "../types/types";

export const firestore = getFirestore(app);

//course collection
export const courseCollection = collection(firestore, "course");

//add new course to the collection
export const addCourse = async (course: Course ) => {
  const newCourse = await addDoc(courseCollection, { ...course });
  console.log(newCourse);
};

//get all courses from the collection

export const getAllCourses = (setCourses: any) => {
  const courseRef = collection(db, "course");
  const unsubscribe = onSnapshot(courseRef, (snapshot) => {
    const coursesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourses(coursesData);
  });

  return unsubscribe;
};

//get course by createBy
export const getCourseByCreatedBy = async (createdBy: string) => {
  const courseRef = collection(db, "course");
  const snapshot = await getDocs(courseRef);
  const courseData = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data() as Course,
    }))
    .filter((course: Course) => course.createdBy === createdBy);
  return courseData;
};

//get corse by courseId
export const getCourseById = async (id: string) => {
  const courseRef = collection(db, "course");
  const snapshot = await getDocs(courseRef);
  const courseData = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data() as Course,
    }))
    .find((course) => course.courseId === id);
  return courseData;
};

//get count of courses
export const getCourseCount = async () => {
  const courseRef = collection(db, "course");
  const snapshot = await getDocs(courseRef);
  return snapshot.size;
}


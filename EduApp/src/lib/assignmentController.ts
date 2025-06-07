import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import type { Assignment } from "../types/types";
import { firestore } from "./userController";

//assignment sub collection
export const addAssignment = async (
  lessonId: string,
  assignment: Assignment,
  courseId: string
) => {
  try {
    const assignmentRef = doc(
      collection(
        firestore,
        "course",
        courseId,
        "lessons",
        lessonId,
        "assignments"
      )
    );
    await setDoc(assignmentRef, assignment);
    console.log("Assignment added with ID:", assignmentRef.id);
  } catch (error) {
    console.error("Error adding assignment :", error);
  }
};

//get all assignments from the collection
export const getAllAssignments = async () => {
  const assignmentRef = collection(firestore, "assignments");
  const snapshot = await getDocs(assignmentRef);
  const assignmentData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Assignment),
  }));
  return assignmentData;
};

// get assignment by id

export const getAssignmentById = async (
  lessonId: string,
  assignmentId: string
) => {
  const assignmentRef = collection(
    firestore,
    "lessons",
    lessonId,
    "assignments",
    assignmentId
    
  );
  const snapshot = await getDocs(assignmentRef);
  const assignmentData = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Assignment),
    }))
    .filter((assignment: Assignment) => assignment.assignmentId === assignmentId);
  return assignmentData;
};

//get assignment by lesson id

export const getAssignmentByLessonId = async (
  lessonId: string,
  courseId: string
) => {
  const assignmentRef = collection(
    firestore,
    "course",
    courseId,
    "lessons",
    lessonId,
    "assignments"
  );
  const snapshot = await getDocs(assignmentRef);
  const assignmentData = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Assignment),
    }))
    .filter((assignment: Assignment) => assignment.lessonId === lessonId);
    
  return assignmentData;
};

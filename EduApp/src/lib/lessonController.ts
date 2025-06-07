import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "./firebase";
import type { Lesson } from "../types/types";
import { getDoc } from "firebase/firestore";

export const firestore = getFirestore(app);

// lessons sub collection
export const addLesson = async (courseId: string, lesson: Lesson) => {
  try {
    const lessonRef = doc(collection(firestore, "course", courseId, "lessons"));
    await setDoc(lessonRef, lesson);
    console.log("Lesson added with ID:", lessonRef.id);
  } catch (error) {
    console.error("Error adding lesson:", error);
  }
};

//get lessons by id
export const getLessonById = async (lessonId: string, courseId: string) => {
  const lessonRef = doc(firestore, "course", courseId, "lessons", lessonId);
  const snapshot = await getDoc(lessonRef);
  const lessonData = snapshot.data() as Lesson;
  return lessonData;
};

//get lesson by courseId
export const getLessonByCourseId = async (courseId: string) => {
  const lessonRef = collection(firestore, "course", courseId, "lessons");
  const snapshot = await getDocs(lessonRef);
  const lessonData = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Lesson),
    }))
    .filter((lesson: Lesson) => lesson.courseId === courseId);
  return lessonData;
};

import * as Yup from "yup";

export const createLessonValidationSchema = Yup.object({
  lessonTitle: Yup.string()
    .required("Lesson title is required")
    .min(3, "title must be at least 3 characters long")
    .max(15, "title must be at most 15 characters long"),
  lessonCategory: Yup.string().required("category is required"),
  lessonTutorials: Yup.string().required("tutorials are required"),
  lessonMaterials: Yup.string().required("materials are required"),
  lessonStartDate: Yup.date().required("start date is required"),
  lessonEndDate: Yup.date()
    .required("end date is required")
    .min(Yup.ref("lessonStartDate"), "End date must be after start date"),
});

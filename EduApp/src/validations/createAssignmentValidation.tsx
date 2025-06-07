import * as Yup from "yup";

export const createAssignmentValidation = Yup.object({
  assignmentTitle: Yup.string().required("Title is required"),
  assignmentStartDate: Yup.date().required("Start date is required"),
  assignmentEndDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("assignmentStartDate"), "End date can't be before start date"),
  assignmentDescription: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be at most 500 characters long"),
  assignmentMaterials: Yup.mixed()
    .required("File is required")
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return false;
      const allowedFormats = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "text/plain",
      ];
      if (value instanceof File) {
        return allowedFormats.includes(value.type);
      }
      return false;
    }),
});

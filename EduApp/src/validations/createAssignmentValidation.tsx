import * as Yup from 'yup';

export const createAssignmentValidation = Yup.object({
      assignmentTitle: Yup.string()
        .required("title is required")
        .min(3, "title must be at least 3 characters long")
        .max(15, "title must be at most 15 characters long"),
      assignmentStartDate: Yup.date()
        .required("start date is required")
        .typeError("start date must be a valid date"),
      assignmentEndDate: Yup.date()
        .required("end date is required")
        .typeError("end date must be a valid date"),
      metirials: Yup.mixed().nullable().required("metirials are required"),
})
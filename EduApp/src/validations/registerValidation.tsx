import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  contact: Yup.string()
   .required("Contact is required")
    .matches(/^[0-9]+$/, "Contact must be a number")
    .min(10, "Contact must be at least 10 digits")
    .max(10, "Contact must be at most 10 digits")
    .matches(/^07[01245678][0-9]{7}$/, "Invalid contact number"),
  role: Yup.array()
    .of(Yup.string().oneOf(["student", "cellMember"]))
    .min(1, "Please select at least one role"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm Password is Required"),
});

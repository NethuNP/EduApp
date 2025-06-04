import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  contact: Yup.string()
    .required("Contact is required")
    .matches(/^07[01245678]\d{7}$/, "Invalid contact number")
    .length(10, "Contact must be exactly 10 digits"),
  role: Yup.array().of(Yup.string().oneOf(["student", "eduAdmin"])),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm Password is Required"),
});

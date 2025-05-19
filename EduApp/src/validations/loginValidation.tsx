import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required(
      "Uppercase letter, lowercase letter, number and special character required"
    )
    .required("Password is required"),
});

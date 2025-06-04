import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerValidationSchema } from "../../validations/registerValidation";
import { toast } from "react-toastify";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { secondaryAuth } from "../../lib/firebase";

function CreateAdmin() {
  const navigate = useNavigate();

  const registerAdmin = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    contact: string,
    role: string[]
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      password
    );

    const user = userCredential.user;
    console.log(user);

    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      contact,
      role,
      uid: user.uid,
      createdAt: Timestamp.now(),
    });
  };

  return (
    <Formik
      initialValues={{
        uid: "",
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
        role: ["eduAdmin"],
      }}
      validationSchema={registerValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await registerAdmin(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
            values.contact,
            values.role
          );
          toast.success("Admin created successfully!");
          navigate("/superadmin/allAdmins");
        } catch (err) {
          console.error("Error submitting form", err);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Form>
        <div className="bg-white items-center justify-center container mx-auto h-auto rounded-lg md:p-10 p-4">
          <div className="flex items-center justify-center flex-col md:text-3xl text-[#6B7C93] font-semibold">
            New Admin
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mt-4 mt-2">
            {/* First Name */}
            <div className="flex flex-col gap-1 mt-4 relative">
              <label
                htmlFor="firstName"
                className="text-[#6B7C93] text-sm md:text-lg"
              >
                First Name
              </label>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
              />
              <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                <ErrorMessage name="firstName" />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1 mt-4 relative">
              <label
                htmlFor="lastName"
                className="text-[#6B7C93] text-sm md:text-lg"
              >
                Last Name
              </label>
              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
              />
              <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                <ErrorMessage name="lastName" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 mt-4 relative">
            <label
              htmlFor="email"
              className="text-[#6B7C93] text-sm md:text-lg"
            >
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
            />
            <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
              <ErrorMessage name="email" />
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1 mt-4 relative">
            <label
              htmlFor="contact"
              className="text-[#6B7C93] text-sm md:text-lg"
            >
              Contact
            </label>
            <Field
              id="contact"
              name="contact"
              type="text"
              placeholder="Enter your contact"
              className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
            />
            <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
              <ErrorMessage name="contact" />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mt-4 mt-2">
            <div className="flex flex-col gap-1 mt-4 relative">
              <label
                htmlFor="password"
                className="text-[#6B7C93] text-sm md:text-lg"
              >
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
              />
              <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                <ErrorMessage name="password" />
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-4 relative">
              <label
                htmlFor="confirmPassword"
                className="text-[#6B7C93] text-sm md:text-lg"
              >
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your confirm password"
                className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
              />
              <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#309898] hover:bg-[#00796B] md:mt-20 mt-10 w-full md:py-2 py-1 rounded-md text-white cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default CreateAdmin;

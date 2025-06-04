import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerValidationSchema } from "../validations/registerValidation";
import img1 from "../assets/images/register.png";

function Register() {
  const auth = getAuth();
  const navigate = useNavigate();

  const registerUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    contact: string,
    role: string []
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log(user);
    toast.success("Registration successful!");

    navigate("/login");

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
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        role: ["student"],
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await registerUser(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
            values.contact,
            values.role
          );
        } catch (error: any) {
          error.code === "auth/email-already-in-use"
            ? toast.error("Email already in use!")
            : toast.error("Registration failed!");
        }
        setSubmitting(false);
      }}
    >
      {() => (
        <Form>
          <div className="min-h-screen grid md:grid-cols-2 grid-cols-1">
            <div className="flex items-center justify-center p-4 bg-[#D9F0F0] md:rounded-tr-4xl md:rounded-br-4xl rounded-br-4xl rounded-bl-4xl">
              <div className="flex flex-col items-center text-center">
                <img
                  src={img1}
                  alt="img1"
                  className="w-full h-full rounded-md"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="md:w-4/5 w-full p-4">
                <div className="md:text-4xl text-xl font-semibold text-[#309898] md:mt-4">
                  Create New Account
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-0">
                  <div className="md:mt-8 mt-2 relative ">
                    <label
                      htmlFor="firstName"
                      className="text-[#6B7C93] text-sm md:text-lg block mb-1"
                    >
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name here"
                      className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                    />
                    <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                  <div className="md:mt-8 mt-2 relative">
                    <label
                      htmlFor="lastName"
                      className="text-[#6B7C93] text-sm md:text-lg block mb-1"
                    >
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name here"
                      className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                    />
                    <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>{" "}
                </div>

                <div className="md:mb-4 mb-2 md:mt-4 mt-2 relative">
                  <label
                    htmlFor="email"
                    className="text-[#6B7C93] text-sm md:text-lg block mb-1"
                  >
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email here"
                    className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                  />
                  <div className="absolute bottom-[-18px] right-0 text-red-600  font-semibold md:text-[12px] text-[10px]">
                    <ErrorMessage name="email" />
                  </div>
                </div>

                <div className="md:mb-4 mb-2 md:mt-4 mt-2 relative">
                  <label
                    htmlFor="contact"
                    className="text-[#6B7C93] text-sm md:text-lg block mb-1"
                  >
                    Contact Number
                  </label>
                  <Field
                    name="contact"
                    type="contact"
                    placeholder="Enter your contact here"
                    className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                  />
                  <div className="absolute bottom-[-18px] right-0 text-red-600  font-semibold md:text-[12px] text-[10px]">
                    <ErrorMessage name="contact" />
                  </div>
                </div>

                <div className="md:mb-4 mb-2 md:mt-4 mt-2 relative">
                  <label
                    htmlFor="password"
                    className="text-[#6B7C93] text-sm md:text-lg block mb-1"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password here"
                    className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                  />
                  <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                    <ErrorMessage name="password" />
                  </div>
                </div>

                <div className="md:mb-4 mb-2 md:mt-4 mt-2 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[#6B7C93] text-sm md:text-lg block mb-1"
                  >
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter your confirm password here"
                    className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                  />
                  <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                    <ErrorMessage name="confirmPassword" />
                  </div>
                </div>

                {/* <div className="mb-4 md:mt-4 mt-2 relative">
                  <p className="text-[#6B7C93] text-sm md:text-lg mb-2">
                    I want to be
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center text-[#6B7C93] text-[12px] md:text-[16px]">
                      <Field
                        type="checkbox"
                        name="role"
                        value="student"
                        className="mr-2"
                      />
                      <span>Student</span>
                    </label>
                    <label className="flex items-center text-[#6B7C93] text-[12px] md:text-[16px]">
                      <Field
                        type="checkbox"
                        name="role"
                        value="cellMember"
                        className="mr-2"
                      />
                      <span>Cell Member</span>
                    </label>
                  </div>
                  <div className="absolute bottom-[-18px] right-0 text-red-600  font-semibold md:text-[12px] text-[10px]">
                    <ErrorMessage name="role" />
                  </div>
                </div> */}

                <button
                  type="submit"
                  className="w-full bg-[#309898] hover:bg-[#00796B] text-white font-semibold py-2 rounded-lg md:mt-4 mt-2 md:text-lg text-sm cursor-pointer"
                >
                  Sign Up
                </button>
                <div className="text-center md:mt-6 mt-4 text-[#6B7C93] text-sm md:text-lg">
                  Already have an account?
                  <span
                    onClick={() => navigate("/login")}
                    className="text-[#309898] ml-2 cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Register;

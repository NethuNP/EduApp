import { useNavigate } from "react-router-dom";
import google from "../assets/icons/google.png";
import login from "../assets/images/login.png";
import { auth, db } from "../lib/firebase";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { loginValidationSchema } from "../validations/loginValidation";
import { Formik, Field, Form, ErrorMessage } from "formik";

function Login() {
  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        console.log("User:", user);
        toast.success("Login successful!");

        const roles: string[] = Array.isArray(role) ? role : [role];

        if (roles.includes("superadmin")) {
          navigate("/super");
        } else if (roles.includes("eduAdmin")) {
          navigate("/edu");
        } else if (roles.includes("student")) {
          navigate("/stu");
        } else if (roles.includes("cellAdmin")) {
          navigate("/");
        } else if (roles.includes("cellMember")) {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        toast.error("User document not found!");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          toast.success("User logged in successfully");
          console.log("User:", user);
          navigate("/signup");
        }
      })
      .catch((error) => {
        toast.error("Error logging in");
        console.log(error);
      });
  };

  const resetPassword = (email: string) => {
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Password reset email sent"))
      .catch((error) => {
        toast.error("Error sending password reset email");
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await loginUser(values.email, values.password);
        } catch (error) {
          toast.error("Invalid Credentials");
          console.log(error);
        }
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form className="min-h-screen grid md:grid-cols-2 grid-cols-1">
          <div className="flex items-center justify-center p-4 bg-[#D9F0F0] md:rounded-tr-4xl md:rounded-br-4xl rounded-br-4xl rounded-bl-4xl">
            <div className="flex flex-col items-center text-center">
              <img
                src={login}
                alt="login"
                className="w-full h-full rounded-md"
              />
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <div className="md:w-4/5 w-full">
              <div className="md:text-4xl text-xl font-semibold text-[#309898] md:mt-4">
                Welcome Back!
              </div>

              <div className="flex flex-col gap-1 mb-4 mt-4 relative">
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
                <div className="absolute bottom-[-18px] right-0 text-red-600 md:text-[12px] text-[10px] font-semibold">
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-2 relative">
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
                <div className="absolute bottom-[-18px] right-0 text-red-600 md:text-[12px] text-[10px] font-semibold">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div
                onClick={() => resetPassword(values.email)}
                className="text-right text-[12px] md:text-[14px] text-[#6B7C93] cursor-pointer hover:underline mb-4 md:mt-8 mt-6"
              >
                Forgot password?
              </div>

              <button
                type="submit"
                className="w-full bg-[#309898] hover:bg-[#00796B] text-white font-semibold py-2 rounded-lg text-sm md:text-lg cursor-pointer"
              >
                Sign In
              </button>

              <div className="flex items-center gap-2 md:mt-8 mt-4">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-sm md:text-lg">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <div
                onClick={loginWithGoogle}
                className="flex items-center justify-center w-full font-semibold bg-[#D9F0F0] text-[#309898] py-2 gap-3 rounded-lg cursor-pointer md:mt-6 mt-4"
              >
                <img
                  src={google}
                  alt="google"
                  className="w-5 h-5 md:w-7 md:h-7"
                />
                <span className="text-sm md:text-lg">Sign In with Google</span>
              </div>

              <div className="text-center md:mt-6 mt-4 text-[#6B7C93] text-sm md:text-lg">
                Don’t have an account?
                <span
                  onClick={() => navigate("/signup")}
                  className="text-[#309898] ml-2 cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Login;

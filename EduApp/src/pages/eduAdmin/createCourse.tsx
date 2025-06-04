import { ErrorMessage, Field, Form, Formik } from "formik";
import { createCourseValidationSchema } from "../../validations/createCourseValidations";
import { uploadFileToCloudinary } from "../../lib/cloudinary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../../lib/googleApi";
import { getAuth } from "firebase/auth";
import { firestore } from "../../lib/userController";
import { collection, doc, setDoc } from "firebase/firestore";

function CreateCourse() {
  useGoogleAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  return (
    <Formik
      initialValues={{
        title: "",
        category: "",
        description: "",
        startDate: "",
        endDate: "",
        coverImage: null,
        createdBy: auth.currentUser?.uid,
      }}
      validationSchema={createCourseValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (!values.coverImage) {
            toast.error("Please select a cover image");
            return;
          }

          const coverImageUrl = await uploadFileToCloudinary(values.coverImage);
          const docRef = doc(collection(firestore, "course"));
          const courseId = docRef.id;
          const newCourse = {
            courseId,
            ...values,
            coverImage: coverImageUrl,
            createdBy: auth.currentUser?.uid ?? "",
          };

          await setDoc(docRef, newCourse);
          toast.success("Course added successfully");
          navigate("/eduAdmin/myCourses");
          resetForm();
        } catch (error) {
          console.error("Error adding course:", error);
          toast.error("Failed to add course");
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="bg-white items-center justify-center container mx-auto h-auto rounded-lg md:p-10 p-4">
            <div className="flex items-center justify-center flex-col md:text-3xl text-[#6B7C93] font-semibold">
              Create Course
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mt-4 mt-2">
              {/* Course Title */}
              <div className="flex flex-col gap-1 mt-4 relative">
                <label
                  htmlFor="title"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Course Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter course title"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="title" />
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1 mt-4 relative">
                <label
                  htmlFor="category"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Category
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                >
                  <option value="" label="Select category" disabled />
                  <option value="Degree" label="Degree" />
                  <option value="Diploma" label="Diploma" />
                  <option value="Certificate" label="Certificate" />
                </Field>
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="category" />
                </div>
              </div>

              {/* Start Date */}
              <div className="flex flex-col gap-1 relative">
                <label
                  htmlFor="startDate"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Start Date
                </label>
                <Field
                  id="startDate"
                  type="date"
                  name="startDate"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="startDate" />
                </div>
              </div>

              {/* End Date */}
              <div className="flex flex-col gap-1 relative">
                <label
                  htmlFor="endDate"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  End Date
                </label>
                <Field
                  id="endDate"
                  type="date"
                  name="endDate"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="endDate" />
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="flex flex-col gap-1 mt-4 relative">
                <label
                  htmlFor="coverImage"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Cover Image
                </label>
                <input
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue("coverImage", file);
                    }
                  }}
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="coverImage" />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1 mt-4 relative">
                <label
                  htmlFor="description"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter Description..."
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px] md:h-[200px] h-[100px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="description" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-[#309898] hover:bg-[#00796B] md:mt-20 mt-10 w-full md:py-2 py-1 rounded-md text-white cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateCourse;

import { ErrorMessage, Field, Form, Formik } from "formik";
import { createLessonValidationSchema } from "../../validations/createLessonValidation";
import upload from "../../assets/icons/upload.png";
import { uploadFileToCloudinary , uploadVideoToCloudinary} from "../../lib/cloudinary";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../lib/userController";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

function CreateLesson() {
  const navigate = useNavigate();
  const auth = getAuth();
  const courseId = useParams().id;



  return (
    <Formik
      initialValues={{
        lessonTitle: "",
        lessonCategory: "",
        lessonMaterials: null,
        lessonTutorials: null,
        lessonStartDate: "",
        lessonEndDate: "",
        courseId:courseId
        

      }}
      validationSchema={createLessonValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (!values.lessonMaterials) {
            toast.error("Please select Materials");
            return;
          }

          const lessonMetirialUrl = await uploadFileToCloudinary(
            values.lessonMaterials
          );
          const lessonTutorialUrl = await uploadVideoToCloudinary(
            values.lessonTutorials
          )
           if (!courseId) {
             toast.error("Invalid course ID");
             return;
           }
           const docRef = doc(collection(firestore, "course", courseId, "lessons"));
           const lessonId = docRef.id

          const newLesson = {
            lessonId,
            ...values,
            lessonMaterials: lessonMetirialUrl,
            lessonTutorials: lessonTutorialUrl,
            createdBy: auth.currentUser?.uid ?? "",
            courseId: values.courseId ?? "",
          };

          await setDoc(docRef, newLesson)
          toast.success("Lesson added successfully");
          navigate("/eduAdmin/myCourses");
          resetForm();
        } catch (error) {
          console.error("Error adding lesson:", error);
          toast.error("Failed to add lesson");
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="bg-white items-center justify-center container mx-auto h-auto rounded-lg md:p-10 p-4">
            <div className="flex items-center justify-center flex-col md:text-3xl text-[#309898] font-semibold">
              Add New Lesson
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mt-4 mt-2">
              {/* Lesson Title */}
              <div className="flex flex-col gap-1 mt-4 relative">
                <label
                  htmlFor="lessonTitle"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Lesson Title
                </label>
                <Field
                  id="lessonTitle"
                  name="lessonTitle"
                  type="text"
                  placeholder="Enter lesson title"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="lessonTitle" />
                </div>
              </div>

              {/* Lesson Category */}
              <div className="flex flex-col gap-1 mt-4 relative">
                <label
                  htmlFor="lessonCategory"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Lesson Category
                </label>
                <Field
                  as="select"
                  id="lessonCategory"
                  name="lessonCategory"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                >
                  <option value="" label="Select category" disabled />
                  <option value="book1" label="Book 1" />
                  <option value="book2" label="Book 2" />
                  <option value="book3" label="Book 3" />
                </Field>
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="lessonCategory" />
                </div>
              </div>

              {/* Start Date */}
              <div className="flex flex-col gap-1 mt-4 relative">
                <label
                  htmlFor="lessonStartDate"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Lesson Start Date
                </label>
                <Field
                  id="lessonStartDate"
                  name="lessonStartDate"
                  type="date"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="lessonStartDate" />
                </div>
              </div>

              {/* End Date */}
              <div className="flex flex-col gap-1 mt-4 relative">
                <label
                  htmlFor="lessonEndDate"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Lesson End Date
                </label>
                <Field
                  id="lessonEndDate"
                  name="lessonEndDate"
                  type="date"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="lessonEndDate" />
                </div>
              </div>

              {/* Lesson Materials */}
              <div className="relative w-full mt-4">
                <label
                  htmlFor="lessonMaterials"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Lesson Materials
                </label>
                <div className="flex items-center justify-center w-full rounded-md md:p-2 p-1 border border-dashed border-[#D9E2EC] bg-white focus-within:ring-1 focus-within:ring-[#85c2c2] focus-within:outline-none text-[12px] md:text-[16px] md:h-[200px] h-[100px] relative">
                  <img
                    src={upload}
                    alt="upload"
                    className="absolute w-10 h-10 text-[#309898] cursor-pointer border rounded-full bg-white p-2"
                  />
                  <input
                    id="lessonMaterials"
                    name="lessonMaterials"
                    type="file"
                    accept=".pdf, .doc, .docx, .ppt, .pptx, .txt, .img, .jpg, .jpeg, .png"
                    className="w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setFieldValue("lessonMaterials", file);
                      }
                    }}
                  />
                </div>
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="lessonMaterials" />
                </div>
              </div>

              {/* Tutorials */}
              <div className="relative w-full mt-4">
                <label
                  htmlFor="lessonTutorials"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Tutorials
                </label>
                <div className="flex items-center justify-center w-full rounded-md md:p-2 p-1 border border-dashed border-[#D9E2EC] bg-white focus-within:ring-1 focus-within:ring-[#85c2c2] focus-within:outline-none text-[12px] md:text-[16px] md:h-[200px] h-[100px] relative">
                  <img
                    src={upload}
                    alt="upload"
                    className="absolute w-10 h-10 text-[#309898] cursor-pointer border rounded-full bg-white p-2"
                  />
                  <input
                    id="lessonTutorials"
                    name="lessonTutorials"
                    type="file"
                    accept=".mp4, .avi, .mov, .wmv, .flv"
                    className="w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setFieldValue("lessonTutorials", file);
                      }
                    }}
                  />
                </div>
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="lessonTutorials" />
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

export default CreateLesson;

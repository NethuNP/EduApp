import { ErrorMessage, Field, Form, Formik } from "formik";
import { createAssignmentValidation } from "../../validations/createAssignmentValidation";
import upload from "../../assets/icons/upload.png";
import { CreateButton } from "../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../lib/userController";
import { uploadFileToCloudinary } from "../../lib/cloudinary";
import { toast } from "react-toastify";
import { auth } from "../../lib/firebase";

function CreateAssignment() {
  const navigate = useNavigate();
  const { lessonId, id: courseId } = useParams<{
    lessonId: string;
    id: string;
    courseId: string;
  }>();
  console.log("lessonId:", lessonId);
  console.log("courseId:", courseId);

  return (
    <Formik
      initialValues={{
        assignmentTitle: "",
        assignmentStartDate: "",
        assignmentEndDate: "",
        assignmentMaterials: null,
      }}
      validationSchema={createAssignmentValidation}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (!values.assignmentMaterials) {
            toast.error("Please select metirial");
            return;
          }
          const materialsUrl = await uploadFileToCloudinary(
            values.assignmentMaterials
          );

          if (!courseId) {
            console.error("Course ID is undefined.");
            return;
          }

          if (!lessonId) {
            console.error("Lesson ID is undefined.");
            return;
          }
          const assignmentRef = doc(
            collection(
              firestore,
              "course",
              courseId,
              "lessons",
              lessonId,
              "assignments"
            )
          );
          const assignmentId = assignmentRef.id;

          const assignment = {
            assignmentId,
            courseId,
            lessonId,
            ...values,
            assignmentMaterials: materialsUrl,
            createdBy: auth.currentUser?.uid ?? "",
          };
          await setDoc(assignmentRef, assignment);
          console.log("Assignment added successfully");
          toast.success("Assignment added successfully");
          navigate(`/eduAdmin/myCourses/${courseId}/lessons/${lessonId}`);
          resetForm();
        } catch (error) {
          console.error("Failed to create assignment:", error);
          toast.error("Failed to create assignment");
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="bg-white items-center justify-center container mx-auto h-auto rounded-lg md:p-10 p-4">
            <div className="flex items-center justify-center flex-col md:text-3xl text-[#309898] font-semibold">
              Add New Assignments
            </div>

            <div className="flex flex-col gap-1 mt-4 relative">
              <label
                htmlFor="assignmentTitle"
                className="text-[#6B7C93] text-sm md:text-lg"
              >
                Title
              </label>
              <Field
                id="assignmentTitle"
                name="assignmentTitle"
                type="text"
                placeholder="Enter assignment title"
                className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
              />
              <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                <ErrorMessage name="assignmentTitle" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mt-4 mt-2">
              <div className="flex flex-col gap-1 relative">
                <label
                  htmlFor="assignmentStartDate"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Start Date
                </label>
                <Field
                  id="assignmentStartDate"
                  name="assignmentStartDate"
                  type="date"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="assignmentStartDate" />
                </div>
              </div>

              <div className="flex flex-col gap-1  relative">
                <label
                  htmlFor="assignmentEndDate"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  End Date
                </label>
                <Field
                  id="assignmentEndDate"
                  name="assignmentEndDate"
                  type="date"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="assignmentEndDate" />
                </div>{" "}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mt-4 mt-2">
              <div className="flex flex-col gap-1  relative ">
                <label
                  htmlFor="assignmentDescription"
                  className="text-[#6B7C93] text-sm md:text-lg"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="assignmentDescription"
                  name="assignmentDescription"
                  className="w-full rounded-md md:p-2 p-1 border border-[#D9E2EC] bg-white focus:ring-1 focus:ring-[#85c2c2] focus:outline-none text-[12px] md:text-[16px]"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="assignmentDescription" />
                </div>

                <div className="flex flex-col gap-1  relative ">
                  <label
                    htmlFor="assignmentMaterials"
                    className="text-[#6B7C93] text-sm md:text-lg mt-4"
                  >
                    Materials
                  </label>
                  <div className="relative w-full">
                    <div className="flex items-center justify-center w-full rounded-md md:p-2 p-1 border border-dashed border-[#D9E2EC] bg-white focus-within:ring-1 focus-within:ring-[#85c2c2] focus-within:outline-none text-[12px] md:text-[16px] md:h-[200px] h-[100px] relative">
                      <img
                        src={upload}
                        alt="upload"
                        className="absolute w-10 h-10 text-[#309898] cursor-pointer border rounded-full bg-white p-2"
                      />
                      <input
                        id="assignmentMaterials"
                        name="assignmentMaterials"
                        type="file"
                        accept=".pdf, .doc, .docx, .ppt, .pptx, .txt"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];
                          if (file) {
                            setFieldValue("assignmentMaterials", file);
                          }
                        }}
                        className="w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                        <ErrorMessage name="assignmentMaterials" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <CreateButton />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateAssignment;

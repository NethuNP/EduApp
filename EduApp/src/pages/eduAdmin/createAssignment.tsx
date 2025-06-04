import { ErrorMessage, Field, Form, Formik } from "formik";
import { createAssignmentValidation } from "../../validations/createAssignmentValidation";
import upload from "../../assets/icons/upload.png";

function CreateAssignment() {
  return (
    <Formik
      initialValues={{
        assignmentTitle: "",
        assignmentStartDate: "",
        assignmentEndDate: "",
        metirials: null,
      }}
      validationSchema={createAssignmentValidation}
      onSubmit={(values) => {
        console.log("Form values:", values);
      }}
    >
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
            <div className="flex flex-col gap-1 mt-4 relative">
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

            <div className="flex flex-col gap-1 mt-4 relative">
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
              </div>
            </div>

            <label
              htmlFor="materials"
              className="text-[#6B7C93] text-sm md:text-lg mt-4"
            >
              Materials
            </label>
            <div className="relative w-full md:col-span-2">
              <div className="flex items-center justify-center w-full rounded-md md:p-2 p-1 border border-dashed border-[#D9E2EC] bg-white focus-within:ring-1 focus-within:ring-[#85c2c2] focus-within:outline-none text-[12px] md:text-[16px] md:h-[200px] h-[100px] relative">
                <img
                  src={upload}
                  alt="upload"
                  className="absolute w-10 h-10 text-[#309898] cursor-pointer border rounded-full bg-white p-2"
                />
                <Field
                  as="input"
                  id="materials"
                  type="file"
                  name="materials"
                  accept=".pdf, .doc, .docx, .ppt, .pptx, .txt"
                  className="w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute bottom-[-18px] right-0 text-red-600 font-semibold md:text-[12px] text-[10px]">
                  <ErrorMessage name="metirials" />
                </div>{" "}
              </div>
            </div>
          </div>

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
    </Formik>
  );
}

export default CreateAssignment;

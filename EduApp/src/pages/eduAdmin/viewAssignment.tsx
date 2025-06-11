import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Assignment } from "../../types/types";
import { getAssignmentByLessonId } from "../../lib/assignmentController";
import { Download } from "lucide-react";

function ViewAssignment() {
  const { lessonId, id, assignmentId } = useParams<{
    lessonId: string;
    id: string;
    assignmentId: string;
  }>();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  console.log(assignmentId);
  console.log(lessonId);

  console.log(lessonId);
  console.log(id);
  useEffect(() => {
    const fetchAssignment = async () => {
      if (lessonId && id) {
        try {
          const assignmentData = await getAssignmentByLessonId(lessonId, id);

          setAssignments(assignmentData);
        } catch (error) {
          console.error("Error fetching assignment:", error);
        }
      }
    };

    fetchAssignment();
  }, [lessonId]);

  const newAssignment = assignments.filter(
    (assignment: Assignment) => assignment.assignmentId === assignmentId
  );

  return (
    <div className="w-full bg-white rounded-2xl p-4 md:p-6 shadow-sm">
      <div className=" ">
        {newAssignment.map((assignment, index) => (
          <div
            key={index}
            className="mb-4 grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4"
          >
            <div>
              <div className="font-semibold text-[#309898] md:text-xl text-sm ">
                {assignment.assignmentTitle}
              </div>
              <div className="md:mt-6 mt-4 text-justify text-gray-600 md:text-lg text-xs">
                {" "}
                {assignment.assignmentDescription}
              </div>
            </div>
            <div>
              <div className="font-semibold text-[#309898] md:text-xl text-sm">
                Assignment Materials
              </div>
              <div className="flex items-center justify-between md:mt-6 mt-2 md:text-lg text-xs text-justify text-gray-600 bg-teal-100 md:px-4 md:py-4 px-2 py-1 rounded-xl">
                <div className="md:text-sm text-xs">
                  Download your assignments here{" "}
                </div>
                <div className="cursor-pointer">
                  {" "}
                  <Download />
                </div>
              </div>
              <hr className="md:mt-6 mt-4 md:px-4 px-2  text-gray-300 " />
              <div className="md:px-4  px-2 md:mt-6 mt-4  font-semibold text-teal-600 flex  gap-6">
                {" "}
                Deadline :
                <span className="text-gray-600 font-normal">
                  {" "}
                  {assignment.assignmentEndDate}{" "}
                </span>
              </div>
              <div className="md:px-4  px-2 md:mt-4 mt-2  font-semibold text-teal-600 flex gap-6">
                {" "}
                Status :
                <span className="text-gray-600 font-normal"> Submitted </span>
              </div>
              <div className="md:px-4  px-2 md:mt-4 mt-2  font-semibold text-teal-600 flex gap-6">
                {" "}
                Grade :
                <span className="text-gray-600 font-normal"> Graded </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAssignment;

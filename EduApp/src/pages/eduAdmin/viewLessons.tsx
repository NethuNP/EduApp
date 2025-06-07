import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLessonById } from "../../lib/lessonController";
import { getAssignmentByLessonId } from "../../lib/assignmentController";
import type { Assignment, Lesson } from "../../types/types";
import { Trash2, SquarePen } from "lucide-react";
import { PDFViewer } from "@react-pdf/renderer";
import { ChevronRight } from "lucide-react";

function ViewLesson() {
  const navigate = useNavigate();
  const { lessonId, id } = useParams<{ lessonId: string; id: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchLesson = async () => {
      if (lessonId && id) {
        try {
          const lessonData = await getLessonById(lessonId, id);
          setLessons([lessonData]);
        } catch (error) {
          console.error("Error fetching lesson:", error);
        }
      }
    };
    fetchLesson();
  }, [lessonId, id]);

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

  return (
    <div className="w-full bg-white rounded-2xl p-6 md:p-10 shadow-sm space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 cursor-pointer bg-[#309898] hover:bg-[#00796B] text-white md:px-4 md:py-2 px-2 py-1 rounded-lg font-medium text-xs md:text-base transition-colors shadow-md">
          <SquarePen size={18} /> Edit
        </button>
        <button className="flex items-center gap-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white md:px-4 md:py-2 px-2 py-1 rounded-lg font-medium text-xs md:text-base transition-colors shadow-md">
          <Trash2 size={18} /> Delete
        </button>
      </div>

      {lessons.map((lesson, index) => (
        <div key={index} className="space-y-2">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Video & Info */}
            <div>
              <h2 className="text-[#309898] text-xl md:text-2xl font-semibold mb-4">
                {lesson.lessonTitle}
              </h2>

              <video
                src={lesson.lessonTutorials}
                controls
                className="w-full h-[200px] md:h-[320px] rounded-lg shadow-md object-cover"
              ></video>

              <div className="flex justify-between text-xs md:text-sm text-gray-500 mt-4">
                <span>
                  <strong>Start:</strong> {lesson.lessonStartDate}
                </span>
                <span>
                  <strong>End:</strong> {lesson.lessonEndDate}
                </span>
              </div>
            </div>

            {/* Learning Materials */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-[#309898] md:text-xl text-sm font-semibold mb-4">
                  Learning Materials
                </h3>

                <div className="bg-[#D9F0F0] text-gray-700 p-4 rounded-lg shadow-sm text-sm">
                  {/* <PDFViewer width="100%" height={500}>
                    <iframe src = {lesson.lessonMaterials} width="100%" height="100%" title="Learning Materials" />
                  </PDFViewer> */}
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Section */}
          <div className="flex items-center justify-between">
            <div className="text-[#309898] md:text-xl text-sm font-semibold">
              Assignments
            </div>
            <div className="">
              <button
                onClick={() =>
                  navigate(
                    `/eduAdmin/myCourses/${id}/lessons/${lessonId}/assignments`
                  )
                }
                className="bg-[#309898] hover:bg-[#00796B] text-white md:px-4 md:py-2 px-2 py-1 rounded-lg font-medium text-xs md:text-base transition-colors shadow-md cursor-pointer"
              >
                + Assignments
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
            {assignments.map((assignment, index) => (
              <div key={index} className="mb-4 cursor-pointer" onClick={() => navigate (`/eduAdmin/myCourses/${id}/lessons/${lessonId}/assignments/${assignment.assignmentId}`)}>
                <div className="bg-teal-100 text-gray-600 flex justify-between font-semibold p-4 rounded-lg shadow-sm text-sm">
                  {assignment.assignmentTitle}
                  <ChevronRight className="text-[#309898]"/>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewLesson;

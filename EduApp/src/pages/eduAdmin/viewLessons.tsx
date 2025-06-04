import { useState } from "react";
import type { Lesson } from "../../types/types";
import { getLessonById } from "../../lib/lessonController";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function ViewLesson() {
  const { id, courseId } = useParams<{ id: string; courseId: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  useEffect(() => {
    const fetchLesson = async () => {
      if (id && courseId) {
        try {
          const lessonData = await getLessonById(id, courseId);
          if (lessonData) {
            setLessons([lessonData]);
          } else {
            setLessons([]);
          }
        } catch (error) {
          console.error("Error fetching lesson:", error);
        }
      }
    };
    fetchLesson();
  }, [id, courseId]);

  return (
    <div className="w-full bg-white rounded-lg md:p-10 p-4 space-y-auto">
      {lessons.map((lesson , index) => (
        <div key={index} className="space-y-2">
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4">
            <div>
              <h2 className="text-[#309898] text-lg md:text-2xl font-semibold mb-4">
                {lesson.lessonTitle}
              </h2>
              <video
                src={lesson.lessonTutorials}
                controls
                className="w-full md:[400px] lg:h-[500px] h-[200px] rounded-lg"
              >
                Video not loaded
              </video>
              <div className="flex items-center justify-between text-xs md:text-lg text-gray-500 md:mt-6 mt-4 ">
                <div>Start Date: {lesson.lessonStartDate}</div>
                <div> End Date: {lesson.lessonEndDate} </div>
              </div>
            </div>
            <div className="text-[#309898] text-lg md:text-2xl font-semibold">
              Learning Metirials
              {/* <div className="w-full bg-[#D9F0F0] md:text-lg text-sm md:mt-6 md:py-2 md:px-2 rounded-lg font-normal cursor-pointer">
                Download
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewLesson;

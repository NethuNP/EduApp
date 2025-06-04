import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../../lib/courseController";
import { getLessonByCourseId } from "../../lib/lessonController";
import type { Course, Lesson } from "../../types/types";
import { ChevronRight } from "lucide-react";

function ViewCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        try {
          const courseData = await getCourseById(id);
          const lessonData = await getLessonByCourseId(id);
          setCourse(courseData);
          setLessons(lessonData);
        } catch (error) {
          console.error("Error fetching course or lesson:", error);
        }
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <div className="text-center mt-4">Loading course...</div>;
  }

  return (
    <div className="w-full bg-white rounded-lg md:p-10 p-4 space-y-auto">
      <div className="flex items-center justify-center md:text-3xl text-lg text-[#309898] font-semibold">
        {course.title}
      </div>
      <div className="flex items-end justify-end md:gap-6 gap-10">
        <button
          className="bg-[#309898] hover:bg-[#00796B] text-white md:text-lg text-sm md:px-4 md:py-2 px-2 py-1 rounded-lg font-semibold cursor-pointer"
          onClick={() => navigate(`/eduAdmin/myCourses/${id}/lessons`)}
        >
          Lessons +
        </button>
        <button
          className="bg-[#309898] hover:bg-[#00796B] text-white md:text-lg text-sm md:px-4 md:py-2 px-2 py-1 rounded-lg font-semibold cursor-pointer"
          onClick={() => navigate(`/eduAdmin/myCourses/${id}/assignments`)}
        >
          Assignments +
        </button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4 md:mt-10 mt-4">
        {/* Cover Image */}
        <div className="flex items-center justify-center">
          <img
            src={course.coverImage}
            alt="Course Cover"
            className="md:w-[400px] md:h-[300px] rounded-lg object-cover "
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col justify-center gap-4">
          <p className="text-gray-700 font-normal md:text-lg text-sm text-justify">
            {course.description}
          </p>

          {/* Start and End Date*/}
          <div className="flex justify-between text-sm text-gray-500 md:mt-10">
            <span>Start Date: {course.startDate}</span>
            <span>End Date: {course.endDate}</span>
          </div>
        </div>
      </div>
      {/* Lessons */}
      <div className=" md:mt-10 mt-6">
        <div className=" text-gray-400 font-semibold grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4  ">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-4 bg-[#D9F0F0] shadow-md rounded-lg md:p-6 p-4 md:mt-6 mt-4 cursor-pointer  "
              onClick={() =>
                navigate(`/eduAdmin/myCourses/${id}/${lesson.lessonId}`)
              }
            >
              <div className="flex items-center justify-between text-gray-700">
                <div>{lesson.lessonTitle}</div>
                <div>
                  <ChevronRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;

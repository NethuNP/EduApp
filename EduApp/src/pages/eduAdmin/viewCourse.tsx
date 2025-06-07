import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../../lib/courseController";
import { getLessonByCourseId } from "../../lib/lessonController";
import type { Course, Lesson } from "../../types/types";
import { ChevronRight } from "lucide-react";
import Pagination from "../../components/pagination";

function ViewCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 4;

  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = lessons.slice(indexOfFirstLesson, indexOfLastLesson);

  console.log(id);
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
    return (
      <div className="text-center mt-8 text-gray-500 text-lg">
        Loading course...
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-4 md:p-6 shadow-sm">
      {/* Course Title */}
      <div className="text-center text-[#309898] font-bold text-xl md:text-3xl mb-">
        {course.title}
      </div>

      {/* Add Lesson Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-[#309898] hover:bg-[#00796B] text-white font-semibold text-sm md:text-base px-4 py-2 rounded-lg shadow-md hidden md:block"
          onClick={() => navigate(`/eduAdmin/myCourses/${id}/lessons`)}
        >
          + Add Lesson
        </button>
      </div>

      {/* Course Info Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Cover Image */}
        <div className="flex items-center justify-center">
          <img
            src={course.coverImage}
            alt="Course Cover"
            className="rounded-xl w-full max-w-[500px] h-auto object-cover shadow"
          />
        </div>

        {/* Description & Dates */}
        <div className="flex flex-col justify-between gap-6">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify">
            {course.description}
          </p>

          <div className="flex justify-between text-xs md:text-sm text-gray-500">
            <span>
              <strong>Start:</strong> {course.startDate}
            </span>
            <span>
              <strong>End:</strong> {course.endDate}
            </span>
          </div>
        </div>
      </div>

      {/* Lessons Header */}
      <div className="md:mt-6 flex items-center justify-between">
        <h2 className="text-[#309898] text-lg md:text-2xl font-semibold">
          Lessons
        </h2>
        <button
          className="bg-[#309898] hover:bg-[#00796B] text-white font-semibold text-sm px-3 py-1 rounded-lg md:hidden block"
          onClick={() => navigate(`/eduAdmin/myCourses/${id}/lessons`)}
        >
          + Add Lesson
        </button>
      </div>

      {/* Lessons List */}
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {lessons.length === 0 ? (
          <div className="text-center col-span-2 text-gray-400 font-medium">
            No lessons added yet.
          </div>
        ) : (
          currentLessons.map((lesson, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/eduAdmin/myCourses/${id}/lessons/${lesson.lessonId}`)
              }
              className="bg-teal-100 hover:bg-teal-200  transition-colors duration-300 cursor-pointer rounded-xl p-4 md:p-6 shadow-sm flex items-center justify-between"
            >
              <span className="text-gray-700 font-medium">
                {lesson.lessonTitle}
              </span>
              <ChevronRight className="text-[#309898]" />
            </div>
          ))
        )}
      </div>
        {lessons.length > lessonsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={lessons.length}
          itemsPerPage={lessonsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default ViewCourse;

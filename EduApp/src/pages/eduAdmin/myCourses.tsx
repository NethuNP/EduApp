import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseByCreatedBy } from "../../lib/courseController";
import type { Course } from "../../types/types";
import { getAuth } from "firebase/auth";
import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";

const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      getCourseByCreatedBy(userId).then((courses) => setCourses(courses));
    }
  }, []);

  return (
    <div>
      <div className="w-full bg-white rounded-lg md:p-10 p-4">
        <div className="flex items-end justify-end mb-4">
          <button
            className="bg-[#309898] hover:bg-[#00796B] text-white md:text-lg text-sm md:px-4 md:py-2 px-2 py-1 rounded-lg font-semibold cursor-pointer"
            onClick={() => navigate("/eduAdmin/createCourse")}
          >
            New Course +
          </button>
        </div>
        {courses.length === 0 && (
          <div className="flex items-center justify-center text-center">
            <div className="text-sm md:text-xl lg-text-xl font-semibold text-[#309898]">
              No Courses Found
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="rounded-lg md:p-8 p-4 m-4 shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer hover:bg-[#f0fdfa] transition duration-300 ease-in-out"
              onClick={() => navigate(`/eduAdmin/myCourses/${course.courseId}`)}
            >
              <div className="flex items-center justify-center">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className=" w-[200px] h-[160px] object-cover overflow-hidden rounded-lg"
                />
              </div>
              <div className="flex items-center justify-center text-center">
                <div className="text-sm md:text-xl lg-text-xl font-semibold text-[#309898]">
                  {course.title}
                  <div>
                    <div className="flex items-center justify-center text-red-700 md:mt-6 mt-2 md:gap-4 gap-2">
                      <Trash2 />
                      <button className="text-[#309898]">
                        <SquarePen />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;

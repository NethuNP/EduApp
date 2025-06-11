import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseByCreatedBy } from "../../lib/courseController";
import type { Course } from "../../types/types";
import { getAuth } from "firebase/auth";
import { Trash2, SquarePen } from "lucide-react";
import Loader from "../../components/loader";
import Loading from "../../components/loader";

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
    <div className="w-full bg-white rounded-lg md:p-10 p-4 space-y-auto">
      <div className="">
        <div className="flex items-end justify-end mb-4">
          <button
            className="bg-[#309898] hover:bg-[#00796B] text-white md:text-lg text-sm md:px-4 md:py-2 px-2 py-1 rounded-lg font-semibold cursor-pointer"
            onClick={() => navigate("/eduAdmin/createCourse")}
          >
            New Course +
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-[#309898] text-xl font-semibold">
              <Loader/>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.courseId}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 group cursor-pointer"
              >
                <div
                  onClick={() =>
                    navigate(`/eduAdmin/myCourses/${course.courseId}`)
                  }
                  className="p-4"
                >
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-bold text-[#309898]  text-center">
                    {course.title}
                  </h3>
                </div>
                <div className="flex justify-center gap-4 py-4 bg-gradient-to-b from-gray-100 to-white rounded-t-3xl">
                  <button className="text-red-500 hover:text-red-700 transition">
                    <Trash2 size={20} />
                  </button>
                  <button className="text-[#309898] hover:text-[#00796B] transition">
                    <SquarePen size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;

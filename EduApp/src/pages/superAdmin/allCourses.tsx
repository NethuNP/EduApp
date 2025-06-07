import { useEffect, useState } from "react";
import type { Course } from "../../types/types";
import { getAllCourses } from "../../lib/courseController";

function AllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = getAllCourses(setCourses);
    return () => {
      if (fetchCourses) {
        fetchCourses();
      }
    };
  }, []);

  return (
    <div>
      <div className="w-full bg-white rounded-lg md:p-10 p-4">
        <div className="w-full  rounded-xl">
          <h2 className="text-[#309898] text-lg md:text-2xl font-semibold mb-4">
            All Courses
          </h2>
          <div className="bg-teal-50 text-gray-500 md:py-2 py-1 justify-between rounded-xl md:flex hidden p-4">
            <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items-start">
              Course Name
            </div>
            <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items">
              Admin Name
            </div>
            <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items">
              Category
            </div>
            <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items">
              Start Date
            </div>
          </div>
          <div className="space-y-4 text-[#6B7C93]">
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex flex-wrap md:flex-nowrap justify-between items-center  border-[#D9E2EC] rounded-2xl   border-b  text-xs md:text-base p-4 md:p-4 bg-white"
              >
                <div className="w-full lg:w-1/4  md:w-2/3 font-medium flex md:items-center md:justify-center justify-start items-start">
                  {course.title}
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3 flex md:items-center md:justify-center justify-start items">
                  {}
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3 flex md:items-center md:justify-center justify-start items">
                  {course.category}
                </div>
                <div className="w-full lg:w-1/4  md:w-2/3 flex md:items-center md:justify-center justify-start items">
                  {course.startDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCourses;

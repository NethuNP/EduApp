import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { contextType, Course } from "../../types/types";
import { getAllCourses } from "../../lib/courseController";
import { useOutletContext } from "react-router-dom";

function StudentMyCourses() {
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course[]>([]);
  const { selectedCategory } = useOutletContext<contextType>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCourse = getAllCourses(setCourse);
    return () => {
      if (fetchCourse) {
        fetchCourse();
      }
    };
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(course.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = course.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const filteredCourses = course.filter(
    (course) => course.category === selectedCategory
  );

  return (
    <div className="md:px-10  ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {filteredCourses.map((item) => (
          <div
            key={item.courseId}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-center  p-6">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-32 h-32 md:w-full md:h-40 object-contain"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-gray-100 to-white rounded-3xl">
              <div>
                <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-[#309898]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm lg:text-lg mt-2">
                  {item.description?.split(" ").slice(0, 10).join(" ")}
                  {item.description?.split(" ").length > 10 && "..."}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-teal-100 text-teal-600 hover:bg-green-200 cursor-pointer transition-colors rounded-full px-4 py-2 text-sm font-semibold"
                  onClick={() =>
                    navigate(`/student/stuMycourses/${item.courseId}`)
                  }
                >
                  Browse
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md border ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-[#309898] border-[#309898] hover:bg-[#309898] hover:text-white"
          } transition-colors`}
        >
          Prev
        </button>

        {/* Page numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === pageNum
                  ? "bg-[#309898] text-white border-[#309898]"
                  : "text-[#309898] border-[#309898] hover:bg-[#309898] hover:text-white"
              } transition-colors`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md border ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-[#309898] border-[#309898] hover:bg-[#309898] hover:text-white"
          } transition-colors`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudentMyCourses;

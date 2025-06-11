import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Course } from "../../types/types";
import { getAllCourses } from "../../lib/courseController";
import Category from "../../components/category";
import Aos from "aos";

function StudentMyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Certificate");

  const itemsPerPage = 8;

  useEffect(() => {
    getAllCourses(setCourses);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  // Filter courses based on selected category
  const filteredCourses = courses.filter(
    (course) => course.category === selectedCategory
  );

  // Pagination calculation based on filtered courses
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="md:px-10">
      <Category selectedCategory={selectedCategory} onSelectCategory={(category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
      }} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {currentCourses.map((item) => (
          <div
            key={item.courseId}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            data-aos="fade-in"
          >
            <div className="flex items-center justify-center p-6">
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
                  onClick={() => navigate(`/student/stuMycourses/${item.courseId}`)}
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

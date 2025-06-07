import { useNavigate, useParams } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";
import books from "../../data/books";

function CourseContent() {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  console.log(courseId);

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-3xl font-semibold text-teal-600 mb-8">
          Explore Books
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-teal-500 md:w-6 md:h-6 w-4 h-4" />
                  <h3 className="md:text-xl text-sm font-semibold text-gray-800">
                    {book.title}
                  </h3>
                </div>
                <ChevronRight
                  className="text-teal-500 md:w-6 md:h-6 w-4 h-4"
                  onClick={() => navigate(`lessons/${book.id}`)}
                />
              </div>
              <p className="text-gray-600">{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseContent;

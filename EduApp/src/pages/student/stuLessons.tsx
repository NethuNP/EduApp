import { useNavigate } from "react-router-dom";
import { NotebookPen, ChevronRight } from "lucide-react";

function StudentLessons() {
  const navigate = useNavigate();

  const lessons = [
    {
      id: 1,
      title: "Lesson 1",
      description: "This is the description for lesson 1",
    },
    {
      id: 2,
      title: "Lesson 2",
      description: "This is the description for lesson 2",
    },
    {
      id: 3,
      title: "Lesson 3",
      description: "This is the description for lesson 3",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-3xl font-semibold text-teal-600 mb-8">
          Explore Lessons
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl shadow-md p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`content/${lesson.id}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <NotebookPen className="text-teal-500 md:w-6 md:h-6 w-4 h-4" />
                  <h3 className="md:text-xl text-sm font-semibold text-gray-800">
                    {lesson.title}
                  </h3>
                </div>
                <ChevronRight className="text-teal-500 md:w-6 md:h-6 w-4 h-4" />
              </div>
              <p className="text-gray-600">{lesson.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentLessons;

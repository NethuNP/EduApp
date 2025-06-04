import { useParams } from "react-router-dom";
import login from "../../assets/images/login.png";
import { Download } from "lucide-react";

function LessonContent() {
  const { id: lessonId } = useParams();
  console.log(lessonId);

  const lessonContent = [
    {
      id: 1,
      lessonTitle: "This is lesson 1 title",
      description: "This is lesson 1 description",
      image: login,
      assignmentId: 1,
      assignmnetTitle: "this is assignment 1 title",
      assignmentDocument: "this is assignment 1 document ",
    },
  ];

  return (
    <div>
      <div className="bg-gradient-to-b from-white to-gray-100 p-6">
        <div className="flex items-center justify-center md:text-3xl text-xl font-semibold text-teal-600">
          Lesson {lessonId}
        </div>

        {lessonContent.map((content) => (
          <div key={content.id} className="bg-white rounded-2xl md:p-6">
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div className="flex items-center justify-center">
                <img src={login} />
              </div>
              <div className="flex items-center justify-center md:text-lg text-sm">
                {content.description}
              </div>
            </div>
            <div className="flex justify-between bg-gray-100 p-4 rounded-2xl md:mt-4 mt-2 md:text-lg text-xs">
              Download lesson 1 docs <Download className="text-teal-600" />
            </div>
            <div className="flex items-start justify-start text-teal-600 md:text-2xl  text-sm font-semibold md:mt-6 mt-4">
              Assignment {content.assignmentId}
            </div>
            <div className="flex justify-between bg-gray-100 p-4 rounded-2xl md:mt-4 mt-2 md:text-lg text-xs">
              {content.assignmnetTitle} <Download className="text-teal-600" />
            </div>
            <div className="md:flex md:mt-10  hidden">
              <hr className="text-gray-300 w-1/2"></hr>
              <span className=" text-gray-600 md:-mt-4 ml-6 mr-6  text-center ">
                Upload your assignment here
              </span>
              <hr className="text-gray-300 w-1/2"></hr>
            </div>
            <div className="text-teal-600 md:hidden flex items-center justify-center mt-4 font-semibold mb-2">
              Upload your assignment here
            </div>
            <div>
              <input
                type="file"
                className=" w-full h-[200px] border border-dashed border-gray-400  p-4 rounded-2xl md:mt-4"
              />
            </div>
            <div className="flex items-end justify-end">
              <button className=" md:py-2 md:px-4 py-1 px-2 md:text-lg text-xs bg-teal-600 md:mt-4 mt-2 text-white rounded-lg">
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonContent;

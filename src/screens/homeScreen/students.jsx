import { useRef } from "react";
import "../../styles/tailwind.css";

export default function Students() {
  const rowRef = useRef(null);

  // Scroll one full section to the left
  const scrollLeft = () => {
    if (rowRef.current) {
      const sectionWidth = rowRef.current.firstChild.offsetWidth;
      rowRef.current.scrollBy({
        left: -sectionWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      const sectionWidth = rowRef.current.firstChild.offsetWidth;
      rowRef.current.scrollBy({
        left: sectionWidth,
        behavior: "smooth",
      });
    }
  };

  // Array of student data
  const students = [
    {
      id: 1,
      name: "Student 1",
      content: "Some representative placeholder content for the first column.",
    },
    {
      id: 2,
      name: "Student 2",
      content: "Some representative placeholder content for the second column.",
    },
    {
      id: 3,
      name: "Student 3",
      content: "Some representative placeholder content for the third column.",
    },
    {
      id: 4,
      name: "Student 4",
      content: "Some representative placeholder content for the fourth column.",
    },
    {
      id: 5,
      name: "Student 5",
      content: "Some representative placeholder content for the fifth column.",
    },
    {
      id: 6,
      name: "Student 6",
      content: "Some representative placeholder content for the sixth column.",
    },
    {
      id: 7,
      name: "Student 7",
      content: "Some representative placeholder content for the sixth column.",
    },
    {
      id: 8,
      name: "Student8",
      content: "Some representative placeholder content for the sixth column.",
    },
  ];

  return (
    <section className="px-6 py-8 ">
      <h3 className="text-3xl font-semibold text-center mb-6 ">
        طُلّابنا و إنجازاتهم
      </h3>
      <section className="relative">
        <section className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          {/* Left arrow */}
          <button
            className="bg-orange-700 text-white p-2 rounded-full hover:bg-orange-600 "
            onClick={scrollLeft}
          >
            ❮
          </button>
        </section>

        <section className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          {/* Right arrow */}
          <button
            className="bg-orange-700 text-white p-2 rounded-full hover:bg-orange-600"
            onClick={scrollRight}
          >
            ❯
          </button>
        </section>

        {/* Main content */}
        <section
          className="flex overflow-x-auto space-x-4 snap-x snap-mandatory h-64 px-4 py-4 scrollbar-hide"
          ref={rowRef}
        >
          {students.map((student) => (
            <section
              key={student.id}
              className="studentCard flex-shrink-0 snap-center bg-white p-6 rounded-lg shadow-lg w-64"
            >
              <section className="flex items-center mb-4">
                <img
                  className="rounded-full w-16 h-16"
                  src="./assets/dafult.png"
                  alt="Student Avatar"
                />
                <h2 className="ml-4 text-xl font-semibold">{student.name}</h2>
              </section>

              <p className="text-gray-700">{student.content}</p>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}

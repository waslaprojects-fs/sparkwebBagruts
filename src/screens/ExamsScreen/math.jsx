import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/tailwind.css";
export default function MathPage() {
  const location = useLocation();
  const { examsData, title } = location.state || {}; // Dynamically get exams data and title

  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      {examsData && Object.keys(examsData).length > 0 ? (
        Object.keys(examsData)
          .sort((a, b) => b - a)
          .map((year) => {
            const examSessions = examsData[year];
            return (
              <section
                className="mathexams bg-gray-100 p-4 rounded-lg mb-4"
                key={year}
              >
                <h2 className="text-2xl font-semibold mb-2">{year}</h2>
                {Object.keys(examSessions).map((sessionName) => (
                  <section key={sessionName} className="mb-2">
                    <button
                      className="btn-solution bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() =>
                        window.open(
                          examSessions[sessionName].sol || "#",
                          "_blank"
                        )
                      }
                    >
                      {`${sessionName} - حل`} {/* Solutions Button */}
                    </button>
                    <button
                      className="btn-exam bg-green-500 text-white py-2 px-4 ml-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onClick={() =>
                        window.open(
                          examSessions[sessionName].ex || "#",
                          "_blank"
                        )
                      }
                    >
                      {`${sessionName} - نموذج`} {/* Exams Button */}
                    </button>
                  </section>
                ))}
              </section>
            );
          })
      ) : (
        <p className="text-red-500">No exams available for this year.</p>
      )}
    </section>
  );
}

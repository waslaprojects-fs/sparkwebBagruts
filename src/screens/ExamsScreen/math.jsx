import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/tailwind.css";
import HeroSection from "../../styles/GradientBlob";
export default function MathPage() {
  const location = useLocation();
  const { examsData, title } = location.state || {};

  return (
    <section className="p-4">
      <HeroSection title={title} />

      {examsData && Object.keys(examsData).length > 0 ? (
        Object.keys(examsData)
          .sort((a, b) => b - a)
          .map((year) => {
            const examSessions = examsData[year];
            return (
              <section className="flex flex-col  ">
                <h2 className="text-2xl font-semibold mb-2">{year}</h2>

                <section
                  className="mathexams  p-4 rounded-lg mb-4 flex flex-row flex-wrap justify-center"
                  key={year}
                >
                  {Object.keys(examSessions).map((sessionName) => (
                    <section
                      key={sessionName}
                      className="flex-shrink-0 snap-center bg-white p-6 rounded-lg shadow-lg w-96 mb-4 z-20 relative h-180 flex flex-col justify-start items-center  ml-4"
                    >
                      <button
                        className="btn-solution bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 w-4/6"
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
                        className="btn-exam bg-green-500 text-white py-2 px-4  rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 w-4/6"
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
              </section>
            );
          })
      ) : (
        <p className="text-red-500">No exams available for this year.</p>
      )}
      <HeroSection title={""} />
    </section>
  );
}

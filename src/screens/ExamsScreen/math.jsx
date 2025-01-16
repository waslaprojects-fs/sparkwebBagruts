import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/tailwind.css";
import HeroSection from "../../styles/GradientBlob";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function MathPage() {
  const location = useLocation();
  const { examsData, title } = location.state || {};
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [popupContent, setPopupContent] = useState(""); // State to manage popup content

  const handleTriggerClick = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <section className="p-4">
      <HeroSection title={title} />

      {examsData && Object.keys(examsData).length > 0 ? (
        Object.keys(examsData)
          .sort((a, b) => b - a)
          .map((year) => {
            const examSessions = examsData[year];
            return (
              <section className="flex flex-col" key={year}>
                <h2 className="text-2xl font-semibold mb-2">{year}</h2>

                <section className="mathexams p-4 rounded-lg mb-4 flex flex-row flex-wrap justify-center">
                  {Object.keys(examSessions).map((sessionName) => (
                    <section
                      key={sessionName}
                      className="flex-shrink-0 snap-center bg-white p-6 rounded-lg shadow-lg w-96 mb-4 z-20 relative h-180 flex flex-col justify-start items-center ml-4"
                    >
                      <button
                        className="btn-solution bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 w-4/6"
                        onClick={() => {
                          if (examSessions[sessionName]?.sol) {
                            window.open(
                              examSessions[sessionName].sol,
                              "_blank"
                            );
                          } else {
                            handleTriggerClick(`${sessionName} Exam Details`);
                          }
                        }}
                      >
                        {`${sessionName} - حل`}
                      </button>
                      <button
                        className="btn-exam bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 w-4/6"
                        onClick={() =>
                          window.open(
                            examSessions[sessionName].ex || "#",
                            "_blank"
                          )
                        }
                      >
                        {`${sessionName} - نموذج`}
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

      {/* Popup Component */}
      {isPopupOpen && (
        <Popup
          open={isPopupOpen}
          onClose={closePopup}
          position="right center"
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1rem", // Equivalent to p-4
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Equivalent to shadow-lg
          }}
        >
          <div className="flex flex-col justify-center items-center ">
            <h3 className="flex flex-row justify-center items-center text-lg font-bold w-full">
              {" "}
              عذرًا
            </h3>
            {/* {popupContent}  */}
            <p className="flex flex-row justify-center items-center text-lg  w-full">
              الحل غير متوفر الان - قيد التجهيز
            </p>
            <button
              className="flex flex-row justify-center items-center  w-100 mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              onClick={closePopup}
            >
              اغلاق
            </button>
          </div>
        </Popup>
      )}

      <HeroSection title={""} />
    </section>
  );
}

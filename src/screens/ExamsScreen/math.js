import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles.css";

export default function MathPage() {
  const location = useLocation();
  const { examsData, title } = location.state || {}; // Dynamically get exams data and title

  return (
    <section>
      <h1>{title}</h1>
      {examsData && Object.keys(examsData).length > 0 ? (
        Object.keys(examsData)
          .sort((a, b) => b - a)
          .map((year) => {
            const examSessions = examsData[year];
            return (
              //  style={{
              //   backgroundColor: "pink",
              //   display: "flex",
              //   flexDirection: "column",
              // }}
              <section className="mathexams" key={year}>
                <h2>{year}</h2>
                {Object.keys(examSessions).map((sessionName) => (
                  <section key={sessionName}>
                    <button
                      className=""
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
                      className=""
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
        <p>No exams available for this year.</p>
      )}
    </section>
  );
}

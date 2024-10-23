import React from 'react';
import { useLocation } from 'react-router-dom';
import './exams.css';
export default function EX801() {
  const location = useLocation();
  const { exams801, title } = location.state || {}; // Destructure exams801 and title from state

  return (
    <section>
      <h1>{title}</h1> {/* Display the title */}
      {exams801 && exams801.map((exam, index) => {
        const year = Object.keys(exam)[0]; // Get the year (key)
        const examSessions = exam[year]; // Get the sessions object

        return (
          <section key={index}>
            <h2>{year}</h2> {/* Display the year */}
            {Object.keys(examSessions).map((sessionName, idx) => (
              <section key={idx}>
                <section>
                <button className="btn btn-success rounded-pill px-3 sol" onClick={() => window.open(examSessions[sessionName].ex, '_blank')}>
                    {`${sessionName} - حل`}
                </button>
                <button className="btn btn-success rounded-pill px-3 ex" onClick={() => window.open(examSessions[sessionName].sol, '_blank')}>
                    {`${sessionName} - نموذج`}
                </button>


                </section>
              </section>
            ))}
          </section>
        );
      })}
    </section>
  );
}

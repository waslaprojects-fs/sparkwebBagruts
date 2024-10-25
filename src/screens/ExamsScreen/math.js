import React from 'react';
import { useLocation } from 'react-router-dom';
import './exams.css';
import { exams806 } from './exams/806'; // Adjust the path as necessary

export default function MathPage() {
  const location = useLocation();
  const { title } = location.state || {}; // Get title from location state

  return (
    <section>
      <h1>{title}</h1>
      {Object.keys(exams806).length > 0 ? (
        Object.keys(exams806).map((year) => {
          const examSessions = exams806[year]; // Get the sessions for each year

          return (
            <section key={year}>
              <h2>{year}</h2>
              {Object.keys(examSessions).map((sessionName) => (
                <section key={sessionName}>
                  <button 
                    className="btn btn-success rounded-pill px-3 sol" 
                    onClick={() => window.open(examSessions[sessionName].sol || '#', '_blank')}
                  >
                    {`${sessionName} - حل`} {/* Solutions Button */}
                  </button>
                  <button 
                    className="btn btn-success rounded-pill px-3 ex" 
                    onClick={() => window.open(examSessions[sessionName].ex || '#', '_blank')}
                  >
                    {`${sessionName} - نموذج`} {/* Exams Button */}
                  </button>
                </section>
              ))}
            </section>
          );
        })
      ) : (
        <p>No exams available for this year.</p> // Message if no exams found
      )}
    </section>
  );
}

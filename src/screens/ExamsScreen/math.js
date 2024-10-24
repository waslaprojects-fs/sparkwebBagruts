import React from 'react';
import { useLocation } from 'react-router-dom';
import './exams.css';
import exams806 from './exams/806'; // Correctly import exams806

export default function MathPage() {
  const location = useLocation();
  const { exams801, title } = location.state || {};
  
  // Use exams806 if exams801 is not available
  // const examsData = exams801 || exams806;
  const examsData =exams806;
  return (
    <section>
      <h1>{title}</h1>
      {examsData && examsData.map((exam, index) => {
        const year = Object.keys(exam)[0]; // Get the year
        const examSessions = exam[year]; // Get the sessions

        return (
          <section key={index}>
            <h2>{year}</h2>
            {Object.keys(examSessions).map((sessionName, idx) => (
              <section key={idx}>
                <section>
                  <button 
                    className="btn btn-success rounded-pill px-3 sol" 
                    onClick={() => window.open(examSessions[sessionName].ex, '_blank')}
                  >
                    {`${sessionName} - حل`}
                  </button>
                  <button 
                    className="btn btn-success rounded-pill px-3 ex" 
                    onClick={() => window.open(examSessions[sessionName].sol, '_blank')}
                  >
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

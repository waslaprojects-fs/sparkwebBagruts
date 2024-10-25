import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './exams.css';
import { fetchBagrutURLs } from './exams/806';

export default function MathPage() {
  const location = useLocation();
  const [bagrutURLs, setBagrutURLs] = useState([]); // State to hold fetched URLs
  const defaultSession = {
    "صيف موعد ب": { ex: null, sol: null },
    "صيف موعد أ": { ex: null, sol: null },
    "شتاء": { ex: null, sol: null }
  };

  useEffect(() => {
    const getExams = async () => {
      try {
        const urls = await fetchBagrutURLs();
        setBagrutURLs(urls); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching Bagrut URLs:', error);
      }
    };

    getExams(); // Call the function when the component mounts
  }, []);

  const { title } = location.state || {}; // Get title from location state

  return (
    <section>
      <h1>{title}</h1>
      {bagrutURLs.length > 0 ? (
        bagrutURLs.map((exam, index) => {
          const year = Object.keys(exam)[0]; // Get the year
          const examSessions = exam[year] || defaultSession; // Get the sessions or default

          return (
            <section key={index}>
              <h2>{year}</h2>
              {Object.keys(examSessions).map((sessionName, idx) => (
                <section key={idx}>
                  <section>
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
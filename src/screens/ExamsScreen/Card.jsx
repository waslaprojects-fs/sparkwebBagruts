import React from "react";
import exams801 from "./exams/801";
import exams802 from "./exams/802";
import exams803 from "./exams/803";
import exams804 from "./exams/804";
import exams805 from "./exams/805";
import exams806 from "./exams/806";
import exams807 from "./exams/807";
import { useNavigate } from "react-router-dom";

export default function Card({ title, img, buttons }) {
  const navigate = useNavigate();

  const handleClick = (num, title, examsData) => {
    console.log(examsData);
    navigate(`/exams${num}`, { state: { examsData, title } });
  };
  return (
    <div className="flex-shrink-0 snap-center bg-white p-6 rounded-lg shadow-lg w-96 ml-4 mb-4 bg-white ">
      <img className="rounded-t-lg" src={img} alt="" />

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>

        <section className="flex flex-col ">
          {buttons.map((btn) => {
            {
              console.log(btn);
            }
            return (
              <button
                className="bg-green-300 mb-2 h-10 rounded-lg"
                onClick={() => {
                  handleClick(802, "نماذج 802", exams802);
                }}
              >
                {btn}
              </button>
            );
          })}
        </section>
      </div>
    </div>
  );
}

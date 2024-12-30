import { useNavigate } from "react-router-dom";
import exams801 from "./exams/801";
import exams802 from "./exams/802";
import exams803 from "./exams/803";
import exams804 from "./exams/804";
import exams805 from "./exams/805";
import exams806 from "./exams/806";
import exams807 from "./exams/807";
export default function Card({ title, img, buttons }) {
  const navigate = useNavigate();

  const handleClick = (num, title, examsData) => {
    console.log(examsData);
    navigate(`/exams${num}`, { state: { examsData, title } });
  };

  return (
    <div className="flex-shrink-0 snap-center bg-white p-6 rounded-lg shadow-lg w-96 ml-4 mb-4 z-20 relative h-180 flex flex-col justify-start items-center ">
      <img
        className="rounded-t-lg object-contain w-full h-48"
        src={img}
        alt={title}
      />

      <div className="p-5 flex-grow w-full font-bold">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 font-messiri">
            {title}
          </h5>
        </a>
        <section className="flex flex-col items-center w-full font-semibold">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className="bg-orange-300 mb-2 h-10 w-5/6 rounded-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:shadow-lg"
              onClick={() => {
                console.log("hi");
                handleClick(802, "نماذج 802", exams802);
              }}
            >
              {btn}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}

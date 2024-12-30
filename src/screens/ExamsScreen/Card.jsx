import { useNavigate } from "react-router-dom";

export default function Card({ title, img, buttons }) {
  const navigate = useNavigate();

  const handleClick = (num, title, examsData) => {
    console.log(examsData);
    navigate(`/exams${num}`, { state: { examsData, title } });
  };

  return (
    <div className="flex-shrink-0 snap-center bg-white p-6 rounded-lg shadow-lg w-96 ml-4 mb-4 z-20 relative h-180 flex flex-col items-center justify-start">
      {" "}
      <img
        className="rounded-t-lg object-contain size-3/5"
        src={img}
        alt={title}
      />
      <div className="p-5 flex-grow">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <section className="flex flex-col">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className="bg-green-300 mb-2 h-10 rounded-lg"
              onClick={() => {
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

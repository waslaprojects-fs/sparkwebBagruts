import { useNavigate } from "react-router-dom";
import exams801 from "./exams/801";
import exams802 from "./exams/802";
import exams803 from "./exams/803";
import exams804 from "./exams/804";
import exams805 from "./exams/805";
import exams806 from "./exams/806";
import exams807 from "./exams/807";

const EXAM_MODULES = {
  801: exams801,
  802: exams802,
  803: exams803,
  804: exams804,
  805: exams805,
  806: exams806,
  807: exams807,
};

const NAVIGATION_ROUTES = {
  "فيزياء": {
    "ميكانيكا": "/physics/mechanics",
    "كهرباء": "/physics/electricity",
  },
  "علم الحاسوب": {
    "جميع النماذج": "/cs/all",
  },
  "إلكترونيكا": {
    "جميع النماذج": "/electronics/all",
  },
};

export default function Card({ title, img, buttons }) {
  const navigate = useNavigate();

  const handleClick = async (num, label, examsPromise) => {
    try {
      const examsData = await examsPromise;
      navigate(`/exams${num}`, { state: { examsData, title: label } });
    } catch (error) {
      console.error("Error resolving exam data:", error);
    }
  };

  return (
    <article className="group relative flex w-full max-w-sm flex-shrink-0 snap-center flex-col items-center overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-100 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex h-44 w-full items-center justify-center bg-orange-50">
        <img
          className="h-28 w-28 object-contain"
          src={img}
          alt={title}
        />
      </div>

      <div className="relative flex w-full flex-grow flex-col gap-4 px-6 py-8">
        <h5 className="text-2xl font-bold text-gray-900 font-messiri text-right">
          {title}
        </h5>
        <section className="flex flex-col items-stretch gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2 text-sm font-semibold text-white shadow hover:shadow-md"
              onClick={() => {
                if (typeof btn !== "number") {
                  const routeMap = NAVIGATION_ROUTES[title];
                  const route = routeMap?.[btn];
                  
                  if (route) {
                    navigate(route);
                  } else {
                    navigate("/examsScreen", { state: { category: title } });
                  }
                  return;
                }

                const dataPromise = EXAM_MODULES[btn];
                if (dataPromise) {
                  handleClick(btn, `نموذج - ${btn}`, dataPromise);
                }
              }}
            >
              {btn}
            </button>
          ))}
        </section>
      </div>
    </article>
  );
}

import { useNavigate } from "react-router-dom";
import exams801 from "./exams/801";
import exams802 from "./exams/802";
import exams803 from "./exams/803";
import exams804 from "./exams/804";
import exams805 from "./exams/805";
import exams806 from "./exams/806";
import exams807 from "./exams/807";
import mechanicsExams from "./exams/mechanics";

const EXAM_MODULES = {
  801: exams801,
  371: exams802,
  802: exams802,
  372: exams803,
  803: exams803,
  471: exams804,
  804: exams804,
  472: exams805,
  805: exams805,
  571: exams806,
  806: exams806,
  572: exams807,
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
    <article className="group relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-orange-100/50 ring-1 ring-orange-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-200/50 hover:ring-orange-200">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-amber-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.1),transparent)]" />
        <img
          className="relative z-10 h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-110"
          src={img}
          alt={title}
        />
      </div>

      <div className="relative flex flex-grow flex-col gap-5 px-6 py-6">
        <h5 className="text-2xl font-bold text-gray-900 font-messiri text-center">
          {title}
        </h5>
        <section className="flex flex-col items-stretch gap-2.5">
          {buttons.map((btn) => (
            <button
              key={btn}
              className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-orange-600 hover:to-amber-500 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              onClick={async () => {
                if (typeof btn !== "number") {
                  if (title === "فيزياء" && btn === "ميكانيكا") {
                    try {
                      const examsData = await mechanicsExams;
                      if (examsData && Object.keys(examsData).length > 0) {
                        navigate("/physics/mechanics", { state: { examsData, title: "ميكانيكا" } });
                      } else {
                        console.error("Mechanics exams data is empty");
                      }
                    } catch (error) {
                      console.error("Error loading mechanics exams:", error);
                    }
                    return;
                  }
                  
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
              <span className="relative z-10">{btn}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            </button>
          ))}
        </section>
      </div>
    </article>
  );
}

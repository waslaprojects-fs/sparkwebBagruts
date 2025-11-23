import { useNavigate } from "react-router-dom";
import exams802 from "./exams/802";
import exams803 from "./exams/803";
import exams804 from "./exams/804";
import exams801 from "./exams/801";
import exams806 from "./exams/806";
import exams807 from "./exams/807";
import exams805 from "./exams/805";

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
                  if (title === "فيزياء") {
                    if (btn === "ميكانيكا") {
                      navigate("/physics/mechanics");
                    } else if (btn === "كهرباء") {
                      navigate("/physics/electricity");
                    } else {
                      navigate("/examsScreen", { state: { category: title } });
                    }
                  } else if (title === "علم الحاسوب" && btn === "جميع النماذج") {
                    navigate("/cs/all");
                  } else if (title === "إلكترونيكا" && btn === "جميع النماذج") {
                    navigate("/electronics/all");
                  } else {
                    navigate("/examsScreen", { state: { category: title } });
                  }
                  return;
                }

                let dataPromise;

                if (btn === 801) {
                  dataPromise = exams801;
                } else if (btn === 802) {
                  dataPromise = exams802;
                } else if (btn === 803) {
                  dataPromise = exams803;
                } else if (btn === 804) {
                  dataPromise = exams804;
                } else if (btn === 805) {
                  dataPromise = exams805;
                } else if (btn === 806) {
                  dataPromise = exams806;
                } else if (btn === 807) {
                  dataPromise = exams807;
                }

                handleClick(btn, `نموذج - ${btn}`, dataPromise);
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

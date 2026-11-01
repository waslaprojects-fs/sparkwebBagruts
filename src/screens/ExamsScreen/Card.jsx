import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadPublicExamTree } from "../../content/publicContent.js";
import { formatStorageError } from "../../content/transfer.js";

const MATH_ROUTES = {
  801: { categoryId: "801", route: "/exams/exams801" },
  371: { categoryId: "802", route: "/exams371" },
  372: { categoryId: "803", route: "/exams372" },
  471: { categoryId: "804", route: "/exams471" },
  472: { categoryId: "805", route: "/exams472" },
  571: { categoryId: "806", route: "/exams571" },
  572: { categoryId: "807", route: "/exams572" },
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
  const [pendingButton, setPendingButton] = useState(null);

  const openCategory = async (button, categoryId, route, label) => {
    setPendingButton(button);
    try {
      const examsData = await loadPublicExamTree(categoryId);
      navigate(route, { state: { examsData, title: label } });
    } catch (error) {
      navigate(route, {
        state: {
          loadError: formatStorageError(error),
          title: label,
        },
      });
    } finally {
      setPendingButton(null);
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
              disabled={pendingButton === btn}
              className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-orange-600 hover:to-amber-500 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
              onClick={async () => {
                if (title === "فيزياء" && btn === "ميكانيكا") {
                  openCategory(btn, "mechanics", "/physics/mechanics", "ميكانيكا");
                  return;
                }
                if (title === "فيزياء" && btn === "كهرباء") {
                  openCategory(btn, "electricity", "/physics/electricity", "كهرباء");
                  return;
                }
                if (typeof btn === "number" && MATH_ROUTES[btn]) {
                  const target = MATH_ROUTES[btn];
                  openCategory(btn, target.categoryId, target.route, `نموذج - ${btn}`);
                  return;
                }

                const routeMap = NAVIGATION_ROUTES[title];
                const route = routeMap?.[btn];
                navigate(route || "/examsScreen", route ? undefined : { state: { category: title } });
              }}
            >
              <span className="relative z-10">{pendingButton === btn ? "جارٍ التحميل…" : btn}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            </button>
          ))}
        </section>
      </div>
    </article>
  );
}

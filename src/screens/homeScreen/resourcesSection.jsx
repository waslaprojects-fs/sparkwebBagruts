import { useEffect, useState } from "react";
import "../../styles/tailwind.css";

const registrationLink =
  "https://sparkpsy.smartedu.me/lead/form/insg?logo=1&style=1&fbclid=IwY2xjawGW7qJleHRuA2FlbQIxMAABHVvmElswdaUkTK7BpsX2qT1W9FWJjz_cin-ua4Kr01Qfil7VDbwsZN_Lww_aem_HocCR9vWiM-ZbI-HGXh6Vw";

const resourceConfig = [
  {
    module: () => import("../ExamsScreen/exams/801"),
    title: "رياضيات 801",
    term: "صيف موعد أ",
  },
  {
    module: () => import("../ExamsScreen/exams/802"),
    title: "رياضيات 802",
    term: "صيف موعد ب",
  },
  {
    module: () => import("../ExamsScreen/exams/803"),
    title: "رياضيات 803",
    term: "شتاء",
  },
];

export default function ResourcesSection() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      try {
        const loaded = await Promise.all(
          resourceConfig.map(async (item) => {
            const module = await item.module();
            const data = await module.default;
            const years = Object.keys(data || {}).map(Number).filter(Boolean);

            if (!years.length) {
              return {
                title: item.title,
                year: "قريبًا",
                exam: "#",
                solution: null,
              };
            }

            const latestYear = Math.max(...years);
            const latestTerm = data?.[latestYear]?.[item.term];

            return {
              title: item.title,
              year: latestYear,
              exam: latestTerm?.ex ?? "#",
              solution: latestTerm?.sol ?? null,
            };
          })
        );

        if (mounted) {
          setResources(loaded);
        }
      } catch (error) {
        console.error("Failed to load resources", error);
      }
    }

    loadResources();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 text-right lg:px-8">
      <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            أحدث مصادر التمرن
          </h2>
          <p className="mt-2 max-w-xl text-sm text-gray-600">
            جميع الروابط تقودك مباشرةً إلى ملفات PDF على Google Cloud الخاصة
            بمعهد Spark كما اعتدت عليها.
          </p>
        </div>
        <a
          href={registrationLink}
          className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600"
        >
          انضم إلى المجتمع
        </a>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={`${resource.title}-${resource.year}`}
            className="flex flex-col rounded-3xl border border-orange-100 bg-white p-6 shadow-sm shadow-orange-100"
          >
            <span className="text-sm font-semibold text-orange-500">
              {resource.year}
            </span>
            <h3 className="mt-2 text-xl font-bold text-gray-900">
              {resource.title}
            </h3>
            <p className="mt-3 text-sm text-gray-600">
              {`نماذج ${resource.title} - ${resource.year} ${
                resource.exam.includes("alt=media") ? "(PDF مباشر)" : ""
              }`}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <a
                href={resource.exam}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 font-semibold text-white transition hover:shadow-md"
              >
                تحميل الامتحان
              </a>
              <a
                href={resource.solution || "#"}
                className={`inline-flex items-center justify-center rounded-full px-4 py-2 font-semibold transition ${
                  resource.solution
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                    : "pointer-events-none bg-gray-100 text-gray-400"
                }`}
              >
                {resource.solution ? "تحميل الحل" : "الحل متوفر قريبًا"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/tailwind.css";
import HeroSection from "../../styles/GradientBlob";

const statusBadge = (hasSolution) =>
  hasSolution
    ? "bg-green-100 text-green-700 border border-green-200"
    : "bg-gray-100 text-gray-500 border border-gray-200";

export default function MathPage() {
  const location = useLocation();
  const { examsData, title } = location.state || {};
  const [yearQuery, setYearQuery] = useState("");

  const years = useMemo(() => {
    if (!examsData) return [];
    return Object.keys(examsData)
      .map(Number)
      .filter((year) => !Number.isNaN(year))
      .sort((a, b) => b - a);
  }, [examsData]);

  const filteredYears = useMemo(() => {
    if (!years.length) return [];
    const query = yearQuery.trim();
    if (!query) return years;
    return years.filter((year) => year.toString().includes(query));
  }, [years, yearQuery]);

  const isMechanics = title === "ميكانيكا";

  const allCards = useMemo(() => {
    if (!isMechanics || !examsData) return [];
    const cards = [];
    filteredYears.forEach((year) => {
      const sessions = examsData[year] ?? {};
      Object.entries(sessions).forEach(([sessionName, sessionData]) => {
        cards.push({ year, sessionName, sessionData });
      });
    });
    return cards;
  }, [isMechanics, examsData, filteredYears]);

  return (
    <section className="bg-white font-messiri">
      <HeroSection title={title || "نماذج التمرّن"} />

      <div className="mx-auto max-w-6xl px-6 mt-4 py-12 lg:px-8">
        <header className="flex flex-col items-end gap-4 text-right">
          <div className="mt-4 flex w-full flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              ابحث حسب السنة
            </label>
            <div className="flex w-full max-w-xs items-center gap-3">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={yearQuery}
                onChange={(e) => setYearQuery(e.target.value)}
                placeholder="مثال: 2024"
                aria-label="بحث عن سنة الامتحان"
                className="relative z-10 w-full rounded-full border border-orange-100 bg-white px-4 py-2 text-right text-sm shadow-sm focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              {yearQuery && (
                <button
                  type="button"
                  onClick={() => setYearQuery("")}
                  className="whitespace-nowrap rounded-full border border-orange-200 px-4 py-2 text-xs font-semibold text-orange-700 transition hover:bg-orange-50"
                >
                  إعادة الضبط
                </button>
              )}
            </div>
          </div>
        </header>

        {years.length === 0 && (
          <div className="mt-12 rounded-3xl border border-orange-100 bg-orange-50 p-8 text-right text-sm text-orange-700">
            لا تتوفر نماذج لهذا المسار حاليًا. الرجاء العودة لاحقًا أو التواصل مع
            فريق Spark لمزيد من التفاصيل.
          </div>
        )}

        {filteredYears.length === 0 && years.length > 0 && (
          <div className="mt-12 rounded-3xl border border-orange-100 bg-orange-50 p-8 text-right text-sm text-orange-700">
            لا توجد سنوات مطابقة لبحثك. جرّب رقم سنة مختلف.
          </div>
        )}

        {filteredYears.length > 0 && (
          <>
            {isMechanics ? (
              <div className="mt-12 grid gap-6 text-right sm:grid-cols-2 lg:grid-cols-3">
                {allCards.map(({ year, sessionName, sessionData }) => {
                  const hasSolution = Boolean(sessionData?.sol);
                  return (
                    <article
                      key={`${year}-${sessionName}`}
                      className="flex h-full flex-col justify-between rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-6 shadow-sm shadow-orange-100"
                    >
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {sessionName === "عادي"
                            ? year
                            : sessionName === "موعد خاص" || sessionName === "موعد خاصّ"
                            ? `${year} ${sessionName}`
                            : sessionName}
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                            hasSolution
                          )}`}
                        >
                          {hasSolution ? "يتضمّن حلًا كاملًا" : "الحل قيد التحضير"}
                        </span>
                      </div>
                      <div className="mt-6 flex flex-col gap-3 text-sm">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 font-semibold text-white shadow hover:-translate-y-0.5 hover:shadow-md transition"
                          onClick={() =>
                            window.open(sessionData?.ex || "#", "_blank")
                          }
                        >
                          فتح نموذج الامتحان ↗
                        </button>
                        <button
                          type="button"
                          className={`inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold transition ${
                            hasSolution
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                              : "cursor-not-allowed bg-gray-100 text-gray-400"
                          }`}
                          onClick={() => {
                            if (hasSolution) {
                              window.open(sessionData.sol, "_blank");
                            }
                          }}
                        >
                          {hasSolution ? "فتح الحل ↗" : "الحل غير متوفر حالياً"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-12 space-y-10">
                {filteredYears.map((year) => {
                  const sessions = examsData?.[year] ?? {};
                  const sessionEntries = Object.entries(sessions);

                  return (
                    <section
                      key={year}
                      className="rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-50"
                    >
                      <div className="flex flex-col items-end gap-2 border-b border-orange-50 px-6 py-4 text-right sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{year}</h2>
                        </div>
                      </div>
                      <div className="grid gap-6 px-6 py-8 text-right sm:grid-cols-2 lg:grid-cols-3">
                        {sessionEntries.map(([sessionName, sessionData]) => {
                          const hasSolution = Boolean(sessionData?.sol);
                          return (
                            <article
                              key={sessionName}
                              className="flex h-full flex-col justify-between rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-6 shadow-sm shadow-orange-100"
                            >
                              <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {sessionName === "عادي"
                                    ? year
                                    : sessionName === "موعد خاص" || sessionName === "موعد خاصّ"
                                    ? `${year} ${sessionName}`
                                    : sessionName}
                                </h3>
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                                    hasSolution
                                  )}`}
                                >
                                  {hasSolution ? "يتضمّن حلًا كاملًا" : "الحل قيد التحضير"}
                                </span>
                              </div>
                              <div className="mt-6 flex flex-col gap-3 text-sm">
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 font-semibold text-white shadow hover:-translate-y-0.5 hover:shadow-md transition"
                                  onClick={() =>
                                    window.open(sessionData?.ex || "#", "_blank")
                                  }
                                >
                                  فتح نموذج الامتحان ↗
                                </button>
                                <button
                                  type="button"
                                  className={`inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold transition ${
                                    hasSolution
                                      ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                      : "cursor-not-allowed bg-gray-100 text-gray-400"
                                  }`}
                                  onClick={() => {
                                    if (hasSolution) {
                                      window.open(sessionData.sol, "_blank");
                                    }
                                  }}
                                >
                                  {hasSolution ? "فتح الحل ↗" : "الحل غير متوفر حالياً"}
                                </button>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
import { useMemo, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/tailwind.css";
import HeroSection from "../../styles/GradientBlob";
import exams801 from "./exams/801";
import exams802 from "./exams/802";
import exams803 from "./exams/803";
import exams804 from "./exams/804";
import exams805 from "./exams/805";
import exams806 from "./exams/806";
import exams807 from "./exams/807";
import mechanicsExams from "./exams/mechanics";
import electricityExams from "./exams/electricity";

const statusBadge = (hasSolution) =>
  hasSolution
    ? "bg-green-100 text-green-700 border border-green-200"
    : "bg-gray-100 text-gray-500 border border-gray-200";

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

export default function MathPage() {
  const location = useLocation();
  const { examsData: stateExamsData, title: stateTitle } = location.state || {};
  const [yearQuery, setYearQuery] = useState("");
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const heroTitleRef = useRef(null);
  const [examsData, setExamsData] = useState(stateExamsData);
  const [title, setTitle] = useState(stateTitle);

  // Extract exam number from URL
  const examNumber = useMemo(() => {
    // Try to get from URL pathname (e.g., /exams571 -> 571)
    const pathMatch = location.pathname.match(/exams(\d+)/);
    if (pathMatch) {
      return pathMatch[1];
    }
    // Check for physics routes
    if (location.pathname.includes("/physics/mechanics")) {
      return "mechanics";
    }
    if (location.pathname.includes("/physics/electricity")) {
      return "electricity";
    }
    return null;
  }, [location.pathname]);

  // Load exam data from URL if state is not available
  useEffect(() => {
    if (stateExamsData) {
      // Data already provided via state, use it
      setExamsData(stateExamsData);
      setTitle(stateTitle || `نموذج - ${examNumber}`);
      return;
    }

    // Load data based on URL
    if (examNumber === "mechanics") {
      mechanicsExams.then((data) => {
        if (data && Object.keys(data).length > 0) {
          setExamsData(data);
          setTitle("ميكانيكا");
        }
      });
    } else if (examNumber === "electricity") {
      electricityExams.then((data) => {
        if (data && Object.keys(data).length > 0) {
          setExamsData(data);
          setTitle("كهرباء");
        }
      });
    } else if (examNumber && EXAM_MODULES[examNumber]) {
      const examModule = EXAM_MODULES[examNumber];
      examModule.then((data) => {
        if (data && Object.keys(data).length > 0) {
          setExamsData(data);
          setTitle(`نموذج - ${examNumber}`);
        }
      });
    }
  }, [examNumber, stateExamsData, stateTitle]);

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

  const isMechanics = title === "ميكانيكا" || title === "كهرباء";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky header when title is not visible (not intersecting)
        setShowStickyHeader(!entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "-20px 0px 0px 0px", // Add some margin for better UX
      }
    );

    if (heroTitleRef.current) {
      observer.observe(heroTitleRef.current);
    }

    return () => {
      if (heroTitleRef.current) {
        observer.unobserve(heroTitleRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-white font-messiri">
      {/* Sticky Header */}
      <div
        className={`fixed top-28 left-0 right-0 z-30 flex items-center justify-center py-3 transition-all duration-300 ${
          showStickyHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <p className={`text-base font-semibold font-messiri text-center transition-all duration-300 px-6 py-2 rounded-full shadow-md ${
          showStickyHeader 
            ? "text-white bg-gradient-to-r from-orange-500 to-amber-400" 
            : "text-gray-700 bg-white/95 backdrop-blur-sm border border-orange-100"
        }`}>
          {title || `نموذج - ${examNumber}`}
        </p>
      </div>

      <div ref={heroTitleRef}>
        <HeroSection title={title || "نماذج التمرّن"} />
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-4 py-12 lg:px-8">
        <header className="flex flex-col items-end gap-4 text-right">
          <div className="mt-4 flex w-full flex-col items-end gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-xs flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
              <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                ابحث حسب السنة
              </label>
              <div className="flex w-full items-center gap-3">
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
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o/diverse%2FAR-5-MATH-Formula_NEW.pdf?alt=media&token=b36e3379-9427-471d-a7cb-497c897a28e2",
                  "_blank"
                )
              }
              className="whitespace-nowrap rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              ورقة القوانين
            </button>
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
                            : `${year} ${sessionName}`}
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
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold transition cursor-not-allowed bg-gray-100 text-gray-400"
                          disabled
                        >
                          الحل الكامل - غير متوفر الآن
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
                                    : `${year} ${sessionName}`}
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
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold transition cursor-not-allowed bg-gray-100 text-gray-400"
                                  disabled
                                >
                                  الحل الكامل - غير متوفر الآن
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
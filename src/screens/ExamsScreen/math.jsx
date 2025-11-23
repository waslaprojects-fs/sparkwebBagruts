import { useMemo } from "react";
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

  const years = useMemo(() => {
    if (!examsData) return [];
    return Object.keys(examsData)
      .map(Number)
      .filter((year) => !Number.isNaN(year))
      .sort((a, b) => b - a);
  }, [examsData]);

  return (
    <section className="bg-white font-messiri">
      <HeroSection title={title || "نماذج التمرّن"} />

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <header className="flex flex-col items-end gap-4 text-right">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            اختر السنة والجلسة لبدء التحميل
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-gray-600">
            جميع الروابط أدناه هي نفس روابط PDF الأصلية المخزّنة على Google
            Cloud الخاصة بمعهد Spark. بإمكانك فتح نموذج الامتحان أو الحل من خلال
            الأزرار المخصّصة لكل جلسة.
          </p>
        </header>

        {years.length === 0 && (
          <div className="mt-12 rounded-3xl border border-orange-100 bg-orange-50 p-8 text-right text-sm text-orange-700">
            لا تتوفر نماذج لهذا المسار حاليًا. الرجاء العودة لاحقًا أو التواصل مع
            فريق Spark لمزيد من التفاصيل.
          </div>
        )}

        <div className="mt-12 space-y-10">
          {years.map((year) => {
            const sessions = examsData?.[year] ?? {};
            const sessionEntries = Object.entries(sessions);

            return (
              <section
                key={year}
                className="rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-50"
              >
                <div className="flex flex-col items-end gap-4 border-b border-orange-50 px-6 py-8 text-right sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
                    <p className="mt-2 text-sm text-gray-500">
                      {`نماذج ${title || ""} - ${year}`}{" "}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
                    {`${sessionEntries.length} جلسات متاحة`}
                  </span>
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
                            {sessionName}
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
      </div>
    </section>
  );
}
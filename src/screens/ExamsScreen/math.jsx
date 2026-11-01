import { useMemo, useState, useRef, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/tailwind.css";
import HeroSection from "../../styles/GradientBlob";
import SEO from "../../components/SEO";
import { categoryFromPathname } from "../../content/categories.js";
import { loadPublicExamTree } from "../../content/publicContent.js";
import { formatStorageError } from "../../content/transfer.js";

const statusBadge = (hasSolution) =>
  hasSolution
    ? "bg-green-100 text-green-700 border border-green-200"
    : "bg-gray-100 text-gray-500 border border-gray-200";

function publicTitle(pathname) {
  if (pathname.includes("/physics/mechanics")) return "ميكانيكا";
  if (pathname.includes("/physics/electricity")) return "كهرباء";
  const match = pathname.match(/exams(\d+)/);
  return match ? `نموذج - ${match[1]}` : "نماذج التمرّن";
}

export default function MathPage() {
  const location = useLocation();
  const category = categoryFromPathname(location.pathname);
  const stateExamsData = location.state?.examsData;
  const stateTitle = location.state?.title;
  const stateLoadError = location.state?.loadError;
  const [yearQuery, setYearQuery] = useState("");
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const heroTitleRef = useRef(null);
  const [examsData, setExamsData] = useState(stateExamsData || null);
  const [title, setTitle] = useState(stateTitle || publicTitle(location.pathname));
  const [loadStatus, setLoadStatus] = useState(stateLoadError ? "error" : stateExamsData ? "ready" : "loading");
  const [loadError, setLoadError] = useState(stateLoadError || "");
  const [reloadToken, setReloadToken] = useState(0);
  const [pdfViewerUrl, setPdfViewerUrl] = useState(null);
  const [pdfViewerLabel, setPdfViewerLabel] = useState("");
  const [pdfViewerAnchor, setPdfViewerAnchor] = useState(null); // null | "formula" | { year, sessionName }

  const closePdfViewer = () => {
    setPdfViewerUrl(null);
    setPdfViewerLabel("");
    setPdfViewerAnchor(null);
  };

  const openPdfInNewTab = (url) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const pdfViewerBlock = (
    <div className="mb-6 rounded-2xl border border-orange-200 bg-white shadow-lg shadow-orange-100 overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-orange-100 bg-orange-50 px-4 py-3 text-right">
        <button
          type="button"
          onClick={closePdfViewer}
          className="rounded-full p-2 text-gray-600 transition hover:bg-orange-200 hover:text-orange-800"
          aria-label="إغلاق عارض PDF"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <span className="font-semibold text-gray-800">{pdfViewerLabel || "عرض PDF"}</span>
      </div>
      <div className="relative w-full" style={{ minHeight: "70vh" }}>
        <iframe
          title={pdfViewerLabel || "PDF"}
          src={pdfViewerUrl}
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );

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

  useEffect(() => {
    let cancelled = false;
    const titleForPage = stateTitle || publicTitle(location.pathname);

    async function run() {
      if (reloadToken === 0 && stateLoadError) {
        setTitle(titleForPage);
        setExamsData(null);
        setLoadError(stateLoadError);
        setLoadStatus("error");
        return;
      }
      if (reloadToken === 0 && stateExamsData) {
        setExamsData(stateExamsData);
        setTitle(titleForPage);
        setLoadError("");
        setLoadStatus("ready");
        return;
      }
      setExamsData(null);
      if (!category) {
        setLoadStatus("error");
        setLoadError("هذا المسار غير مرتبط بمجلد في التخزين.");
        return;
      }
      setLoadStatus("loading");
      try {
        const data = await loadPublicExamTree(category.id, { force: reloadToken > 0 });
        if (cancelled) return;
        setExamsData(data);
        setTitle(titleForPage);
        setLoadError("");
        setLoadStatus("ready");
      } catch (error) {
        if (cancelled) return;
        setExamsData(null);
        setLoadError(formatStorageError(error));
        setLoadStatus("error");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.key, reloadToken, category, stateExamsData, stateTitle, stateLoadError]);

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

  const isPhysics = category?.kind === "physics";
  const solutionsSupported = category?.solutionsSupported === true;

  const { seoTitle, seoDescription, breadcrumbs } = useMemo(() => {
    const path = location.pathname;
    const baseBreadcrumbs = [
      { name: "الرئيسية", url: "/" },
      { name: "قسم البجروت", url: "/examsScreen" },
    ];
    if (path.includes("/physics/mechanics")) {
      return {
        seoTitle: "ميكانيكا",
        seoDescription: "نماذج بجروت فيزياء ميكانيكا مع حلول وتمارين. معهد سبارك الأكاديمي.",
        breadcrumbs: [...baseBreadcrumbs, { name: "ميكانيكا", url: "/physics/mechanics" }],
      };
    }
    if (path.includes("/physics/electricity")) {
      return {
        seoTitle: "كهرباء",
        seoDescription: "نماذج بجروت فيزياء كهرباء مع حلول وتمارين. معهد سبارك الأكاديمي.",
        breadcrumbs: [...baseBreadcrumbs, { name: "كهرباء", url: "/physics/electricity" }],
      };
    }
    const pathMatch = path.match(/exams(\d+)/);
    const num = pathMatch ? pathMatch[1] : null;
    if (num) {
      return {
        seoTitle: `رياضيات ${num}`,
        seoDescription: `نماذج بجروت رياضيات ${num} مع حلول وتمارين. معهد سبارك الأكاديمي.`,
        breadcrumbs: [...baseBreadcrumbs, { name: `رياضيات ${num}`, url: path }],
      };
    }
    return {
      seoTitle: "نماذج التمرّن",
      seoDescription: "نماذج بجروت رياضيات وفيزياء مع حلول وتمارين. معهد سبارك الأكاديمي.",
      breadcrumbs: baseBreadcrumbs,
    };
  }, [location.pathname]);

  const allCards = useMemo(() => {
    if (!isPhysics || !examsData) return [];
    const cards = [];
    filteredYears.forEach((year) => {
      const sessions = examsData[year] ?? {};
      Object.entries(sessions).forEach(([sessionName, sessionData]) => {
        cards.push({ year, sessionName, sessionData });
      });
    });
    return cards;
  }, [isPhysics, examsData, filteredYears]);

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
      <SEO title={seoTitle} description={seoDescription} breadcrumbs={breadcrumbs} />
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
        {/* PDF viewer above header when "ورقة القوانين" is opened */}
        {pdfViewerUrl && pdfViewerAnchor === "formula" && pdfViewerBlock}

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
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setReloadToken((value) => value + 1)}
                className="whitespace-nowrap rounded-full border border-orange-200 px-5 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
              >
                تحديث النماذج
              </button>
              <button
                type="button"
                onClick={() => {
                  setPdfViewerLabel("ورقة القوانين");
                  setPdfViewerAnchor("formula");
                  setPdfViewerUrl(
                    "https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o/diverse%2FAR-4-MATH-Formula_NEW.pdf?alt=media&token=0d01ccae-bee3-47ce-9626-c6e11350ce45"
                  );
                }}
                className="whitespace-nowrap rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                ورقة القوانين
              </button>
            </div>
          </div>
        </header>

        {loadStatus === "loading" && (
          <div className="mt-12 rounded-3xl border border-orange-100 bg-orange-50 p-8 text-right text-sm text-orange-700">
            جارٍ تحميل النماذج من التخزين…
          </div>
        )}

        {loadStatus === "error" && (
          <div className="mt-12 rounded-3xl border border-red-100 bg-red-50 p-8 text-right text-sm text-red-700">
            <p className="font-semibold">تعذّر تحميل النماذج.</p>
            <p className="mt-2">{loadError}</p>
            <button
              type="button"
              onClick={() => setReloadToken((value) => value + 1)}
              className="mt-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 font-semibold text-white"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {loadStatus === "ready" && years.length === 0 && (
          <div className="mt-12 rounded-3xl border border-orange-100 bg-orange-50 p-8 text-right text-sm text-orange-700">
            لا تتوفر نماذج لهذا المسار حاليًا. الرجاء العودة لاحقًا أو التواصل مع
            فريق Spark لمزيد من التفاصيل.
          </div>
        )}

        {loadStatus === "ready" && filteredYears.length === 0 && years.length > 0 && (
          <div className="mt-12 rounded-3xl border border-orange-100 bg-orange-50 p-8 text-right text-sm text-orange-700">
            لا توجد سنوات مطابقة لبحثك. جرّب رقم سنة مختلف.
          </div>
        )}

        {loadStatus === "ready" && filteredYears.length > 0 && (
          <>
            {isPhysics ? (
              <div className="mt-12 grid gap-6 text-right sm:grid-cols-2 lg:grid-cols-3">
                {allCards.map(({ year, sessionName, sessionData }) => {
                  const hasExam = Boolean(sessionData?.ex);
                  const isAnchor = pdfViewerAnchor?.year === year && pdfViewerAnchor?.sessionName === sessionName;
                  return (
                    <Fragment key={`${year}-${sessionName}`}>
                      {isAnchor && pdfViewerUrl && <div className="sm:col-span-2 lg:col-span-3">{pdfViewerBlock}</div>}
                      <article
                        className="flex h-full flex-col justify-between rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-6 shadow-sm shadow-orange-100"
                      >
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {sessionName === "عادي"
                              ? year
                              : `${year} ${sessionName}`}
                          </h3>
                        </div>
                        <div className="mt-6 flex flex-col gap-3 text-sm">
                          <button
                            type="button"
                            disabled={!hasExam}
                            className={`inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold shadow transition ${
                              hasExam
                                ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white hover:-translate-y-0.5 hover:shadow-md"
                                : "cursor-not-allowed bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => {
                              if (hasExam) openPdfInNewTab(sessionData.ex);
                            }}
                          >
                            {hasExam ? "فتح نموذج الامتحان" : "الامتحان غير متوفر"}
                          </button>
                        </div>
                      </article>
                    </Fragment>
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
                          const hasExam = Boolean(sessionData?.ex);
                          const hasSolution = Boolean(sessionData?.sol);
                          const isAnchor = pdfViewerAnchor?.year === year && pdfViewerAnchor?.sessionName === sessionName;
                          return (
                            <Fragment key={sessionName}>
                              {isAnchor && pdfViewerUrl && <div className="sm:col-span-2 lg:col-span-3">{pdfViewerBlock}</div>}
                              <article
                                className="flex h-full flex-col justify-between rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-6 shadow-sm shadow-orange-100"
                              >
                                <div className="space-y-3">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {sessionName === "عادي"
                                      ? year
                                      : `${year} ${sessionName}`}
                                  </h3>
                                  {solutionsSupported && (
                                    <span
                                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                                        hasSolution
                                      )}`}
                                    >
                                      {hasSolution ? "يتضمّن حلًا كاملًا" : "لا يوجد حل"}
                                    </span>
                                  )}
                                </div>
                                <div className="mt-6 flex flex-col gap-3 text-sm">
                                  <button
                                    type="button"
                                    disabled={!hasExam}
                                    className={`inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold shadow transition ${
                                      hasExam
                                        ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white hover:-translate-y-0.5 hover:shadow-md"
                                        : "cursor-not-allowed bg-gray-100 text-gray-400"
                                    }`}
                                    onClick={() => {
                                      if (hasExam) openPdfInNewTab(sessionData.ex);
                                    }}
                                  >
                                    {hasExam ? "فتح نموذج الامتحان" : "لا يوجد امتحان"}
                                  </button>
                                  {solutionsSupported && (
                                    <button
                                      type="button"
                                      disabled={!hasSolution}
                                      className={`inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold transition ${
                                        hasSolution
                                          ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                          : "cursor-not-allowed bg-gray-100 text-gray-400"
                                      }`}
                                      onClick={() => {
                                        if (hasSolution) openPdfInNewTab(sessionData.sol);
                                      }}
                                    >
                                      {hasSolution ? "فتح الحل" : "لا يوجد حل"}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full px-5 py-2 font-semibold transition cursor-not-allowed bg-gray-100 text-gray-400"
                                    disabled
                                  >
                                    الحل الكامل - غير متوفر الآن
                                  </button>
                                </div>
                              </article>
                            </Fragment>
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
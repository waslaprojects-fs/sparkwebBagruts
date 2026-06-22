import { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/tailwind.css";

const stories = [
  {
    id: 1,
    name: "لمار شحادة",
    track: "5 وحدات رياضيات، مدرسة المطران",
    quote:
      "معهد سبارك مش مجرد معهد، هو محل الي بتلاقي فيه حالك مش ضايع ، ودايما معك خطوة بخطوة لحتى توصل للنجاح 🔥",
    image: "./assets/lamar.jpeg",
  },
  {
    id: 2,
    name: "رزق شمشوم",
    track: "5 وحدات فيزياء، مدرسة ماريوسف ",
    quote:
      "كطالب درست في المعهد لمدة سنة، كانت تجربتي إيجابية ومفيدة كثير. سجلت في المعهد بهدف تقوية مستواي الدراسي واخذ دروس مساعدة، وبالفعل لاحظت تحسن كبير في فهمي للمواد. الشرح كان واضح ومبسط  الي خلى الدراسه اهون والمعلمين كانوا داعمين ومهتمين بكل طالب. خلال السنة  تحسنت علاماتي بشكل واضح  بالتالي شجعني اكمل. بعتبر المعهد  مكان مناسب لكل طالب يبحث عن دعم حقيقي وتطور دراسي وتطور بالبينج بونج",
      image: "./assets/rezeq.jpeg",
  },
  {
    id: 3,
    name: "جوسان رحال",
    track: "5 وحدات رياضيات، مدرسة اللاتين يافة",
    quote:
      "أساس قوي لمستقبل ناجح",
      image: "./assets/jousan.jpeg",
  },
  {
    id: 4,
    name: "رازي محروم",
    track: "5 وحدات فيزياء، مدرسة الانجيلية ",
    quote:
      "أكتر من مجرد معهد  ",
      image: "./assets/razi.jpeg",
  },
  {
    id: 5,
    name: "طوني بنّا ",
    track: "5 وحدات رياضيات، مدرسة ماريوسف",
    quote:
      "التعليم بتلاقيه بأي معهد، بس المتابعة والدعم الحقيقي للطالب بتلاقيهم بس في معهد سبارك",
    image: "./assets/Tony.jpeg",
  },

];

export default function Students() {
  const rowRef = useRef(null);
  const [openStory, setOpenStory] = useState(null);

  const MAX_QUOTE_CHARS = 100;
  const getQuotePreview = (quote) => {
    if (typeof quote !== "string") return "";
    if (quote.length <= MAX_QUOTE_CHARS) return quote;
    return `${quote.slice(0, MAX_QUOTE_CHARS).trimEnd()}…`;
  };

  const isModalOpen = Boolean(openStory);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenStory(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  const scrollLeft = () => {
    const row = rowRef.current;
    if (!row || !row.firstChild) return;
    const sectionWidth = row.firstChild.offsetWidth + 32; // include gap
    row.scrollBy({ left: -sectionWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const row = rowRef.current;
    if (!row || !row.firstChild) return;
    const sectionWidth = row.firstChild.offsetWidth + 32;
    row.scrollBy({ left: sectionWidth, behavior: "smooth" });
  };

  const modalContent = useMemo(() => {
    if (!openStory) return null;
    return (
      <div
        className="w-[min(92vw,720px)] rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5"
        role="dialog"
        aria-modal="true"
        aria-label={`قصة ${openStory.name}`}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={openStory.image ?? "./assets/dafult.png"}
              alt={openStory.name}
              className="h-16 w-16 rounded-full border-2 border-orange-200 object-cover"
            />
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {openStory.name}
              </p>
              <p className="text-sm text-orange-500">{openStory.track}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpenStory(null)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-white text-orange-500 transition hover:bg-orange-50"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>

        <div className="mt-6">
          <p className="text-base leading-8 text-gray-700 whitespace-pre-line">
            {openStory.quote}
          </p>
        </div>
      </div>
    );
  }, [openStory]);

  return (
    <section className="relative mx-auto mt-24 max-w-6xl px-6 text-right lg:px-8">
      <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          طلابنا
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={scrollRight}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow transition hover:bg-orange-600"
            aria-label="التالي"
          >
            ❯
          </button>
          <button
            type="button"
            onClick={scrollLeft}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange-500 shadow border border-orange-200 transition hover:bg-orange-50"
            aria-label="السابق"
          >
            ❮
          </button>
        </div>
      </div>
      <div className="relative mt-10">
        <div
          ref={rowRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4 scrollbar-hide"
        >
          {stories.map((story) => (
            <figure
              key={story.id}
              className="student-card relative flex w-80 flex-shrink-0 snap-center flex-col justify-between rounded-3xl border border-orange-100 bg-white/95 p-8 shadow-lg shadow-orange-100"
            >
              <div className="absolute right-4 top-4 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
                تجربة طالب
              </div>
              <img
                src={story.image ?? "./assets/dafult.png"}
                alt={story.name}
                className="h-28 w-28 self-center rounded-full border-2 border-orange-200 object-cover transition duration-300 hover:scale-105"
              />
              <blockquote className="mt-6 text-base leading-8 text-gray-700">
                <span>“{getQuotePreview(story.quote)}”</span>
                {typeof story.quote === "string" &&
                  story.quote.length > MAX_QUOTE_CHARS && (
                    <>
                      {" "}
                      <button
                        type="button"
                        onClick={() => setOpenStory(story)}
                        className="font-semibold text-orange-600 underline underline-offset-4 hover:text-orange-700"
                      >
                        اقرأ المزيد
                      </button>
                    </>
                  )}
              </blockquote>
              <figcaption className="mt-8 text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {story.name}
                </p>
                <p className="text-sm text-orange-500">{story.track}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpenStory(null)}
        >
          {modalContent}
        </div>
      )}
    </section>
  );
}

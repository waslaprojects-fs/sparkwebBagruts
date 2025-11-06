import { useRef } from "react";
import "../../styles/tailwind.css";

const stories = [
  {
    id: 1,
    name: "لجين خليل",
    track: "رياضيات 5 وحدات",
    quote:
      "تدريبات سبارك خلّتني أعرف بالضبط شو ممكن يواجهني بالامتحان. حسّيت بثقة للمرة الأولى في مادة الرياضيات.",
  },
  {
    id: 2,
    name: "إياد أبو سمرة",
    track: "فيزياء كهرباء",
    quote:
      "التجارب الحيّة والجلسات الفردية مع المدرب ساعدتني أفهم الأسئلة التطبيقية بسرعة وأسجل علامة 94.",
  },
  {
    id: 3,
    name: "سارة زعبي",
    track: "علم الحاسوب",
    quote:
      "المنهاج الرقمي مع الواجبات الأسبوعية أعطاني انضباط وتقدّم ثابت. شكراً فريق Spark على المتابعة الدقيقة.",
  },
  {
    id: 4,
    name: "محمد خطيب",
    track: "إلكترونيكا",
    quote:
      "التوجيه في المعمل ونقاشات الجهاز كانت المفتاح لمروري الناجح بالامتحان العملي والنظري.",
  },
];

export default function Students() {
  const rowRef = useRef(null);

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

  return (
    <section className="relative mx-auto mt-24 max-w-6xl px-6 text-right lg:px-8">
      <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          قصص نجاح من مجتمع Spark
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
              className="relative flex w-80 flex-shrink-0 snap-center flex-col justify-between rounded-3xl border border-orange-100 bg-white p-8 shadow-lg shadow-orange-100"
            >
              <img
                src="./assets/dafult.png"
                alt={story.name}
                className="h-16 w-16 self-end rounded-full border-2 border-orange-200 object-cover"
              />
              <blockquote className="mt-6 text-sm leading-7 text-gray-600">
                “{story.quote}”
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
    </section>
  );
}

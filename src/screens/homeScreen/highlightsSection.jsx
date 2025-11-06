import "../../styles/tailwind.css";

const highlights = [
  {
    title: "خطة تعلم شخصية",
    description:
      "نحدد مستوى الطالب ونبني له مسارًا يناسب أهدافه مع متابعة أسبوعية.",
  },
  {
    title: "طاقم أكاديمي خبير",
    description:
      "محاضرون من جامعات مرموقة بخبرة ميدانية واسعة في تدريس البجروت.",
  },
  {
    title: "مجتمع داعم ومتواصل",
    description:
      "مجموعات صغيرة، تدريبات حيّة، ومنصة تواصل مستمرة مع فريق Spark.",
  },
];

export default function HighlightsSection() {
  return (
    <section className="relative mx-auto mt-16 max-w-6xl px-6 text-right lg:px-8">
      <div className="rounded-3xl bg-white p-10 shadow-xl shadow-orange-100">
        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-6"
            >
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-4 text-sm text-gray-600 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

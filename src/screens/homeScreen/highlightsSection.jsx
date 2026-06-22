import "../../styles/tailwind.css";

const highlights = [
  {
    title: "من نحن",
    description:
      "نحن فريق أكاديمي يجمع بين الخبرة والطاقة الشبابية لنقدم تجربة تعليم حديثة وملهمة.",
  },
  {
    title: "رؤيتنا",
    description:
      "نبني لكل طالب مسارًا واضحًا نحو علامة أعلى وثقة أكبر في امتحانات البجروت.",
  },
  {
    title: "أسلوبنا",
    description:
      "تعليم عملي، متابعة دقيقة، وأدوات رقمية تجعل الدراسة أذكى وأسهل كل يوم.",
  },
];

export default function HighlightsSection() {
  return (
    <section className="relative mx-auto mt-16 max-w-6xl px-6 text-right lg:px-8">
      <div className="rounded-3xl bg-white/80 p-10 shadow-xl shadow-orange-100 ring-1 ring-orange-100 backdrop-blur-sm">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl">من نحن</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="student-card flex h-full flex-col rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-6 animate-fadeSlideUp"
              style={{ animationDelay: `${index * 110}ms` }}
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

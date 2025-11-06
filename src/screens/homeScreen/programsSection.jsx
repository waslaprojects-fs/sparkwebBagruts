import "../../styles/tailwind.css";

const programs = [
  {
    title: "رياضيات 5 وحدات",
    description:
      "خطط تدريب كاملة لكل نموذج من 801 حتى 807 مع حلول مفصلة ومراجعات مركزة.",
    href: "/examsScreen",
    image: "/assets/math.png",
  },
  {
    title: "فيزياء متقدمة",
    description:
      "مختبرات تفاعلية، فيديوهات شرح، ونماذج مكثفة لمساري الكهرباء والميكانيكا.",
    href: "/examsScreen",
    image: "/assets/physics.png",
  },
  {
    title: "إلكترونيكا",
    description:
      "ورشات تطبيقية تدمج بين الجانب النظري والتجارب لمفاهيم التصميم الالكتروني.",
    href: "/examsScreen",
    image: "/assets/electronics.png",
  },
  {
    title: "علم الحاسوب",
    description:
      "تدريبات على الخوارزميات، تحليل المشكلات، وأسئلة بجروت من السنوات السابقة.",
    href: "/examsScreen",
    image: "/assets/cs.png",
  },
];

export default function ProgramsSection() {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-6 text-right lg:px-8">
      <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          برامج التدريب في سبارك
        </h2>
        <a
          href="/examsScreen"
          className="inline-flex items-center justify-center rounded-full border border-orange-200 px-6 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
        >
          تصفّح جميع النماذج ↗
        </a>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {programs.map((program) => (
          <article
            key={program.title}
            className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg shadow-orange-100 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/60 via-white/40 to-white/80 opacity-0 transition group-hover:opacity-100" />
            <div className="relative flex h-full flex-col gap-6 p-8">
              <img
                src={program.image}
                alt={program.title}
                className="h-20 w-20 self-end object-contain"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {program.description}
                </p>
              </div>
              <div className="mt-auto flex justify-end">
                <a
                  href={program.href}
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600"
                >
                  ابدأ الآن
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

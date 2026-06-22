import "../../styles/tailwind.css";

const steps = [
  {
    title: "تشخيص دقيق",
    description:
      "نحلل مستواك ونحدد أولوياتك لبناء خطة مناسبة ومباشرة.",
  },
  {
    title: "محتوى مركّز",
    description:
      "دروس تفاعلية، مواد رقمية، وبنك أسئلة يغطي النماذج الأهم.",
  },
  {
    title: "نتائج ملموسة",
    description:
      "متابعة أسبوعية وتحديث مستمر للخطة حتى تصل لنتيجة أقوى.",
  },
];

export default function JourneySection() {
  return (
    <section className="mx-auto mt-24 max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 text-white lg:px-8 shadow-2xl shadow-orange-200">
      <div className="relative px-6 py-16 lg:px-12">
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/20 blur-2xl animate-floatSlow" />
        <div className="absolute -top-20 right-16 h-36 w-36 rounded-full bg-white/20 blur-2xl animate-floatSlow [animation-delay:300ms]" />
        <div className="relative">
          <h2 className="text-3xl font-bold sm:text-4xl">
            أسلوبنا المرن في العمل
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-50">
            كل طالب له احتياجه الخاص؛ لذلك نبني التجربة التعليمية بشكل منفصل
            يحقق أعلى استفادة وبأسرع وقت.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl bg-white/10 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                <span className="text-sm font-semibold text-orange-100">
                  {`0${index + 1}`}
                </span>
                <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-orange-50">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

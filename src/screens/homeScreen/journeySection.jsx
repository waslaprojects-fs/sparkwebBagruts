import "../../styles/tailwind.css";

const steps = [
  {
    title: "تشخيص نقطة الانطلاق",
    description:
      "نبدأ بجلسة تقييم شاملة للتعرف على نقاط القوة والتحديات وبناء خطة ملائمة.",
  },
  {
    title: "مسارات تعلم ذكية",
    description:
      "دروس حضورية ورقمية، بنك أسئلة، ومواد مسجلة تتيح لك التعلم بالوتيرة المناسبة.",
  },
  {
    title: "متابعة وقياس أسبوعي",
    description:
      "تقرير تقدم شخصي، مراجعات مركزة، وإسناد من المدربين حتى يوم الامتحان.",
  },
];

export default function JourneySection() {
  return (
    <section className="mx-auto mt-24 max-w-6xl overflow-hidden rounded-3xl bg-orange-500 text-white lg:px-8">
      <div className="relative px-6 py-16 lg:px-12">
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -top-20 right-16 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold sm:text-4xl">
            رحلتك مع Spark خطوة بخطوة
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-50">
            بنينا تجربتنا التعليمية لتدمج بين الدافعية، المحتوى العميق، والسياق
            الواقعي لامتحانات البجروت. كل مرحلة تقربك أكثر من هدفك.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl bg-white/10 p-6 backdrop-blur"
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

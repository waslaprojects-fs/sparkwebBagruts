import "../../styles/tailwind.css";
import HeroSection from "../../styles/GradientBlob";

const values = [
  {
    title: "تركيز على الطالب",
    description:
      "نؤمن أن كل طالب يمتلك أسلوب تعلم مختلف، لذلك نبني خطة فردية ونتابع تقدمه أسبوعيًا.",
  },
  {
    title: "تعليم قائم على البيانات",
    description:
      "نستخدم نتائج التمرن وبنك الأسئلة لقياس التقدم وتعديل الخطة بناءً على أداء الطالب في كل قسم.",
  },
  {
    title: "مجتمع متكاتف",
    description:
      "نبني بيئة مشجعة تشجع الطلاب على طرح الأسئلة، مشاركة المعرفة، والاحتفال بالنجاحات.",
  },
];

const milestones = [
  {
    year: "2020",
    detail:
      "انطلاق Spark على يد مجموعة طلاب جامعيين التمسوا حاجة فعلية لمركز متخصص في العلوم الدقيقة.",
  },
  {
    year: "2021",
    detail:
      "إطلاق برنامج التدريب المكثف في الرياضيات 5 وحدات مع منصة تمرن رقمية لدعم التعلّم الذاتي.",
  },
  {
    year: "2022",
    detail:
      "توسعة المعهد ليشمل مسارات الفيزياء والإلكترونيكا وتأسيس مختبر تجارب عملي.",
  },
  {
    year: "2023",
    detail:
      "بناء شراكات مجتمعية مع مدارس محلية ودخول أكثر من 250 طالب جديد ضمن برامج Spark.",
  },
];

const team = [
  {
    name: "رلى خوري",
    role: "مديرة أكاديمية",
    bio: "ماجستير في تعليم الرياضيات، تقود تطوير المناهج وتدريب الطاقم التدريسي.",
  },
  {
    name: "محمد قسوم",
    role: "رئيس مسار الفيزياء",
    bio: "مهندس كهرباء وباحث سابق في التخنيون، يشرف على التحضيرات المخبرية والامتحانات العملية.",
  },
  {
    name: "إيناس عيسى",
    role: "منسقة تجربة الطالب",
    bio: "تدير التواصل مع الأهالي وتضمن جاهزية كل طالب قبل كل محطة تقييمية.",
  },
];

export default function Dawrat() {
  return (
    <section className="bg-white font-messiri">
      <HeroSection title={"عن Spark"} />

      <section className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-12 px-6 text-right lg:flex-row lg:items-start lg:px-8">
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            رؤيتنا
          </h2>
          <p className="mt-6 text-sm leading-7 text-gray-600">
            معهد Spark هو مركز أكاديمي متخصص في تجهيز الطلاب لامتحانات البجروت
            في الرياضيات، الفيزياء، الإلكترونيكا، وعلم الحاسوب. منذ تأسيسنا
            عام 2020، دمجنا بين الأساليب التعليمية الحديثة والدعم النفسي
            والتحفيزي لنمنح طلابنا تجربة تعلم متكاملة تُشعل فضولهم وتُترجم إلى
            نتائج ملموسة.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm shadow-orange-100"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="./assets/location.png"
            alt="Spark center location"
            className="w-full rounded-3xl border border-orange-100 bg-orange-50 p-4 shadow-lg shadow-orange-100"
          />
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-5xl px-6 text-right lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          محطات Spark خلال السنوات الأخيرة
        </h2>
        <div className="mt-10 space-y-6 border-r-2 border-orange-200 pr-6">
          {milestones.map((item) => (
            <div key={item.year} className="relative pr-6">
              <span className="absolute -right-[43px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-4 border-white bg-orange-500 shadow" />
              <h3 className="text-xl font-semibold text-orange-600">
                {item.year}
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6 text-right lg:px-8">
        <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            الفريق الأكاديمي
          </h2>
          <a
            href="https://wa.me/+972586610098"
            className="inline-flex items-center justify-center rounded-full border border-orange-200 px-6 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
          >
            تواصل معنا للانضمام ↗
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-orange-100 bg-white p-6 text-right shadow-sm shadow-orange-100"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <span className="mt-1 block text-sm text-orange-500">
                {member.role}
              </span>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

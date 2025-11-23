import "../../styles/tailwind.css";

const registrationLink = "https://spark-manager-web.web.app/register";

export default function CtaSection() {
  return (
    <section className="relative mx-auto mt-24 max-w-5xl overflow-hidden rounded-3xl bg-gray-900 px-6 py-16 text-center text-white lg:px-12">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-amber-400/60 mix-blend-screen" />
      <div className="relative">
        <h2 className="text-3xl font-bold sm:text-4xl">
          جاهز لتشعل الشرارة التالية؟
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-orange-50">
          احجز مقعدك في المسار الأنسب لك، وسنقوم بالتواصل خلال 24 ساعة لتحديد
          خطة العمل المستقبلية مع فريق Spark.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={registrationLink}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-orange-600 shadow-lg shadow-orange-200 hover:-translate-y-0.5 hover:shadow-orange-300"
          >
            احجز استشارة مجانية
          </a>
          <a
            href="https://wa.me/+972586610098"
            className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 text-base font-semibold text-white hover:bg-white/10"
          >
            تحدث معنا عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}

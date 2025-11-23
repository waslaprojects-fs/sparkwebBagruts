import "../styles/tailwind.css";
import HeroSection from "../styles/GradientBlob";
import { Link } from "react-router-dom";

export default function UnderConstruction() {
  return (
    <section className="bg-white font-messiri">
      <HeroSection title={"قيد الإنشاء"} />
      <div className="mx-auto mt-16 flex max-w-4xl flex-col items-center justify-center px-6 pb-24 text-center lg:px-8">
        <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-12 shadow-lg shadow-orange-100">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            هذه الصفحة قيد الإنشاء
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            نحن نعمل بجد لإضافة المحتوى قريبًا. شكرًا لصبرك!
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:shadow-orange-300"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


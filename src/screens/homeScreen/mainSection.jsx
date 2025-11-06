import React, { useEffect, useState } from "react";
import "../../styles/tailwind.css";

const registrationLink =
  "https://sparkpsy.smartedu.me/lead/form/insg?logo=1&style=1&fbclid=IwY2xjawGW7qJleHRuA2FlbQIxMAABHVvmElswdaUkTK7BpsX2qT1W9FWJjz_cin-ua4Kr01Qfil7VDbwsZN_Lww_aem_HocCR9vWiM-ZbI-HGXh6Vw";

function MainSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-white to-amber-50">
      <div className="absolute left-10 top-10 hidden h-56 w-56 rounded-full bg-orange-200/40 blur-3xl lg:block" />
      <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 py-20 text-right md:py-28 lg:flex-row lg:px-8">
        <div
          className={`w-full transition duration-700 ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm shadow-orange-200">
            نجاحك في بجروت الرياضيات والفيزياء يبدأ هنا
          </div>
          <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            معهد سبارك الأكاديمي
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600 lg:ml-auto">
            نعّلم، ندرّب، ونرافقك حتى لحظة الامتحان. جلسات مركّزة، دعم فردي،
            ومنصّة تمرن رقمية تغطي كل ما تحتاجه لتتفوق بثقة.
          </p>
          <div className="mt-10 flex flex-col items-end gap-4 sm:flex-row sm:justify-end">
            <a
              href={registrationLink}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:shadow-orange-300"
            >
              سجّل معنا الآن
            </a>
            <a
              href="/examsScreen"
              className="inline-flex items-center justify-center rounded-full border border-orange-200 px-8 py-3 text-base font-semibold text-orange-600 hover:bg-orange-50"
            >
              استكشف التمرن ↗
            </a>
          </div>
          <dl className="mt-12 grid w-full gap-6 text-center sm:grid-cols-3">
            <div className="rounded-3xl bg-white/80 p-6 shadow-sm">
              <dt className="text-xs font-semibold text-orange-500">
                طلابنا المتفوقون
              </dt>
              <dd className="mt-2 text-3xl font-bold text-gray-900">+850</dd>
            </div>
            <div className="rounded-3xl bg-white/80 p-6 shadow-sm">
              <dt className="text-xs font-semibold text-orange-500">
                جلسات تدريب سنوية
              </dt>
              <dd className="mt-2 text-3xl font-bold text-gray-900">+120</dd>
            </div>
            <div className="rounded-3xl bg-white/80 p-6 shadow-sm">
              <dt className="text-xs font-semibold text-orange-500">
                نسبة النجاح في 5 وحدات
              </dt>
              <dd className="mt-2 text-3xl font-bold text-gray-900">94%</dd>
            </div>
          </dl>
        </div>
        <div
          className={`relative flex w-full justify-center transition duration-700 lg:justify-end ${
            isLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-orange-200">
            <img
              src="./assets/main.jpg"
              alt="Spark students during a session"
              className="h-full w-full max-w-xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainSection;

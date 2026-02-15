import React from 'react';
import "../styles/tailwind.css";
import HeroSection from "../styles/GradientBlob";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <section className="bg-white font-messiri">
      <SEO
        title="الصفحة غير موجودة"
        description="عذرًا، الصفحة التي تبحث عنها غير موجودة. العودة إلى معهد سبارك الأكاديمي."
        robots="noindex, nofollow"
      />
      <HeroSection title={"404 - الصفحة غير موجودة"} />
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            الصفحة غير موجودة
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            عذرًا، الصفحة التي تبحث عنها غير موجودة.
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
};

export default NotFound;
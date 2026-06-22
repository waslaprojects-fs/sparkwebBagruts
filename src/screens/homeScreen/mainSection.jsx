import React, { useEffect, useState } from "react";
import "../../styles/tailwind.css";

const registrationLink = "https://spark-manager-web.web.app/register";

function MainSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const stars = [
    { tx: "-360px", ty: "-240px", dx: "34px", dy: "-20px", size: "h-4 w-4", delay: "80ms" },
    { tx: "-300px", ty: "-110px", dx: "-30px", dy: "18px", size: "h-3 w-3", delay: "220ms" },
    { tx: "-250px", ty: "40px", dx: "18px", dy: "20px", size: "h-4 w-4", delay: "150ms" },
    { tx: "-170px", ty: "-280px", dx: "24px", dy: "-16px", size: "h-4 w-4", delay: "130ms" },
    { tx: "-120px", ty: "210px", dx: "-20px", dy: "16px", size: "h-3 w-3", delay: "350ms" },
    { tx: "-40px", ty: "-190px", dx: "16px", dy: "-18px", size: "h-4 w-4", delay: "480ms" },
    { tx: "0px", ty: "260px", dx: "-22px", dy: "18px", size: "h-3 w-3", delay: "540ms" },
    { tx: "70px", ty: "-260px", dx: "26px", dy: "-14px", size: "h-4 w-4", delay: "620ms" },
    { tx: "130px", ty: "200px", dx: "-24px", dy: "20px", size: "h-3 w-3", delay: "760ms" },
    { tx: "200px", ty: "-180px", dx: "20px", dy: "-18px", size: "h-4 w-4", delay: "280ms" },
    { tx: "250px", ty: "30px", dx: "-22px", dy: "14px", size: "h-3 w-3", delay: "430ms" },
    { tx: "320px", ty: "-70px", dx: "24px", dy: "-12px", size: "h-4 w-4", delay: "580ms" },
    { tx: "360px", ty: "110px", dx: "-18px", dy: "18px", size: "h-3 w-3", delay: "670ms" },
    { tx: "-230px", ty: "170px", dx: "22px", dy: "12px", size: "h-4 w-4", delay: "740ms" },
    { tx: "280px", ty: "220px", dx: "-16px", dy: "20px", size: "h-4 w-4", delay: "930ms" },
    { tx: "-60px", ty: "300px", dx: "20px", dy: "14px", size: "h-3 w-3", delay: "1020ms" },
  ];
  const skyStars = [
    { top: "6%", left: "6%", size: "h-2 w-2", delay: "0ms" },
    { top: "10%", left: "16%", size: "h-2.5 w-2.5", delay: "220ms" },
    { top: "14%", left: "28%", size: "h-2 w-2", delay: "480ms" },
    { top: "8%", left: "40%", size: "h-2.5 w-2.5", delay: "720ms" },
    { top: "12%", left: "52%", size: "h-2 w-2", delay: "980ms" },
    { top: "9%", left: "64%", size: "h-2.5 w-2.5", delay: "1220ms" },
    { top: "15%", left: "76%", size: "h-2 w-2", delay: "1360ms" },
    { top: "11%", left: "88%", size: "h-2.5 w-2.5", delay: "1540ms" },
    { top: "24%", left: "8%", size: "h-2.5 w-2.5", delay: "180ms" },
    { top: "28%", left: "20%", size: "h-2 w-2", delay: "400ms" },
    { top: "22%", left: "33%", size: "h-2.5 w-2.5", delay: "650ms" },
    { top: "30%", left: "46%", size: "h-2 w-2", delay: "940ms" },
    { top: "24%", left: "59%", size: "h-2.5 w-2.5", delay: "1160ms" },
    { top: "32%", left: "72%", size: "h-2 w-2", delay: "1320ms" },
    { top: "26%", left: "85%", size: "h-2.5 w-2.5", delay: "1480ms" },
    { top: "42%", left: "6%", size: "h-2 w-2", delay: "260ms" },
    { top: "48%", left: "18%", size: "h-2.5 w-2.5", delay: "510ms" },
    { top: "40%", left: "30%", size: "h-2 w-2", delay: "760ms" },
    { top: "52%", left: "42%", size: "h-2.5 w-2.5", delay: "1040ms" },
    { top: "44%", left: "55%", size: "h-2 w-2", delay: "1280ms" },
    { top: "50%", left: "68%", size: "h-2.5 w-2.5", delay: "1460ms" },
    { top: "41%", left: "80%", size: "h-2 w-2", delay: "1620ms" },
    { top: "54%", left: "91%", size: "h-2.5 w-2.5", delay: "1780ms" },
    { top: "64%", left: "10%", size: "h-2.5 w-2.5", delay: "340ms" },
    { top: "72%", left: "24%", size: "h-2 w-2", delay: "620ms" },
    { top: "66%", left: "37%", size: "h-2.5 w-2.5", delay: "900ms" },
    { top: "78%", left: "50%", size: "h-2 w-2", delay: "1180ms" },
    { top: "70%", left: "63%", size: "h-2.5 w-2.5", delay: "1420ms" },
    { top: "82%", left: "76%", size: "h-2 w-2", delay: "1660ms" },
    { top: "74%", left: "88%", size: "h-2.5 w-2.5", delay: "1840ms" },
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(251,146,60,0.18),transparent_36%),radial-gradient(circle_at_80%_72%,rgba(251,191,36,0.2),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent_42%)]" />
        <div className="absolute left-1/2 top-[42%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_60px_20px_rgba(255,255,255,0.95)]" />
        <div className="absolute left-1/2 top-[42%] h-8 w-8 animate-bigBangRing rounded-full border-2 border-orange-300/80" />
        <div className="absolute left-1/2 top-[42%] h-8 w-8 animate-bigBangRing rounded-full border-2 border-amber-300/70 [animation-delay:260ms]" />
        {stars.map((star, index) => (
          <span
            key={`ember-${index}`}
            className={`absolute left-1/2 top-[42%] ${star.size} animate-bigBangParticle rounded-full bg-gradient-to-b from-yellow-200 via-orange-300 to-orange-500 shadow-[0_0_18px_6px_rgba(249,115,22,0.95)]`}
            style={{
              animationDelay: star.delay,
              "--tx": star.tx,
              "--ty": star.ty,
              "--dx": star.dx,
              "--dy": star.dy,
            }}
            aria-hidden="true"
          />
        ))}
        {stars.slice(0, 9).map((star, index) => (
          <span
            key={`cross-${index}`}
            className="absolute left-1/2 top-[42%] animate-bigBangParticle text-sm font-bold leading-none text-orange-500"
            style={{
              animationDelay: `${220 + index * 170}ms`,
              "--tx": star.tx,
              "--ty": star.ty,
              "--dx": star.dx,
              "--dy": star.dy,
            }}
            aria-hidden="true"
          >
            ✦
          </span>
        ))}
        {stars.map((star, index) => (
          <span
            key={`drift-${index}`}
            className={`pointer-events-none absolute ${star.size} animate-emberDrift rounded-full bg-gradient-to-b from-yellow-200 via-orange-300 to-orange-500 shadow-[0_0_10px_3px_rgba(249,115,22,0.8)]`}
            style={{
              left: `calc(50% + ${star.tx})`,
              top: `calc(42% + ${star.ty})`,
              animationDelay: `${2500 + index * 120}ms`,
            }}
            aria-hidden="true"
          />
        ))}
        {skyStars.map((star, index) => (
          <span
            key={`sky-${index}`}
            className={`pointer-events-none absolute ${star.size} animate-emberDrift rounded-full bg-gradient-to-b from-yellow-100 via-orange-200 to-orange-400 shadow-[0_0_12px_3px_rgba(251,146,60,0.9)]`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: `${1800 + index * 90}ms`,
            }}
            aria-hidden="true"
          />
        ))}
        <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl animate-floatSlow" />
        <div className="absolute -right-16 bottom-12 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl animate-floatSlow [animation-delay:350ms]" />
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/60 animate-pulseGlow" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-20 text-right md:py-28 lg:px-8">
          <div className="w-full">
            <div
              className={`glass-card relative overflow-hidden rounded-[2.2rem] border border-orange-200/70 px-6 py-14 transition-all duration-1000 ease-out sm:px-10 lg:px-14 lg:py-20 ${
                isLoaded
                  ? "scale-100 opacity-100"
                  : "scale-50 opacity-0"
              }`}
              style={{ transformOrigin: "center center", transitionDelay: "1200ms" }}
            >
              <div
                className="absolute inset-0 animate-layerReveal bg-transparent opacity-0"
                style={{ animationDelay: "2300ms" }}
              />
              <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-orange-300/35 blur-3xl animate-floatSlow" />
              <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-amber-200/45 blur-3xl animate-floatSlow [animation-delay:400ms]" />

              <div className="relative">
                <div className="inline-flex items-center rounded-full border border-orange-200 bg-white/85 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm shadow-orange-200">
                  Spark Academic Center
                </div>
                <h1 className="mt-7 animate-slideInRight bg-gradient-to-r from-orange-700 via-orange-500 to-amber-500 bg-clip-text text-4xl font-bold leading-tight text-transparent [animation-delay:1100ms] sm:text-5xl lg:text-7xl">
                  نصنع من طموحك... قصة نجاح أكاديمي
                </h1>
                <p className="mt-6 max-w-3xl animate-slideInLeft text-lg leading-8 text-gray-700 [animation-delay:1400ms] lg:mr-auto">
                  معهد سبارك الأكاديمي. نعّلم، ندرّب، ونرافقك حتى لحظة الامتحان.
                  جلسات مركّزة، دعم فردي، ومنصّة بچاريت رقمية تغطي كل ما تحتاجه
                  لتتفوق بثقة.
                </p>
              </div>

              <div className="relative mt-10 flex flex-col items-end gap-4 sm:flex-row sm:justify-end animate-fadeSlideUp [animation-delay:1700ms]">
              <a
                href={registrationLink}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:shadow-orange-300"
              >
                سجّل معنا الآن
              </a>
              <a
                href="/examsScreen"
                className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white/80 px-8 py-3 text-base font-semibold text-orange-600 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-orange-50"
              >
                استكشف البچاريت ↗
              </a>
            </div>
            <dl className="relative mt-12 grid w-full gap-6 text-center sm:grid-cols-3">
              <div className="glass-card animate-fadeSlideUp rounded-3xl p-6">
                <dt className="text-xs font-semibold text-orange-500">
                  طلابنا المتفوقون
                </dt>
                <dd className="mt-2 text-3xl font-bold text-gray-900">+850</dd>
              </div>
              <div className="glass-card animate-fadeSlideUp rounded-3xl p-6 [animation-delay:120ms]">
                <dt className="text-xs font-semibold text-orange-500">
                  جلسات تدريب سنوية
                </dt>
                <dd className="mt-2 text-3xl font-bold text-gray-900">+120</dd>
              </div>
              <div className="glass-card animate-fadeSlideUp rounded-3xl p-6 [animation-delay:220ms]">
                <dt className="text-xs font-semibold text-orange-500">
                  نسبة النجاح في 5 وحدات
                </dt>
                <dd className="mt-2 text-3xl font-bold text-gray-900">94%</dd>
              </div>
            </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainSection;

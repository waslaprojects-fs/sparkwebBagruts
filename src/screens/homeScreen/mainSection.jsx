import React, { useEffect, useState, useRef } from "react";
import "../../styles/tailwind.css";

const registrationLink = "https://spark-manager-web.web.app/register";

function MainSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Check if screen is small (mobile/tablet)
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const stopAtSecond = 1; // Change this to your desired second
    
    const handleTimeUpdate = () => {
      if (isSmallScreen && video.currentTime >= stopAtSecond) {
        video.pause();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isSmallScreen]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop={false}
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="./assets/Make_a_mysterious_202601201712_r2k74.mp4"
          type="video/mp4"
        />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col-reverse items-center justify-center gap-12 px-6 py-20 text-right md:py-28 lg:flex-row lg:px-8">
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
          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            معهد سبارك الأكاديمي
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-gray-200 lg:ml-auto">
            نعّلم، ندرّب، ونرافقك حتى لحظة الامتحان. جلسات مركّزة، دعم فردي،
            ومنصّة بچاريت رقمية تغطي كل ما تحتاجه لتتفوق بثقة.
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
              className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              استكشف البچاريت ↗
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
      </div>
    </section>
  );
}

export default MainSection;

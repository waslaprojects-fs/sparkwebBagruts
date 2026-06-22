import React from "react";
import MainSection from "./mainSection.jsx";
import HighlightsSection from "./highlightsSection.jsx";
import ProgramsSection from "./programsSection.jsx";
import JourneySection from "./journeySection.jsx";
import Students from "./students.jsx";
import CtaSection from "./ctaSection.jsx";
import SEO from "../../components/SEO.jsx";
import "../../styles/tailwind.css";

function Home() {
  return (
    <section className="relative overflow-hidden bg-transparent font-messiri">
      <div className="pointer-events-none absolute -left-20 top-80 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-[55rem] h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
      <SEO
        title="الرئيسية"
        description="معهد سبارك الأكاديمي - مركز متخصص في تحضير طلاب البجروت في الرياضيات والفيزياء. نوفر حلول وتمارين، نماذج امتحانات، ودعم أكاديمي شامل لضمان النجاح في البجروت."
        keywords="بجروت، سبارك، معهد، بجروت، بجاريت، حلول، حل، رياضيات، فيزياء، تحضير بجروت، نماذج بجروت، تمارين بجروت، حلول رياضيات، حلول فيزياء"
      />
      <MainSection />
      <div className="slide-in-right [animation-delay:120ms]">
        <HighlightsSection />
      </div>
      <div className="slide-in-left [animation-delay:180ms]">
        <Students />
      </div>
      <div className="slide-in-right [animation-delay:220ms]">
        <ProgramsSection />
      </div>
      <div className="slide-in-right [animation-delay:300ms]">
        <JourneySection />
      </div>
      <div className="fade-in-up [animation-delay:340ms]">
        <CtaSection />
      </div>
    </section>
  );
}

export default Home;

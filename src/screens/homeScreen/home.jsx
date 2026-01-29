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
    <section className="bg-white font-messiri">
      <SEO
        title="الرئيسية"
        description="معهد سبارك الأكاديمي - مركز متخصص في تحضير طلاب البجروت في الرياضيات والفيزياء. نوفر حلول وتمارين، نماذج امتحانات، ودعم أكاديمي شامل لضمان النجاح في البجروت."
        keywords="بجروت، سبارك، معهد، بجروت، بجاريت، حلول، حل، رياضيات، فيزياء، تحضير بجروت، نماذج بجروت، تمارين بجروت، حلول رياضيات، حلول فيزياء"
      />
      <MainSection />
      <HighlightsSection />
      <ProgramsSection />
      <JourneySection />
      <Students />
      <CtaSection />
    </section>
  );
}

export default Home;

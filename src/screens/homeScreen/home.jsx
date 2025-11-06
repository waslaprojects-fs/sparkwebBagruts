import React from "react";
import MainSection from "./mainSection.jsx";
import HighlightsSection from "./highlightsSection.jsx";
import ProgramsSection from "./programsSection.jsx";
import JourneySection from "./journeySection.jsx";
import Students from "./students.jsx";
import ResourcesSection from "./resourcesSection.jsx";
import CtaSection from "./ctaSection.jsx";
import "../../styles/tailwind.css";

function Home() {
  return (
    <section className="bg-white font-messiri">
      <MainSection />
      <HighlightsSection />
      <ProgramsSection />
      <JourneySection />
      <Students />
      <ResourcesSection />
      <CtaSection />
    </section>
  );
}

export default Home;

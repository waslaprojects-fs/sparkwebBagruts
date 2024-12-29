import React from "react";
import MainSection from "./mainSection.jsx";
import Instructors from "./instructorsSection.jsx";
import Students from "./students.jsx";

import "../../styles/tailwind.css";
function Home() {
  return (
    <section className="main h-auto font-messiri">
      <MainSection />
      <section className="SeconedSection">
        <Students />

        {/* <Instructors /> */}
      </section>
    </section>
  );
}

export default Home;

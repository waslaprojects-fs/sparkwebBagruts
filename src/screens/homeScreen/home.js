import React from "react";
import MainSection from "./mainSection.js";
import Instructors from "./instructorsSection.js";
import Students from "./students.js";
import Interested from "./interested.js";
import "../../styles/tailwind.css";
function Home() {
  return (
    <section className="main">
      <MainSection />
      <section className="SeconedSection">
        <Students />
        <Interested />
        <Instructors />
      </section>
    </section>
  );
}

export default Home;

import React from "react";
import MainSection from "./mainSection.jsx";
import Instructors from "./instructorsSection.jsx";
import Students from "./students.jsx";
import Interested from "./interested.jsx";
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

import React from "react";
import MainSection from "./mainSection.js";
import Instructors from "./instructorsSection.js"
import Students from "./students.js";
import Interested from "./interested.js";
function Home() {
  return (
    <section>
      <MainSection/>
      <section className="SeconedSection">
      <Students/>
      <Instructors/>
      <Interested/>
      </section>
    </section>
  );
}

export default Home;

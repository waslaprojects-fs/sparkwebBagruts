import React from "react";
import MainSection from "./mainSection.js";
import Instructors from "./instructorsSection.js"
import Students from "./students.js";
function Home() {
  return (
    <section>
      <MainSection/>
      <Instructors/>
      <Students/>
    </section>
  );
}

export default Home;

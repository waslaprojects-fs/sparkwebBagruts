import React from "react";
import "../../styles/tailwind.css";
import HeroSection from "../../styles/GradientBlob";

function Dawrat() {
  return (
    <div>
      <HeroSection title={"عن المعهد"} />

      <section className="flex flex-row flex-wrap w-[90vw]  mx-auto justify-evenly">
        <img src="./assets/location.png"></img>
        <div>
          <h1>hi</h1>
          <p>
            معهد سبارك متخصص بتجهيز الطلاب لبجاريت الرياضيات والفيزياء، تأسس
            المعهد سنة ٢٠٢٠ على يد طلاب اكادميين ذويي خبرة بالتدرس{" "}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Dawrat;

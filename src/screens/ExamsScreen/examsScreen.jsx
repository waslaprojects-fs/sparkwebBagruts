import { useState } from "react";
import "../../styles/tailwind.css";
import Card from "./Card";
import HeroSection from "../../styles/GradientBlob";
export default function ExamsScreen() {
  return (
    <>
      <HeroSection title={"قسم التمرن"} />
      <section className="flex flex-row flex-wrap w-[90vw]  mx-auto justify-center">
        <Card
          title="علم الحاسوب"
          img="/assets/cs.png"
          buttons={["جميع النماذج"]}
        />
        <Card
          title="إلكترونيكا"
          img="/assets/electronics.png"
          buttons={["جميع النماذج"]}
        />
        <Card
          title="فيزياء"
          img="/assets/physics.png"
          buttons={["ميكانيكا", "كهرباء"]}
        />
        <Card
          title="رياضيات"
          img="/assets/math.png"
          buttons={[801, 802, 803, 804, 805, 806, 807]}
        />
      </section>
    </>
  );
}

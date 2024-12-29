import { useState } from "react";
import "../../styles/tailwind.css";
import Card from "./Card";
import HeroSection from "../../styles/GradientBlob";
export default function ExamsScreen() {
  return (
    <>
      <HeroSection title={"قسم التمرن"} />
      <section className="flex flex-col xl:flex-row sm:flex-col lg:flex-col w-[80vw] xl:w-auto mx-auto justify-center">
        <Card
          title="Math Card"
          img="/assets/math.png"
          buttons={[801, 802, 803, 804, 805, 806, 807]}
        />
        <Card
          title="Physics Card"
          img="/assets/physics.png"
          buttons={["ميكانيكا", "كهرباء"]}
        />
        <Card
          title="علم الحاسوب"
          img="/assets/cs.png"
          buttons={["جميع النماذج"]}
        />
        <Card
          title="إلكترونيات"
          img="/assets/electronics.png"
          buttons={["جميع النماذج"]}
        />
      </section>
    </>
  );
}

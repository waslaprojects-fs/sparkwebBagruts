import "../../styles/tailwind.css";
import Card from "./Card";
import HeroSection from "../../styles/GradientBlob";
export default function ExamsScreen() {
  return (
    <>
      <HeroSection title={"قسم التمرن"} />
      <section className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-6 px-6 pb-24 lg:px-8">
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
    
      </section>
    </>
  );
}

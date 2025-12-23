import "../../styles/tailwind.css";
import Card from "./Card";
import HeroSection from "../../styles/GradientBlob";
import SEO from "../../components/SEO.jsx";

export default function ExamsScreen() {
  return (
    <>
      <SEO
        title="قسم التمرن"
        description="تمرن على نماذج بجروت الرياضيات والفيزياء وعلم الحاسوب والإلكترونيكا. حلول وتمارين شاملة لجميع النماذج مع إمكانية التحميل المباشر."
        keywords="بجروت، بجاريت، تمرن، نماذج بجروت، حلول بجروت، تمارين بجروت، رياضيات، فيزياء، علم حاسوب، إلكترونيكا، حلول رياضيات، حلول فيزياء"
      />
      <HeroSection title={"قسم التمرن"} />
      <section className="mx-auto mt-4 flex max-w-6xl flex-wrap justify-center gap-6 px-6 pb-24 lg:px-8">
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

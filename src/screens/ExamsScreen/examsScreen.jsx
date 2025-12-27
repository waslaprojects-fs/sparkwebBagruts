import "../../styles/tailwind.css";
import Card from "./Card";
import SEO from "../../components/SEO.jsx";

export default function ExamsScreen() {
  return (
    <>
      <SEO
        title="قسم البچاريت"
        description="بچاريت على نماذج بجروت الرياضيات والفيزياء وعلم الحاسوب والإلكترونيكا. حلول وتمارين شاملة لجميع النماذج مع إمكانية التحميل المباشر."
        keywords="بجروت، بجاريت، بچاريت، نماذج بجروت، حلول بجروت، تمارين بجروت، رياضيات، فيزياء، علم حاسوب، إلكترونيكا، حلول رياضيات، حلول فيزياء"
      />
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.05),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl font-messiri">
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                قسم البچاريت
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto font-messiri">
              اختر الامتحان الذي تريد البچاريت عليه وابدأ رحلتك نحو النجاح
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 justify-items-center">
            <Card
              title="رياضيات"
              img="/assets/math.png"
              buttons={[801, 371, 372, 471, 472, 571, 572]}
            />
            <Card
              title="فيزياء"
              img="/assets/physics.png"
              buttons={["ميكانيكا", "كهرباء"]}
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
          </div>
        </div>
      </section>
    </>
  );
}

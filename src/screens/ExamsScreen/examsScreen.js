import { useNavigate } from "react-router-dom";
import "../../styles.css";
import exams801 from "./exams/801";
import exams802 from "./exams/802";
import exams803 from "./exams/803";
import exams804 from "./exams/804";
import exams805 from "./exams/805";
import exams806 from "./exams/806";
import exams807 from "./exams/807";

export default function ExamsScreen() {
  const navigate = useNavigate();

  const handleClick = (num, title, examsData) => {
    console.log(examsData);
    navigate(`/exams${num}`, { state: { examsData, title } });
  };

  return (
    <section className="container exams">
      <h1>قسم التمرّن</h1>
      <section className="rowEX">
        <section className=" card">
          <img src="assets/math.png" alt="Math" />
          <h3>رياضيات</h3>
          <section className="row">
            <button
              className=""
              type="button"
              onClick={() => handleClick(801, "نماذج 801", exams801)}
            >
              801
            </button>
            <button
              className=""
              type="button"
              onClick={() => handleClick(802, "نماذج 802", exams802)}
            >
              802
            </button>
            <button
              className=""
              type="button"
              onClick={() => handleClick(803, "نماذج 803", exams803)}
            >
              803
            </button>
            <button
              className=""
              type="button"
              onClick={() => handleClick(804, "نماذج 804", exams804)}
            >
              804
            </button>
            <button
              className=""
              type="button"
              onClick={() => handleClick(805, "نماذج 805", exams805)}
            >
              805
            </button>
            <button
              className=""
              type="button"
              onClick={() => handleClick(806, "نماذج 806", exams806)}
            >
              806
            </button>
            <button
              className=""
              type="button"
              onClick={() => handleClick(807, "نماذج 807", exams807)}
            >
              807
            </button>
          </section>
        </section>

        <section className=" card">
          <img src="assets/physics.png" alt="Physics" />
          <h3>فيزياء</h3>
          <section className="row ">
            <p>ميكانيكا</p>
            <p>كهرباء</p>
          </section>
        </section>
      </section>
      <section className="rowEX">
        <section className="card">
          <img src="assets/cs.png" alt="Computer Science" />
          <h3>علم الحاسوب</h3>
          <section className="row ">
            <p>جميع النماذج</p>
          </section>
        </section>

        <section className="col-6 card">
          <img src="assets/electronics.png" alt="Electronics" />
          <h3>إلكترونيات</h3>
          <section className="row">
            <p>جميع النماذج</p>
          </section>
        </section>
      </section>
    </section>
  );
}

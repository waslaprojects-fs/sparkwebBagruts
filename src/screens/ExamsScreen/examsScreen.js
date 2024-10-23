import { useNavigate } from 'react-router-dom';
import './exams.css';

const exams801 = [
  { 
    2024: {    
      "صيف موعد ب": {
        ex: "https://panet.com/city/23",
        sol: "https://panet.com/city/23"
      },
      "صيف موعد أ": {
        ex: "https://panet.com/city/23",
        sol: "https://panet.com/city/23"
      },
      "شتاء": {
        ex: "https://panet.com/city/23",
        sol: "https://panet.com/city/23",
      }
    }
  },
  { 
    2023: {    
      "صيف موعد ب": {
        ex: "https://panet.com/city/23",
        sol: "https://panet.com/city/23"
      },
      "صيف موعد أ": {
        ex: "https://panet.com/city/23",
        sol: "https://panet.com/city/23"
      },
      "شتاء": {
        ex: "https://panet.com/city/23",
        sol: "https://panet.com/city/23",
      }
    }
  }
];

export default function ExamsScreen() {
  const navigate = useNavigate();

  const handleClick = (num, title) => {
    navigate("/exams", { state: { exams801, title } });
  };

  return (
    <section className="container text-center">
      <h1>قسم التمرّن</h1>
      <section className="row">
        <section className="col-6 card">
          <img src="assets/math.png" alt="Math" />
          <h3>رياضيات</h3>
          <section className="row">
            <section className="col-12">
              <section className="d-flex flex-column align-items-center">
                <button
                  className="btn btn-warning rounded-pill px-3 mb-2"
                  type="button"
                  onClick={() => handleClick(801, "نماذج 801")}
                >
                  801
                </button>
                <button
                  className="btn btn-warning rounded-pill px-3 mb-2"
                  type="button"
                  onClick={() => handleClick(802, "نماذج 802")}
                >
                  802
                </button>
              </section>
              <p>803</p>
              <p>804</p>
              <p>805</p>
              <p>806</p>
              <p>807</p>
            </section>
          </section>
        </section>

        <section className="col-6 card">
          <img src="assets/physics.png" alt="Physics" />
          <h3>فيزياء</h3>
          <section className="row">
            <section className="col-12">
              <p>ميكانيكا</p>
              <p>كهرباء</p>
            </section>
          </section>
        </section>
      </section>

      <div className="row mt-4">
        <div className="col-6 card">
          <img src="assets/cs.png" alt="Computer Science" />
          <h3>علم الحاسوب</h3>
          <div className="row">
            <div className="col-12">
              <p>جميع النماذج</p>
            </div>
          </div>
        </div>

        <div className="col-6 card">
          <img src="assets/electronics.png" alt="Electronics" />
          <h3>الكترونيكا</h3>
          <div className="row">
            <div className="col-12">
              <p>جميع النماذج</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

export default function ExamsScreen() {
  const navigate = useNavigate(); // Move this to the top of the component

  const handleClick = () => {
    navigate('/801'); // Navigate to '/newpage' on button click
  };
    return (
      <section className="container text-center">
        <h1> MATH</h1>
        <div className="row">
          {/* Column for رياضيات */}
          <div className="col-6">
            <h3>رياضيات</h3>
            <div className="row">
              <div className="col-12">
              <button class="btn btn-warning rounded-pill px-3" type="button" onClick={handleClick} >
                801
              </button>
                <p>802</p>
                <p>803</p>
                <p>804</p>
                <p>805</p>
                <p>806</p>
                <p>807</p>
              </div>
            </div>
          </div>
  
          {/* Column for فيزياء */}
          <div className="col-6">
            <h3>فيزياء</h3>
            <div className="row">
              <div className="col-12">
                <p>ميكانيكا</p>
                <p>كهرباء</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="row mt-4">
          {/* Column for علم الحاسوب */}
          <div className="col-6">
            <h3>علم الحاسوب</h3>
            <div className="row">
              <div className="col-12">
              <p>جميع النماذج</p>
              </div>
            </div>
          </div>
  
          {/* Column for الكترونيكا */}
          <div className="col-6">
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
  
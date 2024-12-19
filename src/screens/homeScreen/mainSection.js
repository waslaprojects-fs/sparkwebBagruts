import React from "react";

import "../../styles/tailwind.css";
function MainSection() {
  const fillForm = () => {
    window.open(
      "https://sparkpsy.smartedu.me/lead/form/insg?logo=1&style=1&fbclid=IwY2xjawGW7qJleHRuA2FlbQIxMAABHVvmElswdaUkTK7BpsX2qT1W9FWJjz_cin-ua4Kr01Qfil7VDbwsZN_Lww_aem_HocCR9vWiM-ZbI-HGXh6Vw",
      "_blank"
    );
  };

  return (
    <section className="main mainsec">
      <img className="logo" src="assets/2.png" alt="Logo" />
      <h1>للرياضيات والفيزياء</h1>
      <section className="mainbuttons">
        <button className="custom-button" onClick={fillForm}>
          سجّل معنا
        </button>
        <button className="custom-button">تمرّن</button>
      </section>
    </section>
  );
}

export default MainSection;

import React, { useEffect } from "react";

import "../../styles.css";
function MainSection() {
  useEffect(() => {
    if (window.bootstrap) {
      const carouselElement = document.querySelector("#myCarousel");
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 2000,
        pause: "hover",
      });
      return () => {
        carousel.dispose();
      };
    } else {
      console.error("Bootstrap is not loaded correctly.");
    }
  }, []);
  const fillforom = () => {
    window.open(
      "https://sparkpsy.smartedu.me/lead/form/insg?logo=1&style=1&fbclid=IwY2xjawGW7qJleHRuA2FlbQIxMAABHVvmElswdaUkTK7BpsX2qT1W9FWJjz_cin-ua4Kr01Qfil7VDbwsZN_Lww_aem_HocCR9vWiM-ZbI-HGXh6Vw",
      "_blank"
    );
  };
  return (
    <section class="main mainsec">
      <img class="logo" src="assets/2.png" alt="" />
      <h1>للرياضيات والفيزياء</h1>
      <section class="mainbuttons">
        <button class="" role="button" onClick={fillforom}>
          سجّل معنا
        </button>
        <button class="" role="button">
          تمرّن
        </button>
      </section>
    </section>
  );
}

export default MainSection;

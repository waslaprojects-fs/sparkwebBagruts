import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
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

  return (
    <section class="px-4 py-5 my-5 text-center main mainsec">
      <img class="d-block mx-auto mb-4 logo" src="assets/2.png" alt="" />
      <h1>للرياضيات والفيزياء</h1>
      <section class="mainbuttons">
        <button class="button-24" role="button">
          تواصل معنا
        </button>
        <button class="button-24" role="button">
          تمرّن
        </button>
      </section>
    </section>
  );
}

export default MainSection;

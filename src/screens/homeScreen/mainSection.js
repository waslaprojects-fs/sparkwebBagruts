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
    <section class="px-4 py-5 my-5 text-center main">
      <img class="d-block mx-auto mb-4 logo" src="assets/2.png" alt="" />
      <section class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Quickly design and customize responsive mobile-first sites with
          Bootstrap, the world’s most popular front-end open source toolkit,
          featuring Sass variables and mixins, responsive grid system, extensive
          prebuilt components, and powerful JavaScript plugins.
        </p>
        <section class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" class="btn btn-primary btn-lg px-4 gap-3">
            Primary button
          </button>
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">
            Secondary
          </button>
        </section>
      </section>
    </section>
  );
}

export default MainSection;

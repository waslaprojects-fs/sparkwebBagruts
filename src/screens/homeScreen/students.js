import "../../styles.css";
import { useRef } from "react";

export default function Students() {
  const rowRef = useRef(null);

  // Scroll one full section to the left

  const scrollLeft = () => {
    if (rowRef.current) {
      const sectionWidth = rowRef.current.firstChild.offsetWidth;
      rowRef.current.scrollBy({
        left: -sectionWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      const sectionWidth = rowRef.current.firstChild.offsetWidth;
      rowRef.current.scrollBy({
        left: sectionWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="allStudents">
      <h3>طُلّابنا و إنجازاتهم</h3>
      <section className="Students">
        <section className="Arrows">
          {/* Left arrow */}
          <button className="left-arrow" onClick={scrollLeft}>
            ❮
          </button>

          {/* Right arrow */}
          <button className="right-arrow" onClick={scrollRight}>
            ❯
          </button>
        </section>

        {/* Main content */}
        <section className="row" ref={rowRef}>
          {/* First student */}
          <section className="col-lg-2 studentCard">
            <section className="row-container">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                />
              </svg>
              <h2 className="fw-normal">Heading</h2>
            </section>
            <p>Some representative placeholder content for the first column.</p>
          </section>

          {/* Second student */}
          <section className="col-lg-2 studentCard">
            <section className="row-container">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                />
              </svg>
              <h2 className="fw-normal">Heading</h2>
            </section>
            <p>
              Some representative placeholder content for the second column.
            </p>
          </section>

          {/* Third student */}
          <section className="col-lg-2 studentCard">
            <section className="row-container">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                />
              </svg>
              <h2 className="fw-normal">Heading</h2>
            </section>
            <p>Some representative placeholder content for the third column.</p>
          </section>

          {/* Add more students here */}
          {/* First student */}
          <section className="col-lg-2 studentCard">
            <section className="row-container">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                />
              </svg>
              <h2 className="fw-normal">Heading</h2>
            </section>
            <p>Some representative placeholder content for the first column.</p>
          </section>

          {/* Second student */}
          <section className="col-lg-2 studentCard">
            <section className="row-container">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                />
              </svg>
              <h2 className="fw-normal">Heading</h2>
            </section>
            <p>
              Some representative placeholder content for the second column.
            </p>
          </section>

          {/* Third student */}
          <section className="col-lg-2 studentCard">
            <section className="row-container">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                />
              </svg>
              <h2 className="fw-normal">Heading</h2>
            </section>
            <p>Some representative placeholder content for the third column.</p>
          </section>

          <section className="col-lg-2 studentCard">
            <section className="row-container">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="60"
                height="60"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="var(--bs-secondary-color)"
                />
              </svg>
              <h2 className="fw-normal">Heading</h2>
            </section>
            <p>Some representative placeholder content for the third column.</p>
          </section>
        </section>
      </section>
    </section>
  );
}

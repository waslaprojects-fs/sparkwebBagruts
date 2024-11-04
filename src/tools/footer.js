export default function Footer() {
  return (
    <section class="footercontainer">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-4 d-flex align-items-center logofooter">
          <a
            href="/"
            class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img
              class="bi"
              width="30"
              height="24"
              src="./assets/2.png"
              alt="logo"
            />
          </a>
          <span class="mb-3 mb-md-0 text-body-secondary">
            © 2024 Company, Inc
          </span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3">
            <a
              class="text-body-secondary"
              href="https://drive.google.com/drive/u/0/home"
            >
              <img
                class="bi"
                width="30"
                height="24"
                src="./assets/instagram.png"
                alt="insta"
              />
            </a>
          </li>
          <li class="ms-3">
            <a class="text-body-secondary" href="#">
              <img
                class="bi"
                width="30"
                height="24"
                src="./assets/whatsapp.png"
                alt="whatsapp"
              />
            </a>
          </li>
          <li class="ms-3">
            <a class="text-body-secondary" href="#">
              <img
                class="bi"
                width="30"
                height="24"
                src="./assets/facebook.png"
                alt="facebook"
              />
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

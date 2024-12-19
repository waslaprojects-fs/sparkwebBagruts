import "../styles/tailwind.css";
export default function Footer() {
  return (
    <section class="footercontainer">
      <footer class="">
        <div class="logofooter">
          <a href="/" class="">
            <img
              class="bi"
              width="30"
              height="24"
              src="./assets/2.png"
              alt="logo"
            />
          </a>
          <span class="">© 2024 Company, Inc</span>
        </div>

        <ul class="nav">
          <li class="ms-3">
            <a
              class=""
              href="https://www.instagram.com/sparkpsy800?igsh=MWp5Z2IzdmVmbjEwZg=="
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
          <li class="">
            <a class="" href="https://wa.me/+972586610098">
              <img
                class="bi"
                width="30"
                height="24"
                src="./assets/whatsapp.png"
                alt="whatsapp"
              />
            </a>
          </li>
          <li class="">
            <a
              class=""
              href="https://www.facebook.com/profile.php?id=100063890084338"
            >
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

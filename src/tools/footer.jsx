import "../styles/tailwind.css";

export default function Footer() {
  return (
    <section className="py-8 static bottom-0 left-0 w-full h-32">
      <hr></hr>
      <footer className="max-w-screen-xl mx-auto px-6 flex flex-row justify-between">
        <div className="flex items-center justify-end pt-8 mb-6">
          <a href="/">
            <img
              className="bi"
              width="30"
              height="24"
              src="./assets/2.png"
              alt="logo"
            />
          </a>
          <span className="text-sm text-gray-800">© 2024 Company, Inc</span>
        </div>

        <ul className="flex space-x-6 pt-6">
          <li>
            <a href="https://www.instagram.com/sparkpsy800?igsh=MWp5Z2IzdmVmbjEwZg==">
              <img
                className="w-8 h-8"
                width="30"
                height="24"
                src="./assets/instagram.png"
                alt="Instagram"
              />
            </a>
          </li>
          <li>
            <a href="https://wa.me/+972586610098">
              <img
                className="w-8 h-8"
                width="30"
                height="24"
                src="./assets/whatsapp.png"
                alt="WhatsApp"
              />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/profile.php?id=100063890084338">
              <img
                className="w-8 h-8"
                width="30"
                height="24"
                src="./assets/facebook.png"
                alt="Facebook"
              />
            </a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

import "../styles/tailwind.css";

const socials = [
  {
    href: "https://www.instagram.com/sparkpsy800?igsh=MWp5Z2IzdmVmbjEwZg==",
    icon: "./assets/instagram.png",
    label: "Instagram",
  },
  {
    href: "https://wa.me/+972586610098",
    icon: "./assets/whatsapp.png",
    label: "WhatsApp",
  },
  {
    href: "https://www.facebook.com/profile.php?id=100063890084338",
    icon: "./assets/facebook.png",
    label: "Facebook",
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-white via-orange-50 to-white">
      <div className="absolute inset-x-0 -top-8 flex justify-center">
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-sm space-y-4 text-right">
          <a href="/" className="inline-flex items-center gap-3">
            <img src="./assets/2.png" width="48" height="48" alt="Spark logo" />
            <span className="text-2xl font-semibold text-orange-600">
              Spark Center
            </span>
          </a>
          <p className="text-sm text-gray-600">
            نرافق طلابنا خطوة بخطوة نحو التميز في بجروت الرياضيات والفيزياء،
            بطرق حديثة، بيئة داعمة، ومصادر تدريب جاهزة.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-10 text-right sm:flex-row sm:justify-end">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">روابط سريعة</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <a href="/home" className="hover:text-orange-600">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/dawrat" className="hover:text-orange-600">
                  تعرف علينا
                </a>
              </li>
              <li>
                <a href="/examsScreen" className="hover:text-orange-600">
                  نماذج البچاريت
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">تواصل معنا</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <a href="tel:+972586610098" className="hover:text-orange-600">
                  +972 58-661-0098
                </a>
              </li>
              <li>
                <a
                  href="mailto:sparkacademy.edu@gmail.com"
                  className="hover:text-orange-600"
                >
                  sparkacademy.edu@gmail.com
                </a>
              </li>
              <li>
                <span>شارع صلاح الدين، الناصرة</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              تابعنا على
            </h4>
            <ul className="mt-3 flex gap-3">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:-translate-y-0.5 hover:shadow-md transition"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="h-5 w-5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-orange-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-gray-500 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Spark Center. جميع الحقوق محفوظة.</p>
          <p>تم التصميم بمحبة لطلاب سبارك.</p>
        </div>
      </div>
    </footer>
  );
}

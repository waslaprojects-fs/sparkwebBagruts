import React, { useEffect, useState } from "react";
import "../styles/tailwind.css";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const registrationLink = "https://spark-manager-web.web.app/register";

  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "تمرّن", href: "/examsScreen" },
    { label: "عن المعهد", href: "/dawrat" },
  ];

  const [active, setActive] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );
  useEffect(() => {
    setActive(window.location.pathname);
  }, []);
  return (
    <header className="bg-white/80 backdrop-blur border-b border-orange-100 sticky top-0 z-40">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Spark</span>
            <img src="./assets/logo512.png" className="h-20" alt="Spark Logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`relative text-lg font-semibold transition ${
                active === item.href
                  ? "text-orange-600"
                  : "text-gray-800 hover:text-orange-600"
              }`}
              onClick={() => setActive(item.href)}
            >
              {item.label}
              {active === item.href && (
                <span className="absolute inset-x-0 -bottom-2 h-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
              )}
            </Link>
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href={registrationLink}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:shadow-orange-300 hover:scale-105"
          >
            سجّل الآن
          </a>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="./assets/logo512.png" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${
                      active === item.href
                        ? "bg-orange-100 text-orange-700"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setActive(item.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={registrationLink}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-base font-semibold text-white shadow"
                >
                  سجّل الآن
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

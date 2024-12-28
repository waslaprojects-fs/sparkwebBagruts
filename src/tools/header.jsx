import React, { useState } from "react";
import "../styles/tailwind.css";

import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Spark</span>
            <img src="./assets/logo512.png" className="h-20" alt="Spark Logo" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm/6 font-semibold text-gray-900">
            Home
          </a>
          <a
            href="/examsScreen"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Features
          </a>

          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Marketplace
          </a>
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Company
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
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
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="./assets/logo512.png" className="h-8 w-auto" />
            </a>
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
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <a
                  href="/examsScreen"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the toggle
//   const location = useLocation();

//   function handleLinkClick() {
//     setIsMenuOpen(false); // Close the menu when a link is clicked
//   }

//   function toggleMenu() {
//     setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
//   }

//   return (
//     <nav className="bg-white border-gray-200 dark:bg-gray-900 header">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         {/* Logo Section */}
//         <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//           <img src="./assets/logo512.png" className="h-20" alt="Spark Logo" />
//         </a>

//         {/* Action Buttons */}
//         <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//           <button
//             type="button"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Get started
//           </button>
//           <button
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             onClick={toggleMenu} // Trigger menu toggle
//             aria-controls="navbar-cta"
//             aria-expanded={isMenuOpen ? "true" : "false"}
//             aria-label="Toggle navigation menu"
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 17 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 1h15M1 7h15M1 13h15"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } items-center justify-between w-full md:flex md:w-auto md:order-1`}
//           id="navbar-cta"
//         >
//           <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             {[
//               { to: "/", label: "Home" },
//               { to: "/about", label: "About" },
//               { to: "/examsScreen", label: "Services" },
//               { to: "/contact", label: "Contact" },
//             ].map((link) => (
//               <li key={link.to}>
//                 <Link
//                   to={link.to}
//                   className={`block py-6 px-8 md:py-4 md:px-6 text-xl md:text-lg font-medium md:font-normal ${
//                     location.pathname === link.to
//                       ? "text-black shadow-xl rounded text-2xl font-bold"
//                       : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                   }`}
//                   aria-current={
//                     location.pathname === link.to ? "page" : undefined
//                   }
//                   onClick={handleLinkClick} // Close the menu on link click
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;

// <section className=" ">
//   <nav className=" ">
//     <section className="" ref={navbarRef}>
//       <Link className="" to="/">
//         Spark
//       </Link>
//       <button
//         className="navbar-toggler"
//         type="button"
//         onClick={toggleSidebar}
//         aria-controls="navbarNav"
//         aria-expanded={isSidebarVisible}
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <section
//         className={`navbar-collapse ${isSidebarVisible ? "show" : ""}`}
//         id="navbarNav"
//       >
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <Link
//               to="/"
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               }`}
//               onClick={handleLinkClick}
//             >
//               الرئيسية
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/dawrat"
//               className={`nav-link ${
//                 location.pathname === "/dawrat" ? "active" : ""
//               }`}
//               onClick={handleLinkClick}
//             >
//               دوراتنا
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/examsScreen"
//               className={`nav-link ${
//                 location.pathname === "/examsScreen" ? "active" : ""
//               }`}
//               onClick={handleLinkClick}
//             >
//               بجاريت
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/faqs"
//               className={`nav-link ${
//                 location.pathname === "/faqs" ? "active" : ""
//               }`}
//               onClick={handleLinkClick}
//             >
//               FAQs
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link
//               to="/about"
//               className={`nav-link ${
//                 location.pathname === "/about" ? "active" : ""
//               }`}
//               onClick={handleLinkClick}
//             >
//               عن المعهد
//             </Link>
//           </li>
//         </ul>
//       </section>
//     </section>
//   </nav>
// </section>

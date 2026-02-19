import React, { useState, useRef, useEffect } from "react";
import "../styles/tailwind.css";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LONG_PRESS_MS = 500;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoMenuOpen, setLogoMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const longPressTimer = useRef(null);
  const longPressTriggered = useRef(false);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const registrationLink = "https://spark-manager-web.web.app/register";
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "الرئيسية", href: "/" },
    { label: "بچاريت", href: "/examsScreen" },
    { label: "عن المعهد", href: "/dawrat" },
  ];

  const isExamRoute = (pathname) => {
    return (
      pathname === "/examsScreen" ||
      pathname.startsWith("/exams") ||
      pathname.startsWith("/physics")
    );
  };

  const isActive = (item) => {
    if (item.href === "/examsScreen") {
      return isExamRoute(location.pathname);
    }
    return location.pathname === item.href || location.pathname === item.href + "/";
  };

  // Long-press on logo: open dropdown
  const clearLongPressTimer = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const startLongPress = () => {
    longPressTriggered.current = false;
    clearLongPressTimer();
    longPressTimer.current = setTimeout(() => {
      longPressTimer.current = null;
      longPressTriggered.current = true;
      setLogoMenuOpen(true);
    }, LONG_PRESS_MS);
  };

  const endLongPress = (e) => {
    clearLongPressTimer();
  };

  const handleLogoClick = (e) => {
    if (longPressTriggered.current) {
      e.preventDefault();
      longPressTriggered.current = false;
      return;
    }
    setLogoMenuOpen(false);
    // Let Link navigate
  };

  // Close logo dropdown when clicking outside
  useEffect(() => {
    if (!logoMenuOpen) return;
    const handleClickOutside = (event) => {
      if (
        logoRef.current && !logoRef.current.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setLogoMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [logoMenuOpen]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    if (login(loginPassword)) {
      setShowLoginModal(false);
      setLoginPassword("");
      setLogoMenuOpen(false);
      navigate("/member");
    } else {
      setLoginError("كلمة المرور غير صحيحة");
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur border-b border-orange-100 sticky top-0 z-40">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex lg:flex-1 relative" ref={logoRef}>
          <Link
            to="/"
            className="-m-1.5 p-1.5 select-none"
            onClick={handleLogoClick}
            onTouchStart={startLongPress}
            onTouchEnd={endLongPress}
            onMouseDown={startLongPress}
            onMouseUp={endLongPress}
            onMouseLeave={endLongPress}
          >
            <span className="sr-only">Spark</span>
            <img src="./assets/logo512.png" className="h-20" alt="Spark Logo" />
          </Link>
          {logoMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-orange-100 bg-white py-2 shadow-lg shadow-orange-100 z-50 text-right"
            >
              {isLoggedIn ? (
                <>
                  <Link
                    to="/member"
                    className="block w-full px-4 py-3 text-base font-semibold text-gray-800 hover:bg-orange-50 transition"
                    onClick={() => setLogoMenuOpen(false)}
                  >
                    منطقة الأعضاء
                  </Link>
                  <button
                    type="button"
                    className="block w-full px-4 py-3 text-base font-semibold text-orange-600 hover:bg-orange-50 transition"
                    onClick={() => { logout(); setLogoMenuOpen(false); navigate("/"); }}
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="block w-full px-4 py-3 text-base font-semibold text-gray-800 hover:bg-orange-50 transition"
                  onClick={() => { setShowLoginModal(true); setLoginError(""); }}
                >
                  تسجيل الدخول
                </button>
              )}
            </div>
          )}
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
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`relative text-lg font-semibold transition ${
                  active
                    ? "text-orange-600"
                    : "text-gray-800 hover:text-orange-600"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-2 h-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                )}
              </Link>
            );
          })}
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

      {/* Login modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowLoginModal(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-right" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900">تسجيل الدخول</h3>
            <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="member-password" className="block text-sm font-semibold text-gray-700 mb-1">
                  كلمة المرور
                </label>
                <input
                  id="member-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => { setLoginPassword(e.target.value); setLoginError(""); }}
                  className="w-full rounded-lg border border-orange-100 px-4 py-2 text-right focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
                  placeholder="أدخل كلمة المرور"
                  autoFocus
                />
                {loginError && <p className="mt-1 text-sm text-red-600">{loginError}</p>}
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowLoginModal(false); setLoginPassword(""); setLoginError(""); }}
                  className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md"
                >
                  دخول
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between pt-4 pb-4">
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
          <div className="pt-28 pb-6">
            <div className="space-y-2">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block w-full rounded-lg px-4 py-3 text-base font-semibold text-right ${
                      active
                        ? "bg-orange-100 text-orange-700"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/member"
                    className="flex w-full items-center justify-center rounded-full bg-orange-100 px-4 py-2 text-base font-semibold text-orange-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    منطقة الأعضاء
                  </Link>
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileMenuOpen(false); navigate("/"); }}
                    className="flex w-full items-center justify-center rounded-full border border-orange-200 px-4 py-2 text-base font-semibold text-orange-600"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); setShowLoginModal(true); setLoginError(""); }}
                  className="flex w-full items-center justify-center rounded-full border border-orange-200 px-4 py-2 text-base font-semibold text-orange-600"
                >
                  تسجيل الدخول
                </button>
              )}
              <a
                href={registrationLink}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-base font-semibold text-white shadow"
              >
                سجّل الآن
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

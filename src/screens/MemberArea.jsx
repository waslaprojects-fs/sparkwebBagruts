import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import "../styles/tailwind.css";
import HeroSection from "../styles/GradientBlob";
import SEO from "../components/SEO";

// Add your special PDF URLs here (e.g. from Firebase Storage)
const SPECIAL_PDFS = [
  { label: "ورقة القوانين - رياضيات", url: "https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o/diverse%2FAR-4-MATH-Formula_NEW.pdf?alt=media&token=0d01ccae-bee3-47ce-9626-c6e11350ce45" },
  // { label: "مورد إضافي ١", url: "https://..." },
  // { label: "مورد إضافي ٢", url: "https://..." },
];

export default function MemberArea() {
  const { isLoggedIn, logout, checked } = useAuth();
  const navigate = useNavigate();
  const [pdfViewerUrl, setPdfViewerUrl] = useState(null);
  const [pdfViewerLabel, setPdfViewerLabel] = useState("");

  useEffect(() => {
    if (checked && !isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [checked, isLoggedIn, navigate]);

  if (!checked) return null;
  if (!isLoggedIn) return null;

  return (
    <section className="bg-white font-messiri">
      <SEO
        title="منطقة الأعضاء"
        description="موارد خاصة لأعضاء معهد سبارك."
        breadcrumbs={[
          { name: "الرئيسية", url: "/" },
          { name: "منطقة الأعضاء", url: "/member" },
        ]}
      />
      <HeroSection title="منطقة الأعضاء" />
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        {pdfViewerUrl && (
          <div className="mb-8 rounded-2xl border border-orange-200 bg-white shadow-lg shadow-orange-100 overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-orange-100 bg-orange-50 px-4 py-3 text-right">
              <button
                type="button"
                onClick={() => { setPdfViewerUrl(null); setPdfViewerLabel(""); }}
                className="rounded-full p-2 text-gray-600 transition hover:bg-orange-200 hover:text-orange-800"
                aria-label="إغلاق عارض PDF"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="font-semibold text-gray-800">{pdfViewerLabel || "عرض PDF"}</span>
            </div>
            <div className="relative w-full" style={{ minHeight: "70vh" }}>
              <iframe title={pdfViewerLabel || "PDF"} src={pdfViewerUrl} className="absolute inset-0 h-full w-full border-0" />
            </div>
          </div>
        )}

        <p className="text-right text-gray-600 mb-8">
          اختر أحد الموارد أدناه لعرضه في الصفحة.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {SPECIAL_PDFS.map(({ label, url }) => (
            <button
              key={url}
              type="button"
              onClick={() => { setPdfViewerLabel(label); setPdfViewerUrl(url); }}
              className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 text-right font-semibold text-gray-900 shadow-sm shadow-orange-100 transition hover:border-orange-200 hover:shadow-md"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <button
            type="button"
            onClick={() => { logout(); navigate("/"); }}
            className="rounded-full border border-orange-200 px-5 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </section>
  );
}

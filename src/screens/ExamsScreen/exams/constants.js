export const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

export const TERMS = [
  { name: "صيف موعد ب", suffix: "b" },
  { name: "صيف موعد أ", suffix: "a" },
  { name: "شتاء", suffix: "" },
];

export const PDF_PROXY_BASE_URL = "/pdfs";
export const STORAGE_BASE_URL = "https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o";

function isLocalhost() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

export function buildPdfProxyUrl(folder, fileName) {
  // Local Vite dev server does not have Firebase Hosting rewrites.
  // Use direct storage URL in localhost so PDFs can still open during development.
  if (isLocalhost()) {
    return `${STORAGE_BASE_URL}/${encodeURIComponent(folder)}%2F${encodeURIComponent(fileName)}?alt=media`;
  }

  return `${PDF_PROXY_BASE_URL}/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`;
}


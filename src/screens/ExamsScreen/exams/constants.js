export const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

export const TERMS = [
  { name: "صيف موعد ب", suffix: "b" },
  { name: "صيف موعد أ", suffix: "a" },
  { name: "شتاء", suffix: "" },
];

export const PDF_PROXY_BASE_URL = "/pdfs";

export function buildPdfProxyUrl(folder, fileName) {
  return `${PDF_PROXY_BASE_URL}/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`;
}


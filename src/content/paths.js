import { getCategory } from "./categories.js";

/** Keep in sync with the size check in storage.rules. */
export const MAX_PDF_BYTES = 40 * 1024 * 1024;

export const MATH_SESSIONS = [
  { id: "summer-b", name: "صيف موعد ب", suffix: "b" },
  { id: "summer-a", name: "صيف موعد أ", suffix: "a" },
  { id: "winter", name: "شتاء", suffix: "" },
];

const SESSION_ALIASES = {
  "صيف موعد ب": "summer-b",
  "صيف موعد أ": "summer-a",
  شتاء: "winter",
  b: "summer-b",
  a: "summer-a",
  winter: "winter",
  "summer-b": "summer-b",
  "summer-a": "summer-a",
};

const MATH_CANONICAL_RE = /^(\d{2})([ab])?\.pdf$/;
const MATH_SUFFIX_SOLUTION_RE = /^(\d{2})([ab])?_sol\.pdf$/;
const PHYSICS_PLAIN_RE = /^(\d{4})\.pdf$/;
const PHYSICS_LABELED_RE = /^(\d{4}) (.+)\.pdf$/;

export class PathInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "PathInputError";
    this.code = "invalid-path";
  }
}

export function sessionById(sessionId) {
  return MATH_SESSIONS.find((session) => session.id === sessionId) || null;
}

export function sessionFromSuffix(suffix) {
  if (suffix === "a") return sessionById("summer-a");
  if (suffix === "b") return sessionById("summer-b");
  if (!suffix) return sessionById("winter");
  return null;
}

export function normalizeSessionId(input) {
  if (input == null) return null;
  return SESSION_ALIASES[String(input).trim()] || null;
}

export function toTwoDigitYear(year) {
  const value = Number(year);
  if (!Number.isInteger(value) || value < 1970 || value > 2069) {
    throw new PathInputError("أدخل سنة من أربعة أرقام بين 1970 و 2069.");
  }
  return String(value % 100).padStart(2, "0");
}

export function expandTwoDigitYear(yy) {
  if (!/^\d{2}$/.test(String(yy))) return null;
  const value = Number(yy);
  return value >= 70 ? 1900 + value : 2000 + value;
}

function assertFourDigitYear(year) {
  const value = Number(year);
  if (!Number.isInteger(value) || String(year).trim() !== String(value) || value < 1970 || value > 2069) {
    throw new PathInputError("أدخل سنة من أربعة أرقام بين 1970 و 2069.");
  }
  return value;
}

export function assertPhysicsLabel(label) {
  if (label == null || String(label).trim() === "") return "";
  const value = String(label).trim();
  if (value.includes("/") || value.includes("\\") || value.includes("\0") || value.includes("..")) {
    throw new PathInputError("وصف الملف يحتوي على مسار أو تسلسل غير مسموح.");
  }
  if (value.length > 80) {
    throw new PathInputError("وصف الملف طويل جدًا.");
  }
  return value;
}

export function assertSupportingFileName(fileName) {
  let name = String(fileName ?? "").trim();
  if (!name) throw new PathInputError("أدخل اسم الملف.");
  if (!name.toLowerCase().endsWith(".pdf")) name = `${name}.pdf`;
  if (!name.endsWith(".pdf")) {
    throw new PathInputError("امتداد الملف يجب أن يكون .pdf بالأحرف الصغيرة.");
  }
  if (
    name.includes("/") ||
    name.includes("\\") ||
    name.includes("\0") ||
    name.includes("..") ||
    name === "." ||
    name === ".."
  ) {
    throw new PathInputError("اسم الملف يحتوي على مسار أو تسلسل غير مسموح.");
  }
  if (!/^[\p{L}\p{N}][\p{L}\p{N} ._-]{0,120}\.pdf$/u.test(name)) {
    throw new PathInputError("اسم الملف يحتوي على رموز غير مسموحة.");
  }
  return name;
}

export function mathFileStem(year, sessionId) {
  const session = typeof sessionId === "string" && sessionById(sessionId)
    ? sessionById(sessionId)
    : sessionById(normalizeSessionId(sessionId));
  if (!session) throw new PathInputError("الموعد غير معروف.");
  return `${toTwoDigitYear(year)}${session.suffix}`;
}

export function buildMathExamPath(categoryId, year, sessionId) {
  const category = requireMathCategory(categoryId);
  return `${category.folder}/${mathFileStem(year, sessionId)}.pdf`;
}

export function buildMathSolutionPath(categoryId, year, sessionId) {
  const category = requireMathCategory(categoryId);
  const stem = mathFileStem(year, sessionId);
  if (category.solutionConvention === "suffix") {
    return `${category.folder}/${stem}_sol.pdf`;
  }
  if (category.solutionConvention === "folder") {
    return `${category.folder}/sol/${stem}.pdf`;
  }
  throw new PathInputError("هذا التصنيف لا يملك مسار حلول معروفًا.");
}

export function buildPhysicsPath(categoryId, year, label) {
  const category = getCategory(categoryId);
  if (!category || category.kind !== "physics") {
    throw new PathInputError("اختر تصنيف فيزياء.");
  }
  const fullYear = assertFourDigitYear(year);
  const cleanLabel = assertPhysicsLabel(label);
  const fileName = cleanLabel ? `${fullYear} ${cleanLabel}.pdf` : `${fullYear}.pdf`;
  return `${category.folder}/${fileName}`;
}

export function buildSupportingPath(fileName) {
  return `diverse/${assertSupportingFileName(fileName)}`;
}

export function parseMathExamFileName(fileName) {
  const match = String(fileName).match(MATH_CANONICAL_RE);
  if (!match) return null;
  const session = sessionFromSuffix(match[2] || "");
  return {
    year: expandTwoDigitYear(match[1]),
    session,
    stem: `${match[1]}${match[2] || ""}`,
  };
}

export function parseMathSuffixSolutionFileName(fileName) {
  const match = String(fileName).match(MATH_SUFFIX_SOLUTION_RE);
  if (!match) return null;
  const session = sessionFromSuffix(match[2] || "");
  return {
    year: expandTwoDigitYear(match[1]),
    session,
    stem: `${match[1]}${match[2] || ""}`,
  };
}

export function parsePhysicsFileName(fileName) {
  const plain = String(fileName).match(PHYSICS_PLAIN_RE);
  if (plain) {
    return { year: Number(plain[1]), label: "" };
  }
  const labeled = String(fileName).match(PHYSICS_LABELED_RE);
  if (!labeled || labeled[2].includes("/") || labeled[2].includes("\\") || labeled[2].includes("..")) {
    return null;
  }
  return { year: Number(labeled[1]), label: labeled[2] };
}

export function isExactObjectPath(fullPath) {
  if (!fullPath || typeof fullPath !== "string") return false;
  if (!fullPath.endsWith(".pdf")) return false;
  if (fullPath.startsWith("/") || fullPath.includes("\\") || fullPath.includes("\0")) return false;
  const segments = fullPath.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) return false;
  return segments.length >= 2;
}

function requireMathCategory(categoryId) {
  const category = getCategory(categoryId);
  if (!category || category.kind !== "math") {
    throw new PathInputError("اختر تصنيف رياضيات.");
  }
  return category;
}

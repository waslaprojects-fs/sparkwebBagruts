/**
 * Unusual objects known to exist in production Storage.
 *
 * The public screens never reference these paths. They only build canonical
 * names such as 20a.pdf, 21.pdf, and 21a.pdf. The odd suffixes (l, mw, wm, wn)
 * and the double dot in 20a..pdf are not defined anywhere in the app, so their
 * session meaning is not verified.
 *
 * Do not alias them. The inventory keeps each object on its exact path and
 * surfaces it under "ملفات تحتاج مراجعة".
 * VERIFIED_LEGACY_ALIASES stays empty until a mapping is explicitly confirmed.
 */

export const VERIFIED_LEGACY_ALIASES = [];

export const UNVERIFIED_LEGACY_PATHS = [
  {
    path: "803/20a..pdf",
    reason: "نقطة مزدوجة. الشاشات العامة تتوقع 803/20a.pdf، ومعنى الملف غير مؤكد.",
  },
  {
    path: "804/sol/21l.pdf",
    reason: "اللاحقة l ليست موعدًا معروفًا (شتاء أو a أو b).",
  },
  {
    path: "805/sol/21mw.pdf",
    reason: "اللاحقة mw ليست موعدًا معروفًا.",
  },
  {
    path: "806/sol/21wm.pdf",
    reason: "اللاحقة wm ليست موعدًا معروفًا.",
  },
  {
    path: "807/sol/21wn.pdf",
    reason: "اللاحقة wn ليست موعدًا معروفًا.",
  },
];

const ALIAS_BY_PATH = new Map(
  VERIFIED_LEGACY_ALIASES.map((alias) => [alias.path, alias])
);

const NOTE_BY_PATH = new Map(
  UNVERIFIED_LEGACY_PATHS.map((item) => [item.path, item.reason])
);

export function verifiedAliasFor(fullPath) {
  return ALIAS_BY_PATH.get(fullPath) || null;
}

export function legacyReviewNote(fullPath) {
  return NOTE_BY_PATH.get(fullPath) || "";
}

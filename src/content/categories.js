/**
 * Storage folders are the source of truth.
 * Route aliases share a folder; they are not separate inventories.
 * علم الحاسوب and إلكترونيكا have public routes but no Storage folders,
 * so they are intentionally absent here.
 */

export const CATEGORIES = [
  {
    id: "801",
    displayName: "رياضيات 801",
    folder: "801",
    kind: "math",
    solutionConvention: "suffix",
    solutionsSupported: true,
    routes: ["/exams/exams801"],
    aliases: ["801"],
  },
  {
    id: "802",
    displayName: "رياضيات 371 / 802",
    folder: "802",
    kind: "math",
    solutionConvention: "suffix",
    solutionsSupported: true,
    routes: ["/exams371", "/exams802"],
    aliases: ["802", "371"],
  },
  {
    id: "803",
    displayName: "رياضيات 372 / 803",
    folder: "803",
    kind: "math",
    solutionConvention: "suffix",
    solutionsSupported: true,
    routes: ["/exams372", "/exams803"],
    aliases: ["803", "372"],
  },
  {
    id: "804",
    displayName: "رياضيات 471 / 804",
    folder: "804",
    kind: "math",
    solutionConvention: "folder",
    solutionsSupported: true,
    routes: ["/exams471", "/exams804"],
    aliases: ["804", "471"],
  },
  {
    id: "805",
    displayName: "رياضيات 472 / 805",
    folder: "805",
    kind: "math",
    solutionConvention: "folder",
    solutionsSupported: true,
    routes: ["/exams472", "/exams805"],
    aliases: ["805", "472"],
  },
  {
    id: "806",
    displayName: "رياضيات 571 / 806",
    folder: "806",
    kind: "math",
    solutionConvention: "folder",
    solutionsSupported: true,
    routes: ["/exams571", "/exams806"],
    aliases: ["806", "571"],
  },
  {
    id: "807",
    displayName: "رياضيات 572 / 807",
    folder: "807",
    kind: "math",
    solutionConvention: "folder",
    solutionsSupported: true,
    routes: ["/exams572", "/exams807"],
    aliases: ["807", "572"],
  },
  {
    id: "mechanics",
    displayName: "فيزياء ميكانيكا",
    folder: "ميكانيكا",
    kind: "physics",
    solutionConvention: "none",
    solutionsSupported: false,
    routes: ["/physics/mechanics"],
    aliases: ["mechanics", "ميكانيكا"],
  },
  {
    id: "electricity",
    displayName: "فيزياء كهرباء",
    folder: "حشمال",
    kind: "physics",
    solutionConvention: "none",
    solutionsSupported: false,
    routes: ["/physics/electricity"],
    aliases: ["electricity", "حشمال"],
  },
  {
    id: "diverse",
    displayName: "ورقة القوانين",
    folder: "diverse",
    kind: "supporting",
    solutionConvention: "none",
    solutionsSupported: false,
    routes: [],
    aliases: ["diverse"],
  },
];

const CATEGORY_BY_KEY = new Map();
for (const category of CATEGORIES) {
  CATEGORY_BY_KEY.set(category.id, category);
  CATEGORY_BY_KEY.set(category.folder, category);
  for (const alias of category.aliases) {
    CATEGORY_BY_KEY.set(String(alias), category);
  }
  for (const route of category.routes) {
    CATEGORY_BY_KEY.set(route, category);
  }
}

export function getCategory(idOrAlias) {
  if (idOrAlias == null) return null;
  return CATEGORY_BY_KEY.get(String(idOrAlias)) || null;
}

export function categoryFromPathname(pathname) {
  if (!pathname) return null;
  return CATEGORY_BY_KEY.get(pathname) || null;
}

export function mathCategories() {
  return CATEGORIES.filter((category) => category.kind === "math");
}

export function contentCategories() {
  return CATEGORIES;
}

import { legacyReviewNote, verifiedAliasFor } from "./legacy.js";
import {
  parseMathExamFileName,
  parseMathSuffixSolutionFileName,
  parsePhysicsFileName,
} from "./paths.js";
import { buildPdfProxyUrl } from "../screens/ExamsScreen/exams/constants.js";

const SESSION_RANK = {
  "summer-b": 0,
  "summer-a": 1,
  winter: 2,
};

const PUBLIC_SESSION_ORDER = ["صيف موعد ب", "صيف موعد أ", "شتاء", "عادي"];

export function createMemoryCache() {
  const values = new Map();
  const inflight = new Map();
  const generations = new Map();

  return {
    async getOrLoad(key, loader, force = false) {
      if (!force && values.has(key)) return values.get(key);
      if (!force && inflight.has(key)) return inflight.get(key);

      const token = (generations.get(key) || 0) + 1;
      generations.set(key, token);
      const promise = Promise.resolve()
        .then(loader)
        .then((value) => {
          if (generations.get(key) === token) {
            values.set(key, value);
            inflight.delete(key);
          }
          return value;
        })
        .catch((error) => {
          if (generations.get(key) === token) inflight.delete(key);
          throw error;
        });
      inflight.set(key, promise);
      return promise;
    },
    invalidate(key) {
      if (key === undefined) {
        values.clear();
        inflight.clear();
        generations.clear();
        return;
      }
      values.delete(key);
      inflight.delete(key);
      generations.set(key, (generations.get(key) || 0) + 1);
    },
    has(key) {
      return values.has(key);
    },
  };
}

export async function collectListPages(fetchPage) {
  const items = [];
  let pageToken;
  do {
    const page = await fetchPage(pageToken);
    if (!page || !Array.isArray(page.items)) {
      throw new Error("استجابة سرد التخزين غير صالحة.");
    }
    items.push(...page.items);
    pageToken = page.nextPageToken || undefined;
  } while (pageToken);
  return items;
}

export function normalizeCategoryListing(category, files) {
  const list = dedupeFiles(files);
  if (category.kind === "math" && category.solutionConvention === "suffix") {
    return sortRecords(normalizeSuffixMath(category, list));
  }
  if (category.kind === "math" && category.solutionConvention === "folder") {
    return sortRecords(normalizeFolderMath(category, list));
  }
  if (category.kind === "physics") {
    return sortRecords(normalizePhysics(category, list));
  }
  if (category.kind === "supporting") {
    return sortRecords(normalizeSupporting(category, list));
  }
  return sortRecords(list.map((file) => reviewRecord(category, file)));
}

export function summarizeInventory(records) {
  const summary = {
    examPdfs: 0,
    solutionPdfs: 0,
    missingSolutions: 0,
    reviewFiles: 0,
  };
  for (const record of records) {
    if (record.needsReview) {
      summary.reviewFiles += 1;
      continue;
    }
    if (record.examPath) summary.examPdfs += 1;
    if (record.solutionPath) summary.solutionPdfs += 1;
    if (record.status === "missing-solution") summary.missingSolutions += 1;
  }
  return summary;
}

export function filterRecords(records, filters = {}) {
  const query = String(filters.query || "").trim().toLowerCase();
  const categoryId = filters.categoryId || "all";
  const year = filters.year ? String(filters.year) : "";
  const sessionId = filters.sessionId || "";
  const status = filters.status || "all";

  return records.filter((record) => {
    if (categoryId === "review") {
      if (!record.needsReview) return false;
    } else if (categoryId !== "all") {
      if (record.categoryId !== categoryId || record.needsReview) return false;
    }
    if (year && String(record.year || "") !== year) return false;
    if (sessionId && record.sessionId !== sessionId) return false;
    if (status !== "all" && record.status !== status) return false;
    if (!query) return true;
    return searchHaystack(record).includes(query);
  });
}

export function sortRecords(records) {
  return [...records].sort((a, b) => {
    const yearA = a.year ?? -1;
    const yearB = b.year ?? -1;
    if (yearA !== yearB) return yearB - yearA;
    const sessionA = SESSION_RANK[a.sessionId] ?? 50;
    const sessionB = SESSION_RANK[b.sessionId] ?? 50;
    if (sessionA !== sessionB) return sessionA - sessionB;
    return recordPath(a).localeCompare(recordPath(b), "ar");
  });
}

export function storagePathToPublicUrl(storagePath) {
  if (!storagePath) return null;
  const parts = storagePath.split("/");
  const fileName = parts.pop();
  const folder = parts.join("/");
  return buildPdfProxyUrl(folder, fileName);
}

export function recordsToPublicTree(records) {
  const grouped = new Map();
  for (const record of records) {
    if (record.needsReview || record.kind === "supporting" || record.kind === "review") continue;
    if (!record.year) continue;
    const sessionName = record.kind === "physics"
      ? (record.label || "عادي")
      : record.sessionName;
    if (!sessionName) continue;
    if (!grouped.has(record.year)) grouped.set(record.year, new Map());
    grouped.get(record.year).set(sessionName, {
      ex: record.examPath ? storagePathToPublicUrl(record.examPath) : null,
      sol: record.solutionPath ? storagePathToPublicUrl(record.solutionPath) : null,
    });
  }

  const tree = {};
  const years = [...grouped.keys()].sort((a, b) => b - a);
  for (const year of years) {
    const sessions = grouped.get(year);
    const names = [...sessions.keys()].sort(comparePublicSessionNames);
    tree[year] = {};
    for (const name of names) tree[year][name] = sessions.get(name);
  }
  return tree;
}

export function deletionTargets(record, mode) {
  if (!record) return [];
  if (record.needsReview || record.kind === "supporting" || record.kind === "review") {
    return record.filePath ? [{ role: "file", path: record.filePath }] : [];
  }
  if (mode === "exam") {
    return record.examPath ? [{ role: "exam", path: record.examPath }] : [];
  }
  if (mode === "solution") {
    return record.solutionPath ? [{ role: "solution", path: record.solutionPath }] : [];
  }
  if (mode === "both") {
    return [
      record.examPath ? { role: "exam", path: record.examPath } : null,
      record.solutionPath ? { role: "solution", path: record.solutionPath } : null,
    ].filter(Boolean);
  }
  return [];
}

function normalizeSuffixMath(category, files) {
  const paired = new Map();
  const reviews = [];
  for (const file of files) {
    const alias = verifiedAliasFor(file.fullPath);
    if (alias) {
      addToPair(paired, category, alias.year, alias.session, alias.role, file);
      continue;
    }
    if (file.fullPath.split("/").length !== 2) {
      reviews.push(reviewRecord(category, file));
      continue;
    }
    const exam = parseMathExamFileName(file.name);
    if (exam?.session) {
      addToPair(paired, category, exam.year, exam.session, "exam", file);
      continue;
    }
    const solution = parseMathSuffixSolutionFileName(file.name);
    if (solution?.session) {
      addToPair(paired, category, solution.year, solution.session, "solution", file);
      continue;
    }
    reviews.push(reviewRecord(category, file));
  }
  return [...paired.values(), ...reviews];
}

function normalizeFolderMath(category, files) {
  const paired = new Map();
  const reviews = [];
  for (const file of files) {
    const alias = verifiedAliasFor(file.fullPath);
    if (alias) {
      addToPair(paired, category, alias.year, alias.session, alias.role, file);
      continue;
    }
    const segments = file.fullPath.split("/");
    const inSolutionFolder = segments.length === 3 && segments[1] === "sol";
    const inExamFolder = segments.length === 2;
    if (!inSolutionFolder && !inExamFolder) {
      reviews.push(reviewRecord(category, file));
      continue;
    }
    const parsed = parseMathExamFileName(file.name);
    if (!parsed?.session) {
      reviews.push(reviewRecord(category, file));
      continue;
    }
    addToPair(
      paired,
      category,
      parsed.year,
      parsed.session,
      inSolutionFolder ? "solution" : "exam",
      file
    );
  }
  return [...paired.values(), ...reviews];
}

function normalizePhysics(category, files) {
  const records = [];
  for (const file of files) {
    if (file.fullPath.split("/").length !== 2) {
      records.push(reviewRecord(category, file));
      continue;
    }
    const parsed = parsePhysicsFileName(file.name);
    if (!parsed || parsed.year < 1970 || parsed.year > 2069) {
      records.push(reviewRecord(category, file));
      continue;
    }
    records.push({
      id: `${category.id}:${parsed.year}:${parsed.label}`,
      categoryId: category.id,
      categoryName: category.displayName,
      kind: "physics",
      needsReview: false,
      year: parsed.year,
      sessionId: null,
      sessionName: parsed.label || "عادي",
      label: parsed.label,
      examPath: file.fullPath,
      solutionPath: null,
      exam: file,
      solution: null,
      filePath: null,
      file: null,
      status: "exam",
      reviewNote: "",
    });
  }
  return records;
}

function normalizeSupporting(category, files) {
  return files.map((file) => {
    const segments = file.fullPath.split("/");
    const canonical = segments.length === 2 && file.name.endsWith(".pdf") && !file.name.includes("..");
    if (!canonical) return reviewRecord(category, file);
    return {
      id: `supporting:${file.fullPath}`,
      categoryId: category.id,
      categoryName: category.displayName,
      kind: "supporting",
      needsReview: false,
      year: null,
      sessionId: null,
      sessionName: null,
      label: file.name,
      examPath: null,
      solutionPath: null,
      exam: null,
      solution: null,
      filePath: file.fullPath,
      file,
      status: "supporting",
      reviewNote: "",
    };
  });
}

function addToPair(paired, category, year, session, role, file) {
  const key = `${category.id}:${year}:${session.id}`;
  const current = paired.get(key) || emptyMathRecord(category, year, session);
  if (role === "exam") {
    current.exam = file;
    current.examPath = file.fullPath;
  } else {
    current.solution = file;
    current.solutionPath = file.fullPath;
  }
  current.status = mathStatus(current.examPath, current.solutionPath);
  paired.set(key, current);
}

function emptyMathRecord(category, year, session) {
  return {
    id: `${category.id}:${year}:${session.id}`,
    categoryId: category.id,
    categoryName: category.displayName,
    kind: "math",
    needsReview: false,
    year,
    sessionId: session.id,
    sessionName: session.name,
    label: null,
    examPath: null,
    solutionPath: null,
    exam: null,
    solution: null,
    filePath: null,
    file: null,
    status: "missing-solution",
    reviewNote: "",
  };
}

function mathStatus(examPath, solutionPath) {
  if (examPath && solutionPath) return "complete";
  if (examPath) return "missing-solution";
  return "solution-only";
}

function reviewRecord(category, file) {
  return {
    id: `review:${file.fullPath}`,
    categoryId: category.id,
    categoryName: category.displayName,
    kind: "review",
    needsReview: true,
    year: null,
    sessionId: null,
    sessionName: null,
    label: file.name,
    examPath: null,
    solutionPath: null,
    exam: null,
    solution: null,
    filePath: file.fullPath,
    file,
    status: "review",
    reviewNote: legacyReviewNote(file.fullPath),
  };
}

function dedupeFiles(files) {
  const seen = new Set();
  const result = [];
  for (const file of files || []) {
    if (!file?.fullPath) continue;
    const name = file.name || file.fullPath.split("/").pop();
    const normalized = { ...file, name };
    if (seen.has(normalized.fullPath)) continue;
    seen.add(normalized.fullPath);
    result.push(normalized);
  }
  return result;
}

function searchHaystack(record) {
  return [
    record.year,
    record.examPath,
    record.solutionPath,
    record.filePath,
    record.exam?.name,
    record.solution?.name,
    record.file?.name,
    record.label,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function recordPath(record) {
  return record.examPath || record.solutionPath || record.filePath || record.id;
}

function comparePublicSessionNames(a, b) {
  const indexA = PUBLIC_SESSION_ORDER.indexOf(a);
  const indexB = PUBLIC_SESSION_ORDER.indexOf(b);
  if (indexA === -1 && indexB === -1) return a.localeCompare(b, "ar");
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;
  return indexA - indexB;
}

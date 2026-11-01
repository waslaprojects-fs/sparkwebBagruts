import test from "node:test";
import assert from "node:assert/strict";
import { getCategory } from "./categories.js";
import { UNVERIFIED_LEGACY_PATHS, VERIFIED_LEGACY_ALIASES } from "./legacy.js";
import {
  collectListPages,
  createMemoryCache,
  deletionTargets,
  filterRecords,
  normalizeCategoryListing,
  recordsToPublicTree,
  summarizeInventory,
} from "./inventory.js";
import {
  PathInputError,
  buildMathExamPath,
  buildMathSolutionPath,
  buildPhysicsPath,
  buildSupportingPath,
  parsePhysicsFileName,
} from "./paths.js";
import {
  buildUploadMetadata,
  describeTransferOutcome,
  evaluateReplacement,
  runSequentialTransfers,
  validatePdfFile,
} from "./transfer.js";

const pdf = (name, size = 1024) => ({ name, type: "application/pdf", size });

function file(fullPath) {
  return { fullPath, name: fullPath.split("/").pop() };
}

test("math paths use a two-digit year and the session suffix", () => {
  assert.equal(buildMathExamPath("804", 2024, "winter"), "804/24.pdf");
  assert.equal(buildMathExamPath("805", 2025, "summer-a"), "805/25a.pdf");
  assert.equal(buildMathExamPath("802", 2024, "a"), "802/24a.pdf");
  assert.equal(buildMathExamPath("803", 2024, "صيف موعد ب"), "803/24b.pdf");
  assert.equal(buildMathSolutionPath("802", 2024, "summer-a"), "802/24a_sol.pdf");
  assert.equal(buildMathSolutionPath("801", 2026, "winter"), "801/26_sol.pdf");
});

test("804-807 solutions live in the sol folder and 801-803 use _sol", () => {
  for (const id of ["801", "802", "803"]) {
    assert.equal(getCategory(id).solutionConvention, "suffix");
    assert.equal(buildMathSolutionPath(id, 2024, "winter"), `${id}/24_sol.pdf`);
  }
  for (const id of ["804", "805", "806", "807"]) {
    assert.equal(getCategory(id).solutionConvention, "folder");
    assert.equal(buildMathSolutionPath(id, 2024, "winter"), `${id}/sol/24.pdf`);
  }
  assert.equal(buildMathSolutionPath("805", 2025, "summer-a"), "805/sol/25a.pdf");
  assert.equal(buildMathSolutionPath(471, 2024, "winter"), "804/sol/24.pdf");
});

test("physics keeps full years and exact Arabic labels", () => {
  assert.equal(buildPhysicsPath("mechanics", 2024, ""), "ميكانيكا/2024.pdf");
  assert.equal(buildPhysicsPath("electricity", 2024, "  "), "حشمال/2024.pdf");
  const shaddaLabel = "موعد خاص\u0651";
  const mechanicsSpecial = buildPhysicsPath("mechanics", 2021, shaddaLabel);
  assert.equal(mechanicsSpecial, "ميكانيكا/2021 موعد خاص\u0651.pdf");
  assert.equal(parsePhysicsFileName(mechanicsSpecial.split("/").pop()).label, shaddaLabel);
  assert.equal(
    buildPhysicsPath("mechanics", 2020, "موعد خاص"),
    "ميكانيكا/2020 موعد خاص.pdf"
  );
  assert.equal(
    buildPhysicsPath("electricity", 2016, "المنهاج الجديد"),
    "حشمال/2016 المنهاج الجديد.pdf"
  );
  assert.equal(
    buildPhysicsPath("electricity", 2018, "المنهاج القديم"),
    "حشمال/2018 المنهاج القديم.pdf"
  );
  assert.equal(
    buildPhysicsPath("electricity", 2021, "المتعذر عليهم"),
    "حشمال/2021 المتعذر عليهم.pdf"
  );
  assert.equal(
    buildPhysicsPath("electricity", 2022, "متعذر عليهم"),
    "حشمال/2022 متعذر عليهم.pdf"
  );
});

test("path builders reject separators and traversal", () => {
  assert.throws(() => buildSupportingPath("../secret.pdf"), PathInputError);
  assert.throws(() => buildSupportingPath("nested/file.pdf"), PathInputError);
  assert.throws(() => buildSupportingPath("nested\\file.pdf"), PathInputError);
  assert.throws(() => buildPhysicsPath("mechanics", 2024, "../801"), PathInputError);
  assert.throws(() => buildMathExamPath("801", 20, "winter"), PathInputError);
  assert.equal(
    buildSupportingPath("AR-4-MATH-Formula_NEW.pdf"),
    "diverse/AR-4-MATH-Formula_NEW.pdf"
  );
  assert.equal(
    buildSupportingPath("AR-5-MATH-Formula_NEW"),
    "diverse/AR-5-MATH-Formula_NEW.pdf"
  );
});

test("double-dot and unknown legacy names stay in review without a guessed session", () => {
  assert.equal(VERIFIED_LEGACY_ALIASES.length, 0);
  const records = [
    ...normalizeCategoryListing(getCategory("803"), [file("803/20a..pdf"), file("803/20a.pdf")]),
    ...normalizeCategoryListing(getCategory("804"), [file("804/sol/21l.pdf"), file("804/sol/21.pdf")]),
    ...normalizeCategoryListing(getCategory("805"), [file("805/sol/21mw.pdf")]),
    ...normalizeCategoryListing(getCategory("806"), [file("806/sol/21wm.pdf")]),
    ...normalizeCategoryListing(getCategory("807"), [file("807/sol/21wn.pdf")]),
  ];
  for (const legacy of UNVERIFIED_LEGACY_PATHS) {
    const record = records.find((item) => item.filePath === legacy.path);
    assert.ok(record, legacy.path);
    assert.equal(record.needsReview, true);
    assert.equal(record.status, "review");
    assert.equal(record.sessionId, null);
  }
  const realExam = records.find((item) => item.examPath === "803/20a.pdf");
  assert.equal(realExam.sessionName, "صيف موعد أ");
  assert.equal(realExam.year, 2020);
  const pairedSolution = records.find((item) => item.solutionPath === "804/sol/21.pdf");
  assert.equal(pairedSolution.status, "solution-only");
  assert.equal(pairedSolution.sessionName, "شتاء");
});

test("solution-only records and missing solutions stay visible", () => {
  const records = normalizeCategoryListing(getCategory("802"), [
    file("802/24a_sol.pdf"),
    file("802/24.pdf"),
  ]);
  const solutionOnly = records.find((record) => record.solutionPath === "802/24a_sol.pdf");
  const missing = records.find((record) => record.examPath === "802/24.pdf");
  assert.equal(solutionOnly.status, "solution-only");
  assert.equal(solutionOnly.examPath, null);
  assert.equal(solutionOnly.sessionName, "صيف موعد أ");
  assert.equal(missing.status, "missing-solution");
  assert.equal(missing.solutionPath, null);
  assert.equal(missing.sessionName, "شتاء");

  const empty = normalizeCategoryListing(getCategory("801"), []);
  assert.deepEqual(empty, []);
});

test("physics files are not counted as missing solutions", () => {
  const records = normalizeCategoryListing(getCategory("mechanics"), [
    file("ميكانيكا/2024.pdf"),
    file("ميكانيكا/2020 موعد خاص.pdf"),
    file("ميكانيكا/2021 موعد خاص\u0651.pdf"),
  ]);
  assert.equal(records.length, 3);
  assert.ok(records.every((record) => record.status === "exam" && record.solutionPath == null));
  const summary = summarizeInventory(records);
  assert.equal(summary.examPdfs, 3);
  assert.equal(summary.solutionPdfs, 0);
  assert.equal(summary.missingSolutions, 0);
  assert.equal(summary.reviewFiles, 0);

  const tree = recordsToPublicTree(records);
  const years = Object.keys(tree).map(Number).sort((a, b) => b - a);
  assert.deepEqual(years, [2024, 2021, 2020]);
  assert.equal(tree[2024]["عادي"].sol, null);
  assert.ok(tree[2024]["عادي"].ex);
  assert.ok(tree[2021]["موعد خاص\u0651"].ex);
  assert.equal(tree[2021]["موعد خاص\u0651"].sol, null);
});

test("public trees omit review files and do not link missing solutions", () => {
  const records = normalizeCategoryListing(getCategory("804"), [
    file("804/24.pdf"),
    file("804/sol/24.pdf"),
    file("804/25a.pdf"),
    file("804/sol/21l.pdf"),
  ]);
  const tree = recordsToPublicTree(records);
  assert.equal(tree[2024]["شتاء"].sol.includes("804"), true);
  assert.equal(tree[2025]["صيف موعد أ"].sol, null);
  assert.equal(tree[2025]["صيف موعد أ"].ex.includes("/pdfs/"), true);
  assert.equal(JSON.stringify(tree).includes("21l"), false);
  const years = normalizeCategoryListing(getCategory("802"), [
    file("802/25b.pdf"),
    file("802/25b_sol.pdf"),
    file("802/24.pdf"),
  ]);
  const ordered = Object.keys(recordsToPublicTree(years)).map(Number).sort((a, b) => b - a);
  assert.deepEqual(ordered, [2025, 2024]);
});

test("filters search by year, filename, and exact path", () => {
  const records = normalizeCategoryListing(getCategory("805"), [
    file("805/25a.pdf"),
    file("805/sol/25a.pdf"),
    file("805/sol/21mw.pdf"),
  ]);
  assert.equal(filterRecords(records, { query: "2025" }).length, 1);
  assert.equal(filterRecords(records, { query: "25a.pdf", categoryId: "805" }).length, 1);
  assert.equal(filterRecords(records, { query: "805/sol/21mw.pdf", categoryId: "review" }).length, 1);
  assert.equal(filterRecords(records, { categoryId: "805", status: "complete" }).length, 1);
  assert.equal(filterRecords(records, { categoryId: "805", sessionId: "summer-a" })[0].year, 2025);
});

test("replacement must be confirmed before an existing object is overwritten", () => {
  assert.equal(evaluateReplacement({ exists: false, confirmed: false }).mode, "create");
  const blocked = evaluateReplacement({ exists: true, confirmed: false });
  assert.equal(blocked.ok, false);
  assert.equal(blocked.code, "needs-confirmation");
  assert.equal(evaluateReplacement({ exists: true, confirmed: true }).mode, "replace");
});

test("metadata used by public downloads is kept when replacing a PDF", () => {
  const metadata = buildUploadMetadata({
    cacheControl: "public, max-age=31536000",
    customMetadata: { firebaseStorageDownloadTokens: "token-1", topic: "math" },
  });
  assert.equal(metadata.contentType, "application/pdf");
  assert.equal(metadata.customMetadata.firebaseStorageDownloadTokens, "token-1");
  assert.equal(metadata.cacheControl, "public, max-age=31536000");
});

test("pdf validation checks extension, declared mime type, size, and name", () => {
  assert.equal(validatePdfFile(pdf("24.pdf")).ok, true);
  assert.equal(validatePdfFile({ name: "24.PDF", type: "application/pdf", size: 10 }).ok, false);
  assert.equal(validatePdfFile({ name: "24.pdf", type: "text/plain", size: 10 }).ok, false);
  assert.equal(validatePdfFile({ name: "24.pdf", type: "", size: 10 }).ok, false);
  assert.equal(validatePdfFile(pdf("24.pdf", 40 * 1024 * 1024 + 1)).ok, false);
  assert.equal(validatePdfFile({ name: "../24.pdf", type: "application/pdf", size: 10 }).ok, false);
});

test("partial upload and delete failures identify only the failed paths", async () => {
  const jobs = [
    { role: "exam", path: "802/24.pdf", file: pdf("24.pdf") },
    { role: "solution", path: "802/24_sol.pdf", file: pdf("24_sol.pdf") },
  ];
  const outcome = await runSequentialTransfers(jobs, async (job) => {
    if (job.role === "solution") throw Object.assign(new Error("network"), { code: "storage/retry-limit-exceeded" });
    return { path: job.path };
  });
  assert.equal(outcome.partial, true);
  assert.deepEqual(outcome.retryJobs.map((job) => job.path), ["802/24_sol.pdf"]);
  assert.match(describeTransferOutcome(outcome, "الرفع"), /802\/24_sol\.pdf/);
  assert.match(describeTransferOutcome(outcome, "الرفع"), /أعد محاولة/);

  let seen = 0;
  const deleted = await runSequentialTransfers(
    [
      { role: "exam", path: "804/24.pdf" },
      { role: "solution", path: "804/sol/24.pdf" },
    ],
    async (job) => {
      seen += 1;
      if (job.role === "solution") throw new Error("delete failed");
      return job.path;
    }
  );
  assert.equal(deleted.partial, true);
  assert.deepEqual(deleted.retryJobs.map((job) => job.path), ["804/sol/24.pdf"]);
  assert.equal(seen, 2);

  const stopped = await runSequentialTransfers(jobs, async () => ({ ok: true }), () => true);
  assert.equal(stopped.allFailed, true);
  assert.equal(stopped.results[1].error.code, "storage/canceled");
});

test("deletion targets are exact object paths", () => {
  const record = normalizeCategoryListing(getCategory("804"), [
    file("804/24.pdf"),
    file("804/sol/24.pdf"),
  ])[0];
  assert.deepEqual(deletionTargets(record, "exam"), [{ role: "exam", path: "804/24.pdf" }]);
  assert.deepEqual(deletionTargets(record, "solution"), [{ role: "solution", path: "804/sol/24.pdf" }]);
  assert.deepEqual(deletionTargets(record, "both").map((item) => item.path), [
    "804/24.pdf",
    "804/sol/24.pdf",
  ]);
  const legacy = normalizeCategoryListing(getCategory("803"), [file("803/20a..pdf")])[0];
  assert.deepEqual(deletionTargets(legacy, "both"), [{ role: "file", path: "803/20a..pdf" }]);
  assert.equal(deletionTargets(legacy, "both").some((item) => item.path.endsWith("/")), false);
});

test("listing follows page tokens and does not hide page errors", async () => {
  let calls = 0;
  const items = await collectListPages(async (pageToken) => {
    calls += 1;
    if (!pageToken) return { items: [file("801/24.pdf")], nextPageToken: "next" };
    return { items: [file("801/25.pdf")], nextPageToken: undefined };
  });
  assert.equal(calls, 2);
  assert.deepEqual(items.map((item) => item.fullPath), ["801/24.pdf", "801/25.pdf"]);
  await assert.rejects(collectListPages(async () => {
    throw Object.assign(new Error("denied"), { code: "storage/unauthorized" });
  }), /denied/);
});

test("inventory cache collapses concurrent loads and drops failures", async () => {
  const cache = createMemoryCache();
  let calls = 0;
  const loader = async () => {
    calls += 1;
    return "inventory";
  };
  const [first, second] = await Promise.all([
    cache.getOrLoad("801", loader),
    cache.getOrLoad("801", loader),
  ]);
  assert.equal(first, "inventory");
  assert.equal(second, "inventory");
  assert.equal(calls, 1);
  cache.invalidate("801");
  await cache.getOrLoad("801", loader);
  assert.equal(calls, 2);

  const failing = createMemoryCache();
  await assert.rejects(failing.getOrLoad("802", async () => {
    throw new Error("list failed");
  }));
  assert.equal(failing.has("802"), false);
});

import { MAX_PDF_BYTES } from "./paths.js";

export function validatePdfFile(file, maxBytes = MAX_PDF_BYTES) {
  if (!file) return { ok: false, message: "اختر ملف PDF." };
  const name = String(file.name || "");
  if (!name.endsWith(".pdf")) {
    return { ok: false, message: "امتداد الملف يجب أن يكون .pdf بالأحرف الصغيرة." };
  }
  if (name.includes("/") || name.includes("\\") || name.includes("..") || name.includes("\0")) {
    return { ok: false, message: "اسم الملف يحتوي على مسار أو تسلسل غير مسموح." };
  }
  if (file.type !== "application/pdf") {
    return { ok: false, message: "نوع الملف المُعلَن يجب أن يكون application/pdf." };
  }
  if (typeof file.size === "number" && file.size <= 0) {
    return { ok: false, message: "الملف فارغ." };
  }
  if (typeof file.size === "number" && file.size > maxBytes) {
    const limitMb = Math.round(maxBytes / (1024 * 1024));
    return { ok: false, message: `حجم الملف أكبر من الحد المسموح (${limitMb} ميغابايت).` };
  }
  return { ok: true };
}

export function evaluateReplacement({ exists, confirmed }) {
  if (exists && !confirmed) {
    return {
      ok: false,
      code: "needs-confirmation",
      message: "الملف موجود. أكّد الاستبدال قبل المتابعة.",
    };
  }
  return { ok: true, mode: exists ? "replace" : "create" };
}

export function buildUploadMetadata(existing) {
  const metadata = {
    contentType: "application/pdf",
    cacheControl: existing?.cacheControl || "public, max-age=3600",
  };
  if (existing?.customMetadata && Object.keys(existing.customMetadata).length > 0) {
    metadata.customMetadata = { ...existing.customMetadata };
  }
  return metadata;
}

export async function runSequentialTransfers(jobs, worker, shouldStop) {
  const results = [];
  for (const job of jobs) {
    if (shouldStop?.()) {
      results.push({
        ...job,
        ok: false,
        error: Object.assign(new Error("تم إلغاء العملية."), { code: "storage/canceled" }),
      });
      continue;
    }
    try {
      const value = await worker(job);
      results.push({ ...job, ok: true, value });
    } catch (error) {
      results.push({ ...job, ok: false, error });
    }
  }
  const succeeded = results.filter((result) => result.ok);
  const failed = results.filter((result) => !result.ok);
  return {
    results,
    partial: succeeded.length > 0 && failed.length > 0,
    allFailed: results.length > 0 && failed.length === results.length,
    allSucceeded: results.length > 0 && failed.length === 0,
    retryJobs: failed.map((result) => ({
      role: result.role,
      path: result.path,
      file: result.file,
    })),
  };
}

export function formatStorageError(error) {
  const code = String(error?.code || "");
  if (code.includes("unauthorized") || code.includes("permission-denied") || code === "storage/unauthorized") {
    return "ليست لديك صلاحية لتنفيذ هذه العملية. الكتابة والحذف متاحتان لمدير لديه claim باسم admin.";
  }
  if (code.includes("canceled")) return "تم إلغاء الرفع.";
  if (code.includes("unauthenticated")) return "يجب تسجيل الدخول بحساب مدير.";
  if (code.includes("retry-limit") || code.includes("network")) {
    return "انقطع الاتصال أثناء العملية. يمكنك إعادة المحاولة.";
  }
  if (code === "invalid-file" || code === "invalid-path" || code === "needs-confirmation") {
    return error.message;
  }
  return error?.message || "حدث خطأ غير متوقع.";
}

export function describeTransferOutcome(outcome, actionLabel) {
  if (!outcome) return "";
  if (outcome.allSucceeded) return `اكتمل ${actionLabel}.`;
  if (outcome.partial) {
    const failedPaths = outcome.results.filter((result) => !result.ok).map((result) => result.path);
    const succeededPaths = outcome.results.filter((result) => result.ok).map((result) => result.path);
    return `اكتمل جزء من العملية فقط. نجح: ${succeededPaths.join("، ")}. فشل: ${failedPaths.join("، ")}. أعد محاولة الملفات الفاشلة فقط.`;
  }
  const firstError = outcome.results.find((result) => !result.ok)?.error;
  return formatStorageError(firstError);
}

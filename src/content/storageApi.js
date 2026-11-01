import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  list,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebaseConfig.js";
import { CATEGORIES, getCategory } from "./categories.js";
import { collectListPages, createMemoryCache, normalizeCategoryListing } from "./inventory.js";
import { isExactObjectPath } from "./paths.js";
import {
  buildUploadMetadata,
  evaluateReplacement,
  runSequentialTransfers,
  validatePdfFile,
} from "./transfer.js";

const categoryCache = createMemoryCache();

export function invalidateStoredInventory(categoryId) {
  if (!categoryId) {
    categoryCache.invalidate();
    return;
  }
  categoryCache.invalidate(categoryId);
}

export function loadCategoryRecords(categoryId, { force = false } = {}) {
  const category = getCategory(categoryId);
  if (!category) {
    return Promise.reject(new Error("تصنيف غير معروف."));
  }
  return categoryCache.getOrLoad(categoryId, () => fetchCategoryRecords(category), force);
}

export async function loadAllRecords({ force = false } = {}) {
  const groups = await Promise.all(
    CATEGORIES.map((category) => loadCategoryRecords(category.id, { force }))
  );
  return groups.flat();
}

export async function listFolder(folderPath) {
  return collectListPages(async (pageToken) => {
    const result = await list(ref(storage, folderPath), {
      maxResults: 1000,
      ...(pageToken ? { pageToken } : {}),
    });
    return {
      items: result.items.map((item) => ({
        fullPath: item.fullPath,
        name: item.name,
      })),
      nextPageToken: result.nextPageToken,
    };
  });
}

export async function objectExists(path) {
  try {
    await getMetadata(ref(storage, path));
    return true;
  } catch (error) {
    if (error?.code === "storage/object-not-found") return false;
    throw error;
  }
}

export async function prepareUploadMetadata(path) {
  try {
    const existing = await getMetadata(ref(storage, path));
    return { exists: true, metadata: buildUploadMetadata(existing) };
  } catch (error) {
    if (error?.code === "storage/object-not-found") {
      return { exists: false, metadata: buildUploadMetadata(null) };
    }
    throw error;
  }
}

export function uploadPdfResumable({ path, file, metadata, onProgress, onTask }) {
  const task = uploadBytesResumable(ref(storage, path), file, metadata);
  onTask?.(task);
  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.totalBytes > 0) {
          onProgress?.(snapshot.bytesTransferred / snapshot.totalBytes, path);
        }
      },
      (error) => reject(error),
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve({ path, url });
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}

export async function uploadJobs({ jobs, replaceConfirmed = false, onProgress, onTask, shouldStop }) {
  const prepared = [];
  for (const job of jobs || []) {
    if (!job?.file) continue;
    if (!isExactObjectPath(job.path)) {
      throw Object.assign(new Error("مسار الرفع غير صالح."), { code: "invalid-path", path: job.path });
    }
    const fileCheck = validatePdfFile(job.file);
    if (!fileCheck.ok) {
      throw Object.assign(new Error(fileCheck.message), { code: "invalid-file", path: job.path, role: job.role });
    }
    const meta = await prepareUploadMetadata(job.path);
    prepared.push({ ...job, metadata: meta.metadata, exists: meta.exists });
  }

  if (prepared.length === 0) {
    throw Object.assign(new Error("اختر ملف PDF واحدًا على الأقل."), { code: "invalid-file" });
  }

  const existingPaths = prepared
    .filter((job) => !evaluateReplacement({ exists: job.exists, confirmed: replaceConfirmed }).ok)
    .map((job) => job.path);
  if (existingPaths.length > 0) {
    throw Object.assign(
      new Error("بعض الملفات موجودة. أكّد الاستبدال قبل المتابعة."),
      { code: "needs-confirmation", paths: existingPaths }
    );
  }

  return runSequentialTransfers(
    prepared,
    (job) => uploadPdfResumable({
      path: job.path,
      file: job.file,
      metadata: job.metadata,
      onProgress,
      onTask,
    }),
    shouldStop
  );
}

export async function deleteExactPaths(targets, shouldStop) {
  const jobs = (targets || []).filter((target) => target?.path);
  for (const job of jobs) {
    if (!isExactObjectPath(job.path)) {
      throw Object.assign(new Error("مسار الحذف غير صالح."), { code: "invalid-path", path: job.path });
    }
  }
  return runSequentialTransfers(
    jobs,
    async (job) => {
      await deleteObject(ref(storage, job.path));
      return { path: job.path };
    },
    shouldStop
  );
}

export async function downloadUrlFor(path) {
  if (!isExactObjectPath(path)) {
    throw Object.assign(new Error("مسار العرض غير صالح."), { code: "invalid-path" });
  }
  return getDownloadURL(ref(storage, path));
}

async function fetchCategoryRecords(category) {
  const files = await listFolder(category.folder);
  if (category.solutionConvention === "folder") {
    const solutions = await listFolder(`${category.folder}/sol`);
    return normalizeCategoryListing(category, files.concat(solutions));
  }
  return normalizeCategoryListing(category, files);
}

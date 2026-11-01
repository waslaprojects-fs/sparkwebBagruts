import { getCategory } from "./categories.js";
import { createMemoryCache, recordsToPublicTree } from "./inventory.js";
import { invalidateStoredInventory, loadCategoryRecords } from "./storageApi.js";

const publicCache = createMemoryCache();

export async function loadPublicExamTree(categoryId, { force = false } = {}) {
  const category = getCategory(categoryId);
  if (!category || category.kind === "supporting") {
    throw new Error("لا يوجد محتوى عام لهذا التصنيف.");
  }
  return publicCache.getOrLoad(
    category.id,
    async () => {
      const records = await loadCategoryRecords(category.id, { force });
      return recordsToPublicTree(records);
    },
    force
  );
}

export function invalidatePublicContent(categoryId) {
  if (!categoryId) {
    publicCache.invalidate();
    invalidateStoredInventory();
    return;
  }
  const category = getCategory(categoryId);
  const id = category?.id || categoryId;
  publicCache.invalidate(id);
  invalidateStoredInventory(id);
}

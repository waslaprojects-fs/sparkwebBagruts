import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { deleteObject, getBytes, listAll, ref, uploadBytes } from "firebase/storage";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";

const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
const pdfMeta = { contentType: "application/pdf" };
let testEnv;

test.before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "demo-sparkbagrut",
    storage: {
      rules: readFileSync(new URL("../../storage.rules", import.meta.url), "utf8"),
    },
  });
});

test.after(async () => {
  await testEnv?.cleanup();
});

test.beforeEach(async () => {
  await testEnv.clearStorage();
});

function storageFor(context) {
  return context.storage();
}

test("rejects unauthenticated and non-admin writes", async () => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await uploadBytes(ref(storageFor(context), "801/26.pdf"), pdf, pdfMeta);
  });
  const anonymous = testEnv.unauthenticatedContext();
  const member = testEnv.authenticatedContext("member", { admin: false });
  await assertFails(uploadBytes(ref(storageFor(anonymous), "802/26.pdf"), pdf, pdfMeta));
  await assertFails(uploadBytes(ref(storageFor(member), "802/26.pdf"), pdf, pdfMeta));
  await assertFails(deleteObject(ref(storageFor(anonymous), "801/26.pdf")));
  await assertFails(deleteObject(ref(storageFor(member), "801/26.pdf")));
});

test("admin can create a canonical PDF and cannot write outside content prefixes", async () => {
  const adminUser = testEnv.authenticatedContext("admin-user", { admin: true });
  const storage = storageFor(adminUser);
  await assertSucceeds(uploadBytes(ref(storage, "801/26.pdf"), pdf, pdfMeta));
  await assertSucceeds(uploadBytes(ref(storage, "802/24a_sol.pdf"), pdf, pdfMeta));
  await assertSucceeds(uploadBytes(ref(storage, "804/sol/24.pdf"), pdf, pdfMeta));
  await assertSucceeds(uploadBytes(ref(storage, "ميكانيكا/2024.pdf"), pdf, pdfMeta));
  await assertFails(uploadBytes(ref(storage, "notes/26.pdf"), pdf, pdfMeta));
  await assertFails(uploadBytes(ref(storage, "801/26.pdf"), pdf, { contentType: "text/plain" }));
  await assertFails(uploadBytes(ref(storage, "803/20a..pdf"), pdf, pdfMeta));
});

test("admin can replace an existing unusual object without renaming it", async () => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await uploadBytes(ref(storageFor(context), "803/20a..pdf"), pdf, pdfMeta);
    await uploadBytes(ref(storageFor(context), "804/sol/21l.pdf"), pdf, pdfMeta);
  });
  const adminUser = testEnv.authenticatedContext("admin-user", { admin: true });
  const storage = storageFor(adminUser);
  await assertSucceeds(uploadBytes(ref(storage, "803/20a..pdf"), pdf, pdfMeta));
  await assertSucceeds(deleteObject(ref(storage, "804/sol/21l.pdf")));
  await assertFails(deleteObject(ref(storage, "804/sol")));
});

test("public clients can read and list content prefixes only", async () => {
  const adminUser = testEnv.authenticatedContext("admin-user", { admin: true });
  await uploadBytes(ref(storageFor(adminUser), "801/26.pdf"), pdf, pdfMeta);
  const anonymous = testEnv.unauthenticatedContext();
  const storage = storageFor(anonymous);
  const bytes = await assertSucceeds(getBytes(ref(storage, "801/26.pdf")));
  assert.ok(bytes.byteLength > 0);
  await assertSucceeds(listAll(ref(storage, "801")));
  await assertFails(listAll(ref(storage, "private-notes")));
});

/**
 * Grant or revoke the Firebase Auth custom claim { admin: true }.
 *
 * This is the only supported way to authorize /admin/exams. The client cannot
 * set custom claims. Run it once from a trusted machine, then ask the person
 * to sign out and sign in again so the ID token refreshes.
 *
 * Setup:
 *   1. Firebase Console → Authentication → Add user (email/password).
 *   2. Download a service account key to serviceAccountKey.json
 *      (project root or scripts/). Never commit that file.
 *   3. node scripts/grantAdminClaim.js person@example.com
 *   4. firebase deploy --only storage
 *
 * Revoke:
 *   node scripts/grantAdminClaim.js person@example.com --revoke
 */

const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

let serviceAccountPath = path.join(__dirname, "../serviceAccountKey.json");
if (!fs.existsSync(serviceAccountPath)) {
  serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
  if (!fs.existsSync(serviceAccountPath)) {
    console.error("Error: serviceAccountKey.json not found.");
    console.error("Download it from Firebase Console → Project settings → Service accounts.");
    process.exit(1);
  }
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function main() {
  const args = process.argv.slice(2).filter((arg) => arg !== "--revoke");
  const revoke = process.argv.includes("--revoke");
  const email = args[0];

  if (!email) {
    console.log("Usage: node scripts/grantAdminClaim.js <email> [--revoke]");
    process.exit(1);
  }

  const user = await admin.auth().getUserByEmail(email);
  const nextClaims = { ...(user.customClaims || {}) };
  if (revoke) delete nextClaims.admin;
  else nextClaims.admin = true;

  await admin.auth().setCustomUserClaims(user.uid, nextClaims);
  await admin.auth().revokeRefreshTokens(user.uid);

  console.log(`${revoke ? "Revoked" : "Granted"} admin claim for ${email} (${user.uid}).`);
  console.log("That user must sign out and sign in again before /admin/exams will accept them.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

# Exam Upload Script

This script allows you to upload exam PDF files to Firebase Storage.

## Setup

1. **Install dependencies:**
   ```bash
   pnpm add -D firebase-admin
   ```

2. **Get Firebase Service Account Key:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (sparkbagrut)
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `serviceAccountKey.json` in the project root or `scripts/` directory

3. **Deploy Storage rules:**
   Public read/list is limited to the content prefixes. Writes require the `admin` custom claim. Deploy with:
   ```bash
   firebase deploy --only storage
   ```

## Usage

```bash
node scripts/uploadExam.js <examNumber> <year> <term> <examFilePath> [solutionFilePath]
```

### Arguments:
- `examNumber` - Exam number (e.g., 801, 802, 803)
- `year` - Year (e.g., 2023, 2024)
- `term` - Term: 
  - Arabic: "صيف موعد أ", "صيف موعد ب", "شتاء"
  - English: "a", "b", "winter", "summer-a", "summer-b"
- `examFilePath` - Path to the exam PDF file
- `solutionFilePath` - (Optional) Path to the solution PDF file

### Examples:

```bash
# Upload exam with solution (Arabic term names)
node scripts/uploadExam.js 801 2024 "صيف موعد أ" ./exams/801/24a.pdf ./exams/801/24a_sol.pdf

# Upload exam with solution (English term names)
node scripts/uploadExam.js 802 2023 "b" ./exams/802/23b.pdf ./exams/802/23b_sol.pdf

# Upload exam only (no solution)
node scripts/uploadExam.js 803 2024 "winter" ./exams/803/24.pdf
```

## File Naming Convention

Paths are built by `src/content/paths.js`, which is the same resolver the site uses.

- Exam files: `{folder}/{year%100}{suffix}.pdf`
  - `804/24.pdf` is winter 2024
  - `805/25a.pdf` is summer session A 2025
- Solutions for 801, 802, and 803 stay in the same folder with `_sol`: `802/24a_sol.pdf`
- Solutions for 804, 805, 806, and 807 go in `sol/`: `804/sol/24.pdf`
- Route numbers such as 371 and 471 are aliases. The file is stored in 802 or 804.

## Admin claim

The site at `/admin/exams` signs in with Firebase Authentication, but Storage writes succeed only when the ID token has the custom claim `admin: true`. The browser cannot grant that claim.

One-time setup from a trusted machine that already has `serviceAccountKey.json`:

1. Create the admin user in Firebase Authentication (email/password). Do not create the user from the website.
2. Grant the claim:

```bash
node scripts/grantAdminClaim.js admin@example.com
```

3. The script revokes existing refresh tokens. The person must sign out and sign in again at `/admin/exams` so `getIdTokenResult(true)` receives the new claim.
4. Deploy the Storage rules before expecting uploads to work:

```bash
firebase deploy --only storage
```

The rules allow public read and list only on the exam, physics, and `diverse/` prefixes. They allow create, replace, and delete only for an authenticated token whose `admin` claim is true, only for PDF objects up to 40 MiB, and only on those prefixes. Deploying them does not move or delete existing files.

Removing admin access later:

```bash
node scripts/grantAdminClaim.js admin@example.com --revoke
```

## Security Note

Never commit `serviceAccountKey.json`. It is listed in `.gitignore`. Do not put that key, or any other Admin SDK credential, in the client app.


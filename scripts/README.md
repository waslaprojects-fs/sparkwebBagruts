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

3. **Update Storage Rules:**
   The storage rules have been updated to allow public reads. Deploy them:
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

The script automatically generates the correct file names based on the exam number, year, and term:

- **Exam files**: `{year%100}{suffix}.pdf`
  - Example: `24a.pdf` (2024, صيف موعد أ)
  - Example: `23b.pdf` (2023, صيف موعد ب)
  - Example: `24.pdf` (2024, شتاء)

- **Solution files**: `{year%100}{suffix}_sol.pdf`
  - Example: `24a_sol.pdf`
  - Example: `23b_sol.pdf`
  - Example: `24_sol.pdf`

- **Storage path**: `{examNumber}/{filename}`
  - Example: `801/24a.pdf`
  - Example: `801/24a_sol.pdf`

## Security Note

⚠️ **Important**: Never commit `serviceAccountKey.json` to version control. It's already added to `.gitignore`.


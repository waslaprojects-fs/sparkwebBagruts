const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

let serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
  if (!fs.existsSync(serviceAccountPath)) {
    console.error('Error: serviceAccountKey.json not found!');
    console.error('Please download it from Firebase Console and place it in the project root or scripts/ directory.');
    process.exit(1);
  }
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'sparkbagrut.appspot.com'
});

const bucket = admin.storage().bucket();

const TERM_SUFFIXES = {
  'صيف موعد ب': 'b',
  'صيف موعد أ': 'a',
  'شتاء': '',
  'b': 'b',
  'a': 'a',
  'winter': '',
  'summer-a': 'a',
  'summer-b': 'b'
};

function getFileName(year, termSuffix) {
  const yearShort = year % 100;
  return termSuffix ? `${yearShort}${termSuffix}` : `${yearShort}`;
}

async function uploadFile(localFilePath, storagePath) {
  try {
    const file = bucket.file(storagePath);
    await bucket.upload(localFilePath, {
      destination: storagePath,
      metadata: {
        contentType: 'application/pdf',
        cacheControl: 'public, max-age=31536000'
      }
    });
    
    await file.makePublic();
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    });
    
    return url.split('?')[0] + '?alt=media';
  } catch (error) {
    throw new Error(`Failed to upload ${localFilePath}: ${error.message}`);
  }
}

async function uploadExam(examNumber, year, term, examFilePath, solutionFilePath = null) {
  const termSuffix = TERM_SUFFIXES[term] !== undefined ? TERM_SUFFIXES[term] : term;
  const fileName = getFileName(year, termSuffix);
  
  const examStoragePath = `${examNumber}/${fileName}.pdf`;
  const solutionStoragePath = solutionFilePath ? `${examNumber}/${fileName}_sol.pdf` : null;
  
  console.log(`Uploading exam ${examNumber}/${year}/${term}...`);
  console.log(`  Exam file: ${examFilePath} -> ${examStoragePath}`);
  
  if (!fs.existsSync(examFilePath)) {
    throw new Error(`Exam file not found: ${examFilePath}`);
  }
  
  const examUrl = await uploadFile(examFilePath, examStoragePath);
  console.log(`  ✓ Exam uploaded: ${examUrl}`);
  
  let solutionUrl = null;
  if (solutionFilePath) {
    if (!fs.existsSync(solutionFilePath)) {
      console.warn(`  ⚠ Solution file not found: ${solutionFilePath}`);
    } else {
      console.log(`  Solution file: ${solutionFilePath} -> ${solutionStoragePath}`);
      solutionUrl = await uploadFile(solutionFilePath, solutionStoragePath);
      console.log(`  ✓ Solution uploaded: ${solutionUrl}`);
    }
  }
  
  return {
    examNumber,
    year,
    term,
    examUrl,
    solutionUrl
  };
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 4) {
    console.log(`
Usage: node uploadExam.js <examNumber> <year> <term> <examFilePath> [solutionFilePath]

Arguments:
  examNumber      - Exam number (e.g., 801, 802, 803)
  year            - Year (e.g., 2023, 2024)
  term            - Term: "صيف موعد أ", "صيف موعد ب", "شتاء", "a", "b", "winter", "summer-a", "summer-b"
  examFilePath    - Path to the exam PDF file
  solutionFilePath - (Optional) Path to the solution PDF file

Examples:
  node uploadExam.js 801 2024 "صيف موعد أ" ./exams/801/24a.pdf ./exams/801/24a_sol.pdf
  node uploadExam.js 802 2023 "b" ./exams/802/23b.pdf ./exams/802/23b_sol.pdf
  node uploadExam.js 803 2024 "winter" ./exams/803/24.pdf
`);
    process.exit(1);
  }
  
  const [examNumber, year, term, examFilePath, solutionFilePath] = args;
  
  try {
    const result = await uploadExam(
      examNumber,
      parseInt(year),
      term,
      path.resolve(examFilePath),
      solutionFilePath ? path.resolve(solutionFilePath) : null
    );
    
    console.log('\n✓ Upload completed successfully!');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('\n✗ Upload failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { uploadExam, getFileName, TERM_SUFFIXES };


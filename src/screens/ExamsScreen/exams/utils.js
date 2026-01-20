import { YEARS, TERMS, STORAGE_BASE_URL } from "./constants.js";

async function checkFileExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error(`Error checking file: ${url}`, error);
    return false;
  }
}

export function generateExamData(examNumber, checkSolutions = false) {
  const baseUrl = `${STORAGE_BASE_URL}/${examNumber}%2F`;
  const examData = {};

  for (const year of YEARS) {
    examData[year] = {};
    for (const term of TERMS) {
      // Skip summer terms for 2026 (only keep winter)
      if (year === 2026 && term.suffix !== "") continue;

      const fileSuffix = term.suffix
        ? `${year % 100}${term.suffix}`
        : `${year % 100}`;
      const encodedFileName = encodeURIComponent(`${fileSuffix}.pdf`);
      const encodedSolutionFileName = encodeURIComponent(`${fileSuffix}_sol.pdf`);

      const examUrl = `${baseUrl}${encodedFileName}?alt=media`;
      const solutionUrl = `${baseUrl}${encodedSolutionFileName}?alt=media`;

      examData[year][term.name] = {
        ex: examUrl,
        sol: solutionUrl,
      };
    }
  }

  if (checkSolutions) {
    return buildExamDataWithCheck(examData, examNumber);
  }

  return examData;
}

async function buildExamDataWithCheck(examData, examNumber, solutionsInSeparateFolder = false) {
  const tasks = YEARS.flatMap((year) =>
    TERMS.map(async (term) => {
      // Skip if this term doesn't exist for this year (e.g., summer terms for 2026)
      if (!examData[year] || !examData[year][term.name]) return;

      const solutionUrl = examData[year][term.name].sol;
      const solExists = await checkFileExists(solutionUrl);

      examData[year][term.name] = {
        ...examData[year][term.name],
        sol: solExists ? solutionUrl : null,
      };
    })
  );

  await Promise.all(tasks);
  return examData;
}

export function generateExamDataWithSolFolder(examNumber, checkSolutions = false) {
  const baseUrl = `${STORAGE_BASE_URL}/${examNumber}%2F`;
  const solBaseUrl = `${STORAGE_BASE_URL}/${examNumber}%2Fsol%2F`;
  const examData = {};

  for (const year of YEARS) {
    examData[year] = {};
    for (const term of TERMS) {
      // Skip summer terms for 2026 (only keep winter)
      if (year === 2026 && term.suffix !== "") continue;

      const fileSuffix = term.suffix
        ? `${year % 100}${term.suffix}`
        : `${year % 100}`;
      const encodedFileName = encodeURIComponent(`${fileSuffix}.pdf`);

      const examUrl = `${baseUrl}${encodedFileName}?alt=media`;
      const solutionUrl = `${solBaseUrl}${encodedFileName}?alt=media`;

      examData[year][term.name] = {
        ex: examUrl,
        sol: solutionUrl,
      };
    }
  }

  if (checkSolutions) {
    return buildExamDataWithCheck(examData, examNumber, true);
  }

  return Promise.resolve(examData);
}


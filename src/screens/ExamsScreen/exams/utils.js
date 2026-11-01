// Public screens no longer invent a file for every year. They list the real
// Storage objects through src/content/publicContent.js. Canonical paths live in
// src/content/paths.js. These generators remain only as the previous placeholder
// shape and are not used by the pages.
import { YEARS, TERMS, buildPdfProxyUrl } from "./constants.js";

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
  const examData = {};

  for (const year of YEARS) {
    examData[year] = {};
    for (const term of TERMS) {
      const fileSuffix = term.suffix
        ? `${year % 100}${term.suffix}`
        : `${year % 100}`;
      const examFileName = `${fileSuffix}.pdf`;
      const solutionFileName = `${fileSuffix}_sol.pdf`;

      const examUrl = buildPdfProxyUrl(examNumber, examFileName);
      const solutionUrl = buildPdfProxyUrl(examNumber, solutionFileName);

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
      // Skip if this term doesn't exist for this year
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
  const examData = {};

  for (const year of YEARS) {
    examData[year] = {};
    for (const term of TERMS) {
      const fileSuffix = term.suffix
        ? `${year % 100}${term.suffix}`
        : `${year % 100}`;
      const fileName = `${fileSuffix}.pdf`;

      const examUrl = buildPdfProxyUrl(examNumber, fileName);
      const solutionUrl = buildPdfProxyUrl(`${examNumber}/sol`, fileName);

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


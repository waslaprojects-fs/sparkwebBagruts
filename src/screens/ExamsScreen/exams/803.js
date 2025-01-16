const baseUrl =
  "https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o/803%2F";
const years = [2023, 2022, 2021, 2020, 2019, 2018];
const terms = [
  { name: "صيف موعد ب", suffix: "b" },
  { name: "صيف موعد أ", suffix: "a" },
  { name: "شتاء", suffix: "" },
];

// Function to check if a file exists
async function checkFileExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // File exists if status is 200
  } catch (error) {
    console.error(`Error checking file: ${url}`, error);
    return false;
  }
}

// Function to build exam data
async function buildExamData() {
  const exams803 = {};

  const tasks = years.flatMap((year) =>
    terms.map(async (term) => {
      const fileSuffix = term.suffix
        ? `${year % 100}${term.suffix}`
        : `${year % 100}`;
      const encodedFileName = encodeURIComponent(`${fileSuffix}.pdf`);
      const encodedSolutionFileName = encodeURIComponent(
        `${fileSuffix}_sol.pdf`
      );

      const examUrl = `${baseUrl}${encodedFileName}?alt=media`;
      const solUrl = `${baseUrl}${encodedSolutionFileName}?alt=media`;

      const solExists = await checkFileExists(solUrl);

      if (!exams803[year]) {
        exams803[year] = {};
      }

      exams803[year][term.name] = {
        ex: examUrl,
        sol: solExists ? solUrl : null, // Add the solution URL only if it exists
      };
    })
  );

  // Wait for all tasks to complete
  await Promise.all(tasks);

  console.log(exams803);
  return exams803;
}

// Export a promise that resolves with the data
// Export resolved data
const exams803 = buildExamData().then((data) => data);
export default exams803;

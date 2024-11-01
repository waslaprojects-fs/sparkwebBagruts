const baseUrl =
  "https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o/804%2F";
const years = [2023, 2022, 2021, 2020, 2019, 2018];
const terms = [
  { name: "صيف موعد ب", suffix: "b" },
  { name: "صيف موعد أ", suffix: "a" },
  { name: "شتاء", suffix: "" },
];

const exams804 = {};

for (let year of years) {
  exams804[year] = {};
  for (let term of terms) {
    const fileSuffix = term.suffix
      ? `${year % 100}${term.suffix}`
      : `${year % 100}`;
    const encodedFileName = encodeURIComponent(`${fileSuffix}.pdf`);
    const encodedSolutionFileName = encodeURIComponent(`${fileSuffix}_sol.pdf`);

    exams804[year][term.name] = {
      ex: `${baseUrl}${encodedFileName}?alt=media`,
      sol: `${baseUrl}${encodedSolutionFileName}?alt=media`,
    };
  }
}

export default exams804;

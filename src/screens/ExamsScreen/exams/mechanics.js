import { buildPdfProxyUrl } from "./constants.js";

function generateMechanicsExamData() {
  const folderName = "ميكانيكا";
  const examData = {};

  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2008, 2007, 2006, 2005, 2004, 2003, 2002];

  for (const year of years) {
    examData[year] = {};

    const regularFileName = `${year}.pdf`;
    const regularUrl = buildPdfProxyUrl(folderName, regularFileName);

    examData[year]["عادي"] = {
      ex: regularUrl,
      sol: null,
    };

    if (year === 2020 || year === 2022) {
      const specialFileName = `${year} موعد خاص.pdf`;
      const specialUrl = buildPdfProxyUrl(folderName, specialFileName);
      examData[year]["موعد خاص"] = {
        ex: specialUrl,
        sol: null,
      };
    }

    if (year === 2021) {
      const specialFileName = `${year} موعد خاصّ.pdf`;
      const specialUrl = buildPdfProxyUrl(folderName, specialFileName);
      examData[year]["موعد خاصّ"] = {
        ex: specialUrl,
        sol: null,
      };
    }
  }

  return Promise.resolve(examData);
}

const mechanicsExams = generateMechanicsExamData();
export default mechanicsExams;


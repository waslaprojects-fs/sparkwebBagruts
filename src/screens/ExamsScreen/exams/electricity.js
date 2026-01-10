import { STORAGE_BASE_URL } from "./constants.js";

function generateElectricityExamData() {
  const folderName = encodeURIComponent("حشمال");
  const baseUrl = `${STORAGE_BASE_URL}/${folderName}%2F`;
  const examData = {};

  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2008, 2007, 2006, 2005, 2004, 2003, 2002];

  for (const year of years) {
    examData[year] = {};

    const regularFileName = encodeURIComponent(`${year}.pdf`);
    const regularUrl = `${baseUrl}${regularFileName}?alt=media`;

    examData[year]["عادي"] = {
      ex: regularUrl,
      sol: null,
    };

    if (year === 2020) {
      const specialFileName = encodeURIComponent(`${year} موعد خاص.pdf`);
      const specialUrl = `${baseUrl}${specialFileName}?alt=media`;
      examData[year]["موعد خاص"] = {
        ex: specialUrl,
        sol: null,
      };
    }

    if (year === 2021) {
      const specialFileName = encodeURIComponent(`${year} المتعذر عليهم.pdf`);
      const specialUrl = `${baseUrl}${specialFileName}?alt=media`;
      examData[year]["متعذر عليهم"] = {
        ex: specialUrl,
        sol: null,
      };
    }

    if (year === 2022) {
      const specialFileName = encodeURIComponent(`${year} متعذر عليهم.pdf`);
      const specialUrl = `${baseUrl}${specialFileName}?alt=media`;
      examData[year]["متعذر عليهم"] = {
        ex: specialUrl,
        sol: null,
      };
    }

    if (year === 2016) {
      const specialFileName = encodeURIComponent(`${year} المنهاج الجديد.pdf`);
      const specialUrl = `${baseUrl}${specialFileName}?alt=media`;
      examData[year]["المنهاج الجديد"] = {
        ex: specialUrl,
        sol: null,
      };
    }

    if (year === 2017) {
      const specialFileName = encodeURIComponent(`${year} المنهاج الجديد.pdf`);
      const specialUrl = `${baseUrl}${specialFileName}?alt=media`;
      examData[year]["المنهاج الجديد"] = {
        ex: specialUrl,
        sol: null,
      };
    }

    if (year === 2018) {
      const specialFileName = encodeURIComponent(`${year} المنهاج القديم.pdf`);
      const specialUrl = `${baseUrl}${specialFileName}?alt=media`;
      examData[year]["المنهاج القديم"] = {
        ex: specialUrl,
        sol: null,
      };
    }
  }

  return Promise.resolve(examData);
}

const electricityExams = generateElectricityExamData();
export default electricityExams;


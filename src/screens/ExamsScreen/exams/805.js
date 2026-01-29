import { generateExamDataWithSolFolder } from "./utils.js";

// Same as 571 (806): solutions in 805/sol/ (e.g. 805/sol/26.pdf for 2026 winter)
const exams805 = generateExamDataWithSolFolder(805, false).then((data) => data);
export default exams805;

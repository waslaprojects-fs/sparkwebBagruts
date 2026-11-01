import { loadPublicExamTree } from "../../../content/publicContent.js";

export default function loadElectricityExams(options) {
  return loadPublicExamTree("electricity", options);
}

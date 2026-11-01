import { loadPublicExamTree } from "../../../content/publicContent.js";

export default function loadMechanicsExams(options) {
  return loadPublicExamTree("mechanics", options);
}

// exams/806.js
const baseUrl = "https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o/files%2F22.pdf?alt=media";

// Define the years and terms for which exams and solutions are available
const years = [2022, 2023];
const terms = [
  { name: "صيف موعد ب", suffix: "b" },
  { name: "صيف موعد أ", suffix: "a" },
  { name: "شتاء", suffix: "" },
];

// Construct the exams and solutions structure
const exams806 = years.map(year => {
  const sessions = {};
  terms.forEach(term => {
    // Construct exam and solution links correctly
    sessions[term.name] = {
      ex: "https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o/806%2F22b.pdf?alt=media&token=fedf8daf-4a6d-4f0f-acd3-a0f02b648fb1",   // Exam link
      sol: `https://firebasestorage.googleapis.com/v0/b/sparkbagrut.appspot.com/o/files%2F${year}_${term.suffix}_solution.pdf?alt=media`, // Solution link
    };
  });
  return { [year]: sessions }; // Return an object for the current year
});

// Export the constructed exams806 object for use in other modules
export default exams806;

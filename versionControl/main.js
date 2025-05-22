const internsData = [
  { name: "Ada", stage: "Beginner", pathway: "Frontend development" },
  { name: "Ben", stage: "Advanced", pathway: "Backend development" },
  { name: "Chris", stage: "Intermediate", pathway: "Gen Ai" },
  { name: "Chika", stage: "Beginner", pathway: "Frontend development" },
  { name: "Azeez", stage: "Advanced", pathway: "Frontend development" },
  { name: "joy", stage: "Intermediate", pathway: "Backend development" },
  { name: "khadijat", stage: "Beginner", pathway: "Frontend development" },
];
console.log("Interns:", internsData);
const internNames = internsData.map((intern) => intern.name);
console.log("Names:", internNames);
const internPrograms = internsData.map((intern) => intern.pathway);
console.log("Programs:", internPrograms);
const frontendInterns = internsData.filter(
  (intern) => intern.pathway === "Frontend development"
);
console.log("Frontend Interns:", frontendInterns);
const BackendInterns = internsData.filter(
  (intern) => intern.pathway === "Backend development"
);
console.log("Backend Interns:", BackendInterns);
const GenAiInterns = internsData.filter((intern) => intern.pathway === "Gen Ai");
console.log("Gen Ai Interns:", GenAiInterns);
const advancedInterns = internsData.filter(
  (intern) => intern.stage === "Advanced"
);
console.log("Advanced Interns:", advancedInterns);

// Counting Interns by Program using Reduce method
const programToCount = "Frontend development";
const totalFrontendInterns = internsData.reduce((sum, intern) => intern.pathway === programToCount ? sum + 1 : sum, 0);
document.getElementById("internSection").textContent = `Total Frontend Interns: ${totalFrontendInterns}`;

const internListDiv = document.getElementById("internList");
internsData.forEach((intern) => {
  const para = document.createElement("p");
  para.textContent = `${intern.name} is in the ${intern.stage} stage of the ${intern.pathway} pathway at FexiSaf. `;
  internListDiv.appendChild(para);
});

const testScope = () => {
  if (true) {
    let scopedVar = "I exist only in this block";
    console.log(scopedVar);
  }
}

testScope();

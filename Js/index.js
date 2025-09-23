// --------------------- Sélection des éléments HTML ---------------------
let quizBox = document.querySelector(".quizBox");
let options = document.querySelectorAll(".op"); 
let endQuiz = document.querySelector(".endQuizBoxModul"); 
let correctResponce = document.getElementById("correctResponce"); 
let incorrectResponce = document.getElementById("incorrectResponce"); 
let scoreSpan = document.getElementById("score"); 

// --------------------- Variables pour le quiz ---------------------
let currentQuestion = 0; 
let scoreValue = 0; 

let correctResponceCount = 0; 
let incorrectResponceCount = 0;

endQuiz.style.display = "none"; 

// --------------------- Récupération des données stockées dans localStorage ---------------------
let quizData = JSON.parse(localStorage.getItem("quizData")); 
let selectedTheme = localStorage.getItem("theme"); 
let selectedLevel = localStorage.getItem("selectedLevel");

// --------------------- Fonction pour charger toutes les données du quiz ---------------------
async function loadAllData() {
  try {
    const responce = await fetch(`data/${selectedTheme}.json`);
    const data = await responce.json();

    quizData = data[selectedLevel];
    loadQuestionData();

  } catch (error) {
    console.error(
      `Un error servenu lors de téléchargement du Data du theme ${selectedTheme} :`,
      error
    );
  }
}

loadAllData();

// --------------------- Fonction pour afficher la question et ses options ---------------------
function loadQuestionData() {
  const data = quizData[currentQuestion]; 

  document.getElementById("quizTitle").innerText = `Question ${
    currentQuestion + 1
  } : ${data.question}`;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = ""; 

  // Boucle sur toutes les options de la question pour création des div pour chaque option
  data.options.forEach((opt, index) => {
    const div = document.createElement("div"); 
    div.classList.add("op");

    const input = document.createElement("input"); 
    input.type = data.correct.length > 1 ? "checkbox" : "radio"; 
    input.name = "option";
    input.value = index;

    const label = document.createElement("label"); 
    label.innerText = opt;

    div.appendChild(input);
    div.appendChild(label);

    optionsContainer.appendChild(div);

    // Permet de cliquer sur tout le div pour cocher/décocher l'option 
    div.addEventListener("click", () => {
      input.checked = !input.checked;
    });
  });

  // Démarre le timer pour cette question
  questionTimer(10);
}

// ------------------------------------------------------------------------------
let userAnswers = [];
// --------------------- Fonction pour valider les réponses ---------------------
function validateAnswers() {
  const data = quizData[currentQuestion]; 
  const selected = []; 

  // Parcours des inputs pour récupérer les options sélectionnées
  document.querySelectorAll("#options input").forEach((input, index) => {
    if (input.checked) selected.push(index);
  });

  // Stocke data et les réponses de l'utilisateur pour les afficher dans le rapport
  userAnswers.push({
    question: data.question,
    options: data.options,
    correct: data.correct,
    selected: selected,
  });

  // Vérification de la réponse 
  let isCorrect =
    selected.length === data.correct.length &&
    selected.every((s) => data.correct.includes(s));

  if (isCorrect) {
    scoreValue += 10;
    correctResponceCount++;
    scoreSpan.textContent = scoreValue;
  } else {
    incorrectResponceCount++;
  }
}

// --------------------- Fonction pour passer à la question suivante ---------------------
function next() {
  validateAnswers(); 
  clearInterval(timer2Interval); 
  currentQuestion++; 

  if (currentQuestion < quizData.length) {
    loadQuestionData(); 
  } else {
    afficherResultat(); 
  }
}

// --------------------- Fonction pour afficher les résultats ---------------------
function afficherResultat() {
  quizBox.style.display = "none"; 
  endQuiz.style.display = "block"; 

  document.getElementById("resultScore").textContent = `${scoreValue} / ${quizData.length * 10}`;
  correctResponce.textContent = correctResponceCount;
  incorrectResponce.textContent = incorrectResponceCount;

  const userName = localStorage.getItem("quizUserName") || "Inconnu";
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

  const result = {
    user: userName,
    level: selectedLevel,
    score: scoreValue,
    correct: correctResponceCount,
    incorrect: incorrectResponceCount,
    date: new Date().toLocaleString(),
  };

  history.push(result);
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

// --------------------- Fonction pour afficher le rapport ---------------------
function displayReport(answers) {
  const reportBox = document.getElementById("quizReportBox");
  const reportContent = document.getElementById("reportContent");
  reportBox.style.display = "block";
  reportContent.innerHTML = "";

  answers.forEach((ans, idx) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("reportQuestion");

    let html = `<h3>Q${idx + 1}: ${ans.question}</h3>`;

    ans.options.forEach((opt, i) => {
      let className = "";
      if (ans.correct.includes(i)) className = "correctAnswer";
      if (ans.selected.includes(i) && !ans.correct.includes(i))
        className = "incorrectAnswer";

      html += `<div class="reportOption ${className}">
                 ${i + 1}. ${opt} ${ans.correct.includes(i) ? "(Correct)" : ""}
                 ${
                   ans.selected.includes(i) && !ans.correct.includes(i)
                     ? "(Votre choix)"
                     : ""
                 }
               </div>`;
    });

    questionDiv.innerHTML = html;
    reportContent.appendChild(questionDiv);
  });
}

// --------------- Variables pour masquer le header/main lors de affichage du rapport -----------------
let header = document.querySelector("Header");
let main = document.querySelector("main");

// --------------------- Fonction pour afficher le rapport ---------------------
function showReport() {
  header.style.display = "none";
  main.style.display = "none";
  endQuiz.style.display = "none";

  const reportBox = document.getElementById("quizReportBox");
  reportBox.style.display = "block";
  displayReport(userAnswers);
}

// --------------------- Fonction pour télécharger le rapport PDF ---------------------
async function telechargerPDF() {
  const element = document.getElementById("quizReportBox");
  const btn = document.querySelector(".report-actions");
  btn.style.display = "none";

  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: "rapport_quiz.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error("Erreur lors du téléchargement du PDF:", error);
  } finally {
    btn.style.display = "flex";
  }
}

// --------------------- Fonctions utilitaires ---------------------
function restartQuiz() {
  window.location.reload(); // Recharge la page pour recommencer
}

function backHome() {
  window.location.href = "index.html"; // Retour à l'accueil
}

// --------------------- Timers ---------------------
let globalTimer = 60; 
let timer2Interval; 

let timer1 = document.getElementById("delai"); 
let timer2 = document.getElementById("timer"); 

// Timer global
let timer1Interval = setInterval(() => {
  timer1.innerHTML = ` 00 : ${globalTimer}`;
  globalTimer--;
  if (globalTimer < 0) {
    clearInterval(timer1Interval);
    timer1.innerHTML = "00 : 00";
    afficherResultat();
  }
}, 1000);
 
// Timer par question
function questionTimer(timer) {
  timer2Interval = setInterval(() => {
    timer2.innerHTML = timer;
    timer--;
    if (timer < 0) {
      clearInterval(timer2Interval);
      timer2.innerHTML = "0";
      next();
    }
  }, 1000);
}
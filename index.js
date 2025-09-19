let quizBox = document.querySelector(".quizBox");
let options = document.querySelectorAll(".op");
let endQuiz = document.querySelector(".endQuizBoxModul");

let correctResponce = document.getElementById("correctResponce");
let incorrectResponce = document.getElementById("incorrectResponce");

let scoreSpan = document.getElementById("score");

let currentQuestion = 0;
let scoreValue = 0;

let correctResponceCount = 0;
let incorrectResponceCount = 0;

endQuiz.style.display = "none";

let quizData = JSON.parse(localStorage.getItem("quizData"));
let selectedLevel = localStorage.getItem("selectedLevel");

function loadData() {
  const data = quizData[selectedLevel][currentQuestion];

  document.getElementById("quizTitle").innerText = `Question ${currentQuestion + 1} : ${data.question}`;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

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

    div.addEventListener("click", () => {
      input.checked = !input.checked;
    });
  });

  startTimer(10);
}

let userAnswers = [];

function validateAnswers() {
  const data = quizData[selectedLevel][currentQuestion];
  const selected = [];

  document.querySelectorAll('#options input').forEach((el, index) => {
    if (el.checked) selected.push(index);
  });

  
  userAnswers.push({
    question: data.question,
    options: data.options,
    correct: data.correct,
    selected: selected
  });

 document.querySelectorAll('#options .op').forEach((div, index) => {
    if (data.correct.includes(index)) div.style.backgroundColor = "#38b000";
    else if (selected.includes(index)) div.style.backgroundColor = "red";
  });


  let isCorrect = selected.length === data.correct.length &&
                  selected.every(s => data.correct.includes(s));

  if (isCorrect) {
    scoreValue += 10;
    correctResponceCount++;
    scoreSpan.textContent = scoreValue;
  } else {
    incorrectResponceCount++;
  }

  document.querySelectorAll("#options input").forEach((ele) => {
    ele.disabled = true;
  });
}

function next() {
  validateAnswers();
  clearInterval(timer2Interval);
  currentQuestion++;

  if (currentQuestion < quizData[selectedLevel].length) {
    loadData();
  } else {
    afficherResultat();
  }
}

function afficherResultat() {
  quizBox.style.display = "none";
  endQuiz.style.display = "block";

  document.getElementById("resultScore").textContent =
    `${scoreValue} / ${quizData[selectedLevel].length * 10}`;
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
    date: new Date().toLocaleString()
  };

  history.push(result);
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

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
      if (ans.selected.includes(i) && !ans.correct.includes(i)) className = "incorrectAnswer";

      html += `<div class="reportOption ${className}">
                 ${i + 1}. ${opt} ${ans.correct.includes(i) ? "(Correct)" : ""}
                 ${ans.selected.includes(i) && !ans.correct.includes(i) ? "(Votre choix)" : ""}
               </div>`;
    });

    questionDiv.innerHTML = html;
    reportContent.appendChild(questionDiv);
  });
}

let header = document.querySelector("Header");
let main = document.querySelector("main");
function showReport() {

  header.style.display = "none";
  main.style.display = "none";
  endQuiz.style.display = "none";


  const reportBox = document.getElementById("quizReportBox");
  reportBox.style.display = "block";

  displayReport(userAnswers); 
}


function restartQuiz() {
  window.location.reload();
}

function backHome(){
  window.location.href = 'index.html';
}

let globalTimer = 30;
let timer2Interval;

let timer1 = document.getElementById("delai");
let timer2 = document.getElementById("timer");

let timer1Interval = setInterval(() => {
  timer1.innerHTML = ` 00 : ${globalTimer}`;
  globalTimer--;
  if (globalTimer < 0) {
    clearInterval(timer1Interval);
    timer1.innerHTML = "00 : 00";
  }
}, 1000);

function startTimer(timer) {

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

loadData();

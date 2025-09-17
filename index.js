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

function loadData() {
  const data = quizData[currentQuestion];
  document.getElementById("quizTitle").innerText = `Question ${
    currentQuestion + 1
  } : ${data.question}`;

  options.forEach((btn, index) => {
    if (data.options[index]) {
      btn.style.display = "block";
      btn.innerText = data.options[index];
    } else {
      btn.style.display = "none";
    }
    btn.style.backgroundColor = "";
    btn.disabled = false;
    btn.onclick = () => checkResponce(index, btn);
  });

  startTimer(5);
}

function checkResponce(selectedIndex, btn) {
  const correctIndex = quizData[currentQuestion].correct;

  if (selectedIndex === correctIndex) {
    scoreValue += 10;
    correctResponceCount++;
    scoreSpan.textContent = scoreValue;
    btn.style.backgroundColor = "#38b000";
  } else {
    incorrectResponceCount++;
    btn.style.backgroundColor = "red";
    options[correctIndex].style.backgroundColor = "#38b000";
  }

  options.forEach((b) => (b.disabled = true));
}

function next() {
  clearInterval(timer2Interval); 
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadData();
  } else {
    afficherResultat();
  }
}


function afficherResultat() {
  quizBox.style.display = "none";
  endQuiz.style.display = "block";

  document.getElementById("resultScore").textContent = `${scoreValue} / ${
    quizData.length * 10
  }`;
  correctResponce.textContent = correctResponceCount;
  incorrectResponce.textContent = incorrectResponceCount;
}

function restartQuiz() {
  window.location.reload();
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

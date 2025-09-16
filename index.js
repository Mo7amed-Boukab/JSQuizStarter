
let quizBox = document.querySelector(".quizBox");
let options = document.querySelectorAll(".op");
let nextBtn = document.querySelector(".quizBtn");

let currentQuestion = 0;
let score = 0;

function loadData() {
  const data = quizData[currentQuestion];
  document.getElementById("quizTitle").innerText = `Question ${currentQuestion + 1} : ${data.question}`;

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
}

function checkResponce(selectedIndex, btn) {

  const correctIndex = quizData[currentQuestion].correct;

  if (selectedIndex === correctIndex) {
    score += 10;
    document.getElementById("score").innerText = score;
    btn.style.backgroundColor = "#38b000"; 
  } else {
    btn.style.backgroundColor = "red";
    options[correctIndex].style.backgroundColor = "#38b000"; 
  }

  options.forEach(b => (b.disabled = true));
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadData();
  } else {
      // modal 
  }
});


loadData();

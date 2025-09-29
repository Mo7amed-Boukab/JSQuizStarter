// ---- Récupération paramètres ----
function getParam(key) {
  var params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// ---- Données ----
var history = JSON.parse(localStorage.getItem("quizHistory")) || [];
var idx = parseInt(getParam("id"));
var attempt = history[idx];

// ---- Références DOM ----
var metaDiv = document.getElementById("reportMeta");
var scoreSummary = document.getElementById("scoreSummary");
var questionsContainer = document.getElementById("questionsContainer");

// ---- Lancement ----
init();

function init() {
  renderMeta(attempt);
  renderSummary(attempt);
  renderQuestions(attempt.answers);
}

// ---- Affichage des infos principales ----
function renderMeta(a) {
  metaDiv.innerHTML = "";

  var infos = [
    ["fa-user", a.user],
    ["fa-layer-group", (a.theme || "").toUpperCase()],
    ["fa-signal", "Niveau: " + (a.level || "")],
    ["fa-calendar", a.date],
  ];

  infos.forEach(function (item) {
    var span = document.createElement("span");
    span.className = "difficulty-badge";
    span.innerHTML = '<i class="fas ' + item[0] + '"></i> ' + (item[1] || "");
    metaDiv.appendChild(span);
  });
}

// ---- Résumé ----
function renderSummary(a) {
  scoreSummary.innerHTML = "";

  var items = [
    ["Score", a.score],
    ["Bonnes", a.correct],
    ["Mauvaises", a.incorrect],
    ["Réussite", getRate(a) + "%"],
  ];

  items.forEach(function (item) {
    var card = document.createElement("div");
    card.className = "stat-card";

    var h3 = document.createElement("h3");
    h3.textContent = item[1];

    var p = document.createElement("p");
    p.textContent = item[0];

    card.appendChild(h3);
    card.appendChild(p);
    scoreSummary.appendChild(card);
  });
}

function getRate(a) {
  var total = (a.correct || 0) + (a.incorrect || 0);
  if (total === 0) return 0;
  return ((a.correct / total) * 100).toFixed(1);
}

// ---- Affichage des questions ----
function renderQuestions(answers) {
  questionsContainer.innerHTML = "";

  answers.forEach(function (ans, i) {
    var qBox = document.createElement("div");
    qBox.className = "reportQuestion";

    var title = document.createElement("h3");
    title.textContent = "Question " + (i + 1) + " : " + ans.question;

    var state = document.createElement("span");
    state.className = isAnswerCorrect(ans) ? " correctAnswer" : " incorrectAnswer";
    state.textContent = isAnswerCorrect(ans) ? " Correcte" : " Incorrecte";
    title.appendChild(state);

    qBox.appendChild(title);

    ans.options.forEach(function (opt, idxOpt) {
      var line = document.createElement("div");
      line.className = "reportOption";

      var isRight = ans.correct.indexOf(idxOpt) !== -1;
      var chosen = ans.selected.indexOf(idxOpt) !== -1;

      if (isRight) line.classList.add("correctAnswer");
      if (chosen && !isRight) line.classList.add("incorrectAnswer");

      var span = document.createElement("span");
      span.textContent = (idxOpt + 1) + ". " + opt;
      line.appendChild(span);

      if (isRight) {
        var tagOk = document.createElement("strong");
        tagOk.textContent = " (Réponse correcte)";
        line.appendChild(tagOk);
      }

      if (chosen) {
        var tagUser = document.createElement("em");
        tagUser.textContent = " (Votre choix)";
        line.appendChild(tagUser);
      }

      qBox.appendChild(line);
    });

    questionsContainer.appendChild(qBox);
  });
}

function isAnswerCorrect(ans) {
  if (ans.selected.length !== ans.correct.length) return false;
  return ans.selected.every(function (s) {
    return ans.correct.indexOf(s) !== -1;
  });
}

// ---- Bouton retour ----
document.getElementById("backDashboard").addEventListener("click", function () {
  window.location.href = "dashboard.html";
});

// ------------------------- Download JSON -------------------------
function downloadJSON(data, fileName = 'quiz_report.json') {
  const jsonStr = JSON.stringify(data, null, 2); 
  const blob = new Blob([jsonStr], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportJSON() {
  if (!attempt) return;
  downloadJSON(attempt, `rapport_quiz_${idx}.json`);
}

// ------------------------- Download CSV -------------------------
function csvEscape(text) {
  return `"${String(text || '').replace(/"/g, '""')}"`; // Échapper les guillemets
}

function downloadCSV(data, fileName = 'quiz_report.csv') {
  if (!data || !data.answers) return;

  const lines = [];
  // Métadonnées
  lines.push(['User', data.user].join(';'));
  lines.push(['Theme', data.theme].join(';'));
  lines.push(['Level', data.level].join(';'));
  lines.push(['Date', data.date].join(';'));
  lines.push(['Score', data.score].join(';'));
  lines.push(['Correct', data.correct].join(';'));
  lines.push(['Incorrect', data.incorrect].join(';'));
  lines.push(''); 

  // En-tête des questions
  lines.push(['QIndex','Result','Question','OptionIndex','OptionText','IsCorrect','UserSelected'].join(';'));

  // Boucle sur les questions
  data.answers.forEach((ans, qIndex) => {
    const result = isAnswerCorrect(ans) ? 'Correct' : 'Incorrect';
    ans.options.forEach((opt, oIndex) => {
      const isRight = ans.correct.includes(oIndex) ? 1 : 0;
      const chosen = ans.selected.includes(oIndex) ? 1 : 0;
      lines.push([
        qIndex + 1,
        result,
        csvEscape(ans.question),
        oIndex + 1,
        csvEscape(opt),
        isRight,
        chosen
      ].join(';'));
    });
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportCSV() {
  if (!attempt) return;
  downloadCSV(attempt, `rapport_quiz_${idx}.csv`);
}

// ------------------------- Listeners -------------------------
const btnJson = document.getElementById("exportJson");
const btnCsv = document.getElementById("exportCsv");
if (btnJson) btnJson.addEventListener("click", exportJSON);
if (btnCsv) btnCsv.addEventListener("click", exportCSV);
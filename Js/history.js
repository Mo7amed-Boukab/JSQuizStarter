const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  
// ------------------------------------  Display Quiz History Table ------------------------------------

function displayHistory(filterTheme = "") {
  let historyBody = document.getElementById("historyBody");
  historyBody.innerHTML = "";

  let filteredHistory = filterTheme ? history.filter((x) => x.theme === filterTheme): history;

  if (filteredHistory.length === 0) {
    historyBody.innerHTML = `<tr> <td colspan="7">Aucun historique trouvé</td> </tr>`;
  }
  
  filteredHistory.forEach((h, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${h.date}</td>
      <td>${h.user}</td>
      <td>${h.theme}</td>
      <td>${h.score}</td>
      <td>${h.level}</td>
      <td><button class="btnRapport" data-index="${index}">Voir Rapport</button></td>
    `;

    historyBody.appendChild(row);
  });

  document.querySelectorAll('.btnRapport').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filteredIndex = parseInt(e.currentTarget.getAttribute('data-index'),10);
      const objectSelected = filteredHistory[filteredIndex]; // On prend l'objet selectionné dans la liste filtrée à travers le data-index de button "voir rapport"
      const realIndex = history.indexOf(objectSelected); // On retrouve son index réel dans l'historique
      window.location.href = `report.html?id=${realIndex}`;
    });
  });
}

document.getElementById("themeFilter").addEventListener("change", (e) => {
  displayHistory(e.target.value);
});

// ----------------------------------- Manage modal Clear History -------------------------------------

function clearQuizHistory() {
  localStorage.removeItem("quizHistory");
  initializeApp(); 
}

  const modal = document.getElementById("confirmModal");
  const clearBtn = document.getElementById("clear-history");
  const confirmBtn = document.getElementById("confirmClear");
  const cancelBtn = document.getElementById("cancelClear");


  clearBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  confirmBtn.addEventListener("click", () => {
    clearQuizHistory();
    modal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  
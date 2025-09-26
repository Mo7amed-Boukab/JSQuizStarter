const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  
// -------------------------------------- Display Top Players ---------------------------------------

let topPlayers = [...history].sort((a, b) => b.score - a.score).slice(0, 3);

const leaderboardDiv = document.getElementById("leaderboard");

leaderboardDiv.innerHTML = "";
topPlayers.forEach((player, index) => {
  const playerDiv = document.createElement("div");
  playerDiv.classList.add("leaderboard-item");

  playerDiv.innerHTML = `
    <span class="rank">${index + 1}</span>
    <span class="name">${player.user || "Anonyme"}</span>
    <span class="score">${player.score} pts</span>
  `;

  leaderboardDiv.appendChild(playerDiv);
});
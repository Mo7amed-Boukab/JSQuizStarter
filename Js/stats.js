const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  
// -------------------------------- Display Générale Statistique -----------------------------------

function calculateStats(history) {
  const totalGames = history.length;
  const totalScore = history.reduce((sum, game) => sum + game.score, 0);
  const topScore = history.length > 0 ? Math.max(...history.map(game => game.score)) : 0;
  const avgScore = totalGames > 0 ? (totalScore / totalGames).toFixed(2) : 0;
  
  const totalCorrect = history.reduce((sum, game) => sum + game.correct, 0);
  const totalIncorrect = history.reduce((sum, game) => sum + game.incorrect, 0);
  const totalQuestions = totalCorrect + totalIncorrect;
  const successRate = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 0;

  return {
    totalGames,
    topScore,
    avgScore,
    successRate,
  };
}
let stats = calculateStats(history);

document.getElementById("totalGames").textContent = stats.totalGames;
document.getElementById("bestScore").textContent = stats.topScore;
document.getElementById("avgScore").textContent = stats.avgScore;
document.getElementById("successRate").textContent = stats.successRate + "%";
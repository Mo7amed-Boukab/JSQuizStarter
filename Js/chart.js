
const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
// -----------------------------------  Statistique en  Charts JS  --------------------------------------

const themes = ["html", "css", "js"];

function calculateThemeDistribution(history) {
  return themes.map(theme => history.filter(h => h.theme === theme).length);
}

function calculateScoresByTheme(history) {
  return themes.map(theme =>history.filter(game => game.theme === theme).reduce((sum, game) => sum + game.score, 0));
}

function createThemeDistributionChart(data) {
  const ctx = document.getElementById('distributionThemeChart').getContext('2d');
  
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["HTML", "CSS", "JavaScript"],
      datasets: [{
        label: 'Répartition des parties par thématique',
        data: data,
        backgroundColor: ["#437057", "#6C757D", "#415a77"],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw} parties`
          }
        }
      }
    }
  });
}

function createScorePerThemeChart(data) {
  const ctx = document.getElementById('scorePerThemeChart').getContext('2d');
  
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["HTML", "CSS", "JavaScript"],
      datasets: [{
        label: 'Total des scores par thématique',
        data: data,
        backgroundColor: ['#437057', '#6C757D', '#415a77'], 
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw} points`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
  
const themeDistribution = calculateThemeDistribution(history);
const scoresByTheme = calculateScoresByTheme(history);

createThemeDistributionChart(themeDistribution);
createScorePerThemeChart(scoresByTheme);
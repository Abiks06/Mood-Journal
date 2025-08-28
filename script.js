let moods = JSON.parse(localStorage.getItem("moods")) || [];

const ctx = document.getElementById("moodChart").getContext("2d");
let moodChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: moods.map(m => m.date),
    datasets: [{
      label: "Mood Tracker",
      data: moods.map(m => moodToValue(m.mood)),
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: v => ["", "Happy", "Sad", "Stressed", "Excited"][v]
        }
      }
    }
  }
});

function addMood() {
  const date = document.getElementById("dateInput").value;
  const mood = document.getElementById("moodInput").value;

  if (!date) {
    alert("Please select a date!");
    return;
  }

  moods.push({ date, mood });
  localStorage.setItem("moods", JSON.stringify(moods));

  updateChart();
  renderHistory();
}

function updateChart() {
  moodChart.data.labels = moods.map(m => m.date);
  moodChart.data.datasets[0].data = moods.map(m => moodToValue(m.mood));
  moodChart.update();
}

function renderHistory() {
  const history = document.getElementById("moodHistory");
  history.innerHTML = "";
  moods.slice().reverse().forEach(m => {
    let color = moodColor(m.mood);
    let li = document.createElement("li");
    li.innerHTML = `<strong style="color:${color}">${m.mood}</strong> on ${m.date}`;
    history.appendChild(li);
  });
}

function moodToValue(mood) {
  const mapping = { "Happy": 1, "Sad": 2, "Stressed": 3, "Excited": 4 };
  return mapping[mood];
}

function moodColor(mood) {
  const colors = { "Happy": "green", "Sad": "blue", "Stressed": "red", "Excited": "orange" };
  return colors[mood];
}

// Initial render
updateChart();
renderHistory();

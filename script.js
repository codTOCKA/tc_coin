let tg = window.Telegram?.WebApp;
if (tg) tg.expand();

let userId = tg?.initDataUnsafe?.user?.id;
if (!userId) userId = "guest";

let score = 0;
let power = 1;

// safe load
try {
  score = parseInt(localStorage.getItem("tca_score_" + userId)) || 0;
  power = parseInt(localStorage.getItem("tca_power_" + userId)) || 1;
} catch (e) {
  score = 0;
  power = 1;
}

function tapCoin() {
  score += power;
  save();
  render();
}

function upgrade() {
  if (score >= 100) {
    score -= 100;
    power++;
    save();
    render();
  } else {
    alert("Not enough TCA");
  }
}

function save() {
  try {
    localStorage.setItem("tca_score_" + userId, score);
    localStorage.setItem("tca_power_" + userId, power);
  } catch (e) {}
}

function render() {
  const el = document.getElementById("score");
  if (el) el.innerText = score;
}

// init
render();

let tg = window.Telegram?.WebApp;
if (tg) tg.expand();

let userId = tg?.initDataUnsafe?.user?.id || "guest";

// load data
let score = parseInt(localStorage.getItem("tca_score_" + userId)) || 0;
let power = parseInt(localStorage.getItem("tca_power_" + userId)) || 1;

document.getElementById("score").innerText = score;

// tap
function tapCoin() {
  score += power;
  save();
  render();
}

// upgrade
function upgrade() {
  if (score >= 100) {
    score -= 100;
    power += 1;
    save();
    render();
    alert("Upgraded! Power: " + power);
  } else {
    alert("Not enough TCA");
  }
}

// save
function save() {
  localStorage.setItem("tca_score_" + userId, score);
  localStorage.setItem("tca_power_" + userId, power);
}

// render
function render() {
  document.getElementById("score").innerText = score;
}

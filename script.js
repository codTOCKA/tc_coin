let tg = window.Telegram.WebApp;
tg.expand();

let user = tg.initDataUnsafe?.user;

let userId = user?.id || "guest";

let score = 0;
let power = 1;

// load saved data
if (localStorage.getItem("tca_score_" + userId) {
  score = parseInt(localStorage.getItem("tca_score"));
}

if (localStorage.setItem("tca_power_" + userId, power); {
  power = parseInt(localStorage.getItem("tca_power"));
}

document.getElementById("score").innerText = score;

function tapCoin() {
  score += power;
  document.getElementById("score").innerText = score;

  localStorage.setItem("tca_score", score);
}

// upgrade system (simple)
function upgrade() {
  if (score >= 100) {
    score -= 100;
    power += 1;

    localStorage.setItem("tca_score", score);
    localStorage.setItem("tca_power", power);

    document.getElementById("score").innerText = score;
    alert("Upgraded! Power: " + power);
  } else {
    alert("Not enough TCA");
  }
}

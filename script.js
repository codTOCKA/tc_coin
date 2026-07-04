const SUPABASE_URL = "svefudrwwzcrxniktfis";
const SUPABASE_KEY = "sb_secret_07CdZ9wbu_pwZwF-kSbCTw_jOEImVVI";

async function saveOnline() {
  await fetch(SUPABASE_URL + "/rest/v1/users", {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates"
    },
    body: JSON.stringify({
      id: userId,
      score: score,
      power: power
    })
  });
}

let tg = window.Telegram?.WebApp;
if (tg) tg.expand();

let userId = tg?.initDataUnsafe?.user?.id;
if (!userId) userId = "guest";

let score = 0;
let power = 1;

let energy = 100;
let maxEnergy = 100;

// safe load
try {
  score = parseInt(localStorage.getItem("tca_score_" + userId)) || 0;
  power = parseInt(localStorage.getItem("tca_power_" + userId)) || 1;
} catch (e) {
  score = 0;
  power = 1;
}

function tapCoin() {
  if (energy <= 0) return;

  score += power;
  energy -= 1;

  save();
  render();
}
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
  document.getElementById("score").innerText = score;

  let energyEl = document.getElementById("energy");
  if (energyEl) {
    energyEl.innerText = energy + " / " + maxEnergy;
  }
}
}

// init
render();
setInterval(() => {
  if (energy < maxEnergy) {
    energy += 1;
    render();
  }
}, 1000);

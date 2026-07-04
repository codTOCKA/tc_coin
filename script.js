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
  localStorage.setItem("tca_score_" + userId, score);
  localStorage.setItem("tca_power_" + userId, power);

  saveOnline(); // 👈 اضافه شد
}
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

async function loadLeaderboard() {
  const res = await fetch(SUPABASE_URL + "/rest/v1/users?select=*&order=score.desc&limit=10", {
    method: "GET",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: "Bearer " + SUPABASE_KEY
    }
  });

  const data = await res.json();
  renderLeaderboard(data);
}

function renderLeaderboard(data) {
  const box = document.getElementById("leaderboard");
  if (!box) return;

  box.innerHTML = "";

  data.forEach((u, i) => {
    const div = document.createElement("div");
    div.className = "lb-item";
    div.innerText = `${i + 1}. ${u.id} - ${u.score} TCA`;
    box.appendChild(div);
  });
}

setInterval(loadLeaderboard, 5000);
loadLeaderboard();

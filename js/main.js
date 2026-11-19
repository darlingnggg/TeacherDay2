const scene = document.querySelector(".scene");
const openBtn = document.getElementById("open-btn");
const hint = document.getElementById("hint");
const msgVi = document.getElementById("msg-vi");
const msgEn = document.getElementById("msg-en");
const sender = document.getElementById("sender");
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("music-btn");

function showRandomMessage() {
  const i = Math.floor(Math.random() * MESSAGES.length);
  msgVi.textContent = MESSAGES[i].vi;
  msgEn.textContent = MESSAGES[i].en;
}

function startMusic() {
  bgm.volume = 0.5;
  bgm.play()
    .then(() => { musicBtn.hidden = false; })
    .catch(() => {});
}

musicBtn.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play();
    musicBtn.textContent = "🔊";
    musicBtn.setAttribute("aria-label", "Tắt nhạc");
  } else {
    bgm.pause();
    musicBtn.textContent = "🔇";
    musicBtn.setAttribute("aria-label", "Bật nhạc");
  }
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function openEnvelope() {
  startMusic();
  openBtn.disabled = true;
  scene.classList.add("is-open");
  await wait(1300);
  scene.classList.add("is-out");
}

showRandomMessage();
openBtn.addEventListener("click", openEnvelope);

const params = new URLSearchParams(window.location.search);
const toName = params.get("to");
const fromName = params.get("from");

if (toName) {
  document.getElementById("greeting-vi").textContent = "Gửi " + toName;
  document.getElementById("greeting-en").textContent = "Dear " + toName;
}
if (fromName) {
  sender.textContent = fromName;
}

const tapZone = document.getElementById("tap-zone");
const voiceText = document.getElementById("voice-text");

// TAP
tapZone.addEventListener("click", () => {
  navigate();
});

// SWIPE RIGHT → LEFT
let startX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 80) {
    navigate();
  }
});

// NAVIGATION
function navigate() {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = "categories.html";
  }, 300);
}

// VOICE
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;

  recognition.onresult = (event) => {
    let speech = event.results[event.results.length - 1][0].transcript.toLowerCase();

    voiceText.innerText = speech;

    if (speech.includes("open") || speech.includes("enter")) {
      navigate();
    }
  };

  recognition.start();
}

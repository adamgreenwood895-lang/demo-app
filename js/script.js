// ELEMENTS
const tapZone = document.getElementById("tap-zone");
const voiceText = document.getElementById("voice-text");

// ==========================
// TAP INTERACTION
// ==========================
if (tapZone) {
  tapZone.addEventListener("click", () => triggerEnter());
}

// ==========================
// SWIPE DETECTION
// ==========================
let startX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 80) {
    triggerEnter();
  }
});

// ==========================
// ENTER TRANSITION
// ==========================
function triggerEnter() {

  if (tapZone) {
    tapZone.classList.add("enter-active");
  }

  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "categories.html";
  }, 400);
}

// ==========================
// VOICE RECOGNITION
// ==========================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let speech = event.results[event.results.length - 1][0].transcript.toLowerCase();

    if (voiceText) {
      voiceText.innerText = speech;
    }

    // ENTER COMMANDS
    if (
      speech.includes("open") ||
      speech.includes("enter") ||
      speech.includes("go")
    ) {
      triggerEnter();
    }

    // CATEGORY NAV (if on categories page)
    if (typeof categories !== "undefined") {
      categories.forEach(cat => {
        if (speech.includes(cat.name.toLowerCase())) {
          navigateTo(`products.html?cat=${cat.id}`);
        }
      });
    }

    // BACK COMMAND
    if (speech.includes("back")) {
      window.history.back();
    }
  };

  recognition.onerror = () => {
    console.log("Voice recognition error");
  };

  recognition.start();
}

// ==========================
// NAVIGATION HELPER
// ==========================
function navigateTo(url) {
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = url;
  }, 300);
}

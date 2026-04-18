const orb = document.getElementById("orb");
const voiceText = document.getElementById("voice-text");

// CLICK ORB
orb?.addEventListener("click", () => {
  navigate("categories.html");
});

// SWIPE
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 80) {
    navigate("categories.html");
  }
});

// NAVIGATION WITH FADE
function navigate(page) {
  document.body.style.opacity = "0";
  setTimeout(() => {
    window.location.href = page;
  }, 300);
}

// VOICE SYSTEM
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;

  recognition.onresult = (event) => {
    let speech = event.results[event.results.length - 1][0].transcript.toLowerCase();

    voiceText.innerText = speech;

    if (speech.includes("open categories")) {
      navigate("categories.html");
    }

    if (speech.includes("back")) {
      window.history.back();
    }

    // CATEGORY VOICE NAV
    if (typeof categories !== "undefined") {
      categories.forEach(cat => {
        if (speech.includes(cat.name.toLowerCase())) {
          navigate(`products.html?cat=${cat.id}`);
        }
      });
    }
  };

  recognition.start();
}

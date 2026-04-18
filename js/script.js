// TAP ZONE CLICK
document.getElementById("tap-zone")?.addEventListener("click", () => {
  window.location.href = "categories.html";
});

// SWIPE DETECTION
let startX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 100) {
    window.location.href = "categories.html";
  }
});

// VOICE RECOGNITION
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;

  recognition.onresult = (event) => {
    let transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();

    if (transcript.includes("open categories")) {
      window.location.href = "categories.html";
    }
  };

  recognition.start();
}
if (window.location.pathname.includes("categories.html")) {

  recognition.onresult = (event) => {
    let speech = event.results[event.results.length - 1][0].transcript.toLowerCase();

    categories.forEach(cat => {
      if (speech.includes(cat.name.toLowerCase())) {
        window.location.href = `products.html?cat=${cat.id}`;
      }
    });
  };
}

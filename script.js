const weddingDate = new Date("August 29, 2026 00:00:00").getTime();

const countdown = () => {

  const now = new Date().getTime();

  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60))
    / 1000
  );

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

};

setInterval(countdown, 1000);

countdown();

/* =========================
   MODAL REGALOS
========================= */

const giftModal =
  document.getElementById("giftModal");

const openGiftModal =
  document.getElementById("openGiftModal");

const closeGiftModal =
  document.getElementById("closeGiftModal");

openGiftModal.addEventListener("click", () => {

  giftModal.classList.add("show");

});

closeGiftModal.addEventListener("click", () => {

  giftModal.classList.remove("show");

});

giftModal.addEventListener("click", (e) => {

  if(e.target === giftModal){

    giftModal.classList.remove("show");

  }

});

function copyAccount(account){

  navigator.clipboard.writeText(account);

  const toast =
    document.getElementById("toast");

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}

/* =========================
   CIERRE AUTOMÁTICO RSVP
========================= */

const deadline = new Date("2026-07-15T23:59:59");

const rsvpButton = document.getElementById("rsvpButton");
const rsvpMessage = document.getElementById("rsvpClosedMessage");

if (rsvpButton && new Date() > deadline) {

  rsvpButton.disabled = true;

  rsvpButton.textContent =
    "Confirmaciones cerradas";

  rsvpButton.style.opacity = "0.5";

  rsvpButton.style.cursor =
    "not-allowed";

  rsvpMessage.textContent =
    "Gracias por acompañarnos. El período de confirmación ha finalizado.";

}

/* =========================
   RSVP GOOGLE SHEETS
========================= */

const form = document.getElementById("rsvpForm");

const successMessage =
  document.getElementById("successMessage");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = {

    family:
      document.getElementById("family").value,

    adults:
      document.getElementById("adults").value,

    children:
      document.getElementById("children").value,

    message:
      document.getElementById("message").value

  };

  try {

    await fetch(
      "https://script.google.com/macros/s/AKfycbz3yD7VmRnuBTMKZUp51PYV9TEbwVvnx4LMi9J-1F1qrhqM8I-mmucehvogankXx_zD/exec",
      {
        method: "POST",

        body: JSON.stringify(data)
      }
    );

    document
      .getElementById("rsvpForm")
      .style.display = "none";

    document
      .getElementById("successCard")
      .classList.add("show");

    form.reset();

    document.getElementById("adults").value = 1;
    document.getElementById("children").value = 0;

  }

  catch(error){

    successMessage.textContent =
      "Ocurrió un problema al enviar la confirmación.";

    console.error(error);

  }

});

/* =========================
   MUSIC PLAYER
========================= */

const musicPlayer =
  document.getElementById("musicPlayer");

const music =
  document.getElementById("bgMusic");

const vinyl =
  document.querySelector(".vinyl");

let isPlaying = false;

musicPlayer.addEventListener("click", () => {

  if(!isPlaying){

    music.play();

    vinyl.classList.add("playing");

    isPlaying = true;

  }else{

    music.pause();

    vinyl.classList.remove("playing");

    isPlaying = false;

  }

});

/* =========================
   REVEAL ON SCROLL
========================= */

const reveals =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add("active");

        }

      });

    },

    {
      threshold: 0.15
    }

);

reveals.forEach(item => {

  revealObserver.observe(item);

});

/* =========================
   MUSIC HINT
========================= */

window.addEventListener("load", () => {

  const hint =
    document.getElementById("musicHint");

  const arrow =
    document.querySelector(".scroll-indicator");

  setTimeout(() => {

    if(hint){
      hint.classList.add("hide");
    }

    if(arrow){
      arrow.classList.add("hide");
    }

  }, 5000);

});
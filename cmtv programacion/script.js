//abrir y cerrar el sidebar
// Mostrar el sidebar al pasar el mouse
const sidebar = document.getElementById("sidebar");

sidebar.addEventListener("mouseenter", () => {
  sidebar.classList.remove("collapsed");
});

sidebar.addEventListener("mouseleave", () => {
  sidebar.classList.add("collapsed");
});

//reproductor de música simple
/* ===== COLAPSAR SIDEBAR EXISTENTE ===== */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

/* ===== PLAYLIST BÁSICA ===== */
const tracks = [
  {
    file: "canciones/Ciro y los Persas - Tan Solo - Antes .mp3",
    title: "Ciro y los Persas - Tan Solo - Antes ",
  },
  {
    file: "canciones/La Beriso - Amor de la Salada ft Rocío Quiroz.mp3",
    title: "La Beriso - Amor de la Salada ft Rocío Quiroz tema",
  },
  {
    file: "canciones/La Renga  Balada Del Diablo y La Muerte InsoportablemENte VIVO.mp3",
    title: "La Renga  Balada Del Diablo y La Muerte Insoportablemente",
  },
];

let current = 0;
let playing = false;

/* elementos DOM */
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progressBar");
const songTitle = document.getElementById("songTitle");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

/* cargar pista */
function loadTrack(i) {
  current = (i + tracks.length) % tracks.length;
  audio.src = tracks[current].file;
  songTitle.textContent = tracks[current].title;
}
loadTrack(current);

/* reproducir / pausar */
function play() {
  audio.play();
  playing = true;
  // Cambia el botón a imagen de pausa (más grande)
  playPauseBtn.innerHTML =
    '<img src="imagen/pc/home/sidebar/pause.svg" alt="Pausa">';
}
function pause() {
  audio.pause();
  playing = false;
  // Cambia el botón a imagen de play (más grande)
  playPauseBtn.innerHTML =
    '<img src="imagen/pc/home/sidebar/play.svg" alt="Play">';
}

/* eventos */
playPauseBtn.addEventListener("click", () => (playing ? pause() : play()));
prevBtn.addEventListener("click", () => {
  loadTrack(current - 1);
  play();
});
nextBtn.addEventListener("click", () => {
  loadTrack(current + 1);
  play();
});

/* barra progreso + tiempos */
function fmt(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

audio.addEventListener("loadedmetadata", () => {
  totalTime.textContent = fmt(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  currentTime.textContent = fmt(audio.currentTime);
  progressBar.value = (audio.currentTime / audio.duration) * 100;
});
progressBar.addEventListener("input", (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

/* avanzar al terminar */
audio.addEventListener("ended", () => {
  loadTrack(current + 1);
  play();
});

// Funcion para carrusel de inicio

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

document.querySelector(".prev").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
});

document.querySelector(".next").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
});

// Mostrar el primer slide al inicio
showSlide(currentSlide);

function scrollCarruselSecundario(direction) {
  const carrusel = document.querySelector(".carruselSecundario");
  const cardWidth = carrusel.querySelector(".card").offsetWidth + 4;
  carrusel.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
}

//=== Slider de playlist ===//
const slider = document.getElementById("playlistSlider");
document.querySelector(".playlist-btn.prev").addEventListener("click", () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
});
document.querySelector(".playlist-btn.next").addEventListener("click", () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
});

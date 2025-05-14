const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const indicatorsContainer = document.querySelector(".indicators");

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let autoSlideInterval;

function createIndicators() {
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    indicatorsContainer.appendChild(dot);
  });
}

function updateIndicators() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function setSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  currentTranslate = -currentIndex * 100;
  track.style.transform = `translateX(${currentTranslate}%)`;
  updateIndicators();
}

function nextSlide() {
  setSlide(currentIndex + 1);
}

function prevSlide() {
  setSlide(currentIndex - 1);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 2000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Touch swipe logic
track.addEventListener("touchstart", e => {
  stopAutoSlide();
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  startAutoSlide();
});

// Инициализация
createIndicators();
setSlide(0);
startAutoSlide();
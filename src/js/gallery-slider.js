const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {
  const track = item.querySelector(".slider-track");
  const slides = Array.from(item.querySelectorAll(".slide"));
  const indicatorsContainer = item.querySelector(".indicators");

  let currentIndex = 1;
  let intervalId;
  let startX = 0;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = item.querySelectorAll(".slide");

  track.style.transform = `translateX(-${100 * currentIndex}%)`;

  function createIndicators() {
    indicatorsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      indicatorsContainer.appendChild(dot);
    });
  }

  function updateIndicators(index) {
    const dots = indicatorsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function setSlide(index, withTransition = true) {
    track.style.transition = withTransition ? "transform 0.4s ease-in-out" : "none";
    track.style.transform = `translateX(-${100 * index}%)`;
  }

  function nextSlide() {
    currentIndex++;
    setSlide(currentIndex);
    updateIndicators((currentIndex - 1) % slides.length);
  }

  function prevSlide() {
    currentIndex--;
    setSlide(currentIndex);
    updateIndicators((currentIndex - 1 + slides.length) % slides.length);
  }

  function startAutoSlide() {
    intervalId = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  track.addEventListener("transitionend", () => {
    if (allSlides[currentIndex]?.isSameNode(firstClone)) {
      currentIndex = 1;
      setSlide(currentIndex, false);
    }
    if (allSlides[currentIndex]?.isSameNode(lastClone)) {
      currentIndex = slides.length;
      setSlide(currentIndex, false);
    }
  });

  track.addEventListener("touchstart", e => {
    stopAutoSlide();
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    startAutoSlide();
  });

  // 🧠 Восстановление при возврате во вкладку
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      setSlide(currentIndex, false); // сбрасываем положение
      setTimeout(() => {
        track.style.transition = "transform 0.4s ease-in-out";
      }, 50);
      startAutoSlide();
    }
  });

  createIndicators();
  startAutoSlide();
});

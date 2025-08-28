const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    let index = 0;
    let interval;

    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(i) {
        index = (i + images.length) % images.length;
        slides.style.transform = `translateX(${-index * 100}%)`;
        dots.forEach(d => d.classList.remove("active"));
        dots[index].classList.add("active");
}


    function nextSlide() { showSlide(index + 1); }
    function prevSlide() { showSlide(index - 1); }

    next.addEventListener("click", nextSlide);
    prev.addEventListener("click", prevSlide);

    function startAutoPlay() { interval = setInterval(nextSlide, 2000); }
    function stopAutoPlay() { clearInterval(interval); }


    document.getElementById("carousel").addEventListener("mouseover", stopAutoPlay);
    document.getElementById("carousel").addEventListener("mouseout", startAutoPlay);

   
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    });

    startAutoPlay();
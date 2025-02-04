const parallaxElements = document.querySelectorAll(".parallax");

window.addEventListener("scroll", () => {
  const value = window.scrollY;

  parallaxElements.forEach((element) => {
    const speed = parseFloat(element.dataset.speed);
    const factor = -speed / 100;

    element.style.transform = `translate3d(0px, ${value * factor}px, 0px)`;
  });
});

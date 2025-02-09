const listScrollStartY = 293;
const listScrollEndY = 1358;
const listItems = document.querySelectorAll(".panel1_list>li");
const listDivision = (listScrollEndY - listScrollStartY) / listItems.length;

const ryan = document.querySelector(".panel1_img img");
const ryanScrollStartY = 879;
const ryanScrollEndY = 1178;
const ryanStartX = 79.3958;
const ryanStartY = -13.012;
const ryanStartRotate = 22.9998;

window.addEventListener("scroll", () => {
  // console.log(window.scrollY);

  listItems.forEach((item) => {
    if (item.classList.contains("on")) {
      item.classList.remove("on");
    }
  });

  if (window.scrollY > listScrollStartY && window.scrollY < listScrollEndY) {
    const targetIndex = Math.round(
      (window.scrollY - listScrollStartY) / listDivision
    );
    if (listItems[targetIndex]) listItems[targetIndex].classList.add("on");
  }

  if (window.scrollY >= 879 && window.scrollY <= 1178) {
    let progress =
      (window.scrollY - ryanScrollStartY) / (ryanScrollEndY - ryanScrollStartY);
    console.log("progress : " + progress);

    const translateX = ryanStartX + (0 - ryanStartX) * progress;
    const translateY = ryanStartY + (0 - ryanStartY) * progress;
    const rotate = ryanStartRotate + (0 - ryanStartRotate) * progress;

    ryan.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
  }
  if (window.scrollY >= 1178) {
    ryan.style.transform = `translate(0px, 0px)`;
  }
});

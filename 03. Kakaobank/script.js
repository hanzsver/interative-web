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

const videoPlayBack = 500;
const videoElement = document.getElementById("video");
const videoSection = document.getElementById("video-section");
const fixedWrapper = document.getElementById("fixed-wrapper");
const fixedDescription = document.getElementById("fixed-description");

const fixedDescStartTiming = 1800;
const fixedDescEndTiming = 2200;

function centerElement(elementId) {
  const element = document.getElementById(elementId);
  const parent = element.parentElement;

  if (
    window.scrollY >
    parent.offsetTop - (window.innerHeight - element.offsetHeight) / 2
  ) {
    element.style.position = "fixed";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";
  } else {
    element.style.position = "relative";
    element.style.top = "initial";
    element.style.left = "initial";
    element.style.transform = "initial";
  }
}

window.addEventListener("scroll", () => {
  console.log(window.scrollY);

  // ================================= 리스트
  // 로드 시 모든 리스트에 on 클래스 제거
  listItems.forEach((item) => {
    if (item.classList.contains("on")) {
      item.classList.remove("on");
    }
  });

  // 지정 영역 사이에서 차례로 on 클래스 추가
  if (window.scrollY > listScrollStartY && window.scrollY < listScrollEndY) {
    const targetIndex = Math.round(
      (window.scrollY - listScrollStartY) / listDivision
    );
    if (listItems[targetIndex]) listItems[targetIndex].classList.add("on");
  }

  // ================================= 라이언 3D
  if (window.scrollY >= ryanScrollStartY && window.scrollY <= ryanScrollEndY) {
    let progress =
      (window.scrollY - ryanScrollStartY) / (ryanScrollEndY - ryanScrollStartY);

    const translateX = ryanStartX + (0 - ryanStartX) * progress;
    const translateY = ryanStartY + (0 - ryanStartY) * progress;
    const rotate = ryanStartRotate + (0 - ryanStartRotate) * progress;

    ryan.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
  }
  if (window.scrollY >= ryanScrollEndY) {
    ryan.style.transform = `translate(0px, 0px)`;
  }

  // ================================= 비디오 영역
  centerElement("fixed-wrapper", videoElement);
  let isFixed = true;
  if (
    window.scrollY >
    videoSection.offsetTop +
      videoSection.offsetHeight -
      (window.innerHeight - fixedWrapper.offsetHeight) / 2
  ) {
    fixedWrapper.style.position = "relative";
    fixedWrapper.style.top = "initial";
    fixedWrapper.style.left = "initial";
    fixedWrapper.style.transform = `translateY(${videoSection.offsetHeight}px)`;
    isFixed = false;
  }

  if (window.scrollY > 1300 && isFixed) {
    if (videoElement) {
      videoElement.currentTime = (window.scrollY - 1346) / videoPlayBack;
    }
  }

  // ================================= 비디오 하단 텍스트 영역
  const moveUpEnd = fixedDescStartTiming + 70;
  const holdStart = moveUpEnd;
  const holdEnd = moveUpEnd + 420;
  const moveDownEnd = holdEnd + 70;

  let progress = 0;

  if (window.scrollY > fixedDescStartTiming && window.scrollY <= moveUpEnd) {
    progress =
      (window.scrollY - fixedDescStartTiming) /
      (moveUpEnd - fixedDescStartTiming);
  } else if (window.scrollY > holdStart && window.scrollY <= holdEnd) {
    progress = 1;
  } else if (window.scrollY > holdEnd && window.scrollY <= moveDownEnd) {
    progress = 1 - (window.scrollY - holdEnd) / (moveDownEnd - holdEnd);
  }

  progress = Math.min(Math.max(progress, 0), 1);
  console.log("progress = ", progress);

  fixedDescription.style.opacity = progress;
  fixedDescription.style.transform = `translateY(${(1 - progress) * 100}px)`;

  // ================================= 가려지는 영역
  centerElement("bank-beyond");
});

videoElement.addEventListener("loadedmetadata", () => {
  console.log(videoElement.duration);
  document.getElementById("video-section").style.height =
    videoElement.duration * videoPlayBack + "px";
});

// ================================= Panel4
const sliderWrapper = document.querySelector(".panel4_slider_wrapper");
const img = document.querySelectorAll(".panel4_img");
const imgWidth = document.querySelectorAll(".panel4_img")[0].offsetWidth;
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentImg = 0;

const handleSlideChange = (step) => {
  let newIndex = currentImg + step;

  if (newIndex <= 0) {
    newIndex = 0;
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (newIndex >= img.length / 2) {
    newIndex = img.length / 2;
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  currentImg = newIndex;
  console.log(currentImg);
  sliderWrapper.scrollLeft = img[currentImg].offsetLeft;
};

if (prevBtn) prevBtn.disabled = true;

prevBtn.addEventListener("click", () => {
  handleSlideChange(-1);
});

nextBtn.addEventListener("click", () => {
  handleSlideChange(1);
});

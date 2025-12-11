const frame = document.querySelector(".frame");
const imgs = [
  "./img1.png",
  "./img2.png",
  "./img3.png",
  "./img4.png",
  "./img5.png",
];
let imageCount = 0;

for (let i = 0; i < 5; i++) {
  appendCard();
}

let current = frame.querySelector(".card:last-child");
let startX = 0,
  startY = 0,
  moveX = 0,
  moveY = 0;

document.querySelector(".like").onclick = () => {
  moveX = 1;
  moveY = 0;
  complete();
};
document.querySelector(".hate").onclick = () => {
  moveX = -1;
  moveY = 0;
  complete();
};

addEventListener(current);

// frame에 카드를 추가하는 함수
function appendCard() {
  const firstCard = frame.children[0];
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.style.backgroundImage = `url(./images/${
    imgs[imageCount++ % imgs.length]
  })`;
  if (firstCard) {
    frame.insertBefore(newCard, firstCard);
  } else {
    frame.appendChild(newCard);
  }
}

function addEventListener(card) {
  card.addEventListener("pointerdown", onPointetDown);
}

function onPointetDown(e) {
  startX = e.clientX;
  startY = e.clientY;

  current.addEventListener("pointermove", onPointerMove);
  current.addEventListener("pointerup", onPointerUp);
  current.addEventListener("pointerleave", onPointerUp);
}

function onPointerMove(e) {
  moveX = e.clientX - startX;
  moveY = e.clientY - startY;

  setTransform(moveX, moveY, (moveX / innerWidth) * 50);
}

function onPointerUp(e) {
  current.removeEventListener("pointermove", onPointerMove);
  current.removeEventListener("pointerup", onPointerUp);
  current.removeEventListener("pointerleave", onPointerUp);
  if (Math.abs(moveX) > frame.clientWidth / 2) {
    current.removeEventListener("pointerleave", onPointerUp);
    complete();
  } else {
    cancel();
  }
}

function complete() {
  // 날라가는 모션 500ms
  const flyX = (Math.abs(moveX) / moveX) * innerWidth;
  const flyY = (moveY / moveX) * flyX;
  setTransform(flyX, flyY, (flyX / innerWidth) * 50, innerWidth * 0.5);

  // 카드 교체
  const prev = current;
  const next = current.previousElementSibling;
  current = next;
  addEventListener(next);
  appendCard();
  setTimeout(() => frame.removeChild(prev), innerWidth * 0.5);
}

function cancel() {
  setTransform(0, 0, 0, 100);
  setTimeout(() => {
    current.style.transition = "";
  }, 100);
}

function setTransform(x, y, deg, duration) {
  current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
  if (duration) current.style.transition = `transform ${duration}ms`;
}

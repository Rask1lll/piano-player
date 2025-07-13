let btnSpeed = 1;

export function getBtnSpeed() {
  return btnSpeed;
}

function playingSpeedRender() {
  const btns = document.querySelectorAll(".playingSpeed");
  const activeBtnClassName = "playingSpeedActive";
  renderChoosenBtn(btns, activeBtnClassName);
}

function renderChoosenBtn(btns, activeBtnClassName) {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((el) => {
        el.classList.remove(activeBtnClassName);
      });
      btn.classList.add(activeBtnClassName);
      btnSpeed = btn.getAttribute("data-speed");
    });
  });
}

export { playingSpeedRender };

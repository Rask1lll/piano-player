export let btnSpeed;

function playingSpeedRender() {
  const btns = document.querySelectorAll(".playingSpeed");
  const activeBtnClassName = "playingSpeedActive";
  const activeBtn = { btn: "" };
  renderChoosenBtn(btns, activeBtnClassName, activeBtn);
  btnSpeed = activeBtn.btn.getattribute("data-speed");
}

function renderChoosenBtn(btns, activeBtnClassName, activeBtn) {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((el) => {
        el.classList.remove(activeBtnClassName);
      });
      btn.classList.add(activeBtnClassName);
      activeBtn.btn = btn;
    });
  });
}

export { playingSpeedRender };

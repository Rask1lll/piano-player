import { deleteOptionBtns, addOptionBtns } from "./optionButtonsOperations.js";
import { changeModeOption } from "./changeModeOption.js";

const btns = document.querySelectorAll(".modeBtn");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btns.forEach((b) => {
      b.classList.remove("modeBtnActive");
    });
    deleteOptionBtns();
    addOptionBtns(btn.id);
    changeModeOption();
    btn.classList.add("modeBtnActive");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  changeModeOption();
});

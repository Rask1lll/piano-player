import { timings } from "./pianoBtnSave.js";
import { generateSound } from "./generatePianoSound.js";

document.addEventListener("DOMContentLoaded", addingEventsOnClick);

let isActive = false;
function addingEventsOnClick() {
  let buttonPressedTime = 0;
  const pianoBtns = document.querySelectorAll(".pianoBtn");
  pianoBtns.forEach((element) => {
    element.addEventListener("mousedown", () => {
      buttonPressedTime = Date.now();
      element.classList.add("activebtn");
      if (!isActive) {
        let value = element.getAttribute("data-value");
        generateSound(value, true);
        isActive = true;
      }
    });

    element.addEventListener("mouseup", () => {
      element.classList.remove("activebtn");
      buttonPressedTime = Date.now() - buttonPressedTime;
      timings.push({
        [element.getAttribute("data-btn").toLowerCase()]: buttonPressedTime,
      });
      isActive = false;
      generateSound(0, false);
      buttonPressedTime = 0;
    });
  });
}

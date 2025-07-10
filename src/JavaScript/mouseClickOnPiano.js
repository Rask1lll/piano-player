import { timings } from "./pianoBtnSave.js";

document.addEventListener("DOMContentLoaded", addingEventsOnClick);

function addingEventsOnClick() {
  let buttonPressedTime = 0;
  const pianoBtns = document.querySelectorAll(".pianoBtn");
  pianoBtns.forEach((element) => {
    element.addEventListener("mousedown", () => {
      buttonPressedTime = Date.now();
      element.classList.add("activebtn");
    });

    element.addEventListener("mouseup", () => {
      element.classList.remove("activebtn");
      buttonPressedTime = Date.now() - buttonPressedTime;
      console.log(buttonPressedTime);
      timings.push({
        [element.getAttribute("data-btn").toLowerCase()]: buttonPressedTime,
      });
      buttonPressedTime = 0;
    });
  });
}

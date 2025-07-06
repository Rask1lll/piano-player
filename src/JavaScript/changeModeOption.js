import { pianoBtnSave, pianoBtnSaveStop } from "./pianoBtnSave.js";

pianoBtnSave();
function changeModeOption() {
  const optionBtn = document.querySelectorAll(".modeOption");
  optionBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      optionBtn.forEach((b) => {
        b.classList.remove("modeOptionActive");
      });
      if (btn.innerHTML === "Record") {
        pianoBtnSave();
      } else if (btn.innerHTML === "Stop Recording") {
        pianoBtnSaveStop();
      }
      btn.classList.add("modeOptionActive");
    });
  });
}

export { changeModeOption };

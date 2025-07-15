import { pianoBtnSave, pianoBtnSaveStop } from "./pianoBtnSave.js";
import { showLabel } from "./addRecordingLabel.js";

pianoBtnSave();
showLabel(true);
function changeModeOption() {
  let optionBtn = document.querySelectorAll(".modeOption");
  const optionBtn2 = document.querySelectorAll(".getCover");
  optionBtn = [...optionBtn, ...optionBtn2];

  let btnIsDownload;
  optionBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id == "Download Recording") {
        btnIsDownload = true;
      } else {
        btnIsDownload = false;
      }
      if (!btnIsDownload) {
        optionBtn.forEach((b) => {
          b.classList.remove("modeOptionActive");
        });
      }
      if (btn.innerHTML == "Record" || btn.id == "Record") {
        pianoBtnSave();
        showLabel(true);
      } else if (
        btn.innerHTML == "Stop Recording" ||
        btn.id == "Stop Recording"
      ) {
        pianoBtnSaveStop();
        showLabel(false);
      }
      if (!btnIsDownload) {
        btn.classList.add("modeOptionActive");
      }
    });
  });
}

export { changeModeOption };

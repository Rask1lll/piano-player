let recordingInterval;

function showLabel(isActive) {
  const label = document.querySelector(".recordingSection");
  const labelText = document.querySelector(".recordingSectionLabel");
  if (isActive) {
    label.classList.remove("recordingSectionHidden");

    labelText.textContent = "Recording..........................";

    recordingInterval = setInterval(() => {
      let currentText = labelText.textContent;
      if (currentText.length <= "Recording".length) {
        labelText.textContent = "Recording..........................";
      } else {
        labelText.textContent = currentText.slice(0, -1);
      }
    }, 1000);
  } else {
    clearInterval(recordingInterval);
    label.classList.add("recordingSectionHidden");
  }
}

export { showLabel };

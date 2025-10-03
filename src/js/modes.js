export function setupModes(state) {
  const modeButtons = document.querySelectorAll(".modes button ");
  const recordBtn = document.getElementById("record");
  const stopBtn = document.getElementById("stop");
  const downloadBtn = document.getElementById("download");
  const fileInput = document.getElementById("fileInput");
  const playBtn = document.getElementById("play");
  const statusEl = document.getElementById("status");
  const progressContainer = document.getElementById("progressContainer");
  const speedBtns = document.querySelector(".speed");
  const stopSongBtn = document.getElementById("stopButton");

  function updateOptions() {
    document.getElementById("stopSong").classList.add("hidden");

    if (state.currentMode === "interactive") {
      recordBtn.classList.remove("hidden");
      stopBtn.classList.remove("hidden");
      downloadBtn.classList.remove("hidden");

      fileInput.classList.add("hidden");
      playBtn.classList.add("hidden");

      stopBtn.classList.add("selected");

      speedBtns.classList.add("hidden");
      stopSongBtn.classList.add("hidden");
    } else {
      recordBtn.classList.add("hidden");
      stopBtn.classList.add("hidden");
      downloadBtn.classList.add("hidden");
      stopSongBtn.classList.remove("hidden");

      speedBtns.classList.remove("hidden");

      fileInput.classList.remove("hidden");
      playBtn.classList.remove("hidden");

      statusEl.textContent = "";
      statusEl.className = "";
      progressContainer.classList.add("hidden");
      playBtn.disabled = false;
    }
  }

  updateOptions();

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentMode = btn.id === "interactive" ? "interactive" : "prepared";
      updateOptions();
    });
  });
}

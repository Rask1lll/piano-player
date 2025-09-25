export function setupRecorder(state) {
  const recordBtn = document.getElementById("record");
  const stopBtn = document.getElementById("stop");
  const downloadBtn = document.getElementById("download");
  const statusEl = document.getElementById("status");

  function selectButton(btn) {
    [recordBtn, stopBtn, downloadBtn].forEach((b) =>
      b.classList.remove("selected")
    );
    btn.classList.add("selected");
  }

  recordBtn.onclick = () => {
    if (state.currentMode !== "interactive") return;
    state.isRecording = true;
    state.notes = [];
    state.startTime = Date.now();
    statusEl.textContent = "Recording...";
    statusEl.className = "recording";
    selectButton(recordBtn);
  };

  stopBtn.onclick = () => {
    if (state.currentMode !== "interactive") return;
    state.isRecording = false;
    statusEl.textContent = "";
    statusEl.className = "";
    selectButton(stopBtn);
  };

  downloadBtn.onclick = () => {
    if (state.currentMode !== "interactive") return;
    const song = {
      name: "My Song",
      duration: Date.now() - state.startTime,
      notes: state.notes,
    };
    const blob = new Blob([JSON.stringify(song)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "song.json";
    a.click();
    selectButton(downloadBtn);
  };
}

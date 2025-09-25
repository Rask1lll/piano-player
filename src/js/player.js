import { playSound, stopSound } from "./audio.js";

export function setupPlayer(state) {
  const playBtn = document.getElementById("play");
  const fileInput = document.getElementById("fileInput");
  const progressContainer = document.getElementById("progressContainer");
  const progressBar = document.getElementById("progressBar");

  function selectButton(btn) {
    [fileInput, playBtn].forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
  }

  fileInput.onchange = (e) => {
    if (state.currentMode !== "prepared") return;
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const song = JSON.parse(reader.result);
      playSong(song);
    };
    reader.readAsText(f);
    selectButton(fileInput);
  };

  playBtn.onclick = () => {
    if (state.currentMode !== "prepared") return;
    if (state.notes.length > 0) {
      playSong({ notes: state.notes });
    }
    selectButton(playBtn);
  };

  function playSong(song) {
    const keys = document.querySelectorAll(".white, .black");

    const duration =
      song.notes[song.notes.length - 1].startTime +
      song.notes[song.notes.length - 1].duration;

    progressContainer.classList.remove("hidden");
    progressBar.style.width = "0%";
    const playStart = Date.now();

    playBtn.disabled = true;

    state.playInterval = setInterval(() => {
      const elapsed = Date.now() - playStart;
      const percent = Math.min((elapsed / duration) * 100, 100);
      progressBar.style.width = percent + "%";
      if (percent >= 100) {
        clearInterval(state.playInterval);
        playBtn.disabled = false;
        setTimeout(() => {
          progressContainer.classList.add("hidden");
          progressBar.style.width = "0%";
        }, 300);
      }
    }, 100);

    song.notes.forEach((n) => {
      setTimeout(
        () => playSound(findKeyByNote(n.key, keys), state, getKeys(keys)),
        n.startTime
      );
      setTimeout(
        () => stopSound(findKeyByNote(n.key, keys), state, getKeys(keys)),
        n.startTime + n.duration
      );
    });
  }

  function findKeyByNote(note, keys) {
    const el = [...keys].find((k) => k.innerText === note);
    return el ? el.dataset.key : null;
  }

  function getKeys(keys) {
    return [...keys].map((el) => ({
      key: el.dataset.key,
      note: el.innerText,
      freq: null,
    }));
  }
}

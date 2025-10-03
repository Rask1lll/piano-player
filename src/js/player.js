import { playSound, stopSound } from "./audio.js";

let playedSong;
let songStartedTime;
let pauseTime;
let suspended = false;
let beenSuspended = false;
let allTimeouts = [];
let percent;

const Tempkeys = [
  { key: "q", note: "C3", freq: 130.81 },
  { key: "2", note: "C#3", freq: 138.59 },
  { key: "w", note: "D3", freq: 146.83 },
  { key: "3", note: "D#3", freq: 155.56 },
  { key: "e", note: "E3", freq: 164.81 },
  { key: "r", note: "F3", freq: 174.61 },
  { key: "5", note: "F#3", freq: 185.0 },
  { key: "t", note: "G3", freq: 196.0 },
  { key: "6", note: "G#3", freq: 207.65 },
  { key: "y", note: "A3", freq: 220.0 },
  { key: "7", note: "A#3", freq: 233.08 },
  { key: "u", note: "B3", freq: 246.94 },
  { key: "i", note: "C4", freq: 261.63 },
  { key: "9", note: "C#4", freq: 277.18 },
  { key: "o", note: "D4", freq: 293.66 },
  { key: "0", note: "D#4", freq: 311.13 },
  { key: "p", note: "E4", freq: 329.63 },
  { key: "z", note: "F4", freq: 349.23 },
  { key: "s", note: "F#4", freq: 369.99 },
  { key: "x", note: "G4", freq: 392.0 },
  { key: "d", note: "G#4", freq: 415.3 },
  { key: "c", note: "A4", freq: 440.0 },
  { key: "f", note: "A#4", freq: 466.16 },
  { key: "v", note: "B4", freq: 493.88 },
  { key: "b", note: "C5", freq: 523.25 },
  { key: "h", note: "C#5", freq: 554.37 },
  { key: "n", note: "D5", freq: 587.33 },
  { key: "j", note: "D#5", freq: 622.25 },
  { key: "m", note: "E5", freq: 659.25 },
];

function hideProgress(state, playBtn, progressContainer, progressBar) {
  playBtn.innerHTML = `<span id="playBtn">Play</span>`;
  clearInterval(state.playInterval);
  playBtn.disabled = false;
  setTimeout(() => {
    progressContainer.classList.add("hidden");
    progressBar.style.width = "0%";
  }, 300);

  playBtn.classList.remove("hidden");
  document.getElementById("stopSong").classList.add("hidden");
}

function stopPlayingSong(state) {
  allTimeouts.forEach((el) => clearTimeout(el));
  allTimeouts = [];
  Object.keys(state.oscList).forEach((k) => {
    stopSound(k, state, Tempkeys);
  });
}

function findKeyByNote(note, keys) {
  const el = [...keys].find((k) => k.innerText.slice(0, 3).includes(note));
  return el ? el.dataset.key : null;
}

export function setupPlayer(state) {
  const playBtn = document.getElementById("play");
  const fileInput = document.getElementById("fileInput");
  const progressContainer = document.getElementById("progressContainer");
  const progressBar = document.getElementById("progressBar");

  fileInput.onchange = (e) => {
    if (state.currentMode !== "prepared") return;
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const song = JSON.parse(reader.result);
      playedSong = song;
      playSong(song);
    };
    reader.readAsText(f);
  };

  playBtn.onclick = () => {
    if (state.currentMode !== "prepared") return;
    if (playedSong) {
      playSong({ notes: playedSong.notes });
    }
  };

  function playSong(song, isContinue = false) {
    let suspendedTime = 0;
    songStartedTime = Date.now();

    if (!song.notes.length) {
      alert("Song is empty");
      return;
    }

    if (!isContinue) {
      const duration =
        (song.notes[song.notes.length - 1].startTime +
          song.notes[song.notes.length - 1].duration) /
        state.soundSpeed;

      progressContainer.classList.remove("hidden");
      progressBar.style.width = "0%";
      let playStart = Date.now();
      let tempSuspend = 0;

      state.playInterval = setInterval(() => {
        if (!suspended) {
          let elapsed;
          if (beenSuspended) {
            elapsed = Date.now() - tempSuspend - playStart;
          } else {
            elapsed = Date.now() - playStart;
          }
          percent = Math.min((elapsed / duration) * 100, 100);
          progressBar.style.width = percent + "%";
          if (percent >= 100) {
            hideProgress(state, playBtn, progressContainer, progressBar);
          }
        } else {
          tempSuspend = Date.now() - suspendedTime;
        }
      }, 100);
    }

    playBtn.classList.add("hidden");
    document.getElementById("stopSong").classList.remove("hidden");
    const keys = document.querySelectorAll(".white, .black");

    const pauseBtn = document.getElementById("stopButton");
    pauseBtn.addEventListener("click", () => {
      if (pauseBtn.innerHTML == "⏹") {
        suspendedTime = Date.now();
        suspended = true;
        beenSuspended = true;
        stopPlayingSong(state);
      } else {
        if (!songStartedTime) return;
        suspended = false;
        pauseTime = Date.now();
        const songPauseTime = pauseTime - songStartedTime;
        let restNotes = song.notes.filter((el) => el.startTime > songPauseTime);

        const firstStartTime = restNotes[0].startTime;

        for (let index = 0; index < restNotes.length; index++) {
          restNotes[index].startTime =
            restNotes[index].startTime - firstStartTime;
        }

        playSong({ notes: restNotes }, true);
      }
    });

    const tempBtn = document.getElementById("stopSong");
    tempBtn.onclick = () => {
      hideProgress(state, playBtn, progressContainer, progressBar);
      stopPlayingSong(state);
    };

    song.notes.forEach((n) => {
      const temp1 = setTimeout(
        () => playSound(findKeyByNote(n.key, keys), state, Tempkeys),
        n.startTime / state.soundSpeed
      );
      const temp2 = setTimeout(
        () => stopSound(findKeyByNote(n.key, keys), state, Tempkeys),
        (n.startTime + n.duration) / state.soundSpeed
      );

      allTimeouts.push(temp1, temp2);
    });
  }
}

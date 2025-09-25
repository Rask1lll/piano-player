import { playSound, stopSound } from "./audio.js";

export function buildPiano(state) {
  const keys = [
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

  const piano = document.getElementById("piano");

  keys.forEach((k, i) => {
    if (k.note.includes("#")) return;
    const w = document.createElement("div");
    w.className = "white";
    w.dataset.key = k.key;
    w.innerText = k.note;
    piano.appendChild(w);
    if (i + 1 < keys.length && keys[i + 1].note.includes("#")) {
      const b = document.createElement("div");
      b.className = "black";
      b.dataset.key = keys[i + 1].key;
      b.innerText = keys[i + 1].note;
      w.appendChild(b);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (state.audioCtx.state === "suspended") state.audioCtx.resume();
    playSound(e.key, state, keys);
  });
  document.addEventListener("keyup", (e) => stopSound(e.key, state, keys));

  piano.addEventListener("mousedown", (e) => {
    const k = e.target.dataset.key;
    if (k) playSound(k, state, keys);
  });
  piano.addEventListener("mouseup", (e) => {
    const k = e.target.dataset.key;
    if (k) stopSound(k, state, keys);
  });
}

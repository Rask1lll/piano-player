import { buildPiano } from "./piano.js";
import { setupModes } from "./modes.js";
import { setupRecorder } from "./recorder.js";
import { setupPlayer } from "./player.js";

export const state = {
  audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
  oscList: {},
  isRecording: false,
  startTime: 0,
  notes: [],
  currentMode: "interactive",
  playInterval: null,
};

document.addEventListener("DOMContentLoaded", () => {
  buildPiano(state);
  setupModes(state);
  setupRecorder(state);
  setupPlayer(state);
});

export function playSound(k, state, keys) {
  const def = keys.find((x) => x.key === k);
  if (!def) return;
  if (state.oscList[k]) return;
  const osc = state.audioCtx.createOscillator();
  const gain = state.audioCtx.createGain();
  osc.frequency.value = def.freq;
  osc.type = "sine";
  osc.connect(gain).connect(state.audioCtx.destination);
  osc.start();
  state.oscList[k] = { osc, gain };
  highlight(k, true);
  if (state.isRecording) {
    state.notes.push({
      key: def.note,
      startTime: Date.now() - state.startTime,
      duration: 0,
    });
  }
}

export function stopSound(k, state, keys) {
  if (!state.oscList[k]) return;
  const { osc, gain } = state.oscList[k];
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    state.audioCtx.currentTime + 0.2
  );
  osc.stop(state.audioCtx.currentTime + 0.21);
  delete state.oscList[k];
  highlight(k, false);

  if (state.isRecording) {
    const def = keys.find((x) => x.key === k);
    const last = state.notes
      .slice()
      .reverse()
      .find((n) => n.key === def.note && n.duration === 0);
    if (last) {
      last.duration = Date.now() - state.startTime - last.startTime;
    }
  }
}

function highlight(k, on) {
  const el = document.querySelector(`[data-key="${k}"]`);
  if (el) el.classList.toggle("pressed", on);
}

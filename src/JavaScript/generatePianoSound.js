const audioConn = new AudioContext();
let oscilator = null;

function generateSound(value, isActive) {
  if (isActive) {
    oscilator = audioConn.createOscillator();
    oscilator.frequency.value = value;
    oscilator.type = "sine";
    oscilator.connect(audioConn.destination);
    oscilator.start();
  } else {
    if (oscilator) {
      oscilator.stop();
      oscilator = null;
    }
  }
}

export { generateSound };

// import { readJsonFile } from "./getFile";
function pressKey(key, pressTime, startduration) {
  setTimeout(() => {
    const event = new KeyboardEvent("keydown", {
      key: key,
    });

    document.dispatchEvent(event);
  }, pressTime - startduration);
  setTimeout(() => {
    const event1 = new KeyboardEvent("keyup", {
      key: key,
    });
    document.dispatchEvent(event1);
  }, pressTime);
}

function pressPianoKeys(keysToPress) {
  console.log(typeof keysToPress);
  let pressDuration = 0;
  for (let el of keysToPress) {
    let keys = Object.keys(el);
    let key = keys[0];
    let duration = el[key];

    pressDuration = pressDuration + duration;
    pressKey(key, pressDuration, duration);
  }
}

export { pressPianoKeys };

import { generateSound } from "./generatePianoSound.js";

let controller = null;

export const timings = [];

let isActive;

function pianoBtnSave() {
  controller = new AbortController();
  const getCover = document.querySelector(".getCover");
  const elems = document.querySelectorAll(".pianoBtn");
  let btns = [];
  elems.forEach((element) => {
    btns.push(element.getAttribute("data-btn"));
  });

  let time = {};

  document.addEventListener(
    "keydown",
    (event) => {
      elems.forEach((el) => {
        if (event.key.toLowerCase() == el.getAttribute("data-btn")) {
          el.classList.add("activebtn");
          if (!time[event.key.toLowerCase()]) {
            time[event.key.toLowerCase()] = Date.now();
          }
          let value = el.getAttribute("data-value");
          value = parseInt(value);
          if (!isActive) {
            isActive = true;
            generateSound(value, true);
          }
        }
      });
    },
    { signal: controller.signal }
  );

  document.addEventListener(
    "keyup",
    (event) => {
      elems.forEach((el) => {
        if (event.key.toLowerCase() == el.getAttribute("data-btn")) {
          el.classList.remove("activebtn");
          if (time[event.key.toLowerCase()]) {
            time[event.key.toLowerCase()] =
              Date.now() - time[event.key.toLowerCase()];
            timings.push({
              [event.key.toLowerCase()]: time[event.key.toLowerCase()],
            });
            delete time[event.key.toLowerCase()];
          }
          isActive = false;
          generateSound(0, false);
        }
      });
    },
    { signal: controller.signal }
  );

  getCover.addEventListener("click", () => {
    document.querySelector(".downloadDialog").showModal();
    document
      .querySelector(".closeSongNameModal")
      .addEventListener("click", () => {
        document.querySelector(".downloadDialog").close();
      });
    document.querySelector(".enterSongName").addEventListener("click", () => {
      const name = document.getElementById("songName").value;

      const jsonData = JSON.stringify(timings);
      downloadFile(jsonData, name + ".json");
    });
  });

  function downloadFile(data, filename) {
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }
}

function pianoBtnSaveStop() {
  controller.abort();
}
export { pianoBtnSave, pianoBtnSaveStop };

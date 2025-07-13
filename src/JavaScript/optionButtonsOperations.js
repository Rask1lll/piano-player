import { readJsonFile } from "./getFile.js";
import { pressPianoKeys } from "./playSongByGiven.js";
import { playingSpeedRender } from "./getPlayingSpeed.js";
import { changeModeOption } from "./changeModeOption.js";
const deleteOptionBtns = function () {
  const option = document.querySelector(".modeOptions");
  const deleteBtns = option.children;
  let len = deleteBtns.length;
  for (let index = 0; index < len; index++) {
    deleteBtns[0].remove();
  }
};

const addOptionBtns = function (id) {
  let btnsToAdd = [];

  const option = document.querySelector(".modeOptions");
  if (id === "Interactive_Mode") {
    btnsToAdd = ["Record", "Stop Recording", "Download Recording"];
    btnsToAdd.forEach((el) => {
      if (el === "Download Recording") {
        option.insertAdjacentHTML(
          "beforeend",
          `
          <button class="getCover"  id='${el}'>
            ${el}
          </button>
        `
        );
      } else {
        option.insertAdjacentHTML(
          "beforeend",
          `
          <button class="modeOption" id='${el}'>
            ${el}
          </button>
        `
        );
      }
    });
  } else {
    option.insertAdjacentHTML(
      "afterBegin",
      `
        <input type="file" class="modeOption modeOptionInput" id="fileInput" />
        <div class="playingSpeedContainer">
        <div class="playingSpeed" data-speed="1">x1</div>
        <div class="playingSpeed" data-speed="2">x2</div>
        <div class="playingSpeed" data-speed="3">x4</div>
        </div>
      `
    );

    playingSpeedRender();
    readJsonFile((callback) => {
      pressPianoKeys(callback);
    });
  }
};

export { deleteOptionBtns, addOptionBtns };

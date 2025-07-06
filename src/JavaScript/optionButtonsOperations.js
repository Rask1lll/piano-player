const deleteOptionBtns = function () {
  const option = document.querySelector(".modeOptions");
  const deleteBtns = option.children;
  let len = deleteBtns.length;
  for (let index = 0; index < len; index++) {
    deleteBtns[0].remove();
    console.log(index);
  }
};

const addOptionBtns = function (id) {
  let btnsToAdd = [];

  const option = document.querySelector(".modeOptions");
  if (id === "Interactive_Mode") {
    btnsToAdd = ["Record", "Stop Recording", "Download Recording"];
    btnsToAdd.forEach((el) => {
      option.insertAdjacentHTML(
        "beforeend",
        `
          <button class="modeOption" data-mode-type="Interactive_Mode">
            ${el}
          </button>
        `
      );
    });
  } else {
    option.insertAdjacentHTML(
      "afterBegin",
      `
        <input type="file" class="modeOption" id="fileInput" />
      `
    );
  }
};

export { deleteOptionBtns, addOptionBtns };

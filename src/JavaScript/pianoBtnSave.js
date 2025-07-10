let controller = null;

function pianoBtnSave(isActive = true) {
  controller = new AbortController();
  if (isActive) {
    const getCover = document.querySelector(".getCover");
    const elems = document.querySelectorAll(".pianoBtn");
    let btns = [];
    elems.forEach((element) => {
      btns.push(element.getAttribute("data-btn"));
    });

    let time = {};

    let timings = [];

    document.addEventListener(
      "keydown",
      (event) => {
        elems.forEach((el) => {
          if (event.key.toLowerCase() == el.getAttribute("data-btn")) {
            el.classList.add("activebtn");
            if (!time[event.key.toLowerCase()]) {
              time[event.key.toLowerCase()] = Date.now();
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
          }
        });
      },
      { signal: controller.signal }
    );

    getCover.addEventListener("click", () => {
      console.log(timings);

      const jsonData = JSON.stringify(timings);
      downloadFile(jsonData, "timings.json");
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
}

function pianoBtnSaveStop() {
  controller.abort();
}
export { pianoBtnSave, pianoBtnSaveStop };


function readJsonFile(callback) {
  const file = document.getElementById("fileInput");

  file.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = function () {
      const text = reader.result;
      const jsonText = JSON.parse(text);

      callback(jsonText);
    };
  });
}

export { readJsonFile };

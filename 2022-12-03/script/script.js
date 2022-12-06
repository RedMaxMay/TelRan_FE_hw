let textArea = document.querySelector("#text");

textArea.addEventListener("input", () => {
  localStorage.setItem("textAreaValue", textArea.value);
});

textArea.value = localStorage.getItem("textAreaValue");

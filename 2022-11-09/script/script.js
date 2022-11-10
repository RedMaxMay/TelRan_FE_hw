let btnInputOff = document.querySelector(".btn-input-off");
let btnInputOn = document.querySelector(".btn-input-on");
let testInput = document.querySelector(".test-input");
let paragraphs = document.querySelectorAll(".textToChange");
let btnToChangeP = document.querySelector(".btn-change-p");



btnInputOff.addEventListener("click", disableInput);
btnInputOn.addEventListener("click", allowInput);
btnToChangeP.addEventListener("click", changeParAndBtnName);
btnToChangeP.addEventListener("click", changeBtnName);

function disableInput(event) {
  testInput.setAttribute("disabled", "disabled");
}

function allowInput(event) {
  testInput.removeAttribute("disabled");
}

function changeParAndBtnName(event) {
  btnToChangeP.classList.toggle("active");

  if (btnToChangeP.classList.contains("active")) {
    btnToChangeP.textContent = "Click to show paragraph's";

    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i].textContent = `My number is ${i + 1}`;
    }
  } else {
    btnToChangeP.textContent = "Show paragraph's number";
  }
}


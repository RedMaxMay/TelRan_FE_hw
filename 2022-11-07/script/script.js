let btnHello = document.querySelector(".hello-btn");
let catImg = document.querySelector(".cat__img");

btnHello.addEventListener("click", writeHelloInConsole);
catImg.addEventListener("click", makeImgRounded);

function writeHelloInConsole(event) {
  console.log("Hello!");
  btnHello.removeEventListener("click", writeHelloInConsole);
}

function makeImgRounded(event) {
  catImg.classList.toggle("cat__img--rounded");
}

const addProdForm = document.querySelector(".add-product-form");
const products = document.querySelector(".products");
const notification = document.querySelector(".notification");

getFromLocalStorage().forEach((product) => {
  createElement(product);
});

addProdForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let formValue = event.target.id.value;

  if (formValue < 20 && formValue > 0) {
    getData(formValue);

    notification.innerText = "Product added successfully!";
    notification.classList.remove("error");
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 2000);
  } else {
    notification.innerText = "Error! There is no such id";
    notification.classList.add("error");
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 2000);
  }

  event.target.id.value = "";
});

function getData(productID) {
  fetch(`https://fakestoreapi.com/products/${productID}`)
    .then((resp) => resp.json())
    .then((data) => reRender(data));
}

function addToLocalStorage(prod) {
  localStorage.setItem("FakeStoreProducts", JSON.stringify(prod));
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("FakeStoreProducts")) ?? [];
}

function removeFromLocal(id) {
  addToLocalStorage(getFromLocalStorage().filter((prod) => prod.id != id));
}

function reRender(data) {
  createElement(data);

  addToLocalStorage([...getFromLocalStorage(), data]);
}

function createElement(prodDataObj) {
  const { id, title, price, description, category, image, rating } =
    prodDataObj;

  const product = document.createElement("div");
  product.classList.add("product");
  product.setAttribute("id", id);

  product.innerHTML = `
  <img
  class="product__img"
  src="${image}"
/>
<div class="product__info">
  <p class="product__price">${price}</p>
  <h5 class="product__title">
  ${title}
  </h5>
  <p class="product__description">
  ${description}
  </p>
  <div class="product__bottom">
    <a href="#" class="product__category">${category}</a>
    <p class="product__rating-wrap">
      Rating: <span class="product__rating-num">${rating.rate}</span>
    </p>
  </div>

</div>
<div class="product__delete-wrap">
  <svg
    class="product__delete-icon"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="25px"
    height="25px"
    viewBox="0 0 482.428 482.429"
    style="enable-background: new 0 0 482.428 482.429"
    xml:space="preserve"
  >
    <g>
      <g>
        <path
          d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
     c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
     h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
     C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
     C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
     c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
     c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
     V115.744z"
        />
        <path
          d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
     c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
        />
        <path
          d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
     c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
        />
        <path
          d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
     c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
        />
      </g>
    </g>
  </svg>
</div>
  `;

  product.addEventListener("click", (event) => {
    if (event.target.classList.contains("product__delete-icon")) {
      let product = event.target.parentElement.parentElement;
      let id = product.id;
      products.removeChild(product);
      removeFromLocal(id);
    }
  });

  products.append(product);
}

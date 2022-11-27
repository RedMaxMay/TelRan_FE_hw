const addProd = document.querySelector(".add-prod");
const products = document.querySelector(".products");
const totalNumbers = document.querySelector(".total-numbers");

const productsData = [];

addProd.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = addProd.title.value;
  const price = addProd.price.value;
  const quantity = addProd.quantity.value;
  productsData.push({ title, price, quantity });
  addProd.title.value = "";
  addProd.price.value = "";
  addProd.quantity.value = "";
  reRender(productsData);
});

function reRender(arr) {
  products.innerText = "";
  totalNumbers.innerText = "";

  const totalNumbersPrice = document.createElement("p");
  const totalNumbersQuantity = document.createElement("p");
  totalNumbersPrice.classList.add("total-numbers__price");
  totalNumbersQuantity.classList.add("total-numbers__quantity");

  let totalPrice = 0;
  let totalQuantity = 0;

  arr.forEach(({ title, price, quantity }) => {
    const productItem = document.createElement("li");
    const productItemName = document.createElement("h3");
    const productItemPrice = document.createElement("p");
    const productItemSum = document.createElement("p");

    productItem.classList.add("product-item");
    productItemName.classList.add("product-item__name");
    productItemPrice.classList.add("product-item__price");
    productItemSum.classList.add("product-item__sum");

    productItem.append(productItemName, productItemPrice, productItemSum);
    products.append(productItem);

    productItemName.innerText = `Товар: ${title}`;
    productItemPrice.innerText = `Цена: ${price}`;
    productItemSum.innerText = `Всего: ${quantity} * ${price} = ${
      quantity * price
    }`;

    totalPrice += +quantity * +price;
    totalQuantity += +quantity;

    totalNumbers.append(totalNumbersPrice, totalNumbersQuantity);
    products.after(totalNumbers);
  });
  totalNumbersPrice.innerText = `Общая стоимость товаров: ${totalPrice}`;
  totalNumbersQuantity.innerText = `Общее количество товаров: ${totalQuantity}`;
}

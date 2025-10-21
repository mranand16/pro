"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const cartButton = document.querySelector(".cart-btn .span a"); 
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    cartButton.innerHTML = `Cart (${cart.length})`;
  }
  updateCartCount();

  const products = [
    { id: 1, name: "Short", price: 170, image: "./assets/images/product-3.png" },
    { id: 2, name: "T-shirt", price: 210, image: "./assets/images/product-2.png" },
    { id: 3, name: "Studios Trouser", price: 90, image: "./assets/images/product-1.png" },
    { id: 4, name: "Acne Baseball Cap", price: 80, image: "./assets/images/product-4.png" },
    { id: 5, name: "Stylish Hoodie", price: 250, image: "./assets/images/product-5.png" },
    { id: 6, name: "Casual Sneakers", price: 300, image: "./assets/images/product-6.png" },
    { id: 7, name: "Short Sleeve Shirt", price: 170, image: "./assets/images/product-7.png" },
    { id: 8, name: "Dead Sunglasses", price: 210, image: "./assets/images/product-8.png" },
    { id: 9, name: "Studios Trouser", price: 90, image: "./assets/images/product-9.png"},
    { id: 10, name: "Short Sleeve Shirt", price: 170, image: "./assets/images/product-11.png"},
    { id: 11, name: "Studios Trouser", price: 90, image: "./assets/images/product-12.png"},
    { id: 12, name: "Short Sleeve Shirt", price: 170, image: "./assets/images/product-13.png"},

  ];

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
      const productHTML = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" class="product-img">
          <h3>${product.name}</h3>
          <p class="product-price">$${product.price}.00</p>
          <button class="btn add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
            Add to Cart
          </button>
        </div>`;
      productList.innerHTML += productHTML;
    });
  }

  renderProducts();

  document.body.addEventListener("click", function (event) {
    const addToCartBtn = event.target.closest(".add-to-cart");

    if (addToCartBtn) {
      const product = {
        id: addToCartBtn.dataset.id,
        name: addToCartBtn.dataset.name,
        price: parseFloat(addToCartBtn.dataset.price),
        image: addToCartBtn.dataset.image
      };

      const existingItem = cart.find(item => item.id == product.id);
      if (!existingItem) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      }
    }
  });
});

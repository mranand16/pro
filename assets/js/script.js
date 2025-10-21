"use strict";

/**
 * Mobile navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
});

/**
 * Header active
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[this.scrollY > 50 ? "add" : "remove"]("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.querySelector(".cart-btn .span a"); // Selects the link inside cart button
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ✅ Update cart button count in header
  function updateCartCount() {
    cartButton.innerHTML = `Cart (${cart.length})`;
  }
  updateCartCount();

  // ✅ If on index.html, render products
  const newArrivalsContainer = document.querySelector(".product-list");
  const featuredProductsContainer = document.querySelector(".feature-list");

  if (newArrivalsContainer && featuredProductsContainer) {
    const products = [
      { id: 1, name: "Short Sleeve Shirt", price: 170, image: "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955666468853.jpg" },
      { id: 2, name: "Dead Sunglasses", price: 210, image: "https://media-photos.depop.com/b1/8785615/1679808952_a592125fc8a84bbaa6c896d4cbdd76c9/P0.jpg" },
      { id: 3, name: "Studios Trouser", price: 90, image: "https://th.bing.com/th/id/OIP.4nF7iCAzdcMI1pgEQsIuOwHaJQ?rs=1&pid=ImgDetMain" },
    ];

    const featuredProducts = [
      { id: 4, name: "Acne Baseball Cap", price: 80, image: "./assets/images/product-4.png" },
      { id: 5, name: "Short Sleeve Shirt", price: 170, image: "./assets/images/product-5.png" },
      { id: 6, name: "Garcons Parfums", price: 190, image: "./assets/images/product-6.png" },
      
    ];

    function renderProducts(container, productList) {
      container.innerHTML = "";
      productList.forEach(product => {
        const productHTML = `
          <li class="scrollbar-item">
            <div class="product-card text-center">
              <div class="card-banner">
                <figure class="product-banner img-holder">
                  <img src="${product.image}" alt="${product.name}" class="img-cover">
                </figure>
                <button class="btn product-btn add-to-cart" 
                  data-id="${product.id}" 
                  data-name="${product.name}" 
                  data-price="${product.price}" 
                  data-image="${product.image}">
                  <ion-icon name="bag"></ion-icon>
                  <span class="span">Add To Cart</span>
                </button>
              </div>
              <div class="card-content">
                <h3 class="h4 title">
                  <a href="#" class="card-title">${product.name}</a>
                </h3>
                <span class="price">$${product.price}.00</span>
              </div>
            </div>
          </li>`;
        container.innerHTML += productHTML;
      });
    }

    renderProducts(newArrivalsContainer, products);
    renderProducts(featuredProductsContainer, featuredProducts);
  }

  // ✅ Add to Cart Event Listener
  document.body.addEventListener("click", function (event) {
    const addToCartBtn = event.target.closest(".add-to-cart");

    if (addToCartBtn) {
      const product = {
        id: addToCartBtn.dataset.id,
        name: addToCartBtn.dataset.name,
        price: parseFloat(addToCartBtn.dataset.price),
        image: addToCartBtn.dataset.image
      };

      // Check if item already exists in cart
      const existingItem = cart.find(item => item.id == product.id);
      if (!existingItem) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      }
    }
  });

  // ✅ If on cart.html, render cart
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cartItemsContainer && cartTotal) {
    function renderCart() {
      cartItemsContainer.innerHTML = "";
      let total = 0;
      cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            <div class="cart-info">
              <h3>${item.name}</h3>
              <p>$${item.price}.00</p>
              <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
          </div>`;
      });

      cartTotal.textContent = `$${total.toFixed(2)}`;
      updateCartCount();
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    renderCart();

    // ✅ Remove from Cart Event
    document.body.addEventListener("click", function (event) {
      const removeBtn = event.target.closest(".remove-btn");
      if (removeBtn) {
        const index = parseInt(removeBtn.dataset.index);
        cart.splice(index, 1);
        renderCart();
      }
    });
  }
});



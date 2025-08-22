// --- CART LOGIC ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart (with images and quantity)
function addToCart(name, price, image) {
    // Check if product already exists in cart
    let existing = cart.find(item=> item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1});
    }


  saveCart();
  updateCartCount();
  alert(name + " added to cart!");
}

// Remove from cart (by index)
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartPage();
  updateCartCount();
}

// --- NAV CART COUNT ---
function updateCartCount() {
  let cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Render Cart Page
function renderCartPage() {
  let cartItemsTable = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");

  if (cartItemsTable && cartTotal) {
    cartItemsTable.innerHTML = ""; 
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      let row = document.createElement("tr");

      // Product image
      let imgCell = document.createElement("td");
      let img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.style.width = "60px"; // thumbnail size
      imgCell.appendChild(img);

      // Product name
      let nameCell = document.createElement("td");
      nameCell.textContent = item.name;

      // Price
      let priceCell = document.createElement("td");
      priceCell.textContent = "$" + item.price;

      // Quantity (input box)
      let qtyCell = document.createElement("td");
      let qtyInput = document.createElement("input");
      qtyInput.type = "number";
      qtyInput.value = item.quantity;
      qtyInput.min = 1;
      qtyInput.onchange = (e) => {
        item.quantity = parseInt(e.target.value);
        saveCart();
        renderCartPage();
        updateCartCount();
      };
      qtyCell.appendChild(qtyInput);

      // Remove button
      let removeCell = document.createElement("td");
      let removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.onclick = () => removeFromCart(index);
      removeCell.appendChild(removeBtn);

      // Add row to table
      row.appendChild(imgCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(qtyCell);
      row.appendChild(removeCell);

      cartItemsTable.appendChild(row);
    });

    cartTotal.textContent = "Total: $" + total;
  }
}


// --- CHECKOUT PLACEHOLDER ---
function checkout() {
  alert("Checkout system coming soon! (Stripe/PayPal can be added here.)");
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartPage();

  let checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout);
  }
});

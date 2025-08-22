let cart = [];

// Add to Cart
function addToCart(name, price) {
    cart.push({ name, price});
    updateCart();
}
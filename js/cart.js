// Logika halaman keranjang
document.addEventListener('DOMContentLoaded', function() {
    initCartPage();
});

function initCartPage() {
    displayCart();
    setupCheckoutButton();
}

function displayCart() {
    const cart = getCart();
    const container = document.getElementById('cartItemsContainer');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>Keranjang belanja Anda kosong</p>
                <a href="menu.html" class="btn btn-primary">Mulai Belanja</a>
            </div>
        `;
        document.getElementById('cartSummary').style.display = 'none';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-total">
                ${formatPrice(item.price * item.quantity)}
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id}); displayCart(); updateCartSummary();">Hapus</button>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
    } else {
        updateCartItemQuantity(productId, newQuantity);
    }
    displayCart();
}

function updateCartSummary() {
    const cart = getCart();
    const subtotal = getCartTotal();
    const tax = Math.floor(subtotal * 0.1);
    const shipping = 10000;
    const total = subtotal + tax + shipping;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('tax').textContent = formatPrice(tax);
    document.getElementById('total').textContent = formatPrice(total);
}

function setupCheckoutButton() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
}

// Logika aplikasi utama
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Update cart count di navbar
    updateCartCount();
    
    // Setup event listeners
    setupEventListeners();
    
    // Display featured products di halaman utama
    if (document.getElementById('featuredProducts')) {
        displayFeaturedProducts();
    }
    
    // Setup newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Close menu when link clicked
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
        });
    });
}

function displayFeaturedProducts() {
    const featured = getFeaturedProducts(4);
    const container = document.getElementById('featuredProducts');
    
    if (!container) return;
    
    container.innerHTML = featured.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="product-category">${product.category}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="rating-stars">${formatRating(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn btn-small" onclick="addToCart(${product.id})">Tambah</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Management Functions
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart(cart);
    showNotification(`${product.name} ditambahkan ke keranjang!`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartItemQuantity(productId, quantity) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// Notification Function
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Newsletter Submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const messageEl = document.getElementById('newsletterMessage');
    
    if (email) {
        messageEl.textContent = '✅ Terima kasih! Anda telah terdaftar ke newsletter kami.';
        messageEl.style.color = '#27ae60';
        this.reset();
        
        setTimeout(() => {
            messageEl.textContent = '';
        }, 3000);
    }
}

// Checkout Function
function proceedToCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Keranjang belanja Anda kosong!');
        return;
    }
    
    // Simpan total ke localStorage untuk di-retrieve di checkout page
    localStorage.setItem('checkoutTotal', JSON.stringify(getCartTotal()));
    
    // Redirect ke checkout page
    window.location.href = 'pages/checkout.html';
}

// Format utility functions
function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

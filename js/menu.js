// Logika halaman menu
document.addEventListener('DOMContentLoaded', function() {
    initMenuPage();
});

let allProducts = getAllProducts();
let filteredProducts = allProducts;

function initMenuPage() {
    // Display semua produk pada awal halaman
    displayMenu(allProducts);
    
    // Setup filter event listeners
    setupFilterListeners();
}

function setupFilterListeners() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const searchInput = document.getElementById('searchInput');
    const resetFilter = document.getElementById('resetFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (resetFilter) {
        resetFilter.addEventListener('click', function() {
            categoryFilter.value = '';
            sortFilter.value = 'name';
            searchInput.value = '';
            applyFilters();
        });
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    const searchInput = document.getElementById('searchInput').value;
    
    // Filter berdasarkan kategori
    let filtered = allProducts;
    
    if (categoryFilter) {
        filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    // Filter berdasarkan pencarian
    if (searchInput) {
        filtered = searchProducts(searchInput);
    }
    
    // Sort produk
    let sorted = [...filtered];
    switch(sortFilter) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
        default:
            sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    filteredProducts = sorted;
    displayMenu(sorted);
}

function displayMenu(products) {
    const container = document.getElementById('menuResults');
    
    if (products.length === 0) {
        container.innerHTML = '<div class="empty"><p>Tidak ada menu yang sesuai dengan pencarian Anda.</p></div>';
        container.classList.add('empty');
        return;
    }
    
    container.classList.remove('empty');
    container.innerHTML = products.map(product => `
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
                    <span class="rating-count">(${product.reviews} review)</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn btn-small" onclick="addToCart(${product.id})">Tambah</button>
                </div>
            </div>
        </div>
    `).join('');
}

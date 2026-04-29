// Data produk kantin digital
const products = [
    {
        id: 1,
        name: "Nasi Kuning",
        category: "Makanan",
        price: 25000,
        image: "https://via.placeholder.com/250x200?text=Nasi+Kuning",
        description: "Nasi kuning gurih dengan telur dan sayuran",
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: "Mie Goreng",
        category: "Makanan",
        price: 22000,
        image: "https://via.placeholder.com/250x200?text=Mie+Goreng",
        description: "Mie goreng pedas dengan telur dan sayuran",
        rating: 4.8,
        reviews: 156
    },
    {
        id: 3,
        name: "Ayam Goreng",
        category: "Makanan",
        price: 30000,
        image: "https://via.placeholder.com/250x200?text=Ayam+Goreng",
        description: "Ayam goreng crispy empuk dan gurih",
        rating: 4.7,
        reviews: 201
    },
    {
        id: 4,
        name: "Soto Ayam",
        category: "Makanan",
        price: 20000,
        image: "https://via.placeholder.com/250x200?text=Soto+Ayam",
        description: "Soto ayam tradisional dengan kuah kaldu",
        rating: 4.6,
        reviews: 98
    },
    {
        id: 5,
        name: "Lumpia Goreng",
        category: "Makanan",
        price: 15000,
        image: "https://via.placeholder.com/250x200?text=Lumpia+Goreng",
        description: "Lumpia goreng isi daging dan sayuran",
        rating: 4.4,
        reviews: 112
    },
    {
        id: 6,
        name: "Bakso Besar",
        category: "Makanan",
        price: 28000,
        image: "https://via.placeholder.com/250x200?text=Bakso+Besar",
        description: "Bakso besar dalam kuah kaldu gurih",
        rating: 4.5,
        reviews: 145
    },
    {
        id: 7,
        name: "Es Teh Manis",
        category: "Minuman",
        price: 8000,
        image: "https://via.placeholder.com/250x200?text=Es+Teh+Manis",
        description: "Teh segar dengan es batu",
        rating: 4.3,
        reviews: 245
    },
    {
        id: 8,
        name: "Jus Jeruk",
        category: "Minuman",
        price: 12000,
        image: "https://via.placeholder.com/250x200?text=Jus+Jeruk",
        description: "Jus jeruk segar dan asli",
        rating: 4.6,
        reviews: 187
    },
    {
        id: 9,
        name: "Kopi Hitam",
        category: "Minuman",
        price: 10000,
        image: "https://via.placeholder.com/250x200?text=Kopi+Hitam",
        description: "Kopi hitam hangat atau dingin",
        rating: 4.4,
        reviews: 203
    },
    {
        id: 10,
        name: "Coklat Panas",
        category: "Minuman",
        price: 11000,
        image: "https://via.placeholder.com/250x200?text=Coklat+Panas",
        description: "Coklat panas manis dan lezat",
        rating: 4.5,
        reviews: 156
    },
    {
        id: 11,
        name: "Milkshake Strawberry",
        category: "Minuman",
        price: 18000,
        image: "https://via.placeholder.com/250x200?text=Milkshake+Strawberry",
        description: "Milkshake strawberry segar dan gurih",
        rating: 4.7,
        reviews: 134
    },
    {
        id: 12,
        name: "Smoothie Mangga",
        category: "Minuman",
        price: 16000,
        image: "https://via.placeholder.com/250x200?text=Smoothie+Mangga",
        description: "Smoothie mangga manis alami",
        rating: 4.6,
        reviews: 121
    }
];

// Fungsi untuk mendapatkan semua produk
function getAllProducts() {
    return products;
}

// Fungsi untuk mendapatkan produk berdasarkan kategori
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Fungsi untuk mendapatkan produk berdasarkan ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Fungsi untuk mendapatkan kategori unik
function getCategories() {
    const categories = new Set(products.map(product => product.category));
    return Array.from(categories);
}

// Fungsi untuk mendapatkan produk unggulan (rating tertinggi)
function getFeaturedProducts(limit = 4) {
    return products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

// Fungsi untuk mencari produk
function searchProducts(query) {
    const q = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
    );
}

// Fungsi untuk mengurutkan produk
function sortProducts(sortBy = 'name') {
    let sorted = [...products];
    
    switch(sortBy) {
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
    
    return sorted;
}

// Format harga ke format rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Format rating ke bintang
function formatRating(rating) {
    const stars = Math.round(rating);
    return '⭐'.repeat(stars);
}

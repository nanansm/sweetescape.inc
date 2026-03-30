let products = [];
let cart = JSON.parse(localStorage.getItem('sweet_escape_cart')) || [];
const shopPhone = "6282227888594"; // Format 62

const formatIDR = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

// 1. Fungsi Menarik Data dari Google Sheets
async function loadProductsFromSheet() {
    const sheetAPI = "https://script.google.com/macros/s/AKfycbx_VJfKoBifPh63tYKpBO7UL4p7uzY7JK3mfvcr0gmFy2twkz4h20jINB1cgcDoITYA/exec"; 
    
    try {
        const response = await fetch(sheetAPI);
        const data = await response.json();

        products = data
            .filter(item => item.In_Stock === true || item.In_Stock === "TRUE" || item.In_Stock === "true")
            .map(item => ({
                id: item.ID,
                name: item.Name,
                price: parseInt(item.Price),
                image: item.Image_URL
            }));

        renderProducts();
    } catch (error) {
        console.error("Gagal menarik data dari Sheets:", error);
        
        // Cek dulu apakah elemen grid ada di halaman ini (karena index.html tidak punya product-grid)
        const grid = document.getElementById('product-grid');
        if (grid) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--on-surface-variant); padding: 2rem;">Katalog sedang diperbarui atau koneksi terputus.</p>`;
        }
    }
}

// 2. Render Grid ke HTML (Hanya bekerja di products.html)
function renderProducts() {
    const grid = document.getElementById('product-grid');
    
    // PENTING: Jika grid tidak ada (berarti user sedang di index.html), berhentikan fungsi ini.
    if (!grid) return; 
    
    if(products.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--on-surface-variant); padding: 2rem;">Belum ada produk yang tersedia saat ini.</p>`;
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image-box">
                <img alt="${product.name}" src="${product.image}" onerror="this.src='https://via.placeholder.com/400x400?text=Sweet+Escape'"/>
                <button onclick="addToCart('${product.id}')" class="add-btn">
                    <span class="material-symbols-outlined">add</span>
                </button>
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${formatIDR(product.price)}</p>
            </div>
        </div>
    `).join('');
}

// 3. Logika Keranjang (Bekerja di semua halaman)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    
    const badge = document.getElementById('cart-badge');
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
    }
}

function saveCart() {
    localStorage.setItem('sweet_escape_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    badge.textContent = totalItems;
    if (totalItems > 0) {
        badge.classList.add('visible');
    } else {
        badge.classList.remove('visible');
    }

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <span class="material-symbols-outlined">shopping_basket</span>
                <p>Your orders is empty.</p>
            </div>`;
        document.getElementById('cart-total').textContent = 'IDR 0';
        return;
    }

    let totalPrice = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        return `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/150x150?text=No+Image'">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatIDR(item.price)}</p>
            </div>
            <div class="qty-controls">
                <button onclick="updateQuantity('${item.id}', -1)" class="qty-btn"><span class="material-symbols-outlined" style="font-size: 1rem;">remove</span></button>
                <span class="qty-number">${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', 1)" class="qty-btn"><span class="material-symbols-outlined" style="font-size: 1rem;">add</span></button>
            </div>
        </div>`;
    }).join('');
    
    document.getElementById('cart-total').textContent = formatIDR(totalPrice);
}

function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
    document.body.classList.toggle('cart-open');
}

function checkoutWhatsApp() {
    if (!cart.length) {
        alert("Keranjang pesanan kosong!");
        return;
    }

    let message = "Halo Sweet Escape! 👋\nSaya mau Order!:\n\n";
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        message += `▪ ${item.quantity}x ${item.name} - ${formatIDR(itemTotal)}\n`;
    });

    message += `\n*Total Belanja: ${formatIDR(totalPrice)}*\n\nApakah stoknya masih ada?`;

    const encodedMessage = encodeURIComponent(message);
    const waURL = `https://wa.me/${shopPhone}?text=${encodedMessage}`;
    
    window.open(waURL, '_blank');
}

// Inisialisasi
loadProductsFromSheet(); 
updateCartUI();
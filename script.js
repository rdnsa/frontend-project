let cartCount = 0;

function tambahKeKeranjang() {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
    alert("Produk berhasil ditambahkan ke keranjang!");
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".buy-btn");
    const cartItems = document.getElementById("cart-items");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Data harga produk (contoh)
    const productPrices = {
        "Produk 1": 50000,
        "Produk 2": 75000,
        "Produk 3": 120000
    };

    // Tambahkan produk ke cart
    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const productName = this.parentElement.querySelector("h2").innerText;

            // Cek apakah produk ada di daftar harga
            const price = productPrices[productName] || 100000; // Default 100k jika tidak ada di daftar

            // Buat elemen list untuk cart
            const listItem = document.createElement("li");
            listItem.innerHTML = `${productName} - Rp ${price.toLocaleString()} <button onclick="removeItem(this)">❌</button>`;
            listItem.setAttribute("data-price", price);

            // Tambahkan ke dalam cart
            cartItems.appendChild(listItem);
        });
    });

    // Fungsi hapus semua isi cart
    clearCartBtn.addEventListener("click", function () {
        cartItems.innerHTML = "";
    });

    // Fungsi Checkout
    checkoutBtn.addEventListener("click", function () {
        let total = 0;
        const items = cartItems.querySelectorAll("li");

        if (items.length === 0) {
            alert("Keranjang belanja kosong! Silakan tambahkan produk terlebih dahulu.");
            return;
        }

        // Hitung total harga
        items.forEach(item => {
            total += parseInt(item.getAttribute("data-price"));
        });

        // Tampilkan alert konfirmasi checkout
        alert(`🛒 Checkout Berhasil!\nTotal Pembayaran: Rp ${total.toLocaleString()}\nTerima kasih telah berbelanja!`);

        // Kosongkan cart setelah checkout
        cartItems.innerHTML = "";
    });
});

// Fungsi hapus satu item dari cart
function removeItem(button) {
    button.parentElement.remove();
}

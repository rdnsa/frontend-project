document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".buy-btn");
    const cartItems = document.getElementById("cart-items");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout-btn");
    const paymentMethod = document.getElementById("payment-method");
    const invoice = document.getElementById("invoice");
    const invoiceDetails = document.getElementById("invoice-details");
    const downloadInvoiceBtn = document.getElementById("download-invoice");

    // Data harga produk
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
            const price = productPrices[productName] || 100000;

            // Buat elemen list
            const listItem = document.createElement("li");
            listItem.innerHTML = `${productName} - Rp ${price.toLocaleString()} <button onclick="removeItem(this)">❌</button>`;
            listItem.setAttribute("data-price", price);
            cartItems.appendChild(listItem);
        });
    });

    // Hapus semua isi cart
    clearCartBtn.addEventListener("click", function () {
        cartItems.innerHTML = "";
    });

    // Fungsi Checkout
    checkoutBtn.addEventListener("click", function () {
        let total = 0;
        const items = cartItems.querySelectorAll("li");

        if (items.length === 0) {
            alert("Keranjang belanja kosong! Silakan tambahkan produk.");
            return;
        }

        items.forEach(item => {
            total += parseInt(item.getAttribute("data-price"));
        });

        const selectedPayment = paymentMethod.value;
        const invoiceText = `🧾 Nota Pembelian 🧾\n\nTotal: Rp ${total.toLocaleString()}\nMetode Pembayaran: ${selectedPayment}\n\nTerima kasih telah berbelanja!`;

        // Tampilkan nota digital
        invoiceDetails.innerText = invoiceText;
        invoice.style.display = "block";

        // Kosongkan cart setelah checkout
        cartItems.innerHTML = "";
    });

    // Download Nota sebagai PDF
    downloadInvoiceBtn.addEventListener("click", function () {
        const text = invoiceDetails.innerText;
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "nota_pembelian.txt"; // Bisa diubah ke .pdf jika pakai library jsPDF
        link.click();
    });
});

// Fungsi hapus satu item dari cart
function removeItem(button) {
    button.parentElement.remove();
}

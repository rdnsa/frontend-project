let cartCount = 0;

function tambahKeKeranjang() {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
    alert("Produk berhasil ditambahkan ke keranjang!");
}

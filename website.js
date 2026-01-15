const products = [
  { name: "Crochet Bag", price: 650, img: "bag.jpg", category: "bags", desc: "Stylish handmade crochet bag." },
  { name: "Wallet", price: 250, img: "wallet.jpg", category: "bags", desc: "Compact crochet wallet." },
  { name: "Laptop Sleeve", price: 750, img: "laptop.jpg", category: "bags", desc: "Protective crochet sleeve." },
  { name: "Tote Bag", price: 700, img: "totebag.jpg", category: "bags", desc: "Spacious crochet tote." },

  { name: "Teddy Bear", price: 450, img: "teddy.jpg", category: "toys", desc: "Soft crochet teddy bear." },
  { name: "Plush Bunny", price: 480, img: "bunny.jpg", category: "toys", desc: "Cute bunny plush." },
  { name: "Crochet Doll", price: 500, img: "doll.jpg", category: "toys", desc: "Handcrafted crochet doll." },
  { name: "Sunflower Plush", price: 350, img: "sunflower.jpg", category: "toys", desc: "Cheerful sunflower plush." },

  { name: "Hat", price: 300, img: "hat.jpg", category: "accessories", desc: "Comfortable crochet hat." },
  { name: "Scarf", price: 350, img: "scarf.jpg", category: "accessories", desc: "Warm crochet scarf." },
  { name: "Scrunchie", price: 100, img: "scrunchie.jpg", category: "accessories", desc: "Cute crochet scrunchie." },
  { name: "Keychain", price: 120, img: "keychain.jpg", category: "accessories", desc: "Small crochet keychain." },

  { name: "Mug Cozy", price: 140, img: "mug.jpg", category: "accessories", desc: "Keeps drinks warm." },
  { name: "Headband", price: 180, img: "headband.jpg", category: "accessories", desc: "Stylish crochet headband." },
  { name: "Placemat", price: 300, img: "placemat.jpg", category: "accessories", desc: "Decorative crochet placemat." },
  { name: "Slippers", price: 420, img: "slippers.jpg", category: "accessories", desc: "Soft crochet slippers." }
];

let cart = [];
let currentPage = 1;
const itemsPerPage = 10;
let filteredProducts = [...products];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalDisplay = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const pageInfo = document.getElementById("pageInfo");

function renderProducts() {
  productList.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredProducts.slice(start, end);

  pageItems.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p class="description">${p.desc}</p>
      <p>₱${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });

  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredProducts.length / itemsPerPage)}`;
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₱${item.price}
      <button onclick="removeItem(${i})">❌</button>`;
    cartItems.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = total;
  cartCount.textContent = cart.length;
  checkoutBtn.style.display = cart.length ? "block" : "none";
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

checkoutBtn.onclick = () => {
  if (!cart.length) return;
  alert("Thank you for your order! 🧶");
  cart = [];
  updateCart();
};

function applyFilters() {
  const search = searchBar.value.toLowerCase();
  const cat = categoryFilter.value;

  filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (cat === "all" || p.category === cat)
  );

  currentPage = 1;
  renderProducts();
}

document.getElementById("nextPage").onclick = () => {
  if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
    currentPage++;
    renderProducts();
  }
};

document.getElementById("prevPage").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
};

searchBar.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

renderProducts();

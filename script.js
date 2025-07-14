const products = [
  { id: 1, name: "Smart Watch", price: 1499, image: "smart watch.jpeg" },
  { id: 2, name: "Earbuds", price: 999, image: "ear buds.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 1999, image: "bluetooth speaker.webp" },
  { id: 4, name: "Gaming Mouse", price: 1199, image: "gaming mouse.jpg" },
  { id: 5, name: "Power Bank", price: 899, image: "power bank.webp" },
  { id: 6, name: "Laptop Stand", price: 799, image: "laptop stand.webp" },
  { id: 7, name: "Wireless Keyboard", price: 1399, image: "wireless keyboard.webp" },
  { id: 8, name: "LED Monitor", price: 6499, image: "led monitor.webp" },
  { id: 9, name: "USB Hub", price: 499, image: "USB hub.jpg" },
  { id: 10, name: "Webcam HD", price: 1099, image: "web cam.jpg" },
  { id: 11, name: "Noise Cancelling Headphones", price: 2999, image: "noise cancelling headphones.jpg" },
  { id: 12, name: "Smartphone Tripod", price: 699, image: "smartphone tripod.webp" },
  { id: 13, name: "Fitness Band", price: 1799, image: "fitness band.jpg" },
  { id: 14, name: "Desk Organizer", price: 599, image: "desk organizer.jpg" },
  { id: 15, name: "Mobile Gimbal", price: 3199, image: "mobile gimbal.webp" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let loggedIn = localStorage.getItem("loggedIn");

function updateUI() {
  const cartCount = document.getElementById("cartCount");
  const wishlistCount = document.getElementById("wishlistCount");
  if (cartCount) cartCount.textContent = cart.length;
  if (wishlistCount) wishlistCount.textContent = wishlist.length;

  const welcomeMsg = document.getElementById("welcomeMsg");
  const authLink = document.getElementById("authLink");
  if (loggedIn === "true" && welcomeMsg && authLink) {
    const user = JSON.parse(localStorage.getItem("user"));
    welcomeMsg.textContent = `Welcome, ${user.name}`;
    authLink.textContent = "Logout";
    authLink.onclick = () => {
      localStorage.removeItem("loggedIn");
      window.location.reload();
    };
  }
}

function renderProducts() {
  const list = document.getElementById("productList");
  if (!list) return;
  list.innerHTML = "";
  let filtered = [...products];

  const sort = document.getElementById("sort");
  const search = document.getElementById("searchInput");

  if (search && search.value)
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()));
  if (sort && sort.value === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort && sort.value === "high") filtered.sort((a, b) => b.price - a.price);

  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="addToWishlist(${product.id})">❤</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(id) {
  if (loggedIn !== "true") return alert("Please log in to add to cart.");
  const item = products.find(p => p.id === id);
  if (!cart.find(p => p.id === id)) cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateUI();
}

function addToWishlist(id) {
  const item = products.find(p => p.id === id);
  if (!wishlist.find(p => p.id === id)) wishlist.push(item);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  renderProducts();
  const sort = document.getElementById("sort");
  const search = document.getElementById("searchInput");
  if (sort) sort.addEventListener("change", renderProducts);
  if (search) search.addEventListener("input", renderProducts);

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Message sent!");
      contactForm.reset();
    });
  }
});
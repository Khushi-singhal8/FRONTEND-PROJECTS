/* ================= START SHOPPING ================= */
const startBtn = document.getElementById("startBtn");
const materialsSection = document.querySelector(".materials-section");
const productsSection = document.querySelector(".products");

startBtn.onclick = () => {
  materialsSection.scrollIntoView({ behavior: "smooth" });
};

/* ================= MATERIAL PRODUCTS DATA ================= */
const productData = {
  cement: [
    {name:"Ambuja Cement", price:"₹400", img:"images/ambuja.jpg", desc:"Ambuja Cement is high-quality cement for durable construction.", rating:4},
    {name:"UltraTech Cement", price:"₹380", img:"images/cement.jpg", desc:"UltraTech Cement ensures strong and long-lasting structures.", rating:5},
    {name:"ACC Cement", price:"₹365", img:"images/cement2.jpg", desc:"ACC Cement is trusted for residential and commercial projects.", rating:4}
  ],
  steel: [
    {name:"TMT Rod Fe550", price:"₹65/kg", img:"images/steel.jpg", desc:"High-quality TMT Rod for strong reinforcement.", rating:5}
  ],
  sand: [
    {name:"River Sand", price:"₹55/kg", img:"images/sand.jpg", desc:"Fine river sand suitable for construction and plastering.", rating:4}
  ],
  bricks: [
    {name:"Red Clay Bricks", price:"₹8/piece", img:"images/bricks.jpg", desc:"Premium red clay bricks for strong walls.", rating:4}
  ]
};

/* ================= RENDER PRODUCTS ================= */
function openMaterial(material){
  productsSection.style.display = "block";
  document.getElementById("material-title").innerText = material.charAt(0).toUpperCase() + material.slice(1);

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  productData[material].forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <span>${prod.price}</span>
      <p>${prod.desc}</p>
      <div class="qty">
        <button class="minus">−</button>
        <span class="num">0</span>
        <button class="plus">+</button>
      </div>
      <div class="rating">${'★'.repeat(prod.rating)}${'☆'.repeat(5-prod.rating)}</div>
    `;
    productList.appendChild(card);

    // QTY + CART
    let qty = 0;
    const plus = card.querySelector(".plus");
    const minus = card.querySelector(".minus");
    const num = card.querySelector(".num");

    plus.onclick = () => { qty++; updateCart(); num.innerText = qty; };
    minus.onclick = () => { if(qty > 0){ qty--; updateCart(); num.innerText = qty; } };
  });

  // 3D tilt effect
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = -(y - rect.height / 2) / 14;
      const ry = (x - rect.width / 2) / 14;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-12px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = "rotateX(0) rotateY(0)"; });
  });
}

/* ================= CART COUNT ================= */
let count = 0;
const counter = document.getElementById("cartCount");
function updateCart() {
  count = 0;
  document.querySelectorAll(".num").forEach(n => count += parseInt(n.innerText));
  counter.innerText = count;
}

/* ================= THREE JS MODEL ================= */
const container = document.getElementById("canvas-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const geo = new THREE.BoxGeometry(3, 3, 3);
const mat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 1, roughness: 0.25 });
const model = new THREE.Mesh(geo, mat);
scene.add(model);

const light = new THREE.DirectionalLight(0xffffff, 1.6);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 7;

function animate() {
  requestAnimationFrame(animate);
  model.rotation.x += 0.004;
  model.rotation.y += 0.006;
  renderer.render(scene, camera);
}
animate();

/* ================= NAVBAR SCROLL ================= */
document.querySelector(".nav-links a[href='#']").addEventListener("click", e => {
  e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" });
});
document.querySelector(".nav-links a[href='#materials']").addEventListener("click", e => {
  e.preventDefault(); materialsSection.scrollIntoView({ behavior: "smooth" });
});
document.querySelector(".nav-links a[href='#products']").addEventListener("click", e => {
  e.preventDefault(); productsSection.scrollIntoView({ behavior: "smooth" });
});
document.querySelector(".nav-links a[href='#about']").addEventListener("click", e => {
  e.preventDefault(); document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});
document.querySelector(".nav-links a[href='#contact']").addEventListener("click", e => {
  e.preventDefault(); document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

/* ================= HAMBURGER TOGGLE ================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
});

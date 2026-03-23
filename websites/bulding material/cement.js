const productList = document.getElementById("cement-products");

const cementProducts = [
  {
    name: "Ambuja Cement",
    price: "₹400",
    img: "images/ambuja.jpg",
    desc: "Ambuja Cement is known for high strength and durability. Ideal for RCC and concrete structures. Made with high-quality clinker, gypsum, and additives.",
    rating: 5
  },
  {
    name: "UltraTech Cement",
    price: "₹380",
    img: "images/cement.jpg",
    desc: "UltraTech Cement ensures long-lasting construction. Perfect for residential and commercial buildings. Composed of clinker, limestone, gypsum, and fly ash.",
    rating: 4
  },
  {
    name: "Shree jungrodak Cement",
    price: "₹365",
    img: "images/cement2.jpg",
    desc: "Shree jungrodak offers excellent workability and setting time. Suitable for foundations and structures. Made from high-quality raw materials for consistent strength.",
    rating: 4
  }
];

cementProducts.forEach(prod=>{
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

  let qty = 0;
  const plus = card.querySelector(".plus");
  const minus = card.querySelector(".minus");
  const num = card.querySelector(".num");

  plus.onclick = () => { qty++; updateCart(); num.innerText=qty; };
  minus.onclick = () => { if(qty>0){ qty--; updateCart(); num.innerText=qty; } };
});

let count = 0;
const counter = document.getElementById("cartCount");
function updateCart(){
  count = 0;
  document.querySelectorAll(".num").forEach(n=>count+=parseInt(n.innerText));
  counter.innerText = count;
}

/* 3D Tilt Cards */
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -(y - rect.height/2)/14;
    const ry = (x - rect.width/2)/14;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-12px)`;
  });
  card.addEventListener("mouseleave",()=>{card.style.transform="rotateX(0) rotateY(0)";});
});

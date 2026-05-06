const productList = document.getElementById("steel-products");

const steelProducts = [
  { name:"TMT Rod Fe550", price:"₹65/kg", img:"images/steel.jpg", desc:"High strength TMT Rod, ideal for RCC reinforcement. Corrosion resistant.", rating:5 },
  { name:"Sail TMT Rod", price:"₹60/kg", img:"images/steel2.jpg", desc:"Sail TMT Rod ensures durability & flexibility. Perfect for construction.", rating:4 },
  { name:"Tata TMT Rod", price:"₹62/kg", img:"images/steel3.jpg", desc:"Premium Tata TMT Rod for structural safety and long-lasting projects.", rating:5 }
];

renderProducts(steelProducts);

function renderProducts(products){
  products.forEach(prod=>{
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
}

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

const productList = document.getElementById("sand-products");

const sandProducts = [
  { name:"River Sand", price:"₹55/kg", img:"images/sand.jpg", desc:"Fine river sand for masonry and plastering work. Clean & high quality.", rating:5 },
  { name:"M-Sand", price:"₹50/kg", img:"images/msand.jpg", desc:"Manufactured sand for concrete work. High consistency & strength.", rating:4 },
  { name:"Crushed Sand", price:"₹52/kg", img:"images/crushed_sand.jpg", desc:"Crushed sand for concrete & flooring applications. Durable & uniform.", rating:4 }
];

renderProducts(sandProducts);

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
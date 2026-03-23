const productList = document.getElementById("bricks-products");

const bricksProducts = [
  { name:"Red Clay Brick", price:"₹8/piece", img:"images/bricks.jpg", desc:"High quality baked clay bricks, durable & strong. Suitable for walls & structures.", rating:5 },
  { name:"Fly Ash Brick", price:"₹10/piece", img:"images/flyash.jpg", desc:"Eco-friendly fly ash bricks, high strength & fire resistant.", rating:4 },
  { name:"Engineering Brick", price:"₹12/piece", img:"images/eng_brick.jpg", desc:"Extra strong brick for heavy-load structures. Highly water-resistant.", rating:5 }
];

renderProducts(bricksProducts);

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

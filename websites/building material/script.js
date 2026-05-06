// ── ALL EVENT LISTENERS — no inline onclick anywhere ──

// Scroll progress + nav scroll class
window.addEventListener('scroll', function() {
  var h = document.documentElement.scrollHeight - window.innerHeight;
  if (h > 0) document.getElementById('prog').style.width = (window.scrollY / h * 100) + '%';
  document.getElementById('nav').classList.toggle('sc', window.scrollY > 60);
});

// Counter animation
function animNum(id, target, suffix) {
  var el = document.getElementById(id);
  var c = 0, inc = target / 60;
  var t = setInterval(function() {
    c = Math.min(c + inc, target);
    el.textContent = Math.floor(c) + suffix;
    if (c >= target) clearInterval(t);
  }, 22);
}
setTimeout(function() {
  animNum('hn1', 2000, '+');
  animNum('hn2', 15, '+');
  animNum('hn3', 25, '+');
}, 700);

// ── PAGE SYSTEM ──
var curFilter = 'all';

function showPage(name, filter) {
  document.querySelectorAll('.pg').forEach(function(p) { p.classList.remove('on'); });
  var pg = document.getElementById('pg-' + name);
  if (pg) pg.classList.add('on');

  document.querySelectorAll('#navlinks button').forEach(function(b) { b.classList.remove('act'); });
  var nb = document.getElementById('nl-' + name);
  if (nb) nb.classList.add('act');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'products') {
    if (filter) {
      curFilter = filter;
      renderProds('');
      document.querySelectorAll('.ptab').forEach(function(t) {
        t.classList.toggle('on', t.getAttribute('data-filter') === filter);
      });
    } else {
      renderProds('');
    }
  }
}

function gotoWhy() {
  showPage('home');
  setTimeout(function() {
    var el = document.getElementById('why-sec');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}
function gotoMap() {
  showPage('contact');
  setTimeout(function() {
    var el = document.getElementById('map-sec');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

// ── NAVBAR BUTTONS ──
document.getElementById('logo-btn').addEventListener('click', function() { showPage('home'); });
document.getElementById('nl-home').addEventListener('click', function() { showPage('home'); });
document.getElementById('nl-products').addEventListener('click', function() { showPage('products'); });
document.getElementById('nl-contact').addEventListener('click', function() { showPage('contact'); });
document.getElementById('nl-why').addEventListener('click', gotoWhy);
document.getElementById('nl-map').addEventListener('click', gotoMap);
document.getElementById('nav-contact-btn').addEventListener('click', function() { showPage('contact'); });
document.getElementById('nav-wa-btn').addEventListener('click', function() { showPage('contact'); });

// ── HERO BUTTONS ──
document.getElementById('hero-products-btn').addEventListener('click', function() { showPage('products'); });
document.getElementById('hero-contact-btn').addEventListener('click', function() { showPage('contact'); });

// ── HOME PAGE BUTTONS ──
document.getElementById('viewall-btn').addEventListener('click', function() { showPage('products'); });
document.getElementById('cat-sand').addEventListener('click', function() { showPage('products', 'sand'); });
document.getElementById('cat-cement').addEventListener('click', function() { showPage('products', 'cement'); });
document.getElementById('cat-sariya').addEventListener('click', function() { showPage('products', 'sariya'); });
document.getElementById('cat-bricks').addEventListener('click', function() { showPage('products', 'bricks'); });
document.getElementById('cat-stones').addEventListener('click', function() { showPage('products', 'stones'); });
document.getElementById('cat-hardware').addEventListener('click', function() { showPage('products', 'hardware'); });

// ── FOOTER BUTTONS ──
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.ft-btn');
  if (!btn) return;
  var page = btn.getAttribute('data-page');
  var filter = btn.getAttribute('data-filter');
  if (page === 'why') { gotoWhy(); return; }
  if (page === 'map') { gotoMap(); return; }
  showPage(page, filter || null);
});

// ── PRODUCT TABS ──
document.addEventListener('click', function(e) {
  var tab = e.target.closest('.ptab');
  if (!tab) return;
  var f = tab.getAttribute('data-filter');
  curFilter = f;
  document.querySelectorAll('.ptab').forEach(function(t) { t.classList.remove('on'); });
  tab.classList.add('on');
  renderProds(document.getElementById('srch').value);
});

// ── SEARCH ──
document.getElementById('srch').addEventListener('input', function() {
  if (document.getElementById('pg-products').classList.contains('on')) {
    renderProds(this.value);
  }
});
document.getElementById('srch').addEventListener('focus', function() {
  showPage('products');
});

// ── 3D TILT ──
document.addEventListener('mousemove', function(e) {
  document.querySelectorAll('.catcard').forEach(function(c) {
    var r = c.getBoundingClientRect();
    if (e.clientX > r.left - 10 && e.clientX < r.right + 10 && e.clientY > r.top - 10 && e.clientY < r.bottom + 10) {
      var cx = (e.clientX - r.left) / r.width - 0.5;
      var cy = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = 'translateY(-12px) rotateX(' + (-cy * 11) + 'deg) rotateY(' + (cx * 9) + 'deg) scale(1.02)';
    }
  });
  document.querySelectorAll('.pcard').forEach(function(c) {
    var r = c.getBoundingClientRect();
    if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) {
      var cx = (e.clientX - r.left) / r.width - 0.5;
      var cy = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = 'translateY(-9px) rotateX(' + (-cy * 5) + 'deg) rotateY(' + (cx * 5) + 'deg)';
    } else {
      c.style.transform = '';
    }
  });
});

// ── PRODUCTS DATA ──
var PRODS = [
  // ── SAND & AGGREGATE ──
  {id:'sa1',cat:'sand',brand:'Local Supplier',name:'Super Dust Marlon',badge:'Best Seller',ico:'🏖️',img:'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80&auto=format&fit=crop',desc:'Fine quality Super Dust Marlon — ideal for plastering, flooring and concrete mix. Consistent grain size, low silt content for strong bonding and smooth finish.',specs:['Fine Grade','Low Silt','Plastering Use','Bulk Available']},
  {id:'sa2',cat:'sand',brand:'Local Supplier',name:'Rodi 20 MM',badge:'',ico:'🏖️',img:'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=600&q=80&auto=format&fit=crop',desc:'20mm crushed stone aggregate for RCC slabs, columns and beams. Angular shape ensures superior interlocking and high compressive strength in concrete mix.',specs:['20mm Size','Angular Shape','RCC Grade','IS 383']},
  {id:'sa3',cat:'sand',brand:'Local Supplier',name:'Rodi 10 MM',badge:'',ico:'🏖️',img:'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=600&q=80&auto=format&fit=crop',desc:'10mm crushed aggregate for thin slabs, roofing and fine concrete work. Smaller size gives denser packing and smoother concrete surface finish.',specs:['10mm Size','Dense Packing','Roof Slab Use','IS 383']},
  {id:'sa4',cat:'sand',brand:'Local Supplier',name:'Super White Dust',badge:'',ico:'🏖️',img:'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80&auto=format&fit=crop',desc:'Premium white stone dust for tile fixing, white plastering and decorative flooring. Bright colour, fine texture, strong adhesion. Popular for interiors.',specs:['White Grade','Fine Texture','Tile Fixing','Interior Use']},
  {id:'sa5',cat:'sand',brand:'Local Supplier',name:'Super Golden Dust',badge:'',ico:'🏖️',img:'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80&auto=format&fit=crop',desc:'Golden stone dust with warm tone. Used for plastering and block laying. Excellent workability and binding strength. Consistent colour throughout.',specs:['Golden Grade','Warm Tone','Block Laying','Plastering']},
  {id:'sa6',cat:'sand',brand:'Local Supplier',name:'Badarpur',badge:'',ico:'🏖️',img:'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80&auto=format&fit=crop',desc:'Natural Badarpur coarse sand widely used in brick masonry mortar and concrete filling. Affordable, readily available and trusted across Delhi-NCR construction sites.',specs:['Coarse Grade','Masonry Mortar','Delhi-NCR','Bulk Supply']},
  {id:'sa7',cat:'sand',brand:'Local Supplier',name:'River Sand (Reta)',badge:'',ico:'🏖️',img:'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80&auto=format&fit=crop',desc:'Natural river sand (Reta) — smooth, rounded grains with good workability. Preferred for plastering, PCC and finishing work. Clean, low organic content.',specs:['Natural River Sand','Smooth Grains','Plastering / PCC','Clean & Washed']},

  // ── CEMENT ──
  {id:'c1',cat:'cement',brand:'Ambuja Cement',name:'Ambuja Cement',badge:'Best Seller',ico:'🪨',img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop',desc:'Ambuja Cement — trusted for RCC structures, foundations, columns and slabs. Superior workability, high compressive strength and excellent water resistance.',specs:['OPC / PPC','IS Certified','50 Kg Bag','Ghaziabad Stock']},
  {id:'c2',cat:'cement',brand:'UltraTech Cement',name:'UltraTech Cement',badge:'Top Brand',ico:'🪨',img:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80&auto=format&fit=crop',desc:"India's No.1 cement brand. Available in OPC and PPC grades. Dense, durable concrete with low permeability. First choice of professional builders.",specs:['OPC / PPC','#1 in India','50 Kg Bag','IS 1489']},
  {id:'c3',cat:'cement',brand:'Shree Cement',name:'Shree Cement',badge:'val',ico:'🪨',img:'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=600&q=80&auto=format&fit=crop',desc:'Shree Cement — known for consistent quality and great value. Excellent compressive strength, suitable for all general construction and RCC work.',specs:['OPC / PPC','Value Pick','50 Kg Bag','IS 8112']},
  {id:'c4',cat:'cement',brand:'Bangur Cement',name:'Bangur Cement',badge:'',ico:'🪨',img:'https://images.unsplash.com/photo-1590059390095-2b8b82f5e7a1?w=600&q=80&auto=format&fit=crop',desc:'Bangur Cement — premium Shree Group brand. Low heat of hydration, ideal for mass concreting and hot climate construction. Strong, durable and reliable.',specs:['PPC Grade','Low Heat','50 Kg Bag','Mass Concreting']},
  {id:'c5',cat:'cement',brand:'ACC Cement',name:'ACC Cement',badge:'Premium',ico:'🪨',img:'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=600&q=80&auto=format&fit=crop',desc:'ACC Cement — 80+ years of trusted quality. Rapid strength gain for high-rise and heavy civil structures. Reduces form-removal time and speeds up projects.',specs:['OPC 53 Grade','Rapid Strength','IS 8112','High-Rise Ready']},

  // ── SARIYA (TMT) ──
  {id:'t1',cat:'sariya',brand:'Rathi TMT',name:'Rathi Sariya',badge:'Best Seller',ico:'⚙️',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',desc:'Rathi TMT Sariya — most popular choice in Ghaziabad. Available in 8mm, 10mm, 12mm, 16mm, 20mm. High ductility, excellent bond with concrete, ISI certified.',specs:['Fe-500D Grade','8–20mm','ISI Mark','Ghaziabad Favorite']},
  {id:'t2',cat:'sariya',brand:'Tata Tiscon',name:'Tata Tiscon Sariya',badge:'Premium',ico:'⚙️',img:'https://images.unsplash.com/photo-1565108526874-0ac6a46c8572?w=600&q=80&auto=format&fit=crop',desc:'Tata Tiscon Super Ductile bars — hardened outer layer with tough inner core via thermomechanical treatment. Used in premium and high-rise construction.',specs:['Fe-500D','Super Ductile','All Diameters','Tata Quality']},
  {id:'t3',cat:'sariya',brand:'SAIL Steel',name:'SAIL TMT Sariya',badge:'ISI Mark',ico:'⚙️',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',desc:'SAIL TMT Sariya manufactured at integrated steel plants with strict quality control. Higher ductility — perfect for earthquake-resistant construction in seismic zones.',specs:['Fe-500D Grade','IS 1786','All Sizes','Seismic Safe']},
  {id:'t4',cat:'sariya',brand:'JSPL Steel',name:'JSPL Thermex Sariya',badge:'',ico:'⚙️',img:'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=600&q=80&auto=format&fit=crop',desc:'JSPL Thermex process — 550 MPa yield strength. Allows 10% steel savings vs Fe-500, reducing project cost without compromising structural integrity.',specs:['Fe-550 Grade','Thermex Process','All Diameters','10% Saving']},

  // ── BRICKS ──
  {id:'b1',cat:'bricks',brand:'Local Kiln',name:'Red Clay Bricks',badge:'Best Seller',ico:'🧱',img:'https://images.unsplash.com/photo-1564419320408-38bbad147b39?w=600&q=80&auto=format&fit=crop',desc:'First Class red clay bricks — 75+ kg/cm² compressive strength. Uniform size 19×9×9cm, sharp edges, consistent colour. Low water absorption, crack-resistant walls.',specs:['75+ kg/cm²','IS 1077','19×9×9 cm','<20% Absorption']},

  // ── STONES ──
  {id:'st1',cat:'stones',brand:'Dholpur Quarry',name:'Dholpur Lal Stone',badge:'Best Seller',ico:'🪨',img:'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&q=80&auto=format&fit=crop',desc:'Dholpur Lal (Red) Stone — famous natural sandstone from Rajasthan. Widely used for boundary walls, flooring, steps, garden paving and facade cladding. Durable and attractive.',specs:['Natural Sandstone','Red / Pink Tone','Flooring & Walls','Custom Sizes']},
  {id:'st2',cat:'stones',brand:'Ganga Crusher',name:'Ganga Stone (Crusher)',badge:'',ico:'🪨',img:'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=600&q=80&auto=format&fit=crop',desc:'Machine-crushed Ganga stone aggregate. Angular, clean and strong. Used in road base, foundation filling, RCC and drainage work. Available in multiple sizes.',specs:['Crushed Stone','Angular Shape','Foundation Fill','Road Base']},

  // ── HARDWARE & MORE ──
  {id:'h1',cat:'hardware',brand:'Various Brands',name:'Tar (Bitumen)',badge:'',ico:'🔧',img:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop',desc:'Construction grade tar / bitumen for waterproofing roofs, roads and foundations. Excellent adhesion, weather resistance and sealing properties.',specs:['Waterproofing','Roof & Road','Bitumen Grade','Bulk Supply']},
  {id:'h2',cat:'hardware',brand:'Various Brands',name:'Floor & Wall Tiles',badge:'',ico:'🔧',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',desc:'Floor and wall tiles in various sizes, finishes and colours. Available for kitchen, bathroom, living areas and exteriors. Multiple brands stocked.',specs:['All Sizes','Floor & Wall','Various Finishes','Call for Stock']},
  {id:'h3',cat:'hardware',brand:'Various Brands',name:'Iron / Steel Gate',badge:'',ico:'🔧',img:'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80&auto=format&fit=crop',desc:'Iron and steel gates for main entrances, driveways and boundary. Standard and custom sizes. Strong fabrication, powder-coated finish available.',specs:['Iron & Steel','Custom Sizes','Powder Coated','Main & Side Gate']},
  {id:'h4',cat:'hardware',brand:'Various Brands',name:'Wooden Gate / Door',badge:'',ico:'🔧',img:'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&q=80&auto=format&fit=crop',desc:'Wooden gates and doors for residential use. Solid wood and engineered wood options. Available in teak, sal and other varieties for long-lasting strength.',specs:['Solid Wood','Teak / Sal','Interior & Exterior','Custom Sizes']},
  {id:'h5',cat:'hardware',brand:'Various Brands',name:'PVC Pipes',badge:'',ico:'🔧',img:'https://images.unsplash.com/photo-1509822929464-92b27478f327?w=600&q=80&auto=format&fit=crop',desc:'PVC pipes for plumbing, drainage and water supply. ISI marked, available in all standard diameters. Lightweight, corrosion-proof, easy to install.',specs:['ISI Marked','All Diameters','Plumbing & Drain','Corrosion-Free']},
  {id:'h6',cat:'hardware',brand:'Various Brands',name:'Hardware Material (All Kind)',badge:'',ico:'🔧',img:'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&q=80&auto=format&fit=crop',desc:'Complete hardware range — nuts, bolts, hinges, locks, wire mesh, binding wire, nails, anchors and more. Everything a construction site needs, available in stock.',specs:['Nuts & Bolts','Wire & Mesh','Locks & Hinges','All Brands']}
];

var cBg = {
  sand:     'linear-gradient(135deg,#c8a96e,#e8c87a)',
  cement:   'linear-gradient(135deg,#4a3728,#8a6450)',
  sariya:   'linear-gradient(135deg,#1a2a3a,#2d5a8e)',
  bricks:   'linear-gradient(135deg,#5a2000,#b84000)',
  stones:   'linear-gradient(135deg,#3a2a1a,#7a5a3a)',
  hardware: 'linear-gradient(135deg,#1a3a2a,#2a6a4a)'
};
var cLabel = {
  sand:     '🏖️ Sand & Aggregate',
  cement:   '🪨 Cement',
  sariya:   '⚙️ Sariya (TMT Bars)',
  bricks:   '🧱 Bricks',
  stones:   '🪨 Stones',
  hardware: '🔧 Hardware & More'
};

function renderProds(srch) {
  var wrap = document.getElementById('prod-wrap');
  if (!wrap) return;
  var cats = ['sand','cement','sariya','bricks','stones','hardware'];
  var show = curFilter === 'all' ? cats : [curFilter];
  var html = '';
  show.forEach(function(cat) {
    var items = PRODS.filter(function(p) {
      return p.cat === cat && (!srch || p.name.toLowerCase().indexOf(srch.toLowerCase()) > -1 || p.brand.toLowerCase().indexOf(srch.toLowerCase()) > -1);
    });
    if (!items.length) return;
    html += '<div class="psec"><div class="pshd"><h2>' + cLabel[cat] + '</h2><div class="psln"></div><div class="psct">' + items.length + ' Products</div></div><div class="pgrid">';
    items.forEach(function(p) {
      var bCls = p.badge === 'eco' ? ' eco' : p.badge === 'newb' ? ' newb' : p.badge === 'val' ? ' val' : '';
      var bTxt = p.badge === 'eco' ? 'Eco-Friendly' : p.badge === 'newb' ? 'New' : p.badge === 'val' ? 'Value Pick' : p.badge;
      var imgEsc = p.img.replace(/'/g, "\\'");
      var capEsc = (p.name + ' — ' + p.brand).replace(/'/g, "\\'");
      html += '<div class="pcard">'
        + '<div class="pimg">'
        + '<img src="' + p.img + '" alt="' + p.name + '" onload="this.classList.add(\'rdy\')" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">'
        + '<div class="pfb" style="background:' + cBg[p.cat] + ';color:#fff">' + p.ico + '</div>'
        + '<div class="pgrad"></div>'
        + (p.badge ? '<div class="pbdg' + bCls + '">' + bTxt + '</div>' : '')
        + '<div class="pzoom" data-src="' + imgEsc + '" data-cap="' + capEsc + '">🔍</div>'
        + '</div>'
        + '<div class="pbody">'
        + '<div class="pbrand">' + p.brand + '</div>'
        + '<div class="pname">' + p.name + '</div>'
        + '<div class="pdesc">' + p.desc + '</div>'
        + '<div class="pspecs">' + p.specs.map(function(s){ return '<span class="pspec">'+s+'</span>'; }).join('') + '</div>'
        + '<div class="phint">📞 Contact us via WhatsApp or Call to enquire about price &amp; availability</div>'
        + '</div></div>';
    });
    html += '</div></div>';
  });
  if (!html) html = '<div style="padding:60px;text-align:center;color:var(--t3);font-family:Arial,sans-serif"><div style="font-size:44px;margin-bottom:14px">🔍</div><p>No products found.</p></div>';
  wrap.innerHTML = html;
}

// ── LIGHTBOX — event delegation, no inline onclick ──
document.addEventListener('click', function(e) {
  var z = e.target.closest('.pzoom');
  if (z) {
    var src = z.getAttribute('data-src');
    var cap = z.getAttribute('data-cap');
    document.getElementById('lbimg').src = src;
    document.getElementById('lbcap').textContent = cap;
    document.getElementById('lb').classList.add('on');
    document.body.style.overflow = 'hidden';
  }
});
document.getElementById('lb').addEventListener('click', function() {
  this.classList.remove('on');
  document.body.style.overflow = '';
});
document.getElementById('lbx').addEventListener('click', function(e) {
  e.stopPropagation();
  document.getElementById('lb').classList.remove('on');
  document.body.style.overflow = '';
});

// ── ENQUIRY ──
document.getElementById('send-enquiry-btn').addEventListener('click', function() {
  var t = document.createElement('div');
  t.className = 'ti ok show';
  t.innerHTML = '✅ Enquiry sent! We\'ll call you within 30 minutes.';
  document.getElementById('toasts').appendChild(t);
  setTimeout(function() { t.classList.remove('show'); setTimeout(function() { t.remove(); }, 400); }, 4000);
});

// ── CUSTOM CURSOR ──
(function() {
  var ring = document.getElementById('cursor-ring');
  var dot  = document.getElementById('cursor-dot');
  var ringX = 0, ringY = 0;
  var mouseX = 0, mouseY = 0;
  var visible = false;

  // Smooth ring follow
  function lerp(a, b, t){ return a + (b - a) * t; }
  function loop() {
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
    if (!visible) {
      visible = true;
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    }
  });

  document.addEventListener('mouseleave', function() {
    ring.style.opacity = '0';
    dot.style.opacity  = '0';
    visible = false;
  });

  // Hover effect on interactive elements
  var hoverEls = 'a,button,input,select,textarea,[class*="card"],[class*="btn"],[class*="tab"],[class*="zoom"],[class*="fwa"],[class*="ptab"]';
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest(hoverEls)) {
      document.body.classList.add('cur-hover');
    }
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest(hoverEls)) {
      document.body.classList.remove('cur-hover');
    }
  });

  // Click burst
  document.addEventListener('mousedown', function() {
    document.body.classList.add('cur-click');
  });
  document.addEventListener('mouseup', function() {
    document.body.classList.remove('cur-click');
  });
})();

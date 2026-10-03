// ===== UTILITIES =====
function getRating(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) stars += '<span class="star filled">★</span>';
    else if (i === full && half) stars += '<span class="star half">★</span>';
    else stars += '<span class="star">☆</span>';
  }
  return stars;
}

function formatPret(pret) {
  return pret.toLocaleString('ro-RO') + ' lei';
}

// ===== COS =====
function getCos() {
  return JSON.parse(localStorage.getItem('melodyCos') || '[]');
}
function salveazaCos(cos) {
  localStorage.setItem('melodyCos', JSON.stringify(cos));
  updateCartBadge();
}
function adaugaInCos(id, cantitate = 1) {
  const cos = getCos();
  const idx = cos.findIndex(i => i.id === id);
  if (idx > -1) {
    cos[idx].cantitate += cantitate;
  } else {
    cos.push({ id, cantitate });
  }
  salveazaCos(cos);
  showNotif('Produs adăugat în coș! 🛒');
}
function stergedinCos(id) {
  const cos = getCos().filter(i => i.id !== id);
  salveazaCos(cos);
}
function updateCantitate(id, cantitate) {
  const cos = getCos();
  const idx = cos.findIndex(i => i.id === id);
  if (idx > -1) {
    if (cantitate <= 0) { stergedinCos(id); return; }
    cos[idx].cantitate = cantitate;
    salveazaCos(cos);
  }
}
function getTotalCos() {
  const cos = getCos();
  return cos.reduce((total, item) => {
    const p = produse.find(x => x.id === item.id);
    if (!p) return total;
    return total + (p.pretRedus || p.pret) * item.cantitate;
  }, 0);
}
function getNrProduseCos() {
  return getCos().reduce((s, i) => s + i.cantitate, 0);
}

// ===== FAVORITE =====
function getFavorite() {
  return JSON.parse(localStorage.getItem('melodyFav') || '[]');
}
function salveazaFavorite(fav) {
  localStorage.setItem('melodyFav', JSON.stringify(fav));
}
function toggleFavorit(id) {
  const fav = getFavorite();
  const idx = fav.indexOf(id);
  if (idx > -1) {
    fav.splice(idx, 1);
    showNotif('Eliminat din favorite 💔');
  } else {
    fav.push(id);
    showNotif('Adăugat la favorite ❤️');
  }
  salveazaFavorite(fav);
  return fav.indexOf(id) > -1;
}
function esteInFavorite(id) {
  return getFavorite().includes(id);
}
function mutaInCos(id) {
  adaugaInCos(id);
  const fav = getFavorite().filter(x => x !== id);
  salveazaFavorite(fav);
}

// ===== UI HELPERS =====
function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const nr = getNrProduseCos();
  badges.forEach(b => {
    b.textContent = nr;
    b.style.display = nr > 0 ? 'flex' : 'none';
  });
}

function showNotif(msg) {
  let notif = document.getElementById('notif-toast');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notif-toast';
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.classList.add('show');
  clearTimeout(notif._t);
  notif._t = setTimeout(() => notif.classList.remove('show'), 2500);
}

function createProductCard(produs) {
  const inFav = esteInFavorite(produs.id);
  const pretDisplay = produs.pretRedus
    ? `<span class="pret-vechi">${formatPret(produs.pret)}</span> <span class="pret-nou">${formatPret(produs.pretRedus)}</span>`
    : `<span class="pret-nou">${formatPret(produs.pret)}</span>`;
  
  return `
    <div class="card-produs" data-id="${produs.id}">
      ${produs.popular ? '<span class="badge-popular">⭐ Popular</span>' : ''}
      ${produs.pretRedus ? '<span class="badge-reducere">Sale</span>' : ''}
      <a href="produs.html?id=${produs.id}" class="card-img-link">
        <img src="${produs.imagine}" alt="${produs.nume}" class="card-img" loading="lazy">
      </a>
      <div class="card-body">
        <a href="produs.html?id=${produs.id}" class="card-titlu">${produs.nume}</a>
        <div class="card-rating">${getRating(produs.rating)} <span class="rating-val">${produs.rating}</span></div>
        <p class="card-desc">${produs.descriereScurta}</p>
        <div class="card-pret">${pretDisplay}</div>
        <div class="card-actiuni">
          <button class="btn-cos" onclick="adaugaInCos(${produs.id})">🛒 Adaugă în coș</button>
          <button class="btn-fav ${inFav ? 'activ' : ''}" onclick="handleFav(${produs.id}, this)" title="${inFav ? 'Elimină din favorite' : 'Adaugă la favorite'}">
            ${inFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleFav(id, btn) {
  const activ = toggleFavorit(id);
  btn.textContent = activ ? '❤️' : '🤍';
  btn.classList.toggle('activ', activ);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  
  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }
  
  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
});

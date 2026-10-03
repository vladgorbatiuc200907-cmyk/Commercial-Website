// Shared header and footer injected on all pages
function getHeader() {
  return `
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="logo">
        <span class="logo-icon">🎵</span>
        Melody<span>Shop</span>
      </a>
      <nav class="nav-menu" id="navMenu">
        <a href="index.html" class="nav-link">Acasă</a>
        <a href="produse.html" class="nav-link">Produse</a>
        <a href="favorite.html" class="nav-link nav-link-icon">❤️ Favorite</a>
        <a href="cos.html" class="nav-link nav-link-icon">
          🛒 Coș
          <span class="cart-badge" id="cartBadge" style="display:none">0</span>
        </a>
        <a href="despre.html" class="nav-link">Despre</a>
        <a href="contact.html" class="nav-link">Contact</a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Meniu" onclick="toggleMenu()">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function getFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo"><span class="logo-icon">🎵</span>Melody<span>Shop</span></div>
        <p>Magazinul tău de instrumente muzicale de calitate. Pasiunea pentru muzică, la un click distanță.</p>
        <div class="footer-social">
          <a href="#" class="social-btn" aria-label="Facebook">📘</a>
          <a href="#" class="social-btn" aria-label="Instagram">📸</a>
          <a href="#" class="social-btn" aria-label="YouTube">📺</a>
          <a href="#" class="social-btn" aria-label="TikTok">🎵</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navigare</h4>
        <ul>
          <li><a href="index.html">Acasă</a></li>
          <li><a href="produse.html">Produse</a></li>
          <li><a href="favorite.html">Favorite</a></li>
          <li><a href="cos.html">Coș</a></li>
          <li><a href="despre.html">Despre noi</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Categorii</h4>
        <ul>
          <li><a href="produse.html?cat=chitari">🎸 Chitări</a></li>
          <li><a href="produse.html?cat=piane">🎹 Piane</a></li>
          <li><a href="produse.html?cat=tobe">🥁 Tobe</a></li>
          <li><a href="produse.html?cat=vanturi">🎺 Vânturi</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="#">📍 Str. Muzicii 12, București</a></li>
          <li><a href="tel:+40721234567">📞 0721 234 567</a></li>
          <li><a href="mailto:info@melodyshop.ro">✉️ info@melodyshop.ro</a></li>
          <li><a href="#">🕐 Lun-Vin: 9:00-18:00</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} MelodyShop. Toate drepturile rezervate. Creat cu ❤️ pentru muzicieni.</p>
    </div>
  </footer>`;
}

function injectLayout() {
  document.body.insertAdjacentHTML('afterbegin', getHeader());
  document.body.insertAdjacentHTML('beforeend', getFooter());
}

function toggleMenu() {
  const menu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  hamburger.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  setTimeout(() => {
    updateCartBadge();
    // Active nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href').split('?')[0];
      if (href === currentPage) link.classList.add('active');
    });
  }, 0);
});

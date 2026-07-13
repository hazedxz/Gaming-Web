// ============================================================
//  LUIGI DIGITAL — UI MODULE
// ============================================================
import { CATEGORIES, PRODUCTS } from './data.js';
import { addToCart, removeFromCart, updateQty, clearCart, getCart, getTotal, getCount, onCartChange } from './cart.js';

// ── STATE ────────────────────────────────────────────────────
let activeCategory = 'all';
let searchQuery    = '';
let wishlist       = new Set();

// ── DOM REFS ─────────────────────────────────────────────────
const $ = id => document.getElementById(id);
let productsGrid, cartCountEl, cartSidebar, cartOverlay, cartBody, cartTotalEl;

// ============================================================
//  INIT
// ============================================================
export function init() {
  productsGrid = $('products-grid');
  cartCountEl  = $('cart-count');
  cartSidebar  = $('cart-sidebar');
  cartOverlay  = $('cart-overlay');
  cartBody     = $('cart-body');
  cartTotalEl  = $('cart-total');

  buildCategories();
  renderProducts();
  bindNav();
  bindCart();
  bindSearch();
  onCartChange(renderCart);
  setupScrollReveal();
  animateHeroNumbers();
}

// ============================================================
//  CATEGORIES
// ============================================================
function buildCategories() {
  const scroll = $('categories-scroll');
  scroll.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-pill ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
      <span class="cat-icon">${cat.icon}</span>
      ${cat.label}
    </button>
  `).join('');

  scroll.addEventListener('click', e => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    scroll.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    activeCategory = pill.dataset.cat;
    renderProducts();
  });
}

// ============================================================
//  PRODUCTS
// ============================================================
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q)
      || p.platforms.some(pl => pl.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });
}

export function renderProducts() {
  const filtered = getFilteredProducts();
  updateSearchBar(filtered.length);

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--text-muted)">
        <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
        <p style="font-size:1rem">No encontramos productos para "<strong style="color:var(--neon-green)">${searchQuery}</strong>"</p>
        <p style="font-size:0.85rem;margin-top:0.5rem">Intenta con otra categoría o término de búsqueda</p>
      </div>`;
    return;
  }

  productsGrid.innerHTML = filtered.map(p => productCard(p)).join('');
  bindProductCards();
}

function productCard(p) {
  const badge = p.badge ? `<span class="card-badge badge-${p.badge}">${badgeLabel(p.badge)}</span>` : '';
  const wish = `<button class="card-wish ${wishlist.has(p.id) ? 'active' : ''}" data-wish="${p.id}" title="Favorito">♥</button>`;
  const stock = p.inStock
    ? `<button class="card-add-btn" data-add="${p.id}" title="Agregar al carrito">+</button>`
    : `<span style="font-size:0.68rem;color:var(--neon-pink);font-weight:600">Sin stock</span>`;
  const oldPrice = p.oldPrice ? `<span class="card-price-old">$${p.oldPrice}</span>` : '';
  const platforms = p.platforms.map(pl => `<span class="platform-tag">${pl}</span>`).join('');

  return `
  <article class="product-card reveal" data-open="${p.id}">
    ${badge}
    ${wish}
    <div class="card-image-placeholder">${p.emoji}</div>
    <div class="card-body">
      <div class="card-category">${categoryLabel(p.category)}</div>
      <h3 class="card-name">${p.name}</h3>
      <div class="card-platform">${platforms}</div>
      <div class="card-footer">
        <div>
          <span class="card-price">$${p.price}</span>${oldPrice}
        </div>
        ${stock}
      </div>
    </div>
  </article>`;
}

function bindProductCards() {
  // Open modal
  productsGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('[data-add]') || e.target.closest('[data-wish]')) return;
      const id = parseInt(card.dataset.open);
      openModal(id);
    });
  });

  // Add to cart
  productsGrid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.add);
      const product = PRODUCTS.find(p => p.id === id);
      addToCart(product);
      btn.classList.add('added');
      btn.textContent = '✓';
      setTimeout(() => { btn.classList.remove('added'); btn.textContent = '+'; }, 1000);
      bumpCartCount();
      showToast(`✅ ${product.name} agregado al carrito`);
    });
  });

  // Wishlist
  productsGrid.querySelectorAll('[data-wish]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.wish);
      if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.classList.remove('active');
      } else {
        wishlist.add(id);
        btn.classList.add('active');
      }
    });
  });

  // Scroll reveal
  setupScrollReveal();
}

// ============================================================
//  MODAL
// ============================================================
function openModal(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if (!p) return;

  const overlay = $('modal-overlay');
  const content = $('modal-content-inner');
  const oldPrice = p.oldPrice ? `<span class="modal-price-old">$${p.oldPrice}</span>` : '';
  const platforms = p.platforms.map(pl => `<span class="platform-tag">${pl}</span>`).join('');
  const stockStatus = p.inStock
    ? `<button class="modal-add-btn" id="modal-add-btn" data-id="${p.id}">🛒 Agregar al carrito</button>`
    : `<div style="padding:14px;text-align:center;color:var(--neon-pink);font-weight:600;font-size:0.85rem;border:1px solid var(--neon-pink);border-radius:8px;flex:1">Sin stock actualmente</div>`;

  content.innerHTML = `
    <div class="modal-img" style="font-size:6rem;display:flex;align-items:center;justify-content:center">${p.emoji}</div>
    <div class="modal-content">
      <div class="modal-meta">
        <div>
          <div class="modal-category">${categoryLabel(p.category)}</div>
          <div style="margin-top:4px">${platforms}</div>
        </div>
        <button class="modal-close" id="modal-close">✕</button>
      </div>
      <h2 class="modal-title">${p.name}</h2>
      <p class="modal-desc">${p.description}</p>
      <div class="modal-price-row">
        <span class="modal-price">$${p.price}</span>
        ${oldPrice}
        ${p.badge ? `<span class="card-badge badge-${p.badge}" style="position:static">${badgeLabel(p.badge)}</span>` : ''}
      </div>
      <div class="modal-actions">
        ${stockStatus}
      </div>
    </div>`;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  $('modal-close')?.addEventListener('click', closeModal);
  $('modal-add-btn')?.addEventListener('click', () => {
    addToCart(p);
    bumpCartCount();
    showToast(`✅ ${p.name} agregado al carrito`);
    closeModal();
  });
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); }, { once: true });
}

function closeModal() {
  $('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
//  CART SIDEBAR
// ============================================================
function bindCart() {
  $('cart-btn').addEventListener('click', openCart);
  $('cart-close').addEventListener('click', closeCartFn);
  cartOverlay.addEventListener('click', closeCartFn);
  $('clear-cart').addEventListener('click', () => { clearCart(); showToast('🗑️ Carrito vaciado'); });
}

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartFn() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart(items) {
  const count = getCount();
  const total = getTotal();

  // Update count badge
  cartCountEl.textContent = count;
  $('cart-items-count').textContent = `${count} ${count === 1 ? 'artículo' : 'artículos'}`;
  $('cart-subtotal').textContent = `$${total.toFixed(2)}`;
  $('cart-total-val').textContent = `$${total.toFixed(2)}`;
  if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

  if (items.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Tu carrito está vacío</p>
        <p style="font-size:0.8rem">¡Agrega tus productos favoritos!</p>
      </div>`;
    return;
  }

  cartBody.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-category">${categoryLabel(item.category)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-qty="${item.id}" data-delta="-1">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-qty="${item.id}" data-delta="1">+</button>
          <button class="cart-item-remove" data-remove="${item.id}">✕ Quitar</button>
        </div>
      </div>
      <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join('');

  // Bind qty/remove
  cartBody.querySelectorAll('[data-qty]').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQty(parseInt(btn.dataset.qty), parseInt(btn.dataset.delta));
    });
  });
  cartBody.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.remove);
      const item = getCart().find(i => i.id === id);
      removeFromCart(id);
      showToast(`🗑️ ${item?.name} eliminado`);
    });
  });
}

// ============================================================
//  SEARCH
// ============================================================
function bindSearch() {
  $('nav-search-input').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderProducts();
  });
}

function updateSearchBar(count) {
  const bar = $('search-results-bar');
  if (!bar) return;
  if (searchQuery) {
    bar.innerHTML = `Mostrando <strong>${count}</strong> resultado${count !== 1 ? 's' : ''} para "<strong>${searchQuery}</strong>"`;
    bar.style.display = 'block';
  } else {
    bar.style.display = 'none';
  }
}

// ============================================================
//  NAV
// ============================================================
function bindNav() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Nav links smooth scroll
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Hero CTAs
  $('hero-cta')?.addEventListener('click', () => {
    $('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ============================================================
//  HELPERS
// ============================================================
function bumpCartCount() {
  cartCountEl.classList.remove('bump');
  void cartCountEl.offsetWidth;
  cartCountEl.classList.add('bump');
}

export function showToast(msg, type = '') {
  const container = $('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

function badgeLabel(b) {
  return { new: 'Nuevo', hot: 'Popular', limit: 'Limitado', sale: 'Oferta' }[b] || b;
}

function categoryLabel(id) {
  return CATEGORIES.find(c => c.id === id)?.label || id;
}

function setupScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function animateHeroNumbers() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (el.dataset.suffix || '');
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

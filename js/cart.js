// ============================================================
//  LUIGI DIGITAL — CART MODULE
// ============================================================

let cart = [];
let listeners = [];

export function onCartChange(fn) { listeners.push(fn); }
function notify() { listeners.forEach(fn => fn([...cart])); }

export function getCart() { return [...cart]; }

export function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  notify();
  return true;
}

export function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  notify();
}

export function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  notify();
}

export function clearCart() {
  cart = [];
  notify();
}

export function getTotal() {
  return cart.reduce((acc, i) => acc + i.price * i.qty, 0);
}

export function getCount() {
  return cart.reduce((acc, i) => acc + i.qty, 0);
}

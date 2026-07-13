// ============================================================
//  LUIGI DIGITAL — PRODUCT CATALOG
//  TODO: Reemplazar con llamadas a Supabase
//  supabase.from('products').select('*')
// ============================================================

export const CATEGORIES = [
  { id: 'all',        label: 'Todos',              icon: '🎮' },
  { id: 'gamepass',   label: 'Game Pass / Suscripciones', icon: '🔑' },
  { id: 'controles',  label: 'Controles',          icon: '🕹️' },
  { id: 'bases',      label: 'Bases & Cargadores', icon: '⚡' },
  { id: 'accesorios', label: 'Accesorios',         icon: '🎯' },
  { id: 'bolsos',     label: 'Bolsos & Maletines', icon: '👜' },
  { id: 'edicion',    label: 'Edición Limitada',   icon: '⭐' },
  { id: 'gomas',      label: 'Gomas & Grips',      icon: '🖐️' },
];

export const PRODUCTS = [
  // ── GAME PASS / SUSCRIPCIONES ──────────────────────────────
  {
    id: 1,
    name: 'Xbox Game Pass Ultimate 1 Mes',
    category: 'gamepass',
    price: 18,
    oldPrice: null,
    badge: 'hot',
    platforms: ['Xbox', 'PC'],
    emoji: '🎮',
    description: 'Acceso a más de 100 juegos de alta calidad en Xbox y PC. Incluye EA Play y acceso a juegos el día de lanzamiento.',
    inStock: true,
  },
  {
    id: 2,
    name: 'Xbox Game Pass Ultimate 3 Meses',
    category: 'gamepass',
    price: 48,
    oldPrice: 54,
    badge: 'sale',
    platforms: ['Xbox', 'PC'],
    emoji: '🎮',
    description: 'El mejor valor: 3 meses de acceso ilimitado a cientos de juegos, EA Play y beneficios exclusivos de Gold.',
    inStock: true,
  },
  {
    id: 3,
    name: 'PS Plus Essential 1 Mes',
    category: 'gamepass',
    price: 15,
    oldPrice: null,
    badge: null,
    platforms: ['PS4', 'PS5'],
    emoji: '🎮',
    description: 'Multijugador online, juegos mensuales gratis y descuentos exclusivos en PlayStation Store.',
    inStock: true,
  },
  {
    id: 4,
    name: 'PS Plus Extra 3 Meses',
    category: 'gamepass',
    price: 52,
    oldPrice: 60,
    badge: 'sale',
    platforms: ['PS4', 'PS5'],
    emoji: '🎮',
    description: 'Todo lo de Essential más acceso a catálogo de 400+ juegos de PS4 y PS5, disponibles para descargar y jugar.',
    inStock: true,
  },
  {
    id: 5,
    name: 'Nintendo Switch Online 12 Meses',
    category: 'gamepass',
    price: 35,
    oldPrice: null,
    badge: 'new',
    platforms: ['Switch'],
    emoji: '🎮',
    description: 'Multijugador online, juegos clásicos de NES/SNES y acceso a la expansión de juegos N64 y Game Boy.',
    inStock: true,
  },

  // ── CONTROLES ──────────────────────────────────────────────
  {
    id: 6,
    name: 'Control Original PS4 DualShock 4',
    category: 'controles',
    price: 30,
    oldPrice: null,
    badge: null,
    platforms: ['PS4'],
    emoji: '🕹️',
    description: 'Control original Sony DualShock 4. Usado en perfectas condiciones, completamente funcional.',
    inStock: true,
  },
  {
    id: 7,
    name: 'Control PlayStation 4 AAA',
    category: 'controles',
    price: 25,
    oldPrice: null,
    badge: null,
    platforms: ['PS4'],
    emoji: '🕹️',
    description: 'Control calidad AAA para PS4. Excelente calidad, compatible con todos los modelos de PS4.',
    inStock: true,
  },
  {
    id: 8,
    name: 'Control de PlayStation 5 DualSense',
    category: 'controles',
    price: 90,
    oldPrice: null,
    badge: null,
    platforms: ['PS5'],
    emoji: '🕹️',
    description: 'DualSense oficial con retroalimentación háptica y gatillos adaptativos. Disponible en múltiples colores.',
    inStock: true,
  },
  {
    id: 9,
    name: 'DualSense® FORTNITE Limited Edition',
    category: 'edicion',
    price: 110,
    oldPrice: null,
    badge: 'limit',
    platforms: ['PS5'],
    emoji: '⭐',
    description: 'Edición especial de Fortnite con diseño exclusivo. Incluye contenido digital del juego. Coleccionable.',
    inStock: false,
  },

  // ── BASES & CARGADORES ─────────────────────────────────────
  {
    id: 10,
    name: 'Base Multifuncional PS5 (Fat/Slim/Pro)',
    category: 'bases',
    price: 50,
    oldPrice: null,
    badge: null,
    platforms: ['PS5'],
    emoji: '⚡',
    description: 'Base multifuncional para PS5. Incluye ventilación, estación de carga y espacio para 11 juegos. Compatible con todos los modelos.',
    inStock: true,
  },
  {
    id: 11,
    name: 'Base Multifuncional PS4',
    category: 'bases',
    price: 40,
    oldPrice: null,
    badge: null,
    platforms: ['PS4'],
    emoji: '⚡',
    description: 'Base multifuncional para PS4. Cargador integrado, porta juegos y fan cooler. Aplica para todos los modelos.',
    inStock: true,
  },
  {
    id: 12,
    name: 'Base de Carga Rápida PS5',
    category: 'bases',
    price: 25,
    oldPrice: null,
    badge: 'new',
    platforms: ['PS5'],
    emoji: '⚡',
    description: 'Base de carga rápida para controles DualSense de PS5. Carga simultánea de 2 controles.',
    inStock: true,
  },
  {
    id: 13,
    name: 'Base de Pared Multifuncional PS5',
    category: 'bases',
    price: 50,
    oldPrice: null,
    badge: null,
    platforms: ['PS5'],
    emoji: '⚡',
    description: 'Soporte de pared para PS5. Incluye soporte para controles, auriculares y soporte para VR2 opcional.',
    inStock: true,
  },
  {
    id: 14,
    name: 'Ventilador Extra PS5 Slim',
    category: 'bases',
    price: 30,
    oldPrice: null,
    badge: null,
    platforms: ['PS5'],
    emoji: '🌀',
    description: 'Ventilador adicional para PS5 Slim. Mejora la refrigeración y prolonga la vida útil de tu consola.',
    inStock: true,
  },

  // ── BOLSOS & MALETINES ─────────────────────────────────────
  {
    id: 15,
    name: 'Bolso Gamer PS4 / PS5',
    category: 'bolsos',
    price: 40,
    oldPrice: null,
    badge: null,
    platforms: ['PS4', 'PS5'],
    emoji: '👜',
    description: 'Lleva tu consola con comodidad y totalmente protegida. Compartimentos para accesorios y cables.',
    inStock: true,
  },
  {
    id: 16,
    name: 'Maletín para PlayStation 5',
    category: 'bolsos',
    price: 60,
    oldPrice: null,
    badge: null,
    platforms: ['PS5'],
    emoji: '👜',
    description: 'Maletín rígido de alta protección para PS5. Compatible con todos los modelos. Interior acolchado premium.',
    inStock: true,
  },

  // ── ACCESORIOS ─────────────────────────────────────────────
  {
    id: 17,
    name: 'Kontrol Freek — Standard',
    category: 'accesorios',
    price: 12,
    oldPrice: null,
    badge: null,
    platforms: ['PS4', 'PS5', 'Xbox'],
    emoji: '🎯',
    description: 'Elevadores de joystick para mayor precisión y control. Compatible con PS4, PS5 y Xbox.',
    inStock: true,
  },
  {
    id: 18,
    name: "Kontrol Freek Galaxy's PS4/PS5",
    category: 'accesorios',
    price: 12,
    oldPrice: null,
    badge: 'new',
    platforms: ['PS4', 'PS5', 'Xbox'],
    emoji: '🎯',
    description: 'Diseñados para shooters como Fortnite y Warzone. Alto y bajo perfil. Aumenta tu precisión al apuntar.',
    inStock: true,
  },
  {
    id: 19,
    name: 'Catálogo Completo de Juegos CGC',
    category: 'accesorios',
    price: 8,
    oldPrice: null,
    badge: null,
    platforms: ['PS4', 'PS5'],
    emoji: '📋',
    description: 'Catálogo visual completo de juegos disponibles. Ideal para elegir y pedir tu próximo título.',
    inStock: true,
  },

  // ── GOMAS & GRIPS ──────────────────────────────────────────
  {
    id: 20,
    name: 'Gomas de Joystick PS4/PS5',
    category: 'gomas',
    price: 5,
    oldPrice: null,
    badge: null,
    platforms: ['PS4', 'PS5'],
    emoji: '🖐️',
    description: 'Gomas antideslizantes para joysticks. Protegen tus controles del desgaste y mejoran el agarre.',
    inStock: true,
  },
  {
    id: 21,
    name: 'Forro Silicon + Goma Control PS5',
    category: 'gomas',
    price: 5,
    oldPrice: null,
    badge: null,
    platforms: ['PS5'],
    emoji: '🖐️',
    description: 'Forro de silicon protector más gomas de joystick para control de PS5. Protección completa.',
    inStock: true,
  },
];

// ─── SUPABASE INTEGRATION TEMPLATE ──────────────────────────
// Cuando tengas tu proyecto Supabase listo, reemplaza con:
//
// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
// const supabase = createClient('TU_URL', 'TU_ANON_KEY')
//
// export async function fetchProducts(categoryId) {
//   let query = supabase.from('products').select('*')
//   if (categoryId && categoryId !== 'all') {
//     query = query.eq('category', categoryId)
//   }
//   const { data, error } = await query
//   if (error) throw error
//   return data
// }

// ============================================================
//  LUIGI DIGITAL — MAIN ENTRY
// ============================================================
import { init } from './ui.js';
import { initParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', () => {
  initParticles('particles-canvas');
  init();
});

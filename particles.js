// ============================================================
//  LUIGI DIGITAL — PIXEL PARTICLE SYSTEM
// ============================================================

export function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = ['#7C3AED', '#06FFA5', '#FF2D78', '#00D4FF', '#9D6FFF'];
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x     = Math.random() * W;
      this.y     = init ? Math.random() * H : H + 10;
      this.size  = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.6 + 0.1;
      this.life  = 1;
      this.decay = Math.random() * 0.002 + 0.001;
      // pixel squares feel like game aesthetic
      this.isPixel = Math.random() > 0.6;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      if (this.life <= 0 || this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha * this.life;
      ctx.fillStyle = this.color;
      if (this.isPixel) {
        ctx.fillRect(this.x, this.y, this.size * 2, this.size * 2);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function spawnParticles(n) {
    for (let i = 0; i < n; i++) particles.push(new Particle());
  }

  let raf;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  // Pause when not visible (perf)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else loop();
  });

  window.addEventListener('resize', resize);
  resize();
  spawnParticles(120);
  loop();
}

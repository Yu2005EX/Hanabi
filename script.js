// script.js
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

function fitCanvasToWindow() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
fitCanvasToWindow();
window.addEventListener('resize', fitCanvasToWindow);

const particles = [];
const colors = ['#ff0043', '#14d2ff', '#14ff80', '#faff00', '#ff7f00'];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(x, y, color) {
  const particle = {
    x,
    y,
    radius: random(2, 4),
    speed: random(2, 5),
    angle: random(0, Math.PI * 2),
    color,
    alpha: 1,
    decay: random(0.01, 0.02),
  };
  particles.push(particle);
}

function explode(x, y) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 100; i++) {
    createParticle(x, y, color);
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= p.decay;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
    ctx.fill();
  });
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
  explode(e.clientX, e.clientY);
});

// optional: explode at random positions every few seconds
// setInterval(() => explode(random(100, canvas.width-100), random(100, canvas.height-100)), 1200);

animate();

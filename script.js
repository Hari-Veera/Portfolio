// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// Contact form submit (dummy)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('sending the message');
  this.reset();
});

// Solar System + Falling Stars Background
const canvas = document.getElementById('ai-bg');
const ctx = canvas.getContext('2d');

// Helper for lerp
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


// Falling Stars Data
const fallingStars = [];
function createFallingStars() {
  fallingStars.length = 0;
  for (let i = 0; i < 60; i++) {
    fallingStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: Math.random() * 60 + 40,
      speed: Math.random() * 3 + 2,
      alpha: Math.random() * 0.5 + 0.5,
      width: Math.random() * 1.2 + 0.5
    });
  }
}
createFallingStars();

// Track scroll for sun position
let scrollY = 0;
let scrollHeight = 1;
function updateScrollVars() {
  scrollY = window.scrollY || window.pageYOffset;
  scrollHeight = Math.max(document.body.scrollHeight - window.innerHeight, 1);
}
window.addEventListener('scroll', updateScrollVars);
updateScrollVars();
 

function drawFallingStars() {
  for (const star of fallingStars) {
    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = star.width;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x, star.y + star.len);
    ctx.stroke();
    ctx.restore();

    star.y += star.speed;
    if (star.y > canvas.height + 10) {
      star.x = Math.random() * canvas.width;
      star.y = -star.len;
      star.len = Math.random() * 60 + 40;
      star.speed = Math.random() * 3 + 2;
      star.alpha = Math.random() * 0.5 + 0.5;
      star.width = Math.random() * 1.2 + 0.5;
    }
  }
}

function animateBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFallingStars();
  requestAnimationFrame(animateBackground);
}
animateBackground();

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


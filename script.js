// =============================
// TRUEFOCUS MAIN SCRIPT (FULLY UPDATED)
// =============================

// -----------------------------
// Smooth Fade-In Animation
// -----------------------------
const faders = document.querySelectorAll('.fade');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});
faders.forEach(el => observer.observe(el));

// -----------------------------
// Dark / Light Mode Toggle
// -----------------------------
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// -----------------------------
// Animated Particles Background
// -----------------------------
const canvas = document.createElement('canvas');
document.getElementById('particles').appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#38bdf8";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// -----------------------------
// Smooth Scroll Function
// -----------------------------
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
}

// -----------------------------
// REAL EMAIL SENDING (EmailJS)
// -----------------------------
// ⚠️ IMPORTANT SETUP REQUIRED:
// 1. Go to https://www.emailjs.com/
// 2. Connect your Gmail
// 3. Create Email Service
// 4. Create Email Template
// 5. Replace the IDs below

(function () {
  emailjs.init("DvNt3VpNrx3VCsC1p"); // <-- REPLACE THIS
})();

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const statusText = document.getElementById("formStatus");

    const templateParams = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    statusText.textContent = "Sending message...";
    statusText.style.color = "#38bdf8";

    emailjs.send("service_mn212pa", "template_pawkjy7", templateParams)
      .then(function () {
        statusText.textContent = "Message sent successfully!";
        statusText.style.color = "#22c55e";
        form.reset();
      }, function (error) {
        statusText.textContent = "Failed to send message. Please try again.";
        statusText.style.color = "#ef4444";
        console.error("EmailJS Error:", error);
      });
  });
}

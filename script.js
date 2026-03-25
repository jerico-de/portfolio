/* =============================================
   PORTFOLIO — script.js
   ============================================= */

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Typewriter effect ─────────────────────────
const roles = ['Web Developer', 'UI/UX Designer', 'Programmer'];
const el     = document.getElementById('typewriter');
let   roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];

  if (!deleting) {
    el.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    el.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting  = false;
      roleIdx   = (roleIdx + 1) % roles.length;
    }
    setTimeout(typeLoop, deleting ? 45 : 120);
  }
}
typeLoop();

// ── Skill bars — animate on scroll ───────────
const fills = document.querySelectorAll('.skill-bar-fill');
let barsAnimated = false;

const observeBars = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !barsAnimated) {
      barsAnimated = true;
      fills.forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) observeBars.observe(skillsSection);

// ── Fade-in on scroll (sections) ─────────────
const fadeEls = document.querySelectorAll(
  '.about-content, .stack-grid, .projects-grid, .certifications-grid,.timeline, .skills-wrap, .contact-grid'
);

const observeFade = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observeFade.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observeFade.observe(el);
});

// ── Timeline items stagger ────────────────────
const timelineItems = document.querySelectorAll('.timeline-item');
const observeTL = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.12}s`;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      observeTL.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => {
  item.style.opacity   = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observeTL.observe(item);
});

// ── Stack items stagger ───────────────────────
const stackItems = document.querySelectorAll('.stack-item');
const observeStack = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    stackItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.06}s`;
      item.style.opacity         = '1';
      item.style.transform       = 'scale(1)';
    });
    observeStack.disconnect();
  }
}, { threshold: 0.15 });

stackItems.forEach(item => {
  item.style.opacity   = '0';
  item.style.transform = 'scale(0.88)';
  item.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
});
const stackGrid = document.querySelector('.stack-grid');
if (stackGrid) observeStack.observe(stackGrid);

// ── Contact form ──────────────────────────────
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg   = document.getElementById('message').value.trim();

    if (!name || !email || !msg) {
      formNote.textContent = '⚠ Please fill in all fields.';
      formNote.style.color = '#e05252';
      return;
    }

    // Simulate send (replace with real fetch/emailJS/formspree)
    formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
    formNote.style.color = 'var(--accent)';
    form.reset();

    setTimeout(() => { formNote.textContent = ''; }, 5000);
  });
}

// ── Active nav link on scroll ─────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
};
window.addEventListener('scroll', highlightNav);

// ── Footer year ───────────────────────────────
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Lightbox modal ───────────────────────────
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

// Attach click to all "view certificate" buttons
document.querySelectorAll('.btn-sm').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const imgSrc = btn.dataset.img; // get image path
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
  });
});

// Close modal
closeBtn.onclick = () => modal.style.display = 'none';
modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};
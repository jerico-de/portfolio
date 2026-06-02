// ── Custom cursor ─────────────────────────────
const cursorGlow = document.getElementById('cursor-glow');
const cursorDot  = document.getElementById('cursor-dot');

if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorGlow) {
  let mouseX = -999, mouseY = -999;
  let glowX  = -999, glowY  = -999;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity  = '0';
    cursorGlow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity  = '1';
    cursorGlow.style.opacity = '1';
  });

  (function animateCursor() {
    glowX += (mouseX - glowX) * 0.10;
    glowY += (mouseY - glowY) * 0.10;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top  = glowY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  const hoverSel = 'a, button, .project-card, .certifications-card, .skill-category, .stat-box, .timeline-content, .stack-item';
  document.querySelectorAll(hoverSel).forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovered'));
  });
} else {
  // Touch device — hide cursor elements entirely
  if (cursorDot)  cursorDot.style.display  = 'none';
  if (cursorGlow) cursorGlow.style.display = 'none';
}

// ── Dark / Light theme toggle ─────────────────
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Persist preference
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

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
const roles   = ['Web Developer', 'UI/UX Designer', 'Programmer'];
const twEl    = document.getElementById('typewriter');
let   roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    twEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    twEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
    setTimeout(typeLoop, deleting ? 45 : 120);
  }
}
typeLoop();

// ── Stack filter buttons ───────────────────────
const categoryMap = {
  stackAll:      null,
  stackFrontend: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'React', 'JQuery'],
  stackBackend:  ['Node.js', 'Express', 'Java', 'JavaScript'],
  stackMobile:   ['AndroidStudio', 'Kotlin', 'Compose'],
  stackDatabase: ['MySQL', 'MongoDB', 'PostgreSQL'],
  stackTools:    ['Netbeans', 'VSCode', 'Figma', 'Github', 'Wordpress', 'Netlify', 'AmazonWebServices', 'AWS', 'Postman', 'Supabase', 'Git', 'Vercel', 'Firebase'],
};

const filterBtns = document.querySelectorAll('.stack-filter button');
const stackItems = document.querySelectorAll('.stack-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = [...btn.classList].find(c => categoryMap.hasOwnProperty(c));
    const allowed  = categoryMap[category];

    stackItems.forEach(item => {
      const show = !allowed || allowed.includes(item.dataset.name);
      item.style.opacity       = show ? '1'       : '0.15';
      item.style.transform     = show ? 'scale(1)' : 'scale(0.88)';
      item.style.pointerEvents = show ? 'auto'    : 'none';
    });
  });
});

// ── Scroll reveal ──────────────────────────────
function assignRevealClasses() {
  document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('reveal-up');
  });
  document.querySelectorAll('.stat-box').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.classList.add(`delay-${(i % 6) + 1}`);
  });
  document.querySelectorAll('.about-text p').forEach((el, i) => {
    el.classList.add('reveal-up');
    el.classList.add(`delay-${(i % 6) + 1}`);
  });
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.classList.add(`delay-${(i % 6) + 1}`);
  });
  document.querySelectorAll('.certifications-card').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.classList.add(`delay-${(i % 6) + 1}`);
  });
  document.querySelectorAll('.contact-item').forEach((el, i) => {
    el.classList.add('reveal-left');
    el.classList.add(`delay-${(i % 6) + 1}`);
  });
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) contactForm.classList.add('reveal-up');
  document.querySelectorAll('.skill-category').forEach((el, i) => {
    el.classList.add('reveal-up');
    el.classList.add(`delay-${(i % 6) + 1}`);
  });
}
assignRevealClasses();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale').forEach(el => {
  revealObserver.observe(el);
});

// ── Timeline stagger ──────────────────────────
const timelineItems = document.querySelectorAll('.timeline-item');
const observeTL = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.12}s`;
      entry.target.style.opacity         = '1';
      entry.target.style.transform       = 'translateX(0)';
      observeTL.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => {
  item.style.opacity    = '0';
  item.style.transform  = 'translateX(-20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observeTL.observe(item);
});

// ── Stack items stagger on enter ──────────────
const observeStack = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    stackItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.05}s`;
      item.style.opacity         = '1';
      item.style.transform       = 'scale(1)';
    });
    observeStack.disconnect();
  }
}, { threshold: 0.1 });

stackItems.forEach(item => {
  item.style.opacity    = '0';
  item.style.transform  = 'scale(0.88)';
  item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});
const stackGrid = document.querySelector('.stack-grid');
if (stackGrid) observeStack.observe(stackGrid);

// ── Contact form / EmailJS ────────────────────
const EMAILJS_PUBLIC_KEY  = '7YlXc7p91ewwHqbng';
const EMAILJS_SERVICE_ID  = 'service_mgppn6f';
const EMAILJS_TEMPLATE_ID = 'template_duiw0h4';

const form      = document.getElementById('contactForm');
const formNote  = document.getElementById('formNote');
const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg   = document.getElementById('message').value.trim();

    if (!name || !email || !msg) {
      formNote.textContent = '⚠ Please fill in all fields.';
      formNote.style.color = '#e05252';
      return;
    }

    const keysConfigured =
      EMAILJS_PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY' &&
      EMAILJS_SERVICE_ID  !== 'YOUR_SERVICE_ID' &&
      EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';

    if (!keysConfigured) {
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      window.location.href = `mailto:jericocrisostomo29@gmail.com?subject=${subject}&body=${body}`;
      formNote.textContent = '✓ Opening your mail app…';
      formNote.style.color = 'var(--accent)';
      form.reset();
      setTimeout(() => { formNote.textContent = ''; }, 5000);
      return;
    }

    if (typeof emailjs === 'undefined') {
      formNote.textContent = '⚠ Email service not loaded. Please try again.';
      formNote.style.color = '#e05252';
      return;
    }

    submitBtn.textContent = 'Sending…';
    submitBtn.classList.add('sending');
    formNote.textContent = '';

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: name, from_email: email, message: msg, reply_to: email }
      );
      formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
      formNote.style.color = 'var(--accent)';
      form.reset();
    } catch (err) {
      formNote.textContent = '⚠ Something went wrong. Please email me directly.';
      formNote.style.color = '#e05252';
      console.error('EmailJS error:', err);
    } finally {
      submitBtn.textContent = 'Send Message';
      submitBtn.classList.remove('sending');
      setTimeout(() => { formNote.textContent = ''; }, 6000);
    }
  });
}

// ── Active nav link on scroll ─────────────────
const sections   = document.querySelectorAll('section[id]');
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

// ── Lightbox modal ────────────────────────────
const lbModal  = document.getElementById('lightbox-modal');
const lbImg    = document.getElementById('lightbox-img');
const lbClose  = document.querySelector('.lightbox-close');

document.querySelectorAll('.view-cert-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    lbImg.src = btn.dataset.img;
    lbModal.style.display = 'flex';
  });
});

lbClose.onclick = () => { lbModal.style.display = 'none'; };
lbModal.onclick = e => { if (e.target === lbModal) lbModal.style.display = 'none'; };

// ── Demo modal ────────────────────────────────
function openDemo(videoPath) {
  const modal  = document.getElementById('demoModal');
  const video  = document.getElementById('demoVideo');
  const source = document.getElementById('videoSource');
  source.src = videoPath;
  video.load();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemo() {
  const modal = document.getElementById('demoModal');
  const video = document.getElementById('demoVideo');
  video.pause();
  video.currentTime = 0;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('click', function(e) {
  const modal = document.getElementById('demoModal');
  if (e.target === modal) closeDemo();
});
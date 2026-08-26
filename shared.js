/* =============================================
   KUSHAL BHANDARI PORTFOLIO — SHARED JS
   ============================================= */

// ===== THEME & SETTINGS =====
let currentZoom = 100;

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('kb_theme', theme);
  document.getElementById('darkBtn').classList.toggle('active', theme === 'dark');
  document.getElementById('lightBtn').classList.toggle('active', theme === 'light');
}

function setColor(color, el) {
  document.documentElement.setAttribute('data-accent', color);
  localStorage.setItem('kb_accent', color);
  document.querySelectorAll('.c-pick').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function changeZoom(delta) {
  currentZoom = Math.min(130, Math.max(80, currentZoom + delta));
  document.documentElement.style.fontSize = (currentZoom / 100) * 16 + 'px';
  document.getElementById('zoomVal').textContent = currentZoom + '%';
  localStorage.setItem('kb_zoom', currentZoom);
}

function openSettings() {
  document.getElementById('settings-panel').classList.add('open');
  document.getElementById('settings-overlay').classList.add('show');
}

function closeSettings() {
  document.getElementById('settings-panel').classList.remove('open');
  document.getElementById('settings-overlay').classList.remove('show');
}

function loadPrefs() {
  const theme = localStorage.getItem('kb_theme') || 'dark';
  const accent = localStorage.getItem('kb_accent') || 'cyan';
  const zoom = parseInt(localStorage.getItem('kb_zoom')) || 100;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-accent', accent);
  currentZoom = zoom;
  document.documentElement.style.fontSize = (zoom / 100) * 16 + 'px';
  if (document.getElementById('darkBtn')) {
    document.getElementById('darkBtn').classList.toggle('active', theme === 'dark');
    document.getElementById('lightBtn').classList.toggle('active', theme === 'light');
    document.getElementById('zoomVal').textContent = zoom + '%';
    const colorBtn = document.querySelector(`.c-pick[data-color="${accent}"]`);
    if (colorBtn) { document.querySelectorAll('.c-pick').forEach(b => b.classList.remove('active')); colorBtn.classList.add('active'); }
  }
}

// ===== CURSOR =====
function initCursor() {
  const dot = document.getElementById('cDot');
  const ring = document.getElementById('cRing');
  if (!dot || !ring) return;
  if (window.matchMedia('(max-width: 900px)').matches) return;
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX - 3.5 + 'px';
    dot.style.top = e.clientY - 3.5 + 'px';
    ring.style.left = e.clientX - 21 + 'px';
    ring.style.top = e.clientY - 21 + 'px';
  });
  document.addEventListener('mousedown', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
  document.addEventListener('mouseup', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
  const attachHoverListeners = () => {
    document.querySelectorAll('a,button,input,textarea,.svc-card,.proj-card,.gallery-item,.gitem,.sk-card,.fun-card,.hob-card,.fam-card,.fam-branch').forEach(el => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = '1';
      el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
    });
  };
  attachHoverListeners();
  new MutationObserver(attachHoverListeners).observe(document.body, { childList: true, subtree: true });
}

// ===== PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);
  const pts = Array.from({length: 50}, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.3 + 0.08,
    c: Math.random() > 0.5 ? '0,245,255' : '123,47,255'
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== LOADER =====
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const box = loader.querySelector('.loader-box');
  const hour = new Date().getHours();
  const greet = hour < 5 ? 'Burning the midnight oil 🌙'
    : hour < 12 ? 'Good Morning ☀️'
    : hour < 17 ? 'Good Afternoon 🌤️'
    : hour < 21 ? 'Good Evening 🌆'
    : 'Good Night 🌙';
  const messages = [
    'Namaste 🙏 from the hills of Gulmi',
    'Warming up the engine 🏍️...',
    'Compiling creativity...',
    'Loading pixels with purpose...',
    'Booting up the portfolio...',
    'Almost there, thanks for waiting...'
  ];

  if (box) {
    box.innerHTML = `
      <div class="loader-mountains" aria-hidden="true">
        <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="mtGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00f5ff"/><stop offset="50%" stop-color="#7b2fff"/><stop offset="100%" stop-color="#ff006e"/>
          </linearGradient></defs>
          <circle cx="150" cy="20" r="10" fill="url(#mtGrad)" opacity="0.5"/>
          <polygon points="0,80 40,25 65,50 95,10 130,55 160,30 200,80" fill="url(#mtGrad)" opacity="0.18"/>
          <polygon points="20,80 55,35 85,60 120,20 155,58 200,80" fill="url(#mtGrad)" opacity="0.35"/>
        </svg>
      </div>
      <div class="loader-photo-wrap">
        <div class="loader-photo-ring2" aria-hidden="true"></div>
        <div class="loader-photo-ring" aria-hidden="true"></div>
        <img src="photos/loader.jpg" alt="Kushal Bhandari with his bike" class="loader-photo">
      </div>
      <div class="loader-greet">${greet}, friend</div>
      <div class="loader-name">Kushal <span class="ln-last">Bhandari</span><span class="loader-dot">.</span></div>
      <div class="loader-slogan-wrap"><span class="loader-slogan">Turning Ideas Into Digital Reality</span></div>
      <div class="loader-bar-wrap"><div class="loader-bar" id="loaderBar"></div></div>
      <div class="loader-pct" id="loaderPct">0%</div>
      <div class="loader-sub" id="loaderSub">${messages[0]}</div>
      <div class="ld"><span></span><span></span><span></span></div>
    `;
  }

  const barEl = document.getElementById('loaderBar');
  const pctEl = document.getElementById('loaderPct');
  const subEl = document.getElementById('loaderSub');
  let pct = 0, mi = 0;

  const pctTimer = setInterval(() => {
    pct = Math.min(96, pct + Math.random() * 9 + 3);
    if (barEl) barEl.style.width = pct + '%';
    if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
  }, 160);

  const msgTimer = setInterval(() => {
    mi = (mi + 1) % messages.length;
    if (subEl) {
      subEl.style.opacity = 0;
      setTimeout(() => { subEl.textContent = messages[mi]; subEl.style.opacity = 1; }, 220);
    }
  }, 950);

  window.addEventListener('load', () => {
    setTimeout(() => {
      clearInterval(pctTimer);
      clearInterval(msgTimer);
      if (barEl) barEl.style.width = '100%';
      if (pctEl) pctEl.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('gone');
        initReveal();
        showWelcomeToast();
      }, 280);
    }, 1400);
  });
}

// ===== WELCOME TOAST =====
function showWelcomeToast() {
  const seen = localStorage.getItem('kb_visited');
  const title = seen ? 'Welcome back! 🙏' : 'Welcome! 👋';
  const sub = seen ? 'Great to see you again — thanks for stopping by.' : 'Thanks for visiting my portfolio. Feel free to look around!';
  localStorage.setItem('kb_visited', '1');

  const toast = document.createElement('div');
  toast.className = 'welcome-toast';
  toast.innerHTML = `<div class="wt-icon">${seen ? '🙏' : '👋'}</div><div class="wt-text"><strong>${title}</strong><span>${sub}</span></div><button class="wt-close" aria-label="Close">&times;</button>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  const remove = () => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 500); };
  toast.querySelector('.wt-close').onclick = remove;
  setTimeout(remove, 5500);
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.id = 'scrollProgress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
  });
}

// ===== QUICK ACTIONS (Back to top + WhatsApp) =====
function initQuickActions() {
  const wrap = document.createElement('div');
  wrap.className = 'quick-actions';
  wrap.innerHTML = `
    <a class="qa-btn qa-whatsapp" href="https://wa.me/9779769309214" target="_blank" rel="noopener" title="Chat on WhatsApp"><i class="fab fa-whatsapp"></i></a>
    <button class="qa-btn qa-top" id="backToTop" title="Back to top"><i class="fas fa-arrow-up"></i></button>
  `;
  document.body.appendChild(wrap);
  window.addEventListener('scroll', () => {
    wrap.classList.toggle('show', window.scrollY > 400);
  });
  document.getElementById('backToTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== LIVE NEPAL CLOCK (Home hero chip) =====
function initNepalClock() {
  const el = document.getElementById('nepalClockVal');
  if (!el) return;
  const tick = () => {
    el.textContent = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());
  };
  tick();
  setInterval(tick, 15000);
}

// ===== NAVBAR =====
function initNav() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (nav) nav.style.boxShadow = window.scrollY > 50 ? '0 4px 30px var(--shadow)' : 'none';
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('navL')?.classList.remove('open');
      document.getElementById('ham')?.classList.remove('active');
    });
  });
}

function toggleNav() {
  document.getElementById('navL')?.classList.toggle('open');
  document.getElementById('ham')?.classList.toggle('active');
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===== SLIDESHOW =====
function initSlideshow() {
  const imgs = document.querySelectorAll('.slideshow-img');
  const nav = document.getElementById('slideNav');
  if (!imgs.length || !nav) return;
  let cur = 0;
  imgs.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'slide-dot' + (i === 0 ? ' on' : '');
    d.onclick = () => go(i);
    nav.appendChild(d);
  });
  function go(n) {
    imgs[cur].classList.remove('active');
    document.querySelectorAll('.slide-dot')[cur]?.classList.remove('on');
    cur = n;
    imgs[cur].classList.add('active');
    document.querySelectorAll('.slide-dot')[cur]?.classList.add('on');
  }
  setInterval(() => go((cur + 1) % imgs.length), 3800);
}

// ===== TYPED TEXT =====
function initTyped(roles) {
  const el = document.getElementById('typedEl');
  if (!el || !roles?.length) return;
  let ri = 0, ci = 0, del = false;
  function tick() {
    const r = roles[ri];
    el.textContent = del ? r.slice(0, --ci) : r.slice(0, ++ci);
    if (!del && ci === r.length) { del = true; setTimeout(tick, 2000); return; }
    if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    setTimeout(tick, del ? 55 : 85);
  }
  tick();
}

// ===== CHATBOT =====
// Knowledge Base
const kbData = {
  skills: "Kushal is skilled in 🎨 Graphic Design (85%), 🌐 Web Dev (80%), 🔐 Cybersecurity (70%), ☕ Java/Android (65%), 🖧 Networking (72%), 🗄️ Database (68%).",
  projects: "📌 Class 9: Holi & Dashain poster designs\n📌 Class 10: Hotel Management Website\n📌 Class 11: Social engineering tools, phishing demo, Calculator & Android app in Java\n📌 Class 12: Network & Software engineering projects (ongoing).",
  contact: "📞 9769309214\n📧 bhandarikushal290@gmail.com\n📧 bhandarikushal291@gmail.com\n📍 Satyawati 6, Gulmi, Nepal",
  education: "📚 Class 8 — GPA 3.60 (2079 BS)\n🏫 SEE — GPA 3.41 (2080 BS)\n💻 Class 12 IT — Ongoing",
  services: "🌐 Web Development · 🎨 Graphic Design · 🔐 Cybersecurity · 📱 Mobile Apps · 🖧 Network Setup · 🗄️ Database Solutions",
  hire: "You can hire Kushal by emailing bhandarikushal290@gmail.com or calling 9769309214."
};

// Reply Logic (Improved regex + cleaner)
function getBotReply(msg) {
  const m = msg.toLowerCase();

  if (/skill|tech|stack|language/.test(m)) return kbData.skills;
  if (/project|built|work|make|did/.test(m)) return kbData.projects;
  if (/contact|email|phone|reach|number/.test(m)) return kbData.contact;
  if (/edu|school|gpa|study|class|degree/.test(m)) return kbData.education;
  if (/service|offer|provide|do you do/.test(m)) return kbData.services;
  if (/hire|freelance|job|available|cost|price/.test(m)) return kbData.hire;

  if (/hi|hello|hey|namaste|sup/.test(m)) {
    return "Namaste 🙏 I'm Kushal's assistant! Kushal is Busy with her Pyaree So Please Contract after few time pls.";
  }

  if (/name|who|kushal/.test(m)) {
    return "I'm the AI assistant for Kushal Bhandari — IT student & developer from Gulmi, Nepal 🇳🇵";
  }

  return "I can help with skills, projects, services, education or contact 😊";
}

// Initialize Chatbot
function initChatbot() {
  const root = document.getElementById('chatbot-root');
  if (!root) return;

  root.innerHTML = `
    <div class="chat-fab-wrap">
      <button class="chat-fab" id="chatFab"><i class="fas fa-robot" id="chatIcon"></i></button>
    </div>

    <div class="chat-window" id="chatWin">
      <div class="chat-hd">
        <div>🤖 Kushal AI</div>
        <button id="chatClose">✖</button>
      </div>

      <div class="chat-msgs" id="chatMsgs">
        <div class="cmsg bot">👋 Hi! Ask me anything about Kushal.</div>
      </div>

      <div class="ctyping" id="cTyping" style="display:none;">Typing...</div>

      <div class="chat-sugg">
        <button class="csugg">Skills</button>
        <button class="csugg">Projects</button>
        <button class="csugg">Services</button>
        <button class="csugg">Contact</button>
      </div>

      <div class="chat-inp-row">
        <input class="chat-inp" id="chatInp" placeholder="Ask something...">
        <button class="chat-send" id="chatSend"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `;

  // Event Listeners (FIXED: no inline JS issues)
  document.getElementById('chatFab').onclick = toggleChat;
  document.getElementById('chatClose').onclick = toggleChat;
  document.getElementById('chatSend').onclick = () => cSend();

  document.getElementById('chatInp').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') cSend();
  });

  document.querySelectorAll('.csugg').forEach(btn => {
    btn.onclick = () => cSend(btn.innerText);
  });
}

// Toggle Chat
function toggleChat() {
  const w = document.getElementById('chatWin');
  const ic = document.getElementById('chatIcon');

  w.classList.toggle('open');

  if (ic) {
    ic.className = w.classList.contains('open')
      ? 'fas fa-times'
      : 'fas fa-robot';
  }
}

// Add Message (FIX: safe check)
function addMsg(txt, type) {
  const box = document.getElementById('chatMsgs');
  if (!box) return;

  const d = document.createElement('div');
  d.className = `cmsg ${type}`;
  d.textContent = txt;

  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}

// Send Message (FIXED)
function cSend(txt) {
  const inp = document.getElementById('chatInp');
  const typing = document.getElementById('cTyping');

  const msg = txt || (inp ? inp.value.trim() : "");
  if (!msg) return;

  addMsg(msg, 'user');
  if (inp) inp.value = '';

  if (typing) typing.style.display = 'block';

  setTimeout(() => {
    if (typing) typing.style.display = 'none';
    addMsg(getBotReply(msg), 'bot');
  }, 600);
}

// IMPORTANT: Auto start
window.addEventListener('DOMContentLoaded', initChatbot);
// ===== FOOTER =====
function initFooter() {
  const f = document.getElementById('footer');
  if (!f) return;
  f.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="flogo">Kushal</div>
        <div class="fslogan">> Turning Ideas into Digital Reality</div>
        <p>IT student & developer from Gulmi, Nepal — passionate about web, security, design and networking.</p>
        <div class="footer-socials" style="margin-top:1.2rem">
          <a href="https://www.facebook.com/kushalbhandari1331" target="_blank" rel="noopener" title="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/kushal_bhandaryy/" target="_blank" rel="noopener" title="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://github.com/bhandarikushal" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/kushal-bhandari-1883263b4" target="_blank" rel="noopener" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="mailto:bhandarikushal290@gmail.com" title="Email"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <a href="index.html">Home</a>
        <a href="about.html">About Me</a>
        <a href="family.html">Family</a>
        <a href="skills.html">Skills</a>
        <a href="projects.html">Projects</a>
        <a href="services.html">Services</a>
        <a href="gallery.html">Gallery</a>
        <a href="quiz.html">Quiz About Me</a>
        <a href="fun.html">Fun Zone</a>
        <a href="cv.html">CV</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <a href="tel:9769309214"><i class="fas fa-phone"></i> 9769309214</a>
        <a href="mailto:bhandarikushal290@gmail.com"><i class="fas fa-envelope"></i> bhandarikushal290@gmail.com</a>
        <a href="#"><i class="fas fa-map-marker-alt"></i> Gulmi, Nepal</a>
        <h4 style="margin-top:1.2rem">Follow Me</h4>
        <a href="https://www.facebook.com/kushalbhandari1331" target="_blank" rel="noopener"><i class="fab fa-facebook-f"></i> Facebook</a>
        <a href="https://www.instagram.com/kushal_bhandaryy/" target="_blank" rel="noopener"><i class="fab fa-instagram"></i> Instagram</a>
        <a href="https://github.com/bhandarikushal" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
        <a href="https://www.linkedin.com/in/kushal-bhandari-1883263b4" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i> LinkedIn</a>
   
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2082 BS · Kushal Bhandari · All rights reserved</div>
      <div class="footer-socials">
        <a href="mailto:bhandarikushal290@gmail.com" title="Email"><i class="fas fa-envelope"></i></a>
        <a href="tel:9769309214" title="Phone"><i class="fas fa-phone"></i></a>
         <a href="https://www.facebook.com/kushalbhandari1331" target="_blank" rel="noopener" style="width:36px;height:36px;border-radius:9px;background:var(--accent1-bg);border:1px solid var(--accent1);color:var(--accent1);display:flex;align-items:center;justify-content:center;font-size:0.9rem;text-decoration:none;transition:all 0.3s" title="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/kushal_bhandaryy/" target="_blank" rel="noopener" style="width:36px;height:36px;border-radius:9px;background:var(--accent1-bg);border:1px solid var(--accent1);color:var(--accent1);display:flex;align-items:center;justify-content:center;font-size:0.9rem;text-decoration:none;transition:all 0.3s" title="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://github.com/bhandarikushal" target="_blank" rel="noopener" style="width:36px;height:36px;border-radius:9px;background:var(--accent1-bg);border:1px solid var(--accent1);color:var(--accent1);display:flex;align-items:center;justify-content:center;font-size:0.9rem;text-decoration:none;transition:all 0.3s" title="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/kushal-bhandari-1883263b4" target="_blank" rel="noopener" style="width:36px;height:36px;border-radius:9px;background:var(--accent1-bg);border:1px solid var(--accent1);color:var(--accent1);display:flex;align-items:center;justify-content:center;font-size:0.9rem;text-decoration:none;transition:all 0.3s" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>

        
        
      </div>
    </div>`;
}

function initMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  const items = [
    { icon: 'fa-solid fa-code', text: 'Web Development' },
    { icon: 'fa-solid fa-mobile-screen-button', text: 'Android Apps' },
    { icon: 'fa-solid fa-desktop', text: 'Desktop Software' },
    { icon: 'fa-solid fa-shield-halved', text: 'Cybersecurity' },
    { icon: 'fa-solid fa-palette', text: 'Graphic Design' },
    { icon: 'fa-solid fa-network-wired', text: 'Networking' },
    { icon: 'fa-solid fa-database', text: 'Database Solutions' },
    { icon: 'fa-solid fa-rocket', text: 'Class 12 · IT Stream' },
    { icon: 'fa-solid fa-star', text: 'Building the School Management System' },
  ];
  const renderSet = () => items.map(it =>
    `<span class="marquee-item"><i class="${it.icon}"></i> <em>${it.text}</em></span><span class="marquee-dot">✦</span>`
  ).join('');
  // duplicate content so the loop is seamless
  track.innerHTML = renderSet() + renderSet();
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  loadPrefs();
  initLoader();
  initNav();
  initCursor();
  initParticles();
  initChatbot();
  initFooter();
  initMarquee();
  initScrollProgress();
  initQuickActions();
  initNepalClock();
  if (window.KBAuth) window.KBAuth.initAuthNav();
});

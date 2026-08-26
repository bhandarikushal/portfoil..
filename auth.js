/* =========================================================
   KB AUTH — lightweight client-side backend
   Stores users in localStorage, hashes passwords with SHA-256
   (Web Crypto API), manages a session, and drives the navbar
   user-chip + the "Welcome" celebration screen.
   ========================================================= */
(function () {
  const USERS_KEY = 'kb_users';
  const SESSION_KEY = 'kb_session';

  async function sha256(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveUsers(list) { localStorage.setItem(USERS_KEY, JSON.stringify(list)); }

  function setSession(email) { localStorage.setItem(SESSION_KEY, email); }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }
  function getSession() {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async function signup(name, email, password) {
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists. Try logging in instead.' };
    }
    const passHash = await sha256(password);
    const user = { name: name.trim(), email: email.trim(), passHash, joined: new Date().toISOString() };
    users.push(user);
    saveUsers(users);
    setSession(user.email);
    return { ok: true, user };
  }

  async function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) return { ok: false, error: 'No account found with that email. Please sign up first.' };
    const passHash = await sha256(password);
    if (passHash !== user.passHash) return { ok: false, error: 'Incorrect password. Please try again.' };
    setSession(user.email);
    return { ok: true, user };
  }

  function logout() { clearSession(); location.href = 'index.html'; }

  function initials(name) {
    return name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  function initAuthNav() {
    const slot = document.querySelector('.nav-auth');
    if (!slot) return;
    const user = getSession();
    if (!user) return; // default Login/Sign Up buttons already in the HTML

    slot.innerHTML = `
      <div class="user-chip" id="userChip">
        <span class="user-chip-avatar">${initials(user.name)}</span>
        <span class="user-chip-name">${user.name.split(' ')[0]}</span>
        <i class="fas fa-chevron-down user-chip-caret"></i>
        <div class="user-chip-menu" id="userChipMenu">
          <div class="ucm-head">
            <span class="user-chip-avatar big">${initials(user.name)}</span>
            <div><div class="ucm-name">${user.name}</div><div class="ucm-email">${user.email}</div></div>
          </div>
          <a href="index.html" class="ucm-item"><i class="fas fa-house"></i> Home</a>
          <a href="contact.html" class="ucm-item"><i class="fas fa-envelope"></i> Contact Me</a>
          <button class="ucm-item ucm-logout" id="ucmLogout"><i class="fas fa-right-from-bracket"></i> Logout</button>
        </div>
      </div>`;

    const chip = document.getElementById('userChip');
    const menu = document.getElementById('userChipMenu');
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
    document.getElementById('ucmLogout').addEventListener('click', (e) => { e.stopPropagation(); logout(); });

    // Personalize hero badge on homepage, if present
    const badge = document.querySelector('.badge-pill');
    if (badge && document.body.contains(badge)) {
      badge.innerHTML = `<span class="dot"></span> Welcome back, ${user.name.split(' ')[0]}!`;
      badge.classList.add('badge-welcome');
    }
  }

  function launchWelcomeCelebration(user, redirectTo) {
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    overlay.innerHTML = `
      <div class="welcome-burst" id="welcomeBurst"></div>
      <div class="welcome-card">
        <div class="welcome-avatar">${initials(user.name)}</div>
        <div class="welcome-eyebrow">// Authenticated</div>
        <h2 class="welcome-heading">Welcome, <em>${user.name.split(' ')[0]}</em>!</h2>
        <p class="welcome-sub">You're in. Taking you to the site now.</p>
        <div class="welcome-progress"><div class="welcome-progress-bar" id="welcomeBar"></div></div>
        <a href="${redirectTo}" class="welcome-continue">Continue now <i class="fas fa-arrow-right"></i></a>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));

    // confetti particles
    const burst = overlay.querySelector('#welcomeBurst');
    const colors = ['var(--accent1)', 'var(--accent2)', 'var(--accent3)', '#ffd166', '#ffffff'];
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('span');
      p.className = 'confetti-piece';
      const angle = Math.random() * 360;
      const dist = 120 + Math.random() * 260;
      p.style.setProperty('--angle', angle + 'deg');
      p.style.setProperty('--dist', dist + 'px');
      p.style.setProperty('--delay', (Math.random() * 0.4) + 's');
      p.style.setProperty('--dur', (1.1 + Math.random() * 0.9) + 's');
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
      burst.appendChild(p);
    }

    setTimeout(() => { location.href = redirectTo; }, 2600);
  }

  window.KBAuth = { signup, login, logout, getSession, initAuthNav, launchWelcomeCelebration };
})();

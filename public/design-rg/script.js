(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const form = document.querySelector('.subscribe-form');
  const status = document.querySelector('.form-status');

  root.classList.add('js');

  const readLang = () => {
    try { return localStorage.getItem('tp-lang'); } catch { return null; }
  };
  const saveLang = (lang) => {
    try { localStorage.setItem('tp-lang', lang); } catch { /* file:// privacy modes */ }
  };

  const applyLang = (lang) => {
    const next = lang === 'en' ? 'en' : 'zh';
    root.dataset.lang = next;
    root.lang = next === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('.i18n').forEach((node) => {
      const value = node.dataset[next];
      if (value) node.textContent = value;
    });
    document.querySelectorAll('[data-placeholder-zh]').forEach((node) => {
      node.placeholder = next === 'zh' ? node.dataset.placeholderZh : node.dataset.placeholderEn;
    });
    document.querySelectorAll('[data-aria-zh]').forEach((node) => {
      node.setAttribute('aria-label', next === 'zh' ? node.dataset.ariaZh : node.dataset.ariaEn);
    });
    document.querySelectorAll('.lang-btn').forEach((button) => {
      const active = button.dataset.setLang === next;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.title = next === 'zh' ? 'Tennis Partner · 网球搭子' : 'Tennis Partner · More Than Tennis';
    saveLang(next);
    if (typeof window.__tpRenderCourts === 'function') window.__tpRenderCourts();
  };

  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.addEventListener('click', () => applyLang(button.dataset.setLang));
  });
  applyLang(readLang() || 'zh');

  const closeMenu = () => {
    document.body.classList.remove('nav-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (document.body.classList.contains('nav-open') && !header.contains(event.target)) closeMenu();
  });

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 18);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((node) => observer.observe(node));
  } else {
    reveals.forEach((node) => node.classList.add('is-visible'));
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const zh = root.dataset.lang === 'zh';
      if (!input.value || !input.checkValidity()) {
        status.textContent = zh ? '请输入有效的邮箱地址。' : 'Please enter a valid email address.';
        status.hidden = false;
        input.focus();
        return;
      }
      status.textContent = zh ? '已订阅，下一封红土笔记见。' : 'Subscribed. See you in the next clay letter.';
      status.hidden = false;
      form.reset();
    });
  }
})();

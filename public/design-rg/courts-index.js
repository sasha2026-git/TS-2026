(() => {
  const root = document.documentElement;
  const grid = document.getElementById('city-grid');
  if (!grid) return;

  const STR = {
    zh: { courts: '片场地', venues: '个球场群', districts: '个区', free: '免费开放', paid: '收费 / 预约', pieces: (n) => `${n} 片`, map: '球场地图' },
    en: { courts: 'courts', venues: 'venues', districts: 'districts', free: 'Public / free', paid: 'Bookable / fee', pieces: (n) => `${n} courts`, map: 'Court map' },
  };
  const lang = () => (root.dataset.lang === 'en' ? 'en' : 'zh');
  const t = () => STR[lang()];
  const nameOf = (c) => (lang() === 'zh' ? c.n : c.ne) || c.n || c.ne || '—';
  const districtOf = (c) => (lang() === 'zh' ? c.d : c.de);

  const applyStatic = () => {
    document.querySelectorAll('.i18n').forEach((node) => {
      const v = node.dataset[lang()];
      if (v) node.textContent = v;
    });
    root.dataset.lang = lang();
    root.lang = lang() === 'zh' ? 'zh-CN' : 'en';
  };

  document.querySelectorAll('.lang-btn').forEach((b) => {
    b.addEventListener('click', () => {
      const next = b.dataset.setLang;
      root.dataset.lang = next;
      document.querySelectorAll('.lang-btn').forEach((x) => {
        const on = x.dataset.setLang === next;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-pressed', String(on));
      });
      applyStatic();
      try { localStorage.setItem('tp-lang', next); } catch (e) {}
      render();
    });
  });

  let data = null;

  const buildCity = (city, payload) => {
    const card = document.createElement('article');
    card.className = 'city-card';
    const districts = new Set(payload.clusters.map(districtOf).filter(Boolean));
    card.innerHTML =
      `<header><h2>${payload.label[lang()] || payload.label.zh}</h2>` +
      `<span class="city-meta">${payload.count} ${t().courts} · ${districts.size} ${t().districts}</span></header>` +
      `<div class="city-map" id="map-${city}"></div>` +
      `<div class="city-foot">${[...districts].slice(0, 6).map((d) => `<span class="tagline">${d}</span>`).join('')}</div>`;
    grid.appendChild(card);

    const map = L.map(`map-${city}`, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    payload.clusters.forEach((c) => {
      const access = c.a === 'free' ? t().free : (c.a === 'paid' ? t().paid : '');
      const r = 4.5 + Math.min(9, Math.sqrt(c.c) * 1.0);
      L.circleMarker([c.lat, c.lon], {
        radius: r,
        color: '#B4491F',
        weight: 1.2,
        fillColor: 'rgba(180,73,31,.5)',
        fillOpacity: 1,
      }).bindPopup(
        `<strong>${nameOf(c)}</strong><span class="popup-meta">${[districtOf(c), t().pieces(c.c), access].filter(Boolean).join(' · ')}</span>`
      ).addTo(map);
    });
    const bounds = payload.clusters.map((c) => [c.lat, c.lon]);
    if (bounds.length) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 12 });
  };

  const render = () => {
    if (!data) return;
    grid.innerHTML = '';
    ['shenzhen', 'newyork'].forEach((city) => {
      const payload = data[city];
      if (payload && payload.clusters && payload.clusters.length) buildCity(city, payload);
    });
  };

  fetch('data/courts.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http ' + r.status))))
    .then((json) => { data = json; render(); })
    .catch(() => {
      grid.innerHTML = '<p style="padding:24px 0;color:#3C4A44">球场数据加载失败，请刷新重试。</p>';
    });

  let saved = null;
  try { saved = localStorage.getItem('tp-lang'); } catch (e) {}
  if (saved === 'en') {
    root.dataset.lang = 'en';
    document.querySelectorAll('.lang-btn').forEach((x) => {
      const on = x.dataset.setLang === 'en';
      x.classList.toggle('is-active', on);
      x.setAttribute('aria-pressed', String(on));
    });
  }
  applyStatic();
})();

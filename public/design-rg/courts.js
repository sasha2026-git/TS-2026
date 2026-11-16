(() => {
  const root = document.documentElement;
  const mapEl = document.getElementById('court-map');
  if (!mapEl) return;

  const cityEl = document.getElementById('court-city');
  const statEl = document.getElementById('court-stat');
  const chipsEl = document.getElementById('district-chips');
  const listEl = document.getElementById('court-list');

  const CITY_BY_LANG = { zh: 'shenzhen', en: 'newyork' };
  const STR = {
    zh: {
      courts: (n) => `${n} 片场地`,
      clusters: (n) => `${n} 个球场群`,
      districts: (n) => `${n} 个区`,
      all: '全部',
      free: '免费开放',
      paid: '收费 / 预约',
      pieces: (n) => `${n} 片`,
      empty: '该区暂时没有收录的球场。',
      loading: '正在加载球场数据…',
      failed: '球场数据加载失败，请刷新重试。',
      mapLabel: (c) => `${c}网球场地图`,
    },
    en: {
      courts: (n) => `${n} courts`,
      clusters: (n) => `${n} venues`,
      districts: (n) => `${n} districts`,
      all: 'All',
      free: 'Public / free',
      paid: 'Bookable / fee',
      pieces: (n) => `${n} courts`,
      empty: 'No courts recorded in this district yet.',
      loading: 'Loading court data…',
      failed: 'Court data failed to load. Please refresh.',
      mapLabel: (c) => `${c} tennis court map`,
    },
  };

  let map = null;
  let data = null;
  let markers = [];
  let activeDistrict = null;
  let lang = () => (root.dataset.lang === 'en' ? 'en' : 'zh');

  const t = () => STR[lang()];
  const nameOf = (c) => (lang() === 'zh' ? c.n : c.ne) || c.n || c.ne || '—';
  const districtOf = (c) => (lang() === 'zh' ? c.d : c.de);

  const initMap = (city, payload) => {
    if (!window.L) return;
    if (!map) {
      map = L.map(mapEl, {
        center: payload.center || [22.55, 114.05],
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      map.on('click', () => map.scrollWheelZoom.enable());
      map.on('mouseout', () => map.scrollWheelZoom.disable());
    }
    mapEl.classList.remove('is-loading');
    mapEl.setAttribute('aria-label', t().mapLabel(payload.label[lang()] || payload.label.zh));
    const bounds = payload.clusters.map((c) => [c.lat, c.lon]);
    if (bounds.length) map.fitBounds(bounds, { padding: [36, 36], maxZoom: 12 });
  };

  const drawMarkers = (clusters) => {
    markers.forEach((m) => map.removeLayer(m));
    markers = [];
    clusters.forEach((c) => {
      const muted = activeDistrict && districtOf(c) !== activeDistrict;
      const r = 5 + Math.min(11, Math.sqrt(c.c) * 1.25);
      const marker = L.circleMarker([c.lat, c.lon], {
        radius: r,
        color: muted ? 'rgba(20,32,27,.18)' : '#B4491F',
        weight: 1.2,
        fillColor: muted ? 'rgba(20,32,27,.14)' : 'rgba(180,73,31,.5)',
        fillOpacity: 1,
      });
      const access = c.a === 'free' ? t().free : (c.a === 'paid' ? t().paid : '');
      marker.bindPopup(
        `<strong>${nameOf(c)}</strong>` +
        `<span class="popup-meta">${[districtOf(c), t().pieces(c.c), access].filter(Boolean).join(' · ')}</span>`
      );
      marker.addTo(map);
      markers.push(marker);
    });
  };

  const renderChips = (clusters) => {
    if (!chipsEl) return;
    const counts = new Map();
    clusters.forEach((c) => {
      const key = districtOf(c);
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    chipsEl.innerHTML = '';
    const mk = (label, count, isActive, onClick) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (isActive ? ' is-active' : '');
      b.innerHTML = `${label}<span class="chip-count">${count}</span>`;
      b.addEventListener('click', onClick);
      return b;
    };
    chipsEl.appendChild(mk(t().all, clusters.length, !activeDistrict, () => {
      activeDistrict = null;
      renderChips(clusters);
      renderList(clusters);
      drawMarkers(clusters);
    }));
    [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .forEach(([name, n]) => {
        chipsEl.appendChild(mk(name, n, activeDistrict === name, () => {
          activeDistrict = activeDistrict === name ? null : name;
          renderChips(clusters);
          renderList(clusters);
          drawMarkers(clusters);
        }));
      });
  };

  const renderList = (clusters) => {
    if (!listEl) return;
    const rows = clusters
      .filter((c) => !activeDistrict || districtOf(c) === activeDistrict)
      .sort((a, b) => (b.c - a.c) || (a.a === 'free' ? -1 : 1) - (b.a === 'free' ? -1 : 1))
      .slice(0, 7);
    listEl.innerHTML = '';
    if (!rows.length) {
      const li = document.createElement('li');
      li.className = 'court-empty';
      li.textContent = t().empty;
      listEl.appendChild(li);
      return;
    }
    rows.forEach((c) => {
      const li = document.createElement('li');
      const access = c.a === 'free' ? t().free : (c.a === 'paid' ? t().paid : '');
      li.innerHTML =
        `<div><span class="court-name">${nameOf(c)}</span>` +
        `<span class="court-sub">${[districtOf(c), t().pieces(c.c), c.s ? c.s.toUpperCase() : ''].filter(Boolean).join(' · ')}</span></div>` +
        (access ? `<span class="court-tag">${access}</span>` : '');
      li.addEventListener('click', () => {
        map.setView([c.lat, c.lon], 15, { animate: true });
        markers.forEach((m) => {
          const ll = m.getLatLng();
          if (Math.abs(ll.lat - c.lat) < 1e-4 && Math.abs(ll.lng - c.lon) < 1e-4) m.openPopup();
        });
      });
      listEl.appendChild(li);
    });
  };

  const render = () => {
    if (!data) return;
    const city = CITY_BY_LANG[lang()] || 'shenzhen';
    const payload = data[city];
    if (!payload || !payload.clusters || !payload.clusters.length) {
      mapEl.classList.remove('is-loading');
      if (statEl) statEl.textContent = t().failed;
      return;
    }
    activeDistrict = null;
    initMap(city, payload);
    if (cityEl) cityEl.textContent = payload.label[lang()] || payload.label.zh;
    if (statEl) {
      const districts = new Set(payload.clusters.map(districtOf).filter(Boolean));
      statEl.textContent = `${t().courts(payload.count)} · ${t().districts(districts.size)}`;
    }
    renderChips(payload.clusters);
    renderList(payload.clusters);
    drawMarkers(payload.clusters);
  };

  if (statEl) statEl.textContent = t().loading;

  fetch('data/courts.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http ' + r.status))))
    .then((json) => {
      data = json;
      render();
      window.__tpRenderCourts = render;
    })
    .catch(() => {
      mapEl.classList.remove('is-loading');
      if (statEl) statEl.textContent = t().failed;
      if (listEl) listEl.innerHTML = `<li class="court-empty">${t().failed}</li>`;
    });
})();

  // Sticky Header
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.15 });
  reveals.forEach(el => obs.observe(el));

  // Number Counters
  const counters = document.querySelectorAll('.plan-profit');
  let counted = false;
  const cObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      counters.forEach(c => {
        const target = +c.getAttribute('data-target');
        const start = performance.now();
        function update(now) {
          const p = Math.min((now - start) / 1800, 1);
          const ease = 1 - Math.pow(2, -10 * p);
          c.textContent = '₹' + Math.floor(ease * target).toLocaleString('en-IN');
          if (p < 1) requestAnimationFrame(update);
          else c.textContent = '₹' + target.toLocaleString('en-IN');
        }
        requestAnimationFrame(update);
      });
    }
  }, { threshold: 0.4 });
  if (counters.length) cObs.observe(document.querySelector('.plans-grid'));

  // Button Ripple
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = this.getBoundingClientRect();
      const s = Math.max(r.width, r.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = s + 'px';
      ripple.style.left = (e.clientX - r.left - s / 2) + 'px';
      ripple.style.top = (e.clientY - r.top - s / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Particles
  const pc = document.getElementById('particles');
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 12 + 's';
    p.style.animationDuration = (8 + Math.random() * 8) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    pc.appendChild(p);
  }

  // ===== LIVE CRYPTO PRICES =====
  async function fetchPrices() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=inr&include_24hr_change=true');
      const data = await res.json();

      // BTC
      document.getElementById('btc-price').textContent = '₹' + Math.round(data.bitcoin.inr).toLocaleString('en-IN');
      const btcChange = data.bitcoin.inr_24h_change;
      const btcEl = document.getElementById('btc-change');
      btcEl.textContent = (btcChange >= 0 ? '▲ +' : '▼ ') + btcChange.toFixed(2) + '%';
      btcEl.className = 'price-change ' + (btcChange >= 0 ? 'up' : 'down');

      // ETH
      document.getElementById('eth-price').textContent = '₹' + Math.round(data.ethereum.inr).toLocaleString('en-IN');
      const ethChange = data.ethereum.inr_24h_change;
      const ethEl = document.getElementById('eth-change');
      ethEl.textContent = (ethChange >= 0 ? '▲ +' : '▼ ') + ethChange.toFixed(2) + '%';
      ethEl.className = 'price-change ' + (ethChange >= 0 ? 'up' : 'down');

      // SOL
      document.getElementById('sol-price').textContent = '₹' + Math.round(data.solana.inr).toLocaleString('en-IN');
      const solChange = data.solana.inr_24h_change;
      const solEl = document.getElementById('sol-change');
      solEl.textContent = (solChange >= 0 ? '▲ +' : '▼ ') + solChange.toFixed(2) + '%';
      solEl.className = 'price-change ' + (solChange >= 0 ? 'up' : 'down');

      // BNB
      document.getElementById('bnb-price').textContent = '₹' + Math.round(data.binancecoin.inr).toLocaleString('en-IN');
      const bnbChange = data.binancecoin.inr_24h_change;
      const bnbEl = document.getElementById('bnb-change');
      bnbEl.textContent = (bnbChange >= 0 ? '▲ +' : '▼ ') + bnbChange.toFixed(2) + '%';
      bnbEl.className = 'price-change ' + (bnbChange >= 0 ? 'up' : 'down');

    } catch (err) {
      console.log('Price fetch error:', err);
    }
  }

  // First load + every 30 seconds
  fetchPrices();
  setInterval(fetchPrices, 30000);

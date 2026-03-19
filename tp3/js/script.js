// Hamburger menu
var hbg = document.getElementById('hbg');
var navUl = document.getElementById('nav-ul');
if (hbg && navUl) {
  hbg.addEventListener('click', function() { navUl.classList.toggle('open'); });
  document.addEventListener('click', function(e) {
    if (!hbg.contains(e.target) && !navUl.contains(e.target)) navUl.classList.remove('open');
  });
}

// Compteurs animés
function runCounter(el) {
  var target = parseInt(el.dataset.target);
  var suffix = el.dataset.suffix || '';
  var cur = 0; var step = target / 60;
  var timer = setInterval(function() {
    cur += step;
    if (cur >= target) { el.textContent = target + suffix; clearInterval(timer); }
    else el.textContent = Math.floor(cur) + suffix;
  }, 25);
}
var statsObs = new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('[data-target]').forEach(runCounter);
    statsObs.disconnect();
  }
}, { threshold: 0.5 });
var statsEl = document.querySelector('.stats');
if (statsEl) statsObs.observe(statsEl);

// Scroll reveal
var revObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.card, blockquote, figure, details, .info-item, .valeur, .gal-item').forEach(function(el, i) {
  el.style.opacity = '0'; el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity .5s ease ' + (i * 0.06) + 's, transform .5s ease ' + (i * 0.06) + 's';
  revObs.observe(el);
});

// Validation formulaire contact
var form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    document.querySelector('.form-alert') && document.querySelector('.form-alert').remove();
    var nom = form.querySelector('#nom').value.trim();
    var email = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();
    var rgpd = form.querySelector('#rgpd');
    if (!nom || !email || !message) { showAlert('Veuillez remplir tous les champs obligatoires.', 'error'); return; }
    if (rgpd && !rgpd.checked) { showAlert('Veuillez accepter la politique de confidentialité.', 'error'); return; }
    showAlert('Message envoyé avec succès ! Nous vous répondrons sous 24 heures.', 'success');
    form.reset();
  });
}
function showAlert(msg, type) {
  var div = document.createElement('div'); div.className = 'form-alert';
  div.textContent = msg;
  div.style.cssText = 'padding:13px 16px; border-radius:5px; font-weight:600; font-size:.88rem; margin-bottom:18px; background:' + (type === 'success' ? '#d1ead8; color:#1a5c29' : '#fde8e8; color:#8b1a1a');
  form.prepend(div); setTimeout(function() { div.remove(); }, 6000);
}

// Lightbox galerie
document.querySelectorAll('.gal-item').forEach(function(item) {
  item.addEventListener('click', function() {
    var img = item.querySelector('img');
    var label = item.querySelector('.gal-label') ? item.querySelector('.gal-label').textContent : '';
    var lb = document.createElement('div');
    lb.style.cssText = 'position:fixed;inset:0;background:rgba(17,19,24,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;cursor:pointer;padding:40px;gap:14px;';
    if (img) { var bi = document.createElement('img'); bi.src = img.src; bi.style.cssText = 'max-width:800px;max-height:70vh;object-fit:contain;border-radius:8px;'; lb.appendChild(bi); }
    var lbl = document.createElement('p'); lbl.textContent = label; lbl.style.cssText = 'color:rgba(255,255,255,.7);font-size:.88rem;font-weight:600;'; lb.appendChild(lbl);
    lb.addEventListener('click', function() { lb.remove(); });
    document.body.appendChild(lb);
  });
});

// Filtres galerie
document.querySelectorAll('.f-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.f-btn').forEach(function(b) { b.classList.remove('active'); });
    this.classList.add('active');
  });
});

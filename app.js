document.addEventListener('DOMContentLoaded', function () {
  if (window.AOS) {
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });
  }

  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var lastY = window.scrollY || 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY || 0;
      var down = y > lastY;
      var beyond = y > 20;
      navbar.classList.toggle('nav-hidden', down && beyond);
      lastY = y;
    }, { passive: true });
  }

  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  var lbImg = document.createElement('img');
  lightbox.appendChild(lbImg);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) { lightbox.classList.remove('open'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { lightbox.classList.remove('open'); }
  });
  document.body.appendChild(lightbox);

  document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
    var track = gallery.querySelector('.gallery-track');
    var prev = gallery.querySelector('.gallery-btn.prev');
    var next = gallery.querySelector('.gallery-btn.next');
    if (!track || !prev || !next) return;

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      gallery.classList.toggle('show-prev', track.scrollLeft > 8);
      gallery.classList.toggle('show-next', track.scrollLeft < max - 8);
    }

    function scrollBy(dir) { track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' }); }

    prev.addEventListener('click', function () { scrollBy(-1); });
    next.addEventListener('click', function () { scrollBy(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    track.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.src; lbImg.alt = img.alt || ''; lightbox.classList.add('open');
      });
      if (img.complete) { update(); } else { img.addEventListener('load', update); }
    });
    update();
  });
});


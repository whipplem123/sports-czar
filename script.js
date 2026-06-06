document.documentElement.classList.add('js-loaded');

// Nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Star field
const starContainer = document.querySelector('.hero-stars');
if (starContainer) {
  const count = 55;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.classList.add('hero-star');
    star.textContent = '★';
    star.style.cssText = [
      `left: ${(Math.random() * 96 + 2).toFixed(1)}%`,
      `top: ${(Math.random() * 96 + 2).toFixed(1)}%`,
      `font-size: ${(Math.random() * 1.6 + 0.5).toFixed(2)}rem`,
      `--delay: ${(Math.random() * 4).toFixed(2)}s`,
      `--dur: ${(Math.random() * 2 + 2.5).toFixed(2)}s`,
    ].join('; ');
    starContainer.appendChild(star);
  }
}

// Fade-in policy cards and category headers on scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.policy-card, .category-header').forEach((el) => {
  fadeObserver.observe(el);
});

// Side nav
const sideNav = document.getElementById('side-nav');
const platformHeader = document.getElementById('platform');
const moreComing = document.querySelector('.more-coming');

if (sideNav && platformHeader) {
  const sideLinks = Array.from(sideNav.querySelectorAll('.side-nav-link'));
  const sectionIds = sideLinks.map(l => l.dataset.section);
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function updateSideNav() {
    const platformTop = platformHeader.getBoundingClientRect().top;
    const moreComingBottom = moreComing ? moreComing.getBoundingClientRect().bottom : window.innerHeight;

    // Show when we've scrolled past the platform header and haven't passed the end
    sideNav.classList.toggle('visible', platformTop < 0 && moreComingBottom > 80);

    // Highlight the deepest section whose top is above the middle of the viewport
    const mid = window.innerHeight * 0.4;
    let active = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= mid) active = section.id;
    }
    sideLinks.forEach(l => l.classList.toggle('active', l.dataset.section === active));
  }

  window.addEventListener('scroll', updateSideNav, { passive: true });
  updateSideNav();
}

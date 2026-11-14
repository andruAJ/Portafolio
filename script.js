document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.game-box').forEach(card => {
    const section = card.querySelector('section');
    const title = section && section.querySelector('.titulo-juego');
    const media = section && section.querySelector('.imagenes-juegos');
    if (!section || !title || !media) return;

    const mediaItems = Array.from(media.querySelectorAll('img, video'));
    const slides = document.createElement('div');
    slides.className = 'imagenesArte';
    mediaItems.forEach(item => slides.appendChild(item));
    media.classList.add('carousel-container', 'game-media-carousel');
    media.replaceChildren(slides);

    if (mediaItems.length > 1) {
      const previous = document.createElement('button');
      previous.className = 'carousel-button prev';
      previous.type = 'button';
      previous.setAttribute('aria-label', 'Previous media');
      previous.textContent = '❮';

      const next = document.createElement('button');
      next.className = 'carousel-button next';
      next.type = 'button';
      next.setAttribute('aria-label', 'Next media');
      next.textContent = '❯';

      media.append(previous, next);
    }

    const content = document.createElement('div');
    const copy = document.createElement('div');
    content.className = 'project-card-content';
    copy.className = 'project-card-copy';

    Array.from(section.children).forEach(child => {
      if (child === title || child === media) return;
      copy.appendChild(child);
    });

    content.append(media, copy);
    section.classList.add('project-card');
    section.append(title, content);
  });

  document.querySelectorAll('.carousel, .VRVideos, .Eros').forEach(card => {
    const title = card.querySelector('.project-card-title');
    const media = card.querySelector('.carousel-container');
    const text = card.querySelector('.texto');
    if (title && media && text) card.append(title, media, text);
  });

  document.querySelectorAll('.carousel, .game-media-carousel').forEach(carousel => {
    const container = carousel.classList.contains('game-media-carousel')
      ? carousel
      : carousel.querySelector('.carousel-container');
    const slides = carousel.querySelector('.imagenesArte');
    const items = slides ? Array.from(slides.querySelectorAll('img, video')) : [];
    const next = carousel.querySelector('.next');
    const previous = carousel.querySelector('.prev');
    if (!container || !slides || items.length === 0 || !next || !previous) return;

    next.removeAttribute('onclick');
    previous.removeAttribute('onclick');

    let currentIndex = 0;
    const updateCarousel = () => {
      const itemWidth = container.clientWidth;
      slides.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    };

    next.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    });
    previous.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    });
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  try {
    if (window.feather && typeof feather.replace === 'function') feather.replace();
  } catch (e) {
    console.warn('Feather icons not initialized:', e);
  }

  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length === 0) return;

  skillBars.forEach(bar => {
    let track = bar.closest('.skill-track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'skill-track';
      bar.parentNode.insertBefore(track, bar);
      track.appendChild(bar);
    }
  });

  skillBars.forEach(bar => {
    const percent = bar.getAttribute('data-percent') || '0';
    bar.style.setProperty('--target-width', percent + '%');
    bar.style.width = '0';
  });

  requestAnimationFrame(() => {
    setTimeout(() => {
      skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent') || '0';
        bar.style.width = percent + '%';
      });
    }, 80);
  });
});


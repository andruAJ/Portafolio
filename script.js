document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.carousel').forEach((carousel) => {
  let currentIndex = 0;

  const imagesContainer = carousel.querySelector('.imagenesArte');
  const images = imagesContainer.querySelectorAll('img');
  const totalImages = images.length;

  const updateCarousel = () => {
    const offset = -currentIndex * 640;
    imagesContainer.style.transform = `translateX(${offset}px)`;
  };

  carousel.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  });

  carousel.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
  });
});

document.querySelectorAll('.game-box').forEach(card => {
  card.addEventListener('click', () => {
    const panel = document.getElementById('panel-juego');
    const carouselDinamico = panel.querySelector('.carousel-dinamico');
    const imagenesArte = carouselDinamico.querySelector('.imagenesArteCarouselDin');
    const texto = panel.querySelector('.texto-dinamico');

    if (!imagenesArte) {
      console.error('imagenesArteCarouselDin not found');
      return;
    }

    imagenesArte.innerHTML = '';
    texto.innerHTML = '';

    const imagenesContainer = card.querySelector('.imagenes-juegos');
    const textos = card.querySelector('[class^="texto-"]');
    const titulo = card.querySelector('.titulo-juego');
    const tituloDinamico = panel.querySelector('.titulo-dinamico');

    if (titulo && tituloDinamico) {
      tituloDinamico.innerHTML = titulo.innerHTML;
    }

    let items = [];
    if (imagenesContainer) {
      imagenesArte.innerHTML = '';
      imagenesContainer.childNodes.forEach(node => {
        if (node.nodeType === 1) {
          const clone = node.cloneNode(true);
          
          if (clone.tagName && (clone.tagName.toLowerCase() === 'img' || clone.tagName.toLowerCase() === 'video')) {
            clone.style.height = '100%';
            clone.style.display = 'block';
            clone.style.objectFit = 'cover';
            clone.style.maxWidth = 'none';
          }
          const wrapper = document.createElement('div');
          wrapper.className = 'slide-item';
          wrapper.style.flexShrink = '0';
          wrapper.style.height = '100%';
          wrapper.appendChild(clone);
          imagenesArte.appendChild(wrapper);
          items.push(wrapper);
        }
      });
      imagenesArte.style.display = 'flex';
      imagenesArte.style.transition = 'transform 0.5s ease-in-out';
      imagenesArte.style.overflow = 'hidden';
    }

    if (textos) {
      texto.innerHTML = textos.innerHTML;
    }

    
    panel.style.display = 'flex';

    
    const nextBtn = carouselDinamico.querySelector('.next');
    const prevBtn = carouselDinamico.querySelector('.prev');

    
    const defaultWidth = 640;
    const carouselHeight = carouselDinamico.clientHeight || 480;
    let itemWidth = defaultWidth;

    let viewportWidth = carouselDinamico.clientWidth || 640;
    let totalWidth = 0;
    let maxIndex = 0; 

    function applyWidths(width) {
      itemWidth = Math.max(120, Math.round(width));
      items.forEach(i => i.style.width = itemWidth + 'px');
      totalWidth = items.length * itemWidth;
      imagenesArte.style.width = totalWidth + 'px';
      viewportWidth = carouselDinamico.clientWidth || viewportWidth;
      maxIndex = Math.max(0, Math.ceil((totalWidth - viewportWidth) / itemWidth));
      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex || 0));
      imagenesArte.style.transform = `translateX(${ -currentIndex * itemWidth }px)`;
    }

    function getImageSize(src, cb) {
      const img = new Image();
      img.onload = function() { cb(img.naturalWidth, img.naturalHeight); };
      img.onerror = function() { cb(null, null); };
      img.src = src;
    }

    const firstOriginal = imagenesContainer ? imagenesContainer.querySelector('img, video') : null;
    if (firstOriginal) {
      if (firstOriginal.tagName.toLowerCase() === 'img') {
        const src = firstOriginal.getAttribute('src');
        getImageSize(src, (w, h) => {
          if (w && h) {
            const ratio = w / h;
            const computed = Math.min(defaultWidth, Math.max(120, Math.round(carouselHeight * ratio)));
            applyWidths(computed);
          } else applyWidths(defaultWidth);
        });
      } else if (firstOriginal.tagName.toLowerCase() === 'video') {
        const wAttr = parseInt(firstOriginal.getAttribute('width')) || firstOriginal.videoWidth;
        const hAttr = parseInt(firstOriginal.getAttribute('height')) || firstOriginal.videoHeight;
        if (wAttr && hAttr) {
          const ratio = wAttr / hAttr;
          const computed = Math.min(defaultWidth, Math.max(120, Math.round(carouselHeight * ratio)));
          applyWidths(computed);
        } else {
          firstOriginal.addEventListener('loadedmetadata', function() {
            const vw = firstOriginal.videoWidth || defaultWidth;
            const vh = firstOriginal.videoHeight || Math.round(defaultWidth * 9 / 16);
            const ratio = vw / vh;
            const computed = Math.min(defaultWidth, Math.max(120, Math.round(carouselHeight * ratio)));
            applyWidths(computed);
          });
          applyWidths(defaultWidth);
        }
      } else {
        applyWidths(defaultWidth);
      }
    } else {
      applyWidths(defaultWidth);
    }

    // Carousel logic for .carousel-dinamico
    let currentIndex = 0;
    function updateCarouselDinamico() {
      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
      const offset = -currentIndex * itemWidth;
      imagenesArte.style.transform = `translateX(${offset}px)`;
    }
    updateCarouselDinamico();

    // Next/Prev button logic
    if (nextBtn && prevBtn && items.length > 0) {
      nextBtn.style.position = 'absolute';
      nextBtn.style.right = '10px';
      nextBtn.style.top = '50%';
      nextBtn.style.transform = 'translateY(-50%)';
      prevBtn.style.position = 'absolute';
      prevBtn.style.left = '10px';
      prevBtn.style.top = '50%';
      prevBtn.style.transform = 'translateY(-50%)';
      nextBtn.style.zIndex = '2';
      prevBtn.style.zIndex = '2';
      nextBtn.onclick = function() {
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarouselDinamico();
      };
      prevBtn.onclick = function() {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = maxIndex;
        }
        updateCarouselDinamico();
      };
    }
  });
});
});
function cerrarPanel() {
  document.getElementById('panel-juego').style.display = 'none';
}

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


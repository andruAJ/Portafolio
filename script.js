document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.carousel').forEach((carousel) => {
  let currentIndex = 0;

  const imagesContainer = carousel.querySelector('.imagenesArte');
  const images = imagesContainer.querySelectorAll('img');
  const totalImages = images.length;

  const updateCarousel = () => {
    const offset = -currentIndex * 400; // Ajusta 400 a tu ancho real de imagen
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

    // Check for null imagenesArte
    if (!imagenesArte) {
      console.error('imagenesArteCarouselDin not found');
      return;
    }

    // Vacía contenido anterior
    imagenesArte.innerHTML = '';
    texto.innerHTML = '';

    // Busca el div de imágenes y texto dentro del game-box
    const imagenesContainer = card.querySelector('.imagenes-juegos');
    const textos = card.querySelector('[class^="texto-"]');

    // Clona las imágenes y videos en .imagenesArteCarouselDin
    let items = [];
    if (imagenesContainer) {
      imagenesArte.innerHTML = '';
      imagenesContainer.childNodes.forEach(node => {
        if (node.nodeType === 1) {
          const clone = node.cloneNode(true);
          clone.style.width = '400px';
          clone.style.flexShrink = '0';
          imagenesArte.appendChild(clone);
          items.push(clone);
        }
      });
      imagenesArte.style.display = 'flex';
      imagenesArte.style.transition = 'transform 0.5s ease-in-out';
      imagenesArte.style.overflow = 'hidden';
      imagenesArte.style.width = (items.length * 400) + 'px';
    }

    // Clona el texto
    if (textos) {
      texto.innerHTML = textos.innerHTML;
    }

    // Carousel logic for .carousel-dinamico
    let currentIndex = 0;
    const itemWidth = 400; // Ajusta si tus imágenes tienen otro ancho
    function updateCarouselDinamico() {
      const offset = -currentIndex * itemWidth;
      imagenesArte.style.transform = `translateX(${offset}px)`;
    }
    updateCarouselDinamico();

    // Next/Prev button logic
    const nextBtn = carouselDinamico.querySelector('.next');
    const prevBtn = carouselDinamico.querySelector('.prev');
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
        currentIndex = (currentIndex + 1) % items.length;
        updateCarouselDinamico();
      };
      prevBtn.onclick = function() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarouselDinamico();
      };
    }

    // Muestra el panel
    panel.style.display = 'flex';
  });
});
});
function cerrarPanel() {
  document.getElementById('panel-juego').style.display = 'none';
}

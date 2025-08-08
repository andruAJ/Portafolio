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
    console.log('Card clicked:', card);
    const panel = document.getElementById('panel-juego');
    const carousel = panel.querySelector('.carousel-dinamico');
    const texto = panel.querySelector('.texto-dinamico');

    // Vacía contenido anterior
    carousel.innerHTML = '';
    texto.innerHTML = '';

    // Busca el div de imágenes y texto dentro del game-box
    const imagenes = card.querySelector('.imagenes-juegos');
    const textos = card.querySelector('[class^="texto-"]');

    // Clona las imágenes y videos
    if (imagenes) {
      imagenes.childNodes.forEach(node => {
        if (node.nodeType === 1) {
          carousel.appendChild(node.cloneNode(true));
        }
      });
    }

    // Clona el texto
    if (textos) {
      texto.innerHTML = textos.innerHTML;
    }

    // Muestra el panel
    panel.style.display = 'flex'; // o 'block', según tu diseño
  });
});

function cerrarPanel() {
  document.getElementById('panel-juego').style.display = 'none';
}
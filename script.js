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
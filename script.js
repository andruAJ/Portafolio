let currentIndex = 0;
    //const images = document.querySelector('.imagenesArte');
    //const totalImages = document.querySelectorAll('.imagenesArte img').length;

    function updateCarousel() {
      const offset = -currentIndex * 400; // 400px es el ancho de una imagen
      images.style.transform = `translateX(${offset}px)`;
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % totalImages; // Cicla al inicio si llega al final
      updateCarousel();
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Cicla al final si retrocede desde el inicio
      updateCarousel();
    }
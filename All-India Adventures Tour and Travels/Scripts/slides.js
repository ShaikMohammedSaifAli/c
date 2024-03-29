window.addEventListener('DOMContentLoaded', function() {
  var currentImageIndex = 0;
  var images = document.querySelectorAll('#image-carousel img', '#image-carousel1 img');
  var totalImages = images.length;

  function showNextImage() {
      images[currentImageIndex].style.display = 'none'; 
      currentImageIndex = (currentImageIndex + 1) % totalImages; 
      images[currentImageIndex].style.display = 'block'; 
  }

  for (var i = 1; i < totalImages; i++) {
      images[i].style.display = 'none';
  }

  setInterval(showNextImage, 1500);
});
document.querySelectorAll('a[href^="india.html"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.navbar').classList.toggle('active');
});
document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.navbar').classList.toggle('active');
});

fetch('data.json')
  .then(response => response.json())
  .then(data => {

      console.log(data);
  })
  .catch(error => {

      console.error('Error fetching data:', error);
  });
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slides");
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
      slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 1500); 
}
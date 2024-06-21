document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.querySelector('.cursor');
    const circle = document.querySelector('.circle');
  
    document.addEventListener("mousemove", function(e) {
      const mouseX = e.pageX;
      const mouseY = e.pageY;
  
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
  
      circle.style.left = mouseX - circle.offsetWidth / 2 + 'px';
      circle.style.top = mouseY - circle.offsetHeight / 2 + 'px';
    });
  });
  
import lottie from 'lottie-web';

// Initialize Lottie animation
const customCursor = lottie.loadAnimation({
  container: document.getElementById('custom-cursor'), // Target cursor div
  renderer: 'svg', // Render as SVG
  loop: true, // Continuous animation
  autoplay: true,
  path: '/assets/custom-cursor.json', // Path to animation.json in the public folder
});

// Update cursor position on mousemove
document.addEventListener('mousemove', (event) => {
  const cursor = document.getElementById('custom-cursor');
  const cursorWidth = cursor.offsetWidth / 2;
  const cursorHeight = cursor.offsetHeight / 2;
  cursor.style.transform = `translate(${event.clientX - cursorWidth}px, ${event.clientY - cursorHeight}px)`;
});

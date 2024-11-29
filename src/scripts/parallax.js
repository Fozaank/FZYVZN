import Lenis from '@studio-freight/lenis';

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(1 - t, 3)),
  smoothWheel: true,
  smoothTouch: true,
});

// Function to update the animation frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Select the elements for parallax effect
const video = document.querySelector('.video-bg');
const text = document.querySelector('.parallax-text');
const iframe = document.querySelector('iframe');

// Function to handle parallax effect
function handleParallax(scrollPosition) {
  if (video && text) {
    // Adjust multipliers to control parallax intensity
    const videoParallax = scrollPosition * 0.1; // Slow down the video movement
    const textParallax = scrollPosition * 0.3;  // Faster movement for text

    video.style.transform = `translateY(${videoParallax}px)`;
    text.style.transform = `translateY(${textParallax}px)`;
  }
}

// Add scroll listener to trigger parallax effect
lenis.on('scroll', (e) => {
  handleParallax(e.scroll.y);
});

// Ensure the custom cursor interacts correctly with the iframe
if (iframe) {
  iframe.style.pointerEvents = 'none';  // Disable pointer events for iframe
}

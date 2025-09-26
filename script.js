import Experience from './src/Experience/Experience.js'

import { slides } from './slides.js';

const experience = new Experience(document.querySelector('canvas.webgl'))


let currentSlide = 0; // start at first slide
const slideBlock = document.querySelector('.slide-block');

function showSlide(index) {
    const slide = slides[index];
    if (!slide) return;

    // Fade out
    slideBlock.classList.remove('show');

    // Wait for fade out duration before updating content
    setTimeout(() => {
        // Apply style class based on slide type
        if (slide.style === 'main-title') {
            slideBlock.className = 'slide-block main-title';
            slideBlock.innerHTML = `
                <h1 class="main-title">${slide.title || ''}</h1>
                ${slide.subtitle ? `<p class="subtitle">${slide.subtitle}</p>` : ''}
                ${slide.text ? `<p class="slide-text">${slide.text}</p>` : ''}
                ${slide.img ? `<img src="${slide.img}" class="main-image" />` : ''}
            `;
        } else {
            slideBlock.className = 'slide-block slide';
            slideBlock.innerHTML = `
                ${slide.title ? `<h2 class="slide-title">${slide.title}</h2>` : ''}
                ${slide.text ? `<p class="slide-text">${slide.text}</p>` : ''}
                ${slide.img ? `<img src="${slide.img}" class="main-image" />` : ''}
            `;
        }

        // Fade in
        slideBlock.classList.add('show');
    }, 200); // slightly shorter than CSS transition for smoothness
}

// Initialize first slide
slideBlock.classList.add('show');
showSlide(currentSlide);


// Arrow key navigation
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") {
        currentSlide = Math.min(currentSlide + 1, slides.length - 1);
        showSlide(currentSlide);
    } else if (e.key === "ArrowLeft") {
        currentSlide = Math.max(currentSlide - 1, 0);
        showSlide(currentSlide);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slides img');
    const totalSlides = slides.length;
    const slideInterval = 3000; // 3 seconds

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        const offset = -currentSlide * 100;
        document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

        // Reset the animation to slide the images again
        slides.forEach(slide => {
            slide.style.animation = 'none';
            slide.offsetHeight; /* trigger reflow */
            slide.style.animation = null;
        });
    }

    function moveSlides(n) {
        showSlide(currentSlide + n);
    }

    document.querySelector('.prev').addEventListener('click', () => {
        moveSlides(-1);
    });

    document.querySelector('.next').addEventListener('click', () => {
        moveSlides(1);
    });

    // Automatic slideshow
    let slideTimer = setInterval(() => {
        moveSlides(1);
    }, slideInterval);

    // Pause slideshow on hover
    document.querySelector('.slider').addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });

    // Resume slideshow on mouse leave
    document.querySelector('.slider').addEventListener('mouseleave', () => {
        slideTimer = setInterval(() => {
            moveSlides(1);
        }, slideInterval);
    });

    // Start slideshow
    showSlide(currentSlide);

    // Moving headlines banner animation
    const headlinesContainer = document.querySelector('.headline-container');
    const headlines = document.querySelectorAll('.headline');
    const totalWidth = headlinesContainer.offsetWidth;

    let headlineWidth = 0;
    headlines.forEach(headline => {
        headlineWidth += headline.offsetWidth;
    });

    const duration = (headlineWidth / totalWidth) * 30; // Adjusted duration based on the headline width

    headlinesContainer.style.animation = `slide ${duration}s linear infinite`;
});

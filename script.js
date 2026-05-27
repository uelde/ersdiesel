/**
 * ERS Diesel - Interações e animações premium
 */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');

    function updateHeader() {
        if (!header) return;
        header.classList.toggle('header-scrolled', window.scrollY > 40);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: '0px 0px -70px 0px'
    });

    document.querySelectorAll('.hidden').forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
        observer.observe(element);
    });

    function debounce(func, timeout = 180) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), timeout);
        };
    }

    const carouselTrack = document.querySelector('.carousel-images-track');
    const descriptionItems = document.querySelectorAll('.carousel-description-item');
    const prevButton = document.querySelector('.carousel-navigation .prev');
    const nextButton = document.querySelector('.carousel-navigation .next');
    const images = document.querySelectorAll('.carousel-images-track img');
    const dotsContainer = document.querySelector('.carousel-dots');
    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselTrack && descriptionItems.length && prevButton && nextButton && images.length) {
        let currentIndex = 0;
        let autoplayTimer = null;
        let touchStartX = 0;
        let touchEndX = 0;
        const totalImages = images.length;
        const autoplayDelay = 5200;

        if (dotsContainer) {
            images.forEach((image, index) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot';
                dot.type = 'button';
                dot.setAttribute('aria-label', `Ver produto ${index + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    restartAutoplay();
                });
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
        const getImageWidth = () => images[0].clientWidth || carouselTrack.clientWidth;

        function updateCarousel() {
            const imageWidth = getImageWidth();
            carouselTrack.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

            images.forEach((image, index) => {
                image.classList.toggle('is-active', index === currentIndex);
            });

            descriptionItems.forEach(item => item.classList.remove('active'));
            const activeProduct = images[currentIndex].dataset.product;
            const currentDescription = document.querySelector(`.carousel-description-item[data-product="${activeProduct}"]`);

            if (currentDescription) {
                currentDescription.classList.add('active');
            }

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
                dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
            });
        }

        function goToSlide(index) {
            currentIndex = (index + totalImages) % totalImages;
            updateCarousel();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(nextSlide, autoplayDelay);
        }

        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
        }

        function restartAutoplay() {
            startAutoplay();
        }

        prevButton.addEventListener('click', () => {
            prevSlide();
            restartAutoplay();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            restartAutoplay();
        });

        carouselContainer?.addEventListener('mouseenter', stopAutoplay);
        carouselContainer?.addEventListener('mouseleave', startAutoplay);

        carouselContainer?.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        carouselContainer?.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].screenX;
            const distance = touchStartX - touchEndX;

            if (Math.abs(distance) > 50) {
                distance > 0 ? nextSlide() : prevSlide();
            }

            startAutoplay();
        }, { passive: true });

        window.addEventListener('resize', debounce(updateCarousel));

        updateCarousel();
        startAutoplay();
    }

    const counters = document.querySelectorAll('.fact-item h3');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            const match = element.textContent.match(/\+?(\d+)/);
            if (!match || element.dataset.animated === 'true') return;

            const target = Number(match[1]);
            const prefix = element.textContent.includes('+') ? '+' : '';
            const suffix = element.textContent.replace(/\+?\d+/, '');
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 42));

            element.dataset.animated = 'true';
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = `${prefix}${current}${suffix}`;
            }, 28);
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => counterObserver.observe(counter));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

            const menuMobile = document.getElementById('menu-mobile');
            const overlayMenu = document.getElementById('overlay-menu');
            if (menuMobile?.classList.contains('open-menu')) {
                menuMobile.classList.remove('open-menu');
                if (overlayMenu) overlayMenu.style.display = 'none';
            }
        });
    });
});

// ========================
// Update Footer Year
// ========================
(function() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
})();

// ========================
// Animated Skill Progress Bars
// ========================

// Function to animate progress bars when they become visible
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const percent = entry.target.getAttribute('data-percent');
                entry.target.style.width = percent + '%';
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });
    
    progressFills.forEach(fill => {
        observer.observe(fill);
    });
}

// Initialize progress bar animations on page load
document.addEventListener('DOMContentLoaded', animateProgressBars);

// ========================
// Contact Form Validation & localStorage
// ========================

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate form inputs
function validateFormInputs(name, email, message) {
    const errors = {};
    
    // Validate name
    if (!name || name.trim() === '') {
        errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Validate email
    if (!email || email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Validate message
    if (!message || message.trim() === '') {
        errors.message = 'Message is required';
    } else if (message.trim().length < 5) {
        errors.message = 'Message must be at least 5 characters';
    }
    
    return errors;
}

// Function to display error messages
function displayErrorMessages(errors) {
    // Clear all previous error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    // Display new error messages
    Object.keys(errors).forEach(fieldName => {
        const errorElement = document.getElementById(fieldName + 'Error');
        if (errorElement) {
            errorElement.textContent = errors[fieldName];
            errorElement.style.display = 'block';
        }
    });
}

// Function to clear error messages
function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate inputs
            const errors = validateFormInputs(name, email, message);
            
            if (Object.keys(errors).length > 0) {
                // Show error messages
                displayErrorMessages(errors);
            } else {
                // Clear error messages
                clearErrorMessages();
                
                // Store form data in localStorage
                const formData = {
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim(),
                    timestamp: new Date().toLocaleString()
                };
                
                localStorage.setItem('contactFormData', JSON.stringify(formData));
                
                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
                
                // Reset form
                contactForm.reset();
                
                // Redirect to form-details page after 1.5 seconds
                setTimeout(function() {
                    window.location.href = 'form-details.html';
                }, 1500);
            }
        });
    }
});

// ========================
// Make Project Cards Clickable (no <a> tag)
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');

    function navigateTo(url) {
        if (!url || url === '#') {
            // No valid URL configured; provide gentle feedback
            // You can customize this to open a modal or show a toast
            console.warn('No live URL configured for this project.');
            return;
        }
        // Use window.location.href to navigate (same-tab)
        window.location.href = url;
    }

    projectItems.forEach(item => {
        const liveUrl = item.getAttribute('data-live');

        // Add accessible focus and keyboard support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // If focus is on an interactive child (like the source link), let it handle the event
                if (e.target.closest('a') || e.target.closest('button.btn-secondary')) return;
                e.preventDefault();
                navigateTo(liveUrl);
            }
        });

        // Click handler on the entire card
        item.addEventListener('click', function(e) {
            // If the user clicked an actual anchor (source code link), let it behave naturally
            if (e.target.closest('a') && !e.target.closest('button.btn-live')) return;

            // If clicked on a source code anchor, do nothing here
            if (e.target.closest('.btn-secondary')) return;

            // Otherwise navigate to the live URL (if present)
            navigateTo(liveUrl);
        });
    });
});

// ========================
// Dark / Light Theme Toggle
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('themeToggle');
    const storageKey = 'siteTheme'; // 'light' or 'dark'

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            if (toggle) {
                toggle.setAttribute('aria-pressed', 'true');
                toggle.textContent = '☀️';
            }
        } else {
            document.documentElement.classList.remove('light-theme');
            if (toggle) {
                toggle.setAttribute('aria-pressed', 'false');
                toggle.textContent = '🌙';
            }
        }
    }

    // Initialize from localStorage or system preference
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        applyTheme(saved);
    } else {
        // Default: use system preference if available
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(prefersLight ? 'light' : 'dark');
    }

    if (toggle) {
        toggle.addEventListener('click', function() {
            const isLight = document.documentElement.classList.contains('light-theme');
            const newTheme = isLight ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem(storageKey, newTheme);
        });
    }
});

// ========================
// Canvas Demo (simple animated bouncing ball)
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('demoCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    let ball = {
        x: w / 2,
        y: h / 4,
        vx: 3.2,
        vy: 2.6,
        r: 18
    };

    let animId = null;
    let running = true;

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // background gradient
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, 'rgba(102,126,234,0.06)');
        g.addColorStop(1, 'rgba(118,75,162,0.06)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        // draw ball shadow
        ctx.beginPath();
        ctx.ellipse(ball.x, ball.y + ball.r + 6, ball.r * 0.9, ball.r * 0.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.fill();

        // draw ball
        ctx.beginPath();
        const grad = ctx.createRadialGradient(ball.x - 6, ball.y - 6, 6, ball.x, ball.y, ball.r);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.4, '#667eea');
        grad.addColorStop(1, '#764ba2');
        ctx.fillStyle = grad;
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();

        // draw label
        ctx.font = '14px Segoe UI, Tahoma, sans-serif';
        ctx.fillStyle = '#e0e0e0';
        ctx.fillText('Bouncing Ball', 12, h - 12);
    }

    function step() {
        // physics
        ball.x += ball.vx;
        ball.y += ball.vy;

        // gravity
        ball.vy += 0.12;

        // collisions
        if (ball.x + ball.r > w) {
            ball.x = w - ball.r;
            ball.vx *= -0.86;
        } else if (ball.x - ball.r < 0) {
            ball.x = ball.r;
            ball.vx *= -0.86;
        }

        if (ball.y + ball.r > h) {
            ball.y = h - ball.r;
            ball.vy *= -0.78;
        } else if (ball.y - ball.r < 0) {
            ball.y = ball.r;
            ball.vy *= -0.9;
        }

        draw();
        if (running) animId = requestAnimationFrame(step);
    }

    // start animation
    step();

    // toggle on canvas click
    canvas.addEventListener('click', function() {
        running = !running;
        if (running) step(); else cancelAnimationFrame(animId);
    });
});

// ========================
// Image Slider (CSS + JS)
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.image-slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const indicators = Array.from(slider.querySelectorAll('.indicator'));

    let current = 0;
    const total = slides.length;
    let autoplayId = null;
    const autoplayDelay = 4000; // 4s

    function update() {
        const offset = -current * 100;
        track.style.transform = `translateX(${offset}%)`;
        indicators.forEach((btn, i) => btn.classList.toggle('active', i === current));
    }

    function goTo(index) {
        current = (index + total) % total;
        update();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // Wire up buttons
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); resetAutoplay(); });

    // Indicators
    indicators.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute('data-index'), 10) || 0;
            goTo(idx);
            resetAutoplay();
        });
    });

    // Keyboard support
    slider.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
        if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
    });

    // Autoplay
    function startAutoplay() {
        if (autoplayId) return;
        autoplayId = setInterval(next, autoplayDelay);
    }
    function stopAutoplay() {
        if (!autoplayId) return;
        clearInterval(autoplayId);
        autoplayId = null;
    }
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pause on hover/focus
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    // Initialize
    update();
    startAutoplay();
});

// Back-to-top button: show on scroll and smooth-scroll to top when clicked
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;

    // Show when scrolled down a bit
    const showOn = 300;

    function onScroll() {
        if (window.scrollY > showOn) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    }

    // Initial check
    onScroll();

    // Use passive listener for performance
    window.addEventListener('scroll', onScroll, { passive: true });

    // Smooth scroll to top
    backBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // For keyboard accessibility, move focus to top
        document.documentElement.focus();
    });

    // Keyboard: Enter/Space should trigger
    backBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            backBtn.click();
        }
    });
});

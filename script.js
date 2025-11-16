// ==========================================================================
// POLARIS AI STUDIO - WEBSITE INTERACTIVITY
// ==========================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================================
    // NAVBAR SCROLL EFFECT
    // ==========================================================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // ==========================================================================
    // MOBILE MENU TOGGLE
    // ==========================================================================

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // ROI CALCULATOR
    // ==========================================================================

    const calculateBtn = document.getElementById('calculate-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateROI);

        // Also calculate on input change
        const inputs = ['hours-inquiries', 'hours-data', 'hours-email', 'hours-admin', 'hourly-cost'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', calculateROI);
            }
        });
    }

    function calculateROI() {
        // Get input values
        const hoursInquiries = parseFloat(document.getElementById('hours-inquiries').value) || 0;
        const hoursData = parseFloat(document.getElementById('hours-data').value) || 0;
        const hoursEmail = parseFloat(document.getElementById('hours-email').value) || 0;
        const hoursAdmin = parseFloat(document.getElementById('hours-admin').value) || 0;
        const hourlyCost = parseFloat(document.getElementById('hourly-cost').value) || 0;

        // Calculate totals
        const totalHours = hoursInquiries + hoursData + hoursEmail + hoursAdmin;
        const automatedHours = Math.round(totalHours * 0.7); // 70% automation rate
        const automationPercentage = totalHours > 0 ? Math.round((automatedHours / totalHours) * 100) : 0;

        // Calculate savings
        const weeklySavings = automatedHours * hourlyCost;
        const monthlySavings = weeklySavings * 4.33; // Average weeks per month
        const annualSavings = monthlySavings * 12;

        // Calculate net savings (accounting for automation cost)
        const automationCostLow = 1500;
        const automationCostHigh = 2500;
        const netSavingsLow = monthlySavings - automationCostHigh;
        const netSavingsHigh = monthlySavings - automationCostLow;

        // Update display
        document.getElementById('total-hours').textContent = `${totalHours} hours`;
        document.getElementById('automated-hours').textContent = `~${automatedHours} hours (${automationPercentage}%)`;
        document.getElementById('monthly-savings').textContent = `$${monthlySavings.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
        document.getElementById('annual-savings').textContent = `$${annualSavings.toLocaleString('en-US', {maximumFractionDigits: 0})}`;

        // Update net savings
        if (netSavingsLow < 0 && netSavingsHigh < 0) {
            document.getElementById('net-savings').textContent = 'Break even in 2-3 months';
        } else if (netSavingsLow < 0) {
            document.getElementById('net-savings').textContent = `$0-$${netSavingsHigh.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
        } else {
            document.getElementById('net-savings').textContent = `$${netSavingsLow.toLocaleString('en-US', {maximumFractionDigits: 0})}-$${netSavingsHigh.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
        }

        // Add animation to results
        const resultsSection = document.getElementById('calculator-results');
        if (resultsSection) {
            resultsSection.style.animation = 'none';
            setTimeout(() => {
                resultsSection.style.animation = 'fadeInUp 0.5s ease-out';
            }, 10);
        }
    }

    // Calculate initial values on page load
    if (calculateBtn) {
        calculateROI();
    }

    // ==========================================================================
    // FAQ ACCORDION
    // ==========================================================================

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't already open
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // SCROLL ANIMATIONS
    // ==========================================================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll('.pain-card, .solution-card, .scenario-card, .testimonial-card, .pricing-card, .founder-card');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ==========================================================================
    // SCENARIO CTA TRACKING
    // ==========================================================================

    // Track which scenario buttons are clicked (for analytics)
    const scenarioCtas = document.querySelectorAll('.scenario-card .btn');
    scenarioCtas.forEach(cta => {
        cta.addEventListener('click', function(e) {
            const scenarioTitle = this.closest('.scenario-card').querySelector('h3').textContent;
            console.log('Scenario CTA clicked:', scenarioTitle);

            // You can add Google Analytics or other tracking here
            // Example: gtag('event', 'scenario_cta_click', { 'scenario': scenarioTitle });
        });
    });

    // ==========================================================================
    // FORM VALIDATION (if contact form is added)
    // ==========================================================================

    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add form validation logic here if needed
            console.log('Form submitted');
        });
    });

    // ==========================================================================
    // LOADING OPTIMIZATION
    // ==========================================================================

    // Lazy load images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==========================================================================
    // COOKIE CONSENT (optional - can be enabled later)
    // ==========================================================================

    // Uncomment this section if you want to add cookie consent
    /*
    function showCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-content">
                    <p>We use cookies to improve your experience. By using our site, you agree to our use of cookies.</p>
                    <button class="btn btn-primary" onclick="acceptCookies()">Accept</button>
                </div>
            `;
            document.body.appendChild(banner);
        }
    }

    window.acceptCookies = function() {
        localStorage.setItem('cookieConsent', 'true');
        document.querySelector('.cookie-banner').remove();
    };

    showCookieConsent();
    */

    // ==========================================================================
    // ANALYTICS TRACKING (Google Analytics)
    // ==========================================================================

    // Track outbound Calendly links
    const calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');
    calendlyLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Calendly link clicked');
            // Add analytics tracking here
            // Example: gtag('event', 'calendly_click', { 'link': this.href });
        });
    });

    // Track email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email link clicked');
            // Add analytics tracking here
        });
    });

    // ==========================================================================
    // PERFORMANCE MONITORING
    // ==========================================================================

    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log('Page loaded in', loadTime, 'ms');

        // You can send this to analytics
        // Example: gtag('event', 'timing_complete', { 'name': 'load', 'value': loadTime });
    });

    // ==========================================================================
    // UTILITIES
    // ==========================================================================

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==========================================================================
    // KEYBOARD NAVIGATION
    // ==========================================================================

    // Improve accessibility with keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close FAQ items with Escape key
        if (e.key === 'Escape') {
            document.querySelectorAll('.faq-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // ==========================================================================
    // INITIALIZE
    // ==========================================================================

    console.log('Polaris AI Studio website initialized successfully');

    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ==========================================================================
// EXTERNAL CALENDLY INTEGRATION (optional enhancement)
// ==========================================================================

// If you want to embed Calendly inline instead of opening new tab
function initCalendly() {
    if (typeof Calendly !== 'undefined') {
        const calendlyButtons = document.querySelectorAll('[data-calendly]');
        calendlyButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                Calendly.initPopupWidget({
                    url: this.dataset.calendly
                });
            });
        });
    }
}

// Call this if Calendly widget script is loaded
// initCalendly();

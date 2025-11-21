document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('toggle');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .skill-card, .project-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add class for animation when visible
    document.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });

    // Contact Form Submission Logic
    const contactForm = document.getElementById('contactForm');
    const btnWhatsapp = document.getElementById('btnWhatsapp');
    const btnEmail = document.getElementById('btnEmail');

    if (contactForm) {
        // Helper to validate and get values
        const validateAndGetValues = () => {
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return null;
            }
            return {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
        };

        // WhatsApp Submission
        if (btnWhatsapp) {
            btnWhatsapp.addEventListener('click', function () {
                const values = validateAndGetValues();
                if (!values) return;

                const { name, email, message } = values;
                const whatsappNumber = "94767267559";
                const text = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

                window.open(whatsappUrl, '_blank');
            });
        }

        // Email Submission
        if (btnEmail) {
            btnEmail.addEventListener('click', function () {
                const values = validateAndGetValues();
                if (!values) return;

                const { name, email, message } = values;
                const subject = `Portfolio Contact from ${name}`;
                const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                const mailtoUrl = `mailto:gnanarubanthirumal14@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                window.location.href = mailtoUrl;
            });
        }
    }
});

// Add CSS for mobile menu active state dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: var(--card-bg);
            padding: 2rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            animation: slideDown 0.3s ease forwards;
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hamburger.toggle .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .hamburger.toggle .bar:nth-child(2) {
            opacity: 0;
        }
        .hamburger.toggle .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

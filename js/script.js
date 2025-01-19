// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-sphere');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Animate Stats on Scroll
const stats = document.querySelectorAll('.stat-number');
const animationDuration = 2000;
let animated = false;

function animateStats() {
    if (animated) return;

    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / (animationDuration / 16);
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
    
    animated = true;
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

document.querySelector('.hero-stats') && statsObserver.observe(document.querySelector('.hero-stats'));

// Tech Stack Animation
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1) translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Portfolio Hover Effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        const content = item.querySelector('.portfolio-content');
        
        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
        
        // Staggered animation for content elements
        const elements = content.children;
        Array.from(elements).forEach((el, index) => {
            el.style.transition = `all 0.3s ease ${index * 0.1}s`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
});

// Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate button on submit
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
        // Here you would typically handle the form submission
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }, 200);
});

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animation
const fadeElements = document.querySelectorAll('.feature, .tech-item, .portfolio-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    fadeObserver.observe(element);
});

const currentYear = new Date().getFullYear(); // Get the current year
const text = `${currentYear} Bitshift Technolabs. All rights reserved.`; // Construct the text
document.getElementById('copy-rights').textContent = text; // Append the text to the element

// Submit the form
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Initialize EmailJS with your Public Key
    emailjs.init("JLVVCnLPlxyUIZQSq"); // Replace with your EmailJS Public Key

    const templateParams = {
        from_name: document.getElementById("name").value,  // Matches {{from_name}}
        email: document.getElementById("email").value,    // If needed for the template
        service: document.getElementById("service").value, // Matches {{service}}
        details: document.getElementById("details").value // Matches {{details}}
    };
    

    // Send the email
    emailjs
        .send("service_2ntwtie", "template_hewut8u", templateParams)
        .then(
            function (response) {
                alert('Your message has been sent successfully!');
                document.getElementById('contactForm').reset(); // Reset form fields
            },
            function (error) {
                alert('Failed to send message: ' + error.text);
            }
        );
});


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const targetID = this.getAttribute('href');
        const targetElement = document.querySelector(targetID);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

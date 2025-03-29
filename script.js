// Function to create a shooting star
function createShootingStar() {
    const star = document.createElement('div');
    star.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        transform: rotate(-45deg);
        animation: shoot 1s linear;
    `;
    
    document.querySelector('.shooting-stars').appendChild(star);
    
    star.addEventListener('animationend', () => {
        star.remove();
    });
}

// Add keyframes for shooting star animation to the document
const shootingStarKeyframes = `
@keyframes shoot {
    from {
        transform: translateX(0) translateY(0) rotate(-45deg);
        opacity: 1;
    }
    to {
        transform: translateX(200px) translateY(200px) rotate(-45deg);
        opacity: 0;
    }
}`;

const styleSheet = document.createElement("style");
styleSheet.textContent = shootingStarKeyframes;
document.head.appendChild(styleSheet);

// Create shooting stars periodically
setInterval(createShootingStar, 2000);

document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.querySelector('.stars');

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);
    }

    for (let i = 0; i < 100; i++) {
        createStar();
    }
});

// Utility Functions
function toggleClass(element, className) {
    element.classList.toggle(className);
}

function closeMenu(hamburger, nav, dropdowns) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
}

function handleDropdownClick(dropdowns, maxWidth = 768) {
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= maxWidth) {
                e.preventDefault();
                const isExpanded = link.getAttribute('aria-expanded') === 'true';
                dropdowns.forEach(other => {
                    if (other !== dropdown) other.classList.remove('active');
                });
                dropdown.classList.toggle('active');
                link.setAttribute('aria-expanded', !isExpanded);
            }
        });
    });
}

function handleOutsideClick(hamburger, nav, dropdowns) {
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu(hamburger, nav, dropdowns);
        }
    });

        // Prevent closing when clicking inside the nav
        nav.addEventListener('click', (e) => {
            e.stopPropagation();
        });
}

function handleResize(hamburger, nav, dropdowns, toggleBar) {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu(hamburger, nav, dropdowns);
            if (toggleBar) toggleBar.classList.remove('active');
        }
    });
}

// Initialize Navigation Menu
function initializeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const dropdowns = document.querySelectorAll('.services-dropdown, .products-dropdown');
    const toggleBar = document.querySelector('.toggle-bar');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        toggleClass(hamburger, 'active');
        toggleClass(nav, 'active');
    });

    // Handle dropdowns
    handleDropdownClick(dropdowns);

    // Close menu when clicking outside
    handleOutsideClick(hamburger, nav, dropdowns);

    // Handle window resize
    handleResize(hamburger, nav, dropdowns, toggleBar);

    // Toggle bar functionality
    if (toggleBar) {
        toggleBar.addEventListener('click', () => {
            toggleClass(toggleBar, 'active');
            toggleClass(nav, 'active');
        });
    }
}

// Navigation Hover Effect
function initializeNavigationHover() {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-content li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(nav => nav.classList.remove('clicked'));
            link.classList.add('clicked');
        });
    });
}

// Touch Swipe to Close Menu
function initializeTouchSwipe(navMenu) {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) { // Swipe left
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });

    // Prevent scroll only when the menu is active
    navMenu.addEventListener('touchmove', (e) => {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Products Grid Scroll
function initializeProductsGridScroll() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    // Ensure the parent element exists
    const parent = productsGrid.parentElement;
    if (!parent) return;

    // Add scroll arrows
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'scroll-arrows';
    scrollContainer.innerHTML = `
        <div class="scroll-arrow left">←</div>
        <div class="scroll-arrow right">→</div>
    `;
    parent.appendChild(scrollContainer);

    // Scroll controls
    scrollContainer.querySelector('.scroll-arrow.left').addEventListener('click', () => {
        productsGrid.scrollBy({ left: -320, behavior: 'smooth' });
    });

    scrollContainer.querySelector('.scroll-arrow.right').addEventListener('click', () => {
        productsGrid.scrollBy({ left: 320, behavior: 'smooth' });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            productsGrid.scrollBy({ left: -320, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            productsGrid.scrollBy({ left: 320, behavior: 'smooth' });
        }
    });

    // Touch swipe support
    let touchStart = null;
    productsGrid.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
    });

    productsGrid.addEventListener('touchmove', (e) => {
        if (!touchStart) return;
        const touchEnd = e.touches[0].clientX;
        const diff = touchStart - touchEnd;
        productsGrid.scrollLeft += diff;
        touchStart = touchEnd;
    });

    productsGrid.addEventListener('touchend', () => {
        touchStart = null;
    });
}

// Initialize All Features
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    initializeNavigationHover();
    initializeProductsGridScroll();

    const navMenu = document.querySelector('nav');
    if (navMenu) initializeTouchSwipe(navMenu);
});



// carousel Works
const slides = [
    {
        title: "Branding Excellence",
        description: "Transform your business identity with our innovative branding solutions."
    },
    {
        title: "Technology Solutions",
        description: "Leverage cutting-edge technology to drive your business forward."
    },
    {
        title: "Creative Advertising",
        description: "Make your brand stand out with our creative advertising strategies."
    },
    {
        title: "Strategic Marketing",
        description: "Reach your target audience with data-driven marketing approaches."
    }
];

let currentSlide = 0;

function updateSlide() {
    // Update slides
    document.querySelectorAll('.slide').forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    // Update content
    const heroContent = document.getElementById('heroContent');
    heroContent.innerHTML = `
        <h1>${slides[currentSlide].title}</h1>
        <p>${slides[currentSlide].description}</p>
    `;

    // Toggle logo colors
    const logoText = document.querySelector('.logo-text');
    logoText.classList.toggle('color-switch', currentSlide % 2 === 1);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

// Initialize carousel and start automatic rotation
document.addEventListener('DOMContentLoaded', () => {
    updateSlide();
    // Change slides every 3 seconds (3000 milliseconds)
    setInterval(nextSlide, 3000);
});

// Split Section
// Function to show contact form
function showContactForm() {
    // Get the contact form element
    const contactForm = document.querySelector('#contact');
    
    // If the contact form exists
    if (contactForm) {
        // Add a class to show the form (you can add animation classes here)
        contactForm.classList.add('show');
        
        // Smooth scroll to contact section
        contactForm.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Optional: Add animation when section comes into view
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe the split section
    const splitSection = document.querySelector('.split-section');
    if (splitSection) {
        observer.observe(splitSection);
    }
});

// Optional: Add hover effect for feature items
document.querySelectorAll('.feature-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1.2)';
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1)';
    });
});



// Form Submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("bA3AocKdAXRs52VYd"); // Replace with your actual Public Key

    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Change button state to loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        // Prepare the template parameters
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };

        // Send the email using EmailJS
        emailjs.send('service_xqa6wyk', 'template_w6flwof', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span>Send Message</span>
                        <div class="btn-animation">
                            <svg viewBox="0 0 24 24">
                                <path d="M4,12l2,0l12,0l-4-4l1.4-1.4l6.4,6.4l-6.4,6.4l-1.4-1.4l4-4l-12,0l-2,0"></path>
                            </svg>
                        </div>
                    `;
                }, 3000);
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                submitBtn.innerHTML = '<span>Failed to send</span>';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span>Send Message</span>
                        <div class="btn-animation">
                            <svg viewBox="0 0 24 24">
                                <path d="M4,12l2,0l12,0l-4-4l1.4-1.4l6.4,6.4l-6.4,6.4l-1.4-1.4l4-4l-12,0l-2,0"></path>
                            </svg>
                        </div>
                    `;
                }, 3000);
            });
    });
});


// Branding Page

document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const intervalTime = 3000; // Time in milliseconds

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    // Automatically move to the next slide at intervals
    setInterval(moveToNextSlide, intervalTime);

    // Initial update
    updateCarousel();
});

 // why us 
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to items
    const items = document.querySelectorAll('.why-choose-us-item');
    items.forEach(item => {
        item.classList.add('fade-in');
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all items
    items.forEach(item => {
        observer.observe(item);
    });

    // Add hover effect for icons
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.why-choose-us-icon i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = `transform ${getComputedStyle(document.documentElement)
                .getPropertyValue('--transition-speed')} ease`;
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.why-choose-us-icon i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const glitchTitle = document.querySelector('.glitch-title');
    const glitchText = glitchTitle.getAttribute('data-text');

    setInterval(() => {
        glitchTitle.innerHTML = glitchText.split('').map((char, i) => {
            const glitch = Math.random() > 0.9 ? `<span class="glitch">${char}</span>` : char;
            return glitch;
        }).join('');
    }, 2000);
});

// technology Page
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.technology-title');
    const icons = document.querySelectorAll('.tech-icon');
    
    // Add initial animation
    title.style.animation = 'titleAppear 1s ease forwards';
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        icons.forEach(icon => {
            const speed = icon.getAttribute('data-speed') || 2;
            const x = (window.innerWidth - mouseX * speed) / 100;
            const y = (window.innerHeight - mouseY * speed) / 100;
            
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add hover effect for title
    title.addEventListener('mouseenter', () => {
        title.style.transform = 'scale(1.05)';
        title.style.transition = `transform ${getComputedStyle(document.documentElement)
            .getPropertyValue('--transition-speed')} ease`;
    });
    
    title.addEventListener('mouseleave', () => {
        title.style.transform = 'scale(1)';
    });
});

// Intersection Observer for scroll animations
const processSteps = document.querySelectorAll('.process-step');

const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.3
});

processSteps.forEach(step => {
    processObserver.observe(step);
});

// Optional: Add hover effect for process steps
processSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
        const icon = step.querySelector('.process-icon i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });

    step.addEventListener('mouseleave', () => {
        const icon = step.querySelector('.process-icon i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// technology Page why us

// Intersection Observer for scroll animations
const whyUsCards = document.querySelectorAll('.why-us-card');
const statsNumbers = document.querySelectorAll('.stats-number');

const whyUsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // If the card contains a stats number, start the counter
            const statsNumber = entry.target.querySelector('.stats-number');
            if (statsNumber) {
                startCounter(statsNumber);
            }
        }
    });
}, {
    threshold: 0.3
});

whyUsCards.forEach(card => {
    whyUsObserver.observe(card);
});

// Counter animation function
function startCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.round(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Optional: Add hover effect for icons
whyUsCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.why-us-icon i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.why-us-icon i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});
    // tech stack
// Separate function for handling item animation
function animateStackItem(item, delay) {
    setTimeout(() => {
        item.classList.add('show');
    }, delay);
}

// Separate function for filtering items
function filterStackItems(items, category) {
    items.forEach(item => {
        item.classList.remove('show');
        const isMatchingCategory = category === 'all' || item.getAttribute('data-category') === category;
        
        if (isMatchingCategory) {
            item.classList.remove('hide');
            animateStackItem(item, 50);
        } else {
            item.classList.add('hide');
        }
    });
}

// Separate function for button click handling
function handleButtonClick(button, buttons, items) {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.getAttribute('data-category');
    filterStackItems(items, category);
}

// Main initialization function
function initializeStackShowcase() {
    const stackButtons = document.querySelectorAll('.stack-btn');
    const stackItems = document.querySelectorAll('.stack-item');

    // Initial animation
    stackItems.forEach((item, index) => {
        animateStackItem(item, index * 100 + 500);
    });

    // Category filtering
    stackButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button, stackButtons, stackItems);
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        },
        { threshold: 0.2 }
    );

    stackItems.forEach(item => observer.observe(item));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeStackShowcase);

// MArketing Page
document.addEventListener('DOMContentLoaded', () => {
    const dynamicText = document.querySelector('.hero__dynamic-text');
    const items = dynamicText.querySelectorAll('.dynamic-item');
    let currentIndex = 0;

    function showNextItem() {
        items[currentIndex].style.opacity = 0;
        items[currentIndex].style.transform = 'translateY(50px)';
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].style.opacity = 1;
        items[currentIndex].style.transform = 'translateY(0)';
    }

    setInterval(showNextItem, 2000);
});

function handleItemTransition(items, currentIndex, options = {}) {
    const {
        direction = 'Y',
        distance = 50,
        duration = 300
    } = options;

    items[currentIndex].style.opacity = 0;
    items[currentIndex].style.transform = `translate${direction}(${distance}px)`;
    items[currentIndex].style.transition = `${duration}ms`;

    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex].style.opacity = 1;
    items[nextIndex].style.transform = `translate${direction}(0)`;
    items[nextIndex].style.transition = `${duration}ms`;

    return nextIndex;
}
// MArketing Page why us
class MarketingProcessAnimation {
    constructor() {
        this.items = document.querySelectorAll('.marketing-process-item');
        this.observer = this.createObserver();
        this.init();
    }

    createObserver() {
        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, {
            threshold: 0.2
        });
    }

    init() {
        this.items.forEach((item, index) => {
            // Set initial styles
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'all 0.6s ease';
            item.style.transitionDelay = `${index * 0.2}s`;
            
            // Observe item
            this.observer.observe(item);
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Store the instance in a variable
let marketingProcessAnimation;

document.addEventListener('DOMContentLoaded', () => {
    marketingProcessAnimation = new MarketingProcessAnimation();
});

// Cleanup on page unload
window.addEventListener('unload', () => {
    if (marketingProcessAnimation) {
        marketingProcessAnimation.destroy();
    }
});
// Advertising

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Add hover effect for solution cards
    const cards = document.querySelectorAll('.solution-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.querySelector('.stars');
    
    // Function to create a new star
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's, ' + (Math.random() * 2 + 0.5) + 's';
        starsContainer.appendChild(star);
    }

    // Add new stars periodically
    setInterval(createStar, 1000);

    // Create shooting stars
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = '100%';
        shootingStar.style.top = Math.random() * 50 + '%';
        document.querySelector('.stars-container').appendChild(shootingStar);
        
        setTimeout(() => {
            shootingStar.remove();
        }, 3000);
    }

    // Create shooting stars periodically
    setInterval(createShootingStar, 4000);
});


document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    contactForm?.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const submitButton = contactForm.querySelector(".submit-btn");
        const originalButtonText = submitButton.innerHTML;

        // Disable the button and show a loading state
        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        // Send email using EmailJS
        emailjs.sendForm("service_xqa6wyk", "template_w6flwof", contactForm)
            .then(function () {
                // Reset the form
                contactForm.reset();

                // Show success message
                alert("Thank you! Your message has been sent successfully.");

                // Re-enable the button and reset its text
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            })
            .catch(function (error) {
                console.error("Error sending email:", error);

                // Show error message
                alert("Oops! Something went wrong. Please try again.");

                // Re-enable the button and reset its text
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const newsletterForm = document.getElementById("newsletterForm");

    newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission

        const emailInput = document.getElementById("newsletterEmail").value;

        // Validate the email input
        if (!emailInput || !emailInput.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }

        // Disable the button and show a loading state
        const submitButton = newsletterForm.querySelector(".subscribe-btn");
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = "Subscribing...";

        // Send email using EmailJS
        emailjs.send("service_xqa6wyk", "template_q7v58lo", {
            user_email: emailInput, // Match the variable name in your EmailJS template
        }).then(function (response) {
            console.log("Newsletter subscription successful:", response);
            alert("Thank you for subscribing!");

            // Reset the form and button state
            newsletterForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }).catch(function (error) {
            console.error("Error subscribing to newsletter:", error);
            alert("Failed to subscribe. Please try again later.");

            // Re-enable the button and reset its text
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
    });
});
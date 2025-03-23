document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initialize tab functionality
    initTabs();
    
    // Initialize methodology visualizations
    initMethodologyVisualizations();
    
    // Animate elements when they come into view
    initScrollAnimations();
    
    // Initialize particle effects
    initParticles();
});

// Tab functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding panel
            const tabId = btn.getAttribute('data-tab');
            const panel = document.getElementById(`${tabId}-panel`);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
}

// SPIN Methodology Visualization Interaction
function initMethodologyVisualizations() {
    // SPIN Nodes interaction
    const spinNodes = document.querySelectorAll('.spin-node');
    const spinStages = document.querySelectorAll('.spin-stage');
    
    if (spinNodes.length > 0 && spinStages.length > 0) {
        spinNodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                const stage = node.getAttribute('data-stage');
                
                // Highlight corresponding stage
                spinStages.forEach(s => {
                    if (s.getAttribute('data-stage') === stage) {
                        s.style.opacity = '1';
                        s.style.transform = 'translateY(-5px)';
                    } else {
                        s.style.opacity = '0.5';
                        s.style.transform = 'none';
                    }
                });
            });
            
            node.addEventListener('mouseleave', () => {
                // Reset all stages
                spinStages.forEach(s => {
                    s.style.opacity = '';
                    s.style.transform = '';
                });
            });
        });
    }
    
    // Sandler levels interaction
    const sandlerLevels = document.querySelectorAll('.sandler-level');
    const sandlerStages = document.querySelectorAll('.sandler-stage');
    const activeLevel = document.getElementById('activeLevel');
    
    if (sandlerLevels.length > 0 && sandlerStages.length > 0 && activeLevel) {
        sandlerLevels.forEach(level => {
            level.addEventListener('mouseenter', () => {
                const levelName = level.getAttribute('data-level');
                
                // Move active indicator
                if (activeLevel) {
                    activeLevel.setAttribute('x', level.getAttribute('x'));
                    activeLevel.setAttribute('y', level.getAttribute('y'));
                    activeLevel.setAttribute('width', level.getAttribute('width'));
                    activeLevel.setAttribute('height', level.getAttribute('height'));
                }
                
                // Highlight corresponding stage
                sandlerStages.forEach(s => {
                    if (s.getAttribute('data-level') === levelName) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    // Animate meter fill on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });
    
    // Observe elements to animate
    document.querySelectorAll('.meter-fill, .bar-fill, .stat-card, .step, .workflow-node').forEach(el => {
        scrollObserver.observe(el);
    });
}

// Initialize particle effects
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Function to create particles
    function createParticles() {
        const particlesCount = 30;
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 6 + 1;
            
            // Random color from brand colors
            const colors = ['#ff6c00', '#ffb800', '#9215f6'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Apply styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.opacity = opacity;
            
            // Animation
            const animDuration = Math.random() * 15 + 10;
            particle.style.animation = `float ${animDuration}s infinite linear`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
}

// Typing animation for the SMS conversation
function animateTyping() {
    const messages = document.querySelectorAll('.sms-messages .message:not(.typing)');
    const typingIndicator = document.querySelector('.typing-indicator');
    
    if (messages.length === 0 || !typingIndicator) return;
    
    // Hide all messages initially
    messages.forEach(msg => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(10px)';
    });
    
    // Show messages one by one
    let index = 0;
    const showNextMessage = () => {
        if (index < messages.length) {
            const msg = messages[index];
            msg.style.transition = 'opacity 0.3s, transform 0.3s';
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
            
            index++;
            setTimeout(showNextMessage, 1000);
        } else {
            // Show typing indicator at the end
            typingIndicator.style.display = 'flex';
        }
    };
    
    // Start the animation
    setTimeout(showNextMessage, 500);
}

// Call the typing animation when the page loads
window.addEventListener('load', animateTyping);
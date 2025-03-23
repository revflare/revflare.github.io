// ========== DOM Elements ==========
const header = document.querySelector('.header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const graphBars = document.querySelectorAll('.graph-bar');
const form = document.getElementById('beta-signup-form');
const formMessage = document.querySelector('.form-message');

// ========== Helper Functions ==========
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// ========== Header Scroll Effect ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== Mobile Menu Toggle ==========
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
    });
});

// ========== Tabs ==========
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all tab panes
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Show the selected tab pane
        const target = btn.getAttribute('data-target');
        document.getElementById(`${target}-content`).classList.add('active');
    });
});

// ========== Graph Animation ==========
function animateGraphBars() {
    graphBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        const fillElement = bar.querySelector('.bar-fill');
        
        // Set height based on value (percentage)
        setTimeout(() => {
            fillElement.style.height = `${value}%`;
        }, 300);
    });
}

// Initialize graph animation when in viewport
const problemGraphic = document.querySelector('.problem-graphic');
if (problemGraphic) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGraphBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(problemGraphic);
}

// ========== Hero Conversation Demo ==========
function createMessage(text, isOutgoing = false, delay = 0) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isOutgoing ? 'message-outgoing' : 'message-incoming'}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    const now = new Date();
    timeDiv.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    bubbleDiv.appendChild(timeDiv);
    messageDiv.appendChild(bubbleDiv);
    
    setTimeout(() => {
        document.getElementById('conversation-demo').appendChild(messageDiv);
        messageDiv.scrollIntoView({ behavior: 'smooth' });
    }, delay);
    
    return delay + text.length * 20 + randomInt(300, 800);
}

function createTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingDiv.appendChild(dot);
    }
    
    document.getElementById('conversation-demo').appendChild(typingDiv);
    typingDiv.scrollIntoView({ behavior: 'smooth' });
    
    return typingDiv;
}

function removeTypingIndicator(indicator) {
    setTimeout(() => {
        indicator.remove();
    }, randomInt(1000, 2000));
}

// Initialize conversation demo
function initConversationDemo() {
    const demo = document.getElementById('conversation-demo');
    if (!demo) return;
    
    demo.innerHTML = '';
    
    // HVAC scenario
    let delay = 0;
    
    delay = createMessage("Hi there! I'm interested in getting a new AC unit installed before summer.", true, delay);
    
    let typingIndicator = createTypingIndicator();
    
    delay += 1500;
    removeTypingIndicator(typingIndicator);
    
    delay = createMessage("Thanks for reaching out to SmithCool HVAC! I'm Mike from the customer service team. We'd be happy to help with your AC installation. Are you looking for a unit for your home or business?", false, delay);
    
    delay += 2000;
    
    delay = createMessage("It's for my home, about 2000 sq feet. My old unit is making weird noises and not cooling properly.", true, delay);
    
    typingIndicator = createTypingIndicator();
    delay += 1500;
    removeTypingIndicator(typingIndicator);
    
    delay = createMessage("I understand how frustrating that can be, especially with summer approaching. When did you start noticing these issues with your current AC unit?", false, delay);
    
    delay += 2000;
    
    delay = createMessage("About 3 weeks ago. It's an old unit, probably around 12 years old now.", true, delay);
    
    typingIndicator = createTypingIndicator();
    delay += 1500;
    removeTypingIndicator(typingIndicator);
    
    delay = createMessage("12 years is definitely getting up there in AC years. Most units have a lifespan of 10-15 years. Have you had to make any repairs to it in the past year or so?", false, delay);
    
    // Reset the demo after some time
    setTimeout(() => {
        initConversationDemo();
    }, delay + 15000);
}

// Initialize Solutions Section Previews
function initSolutionPreviews() {
    // Speed-to-Lead Preview
    const speedLeadPreview = document.querySelector('.speed-lead-preview');
    if (speedLeadPreview) {
        const smsConversation = document.createElement('div');
        smsConversation.className = 'sms-conversation';
        
        // Create example messages
        const messages = [
            { text: "Hi, I'd like to get a quote for roof repair.", isCustomer: true },
            { text: "Thanks for contacting Premier Roofing! This is Sarah. I'd be happy to help with your roof repair. Could you tell me what issues you're experiencing with your roof?", isCustomer: false },
            { text: "I think I have some shingles missing after the storm last week.", isCustomer: true },
            { text: "I'm sorry to hear about the storm damage. That's definitely something we should address quickly to prevent water damage. When would be a convenient time for one of our specialists to inspect your roof?", isCustomer: false }
        ];
        
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.isCustomer ? 'message-outgoing' : 'message-incoming'}`;
            
            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'message-bubble';
            bubbleDiv.textContent = msg.text;
            
            messageDiv.appendChild(bubbleDiv);
            smsConversation.appendChild(messageDiv);
        });
        
        speedLeadPreview.appendChild(smsConversation);
    }
    
    // Database Reactivation Preview
    const reactivationDashboard = document.querySelector('.reactivation-dashboard');
    if (reactivationDashboard) {
        const dashboardPreview = document.createElement('div');
        dashboardPreview.className = 'dashboard-preview';
        dashboardPreview.innerHTML = `
            <div class="dashboard-header">
                <div class="dashboard-title">Database Reactivation Dashboard</div>
                <div class="dashboard-stats">
                    <div class="dashboard-stat">
                        <div class="stat-label">Dormant Leads</div>
                        <div class="stat-value">1,247</div>
                    </div>
                    <div class="dashboard-stat">
                        <div class="stat-label">Campaigns</div>
                        <div class="stat-value">3</div>
                    </div>
                    <div class="dashboard-stat">
                        <div class="stat-label">Re-engaged</div>
                        <div class="stat-value">328</div>
                    </div>
                </div>
            </div>
            <div class="dashboard-chart">
                <div class="chart-placeholder">
                    <div class="chart-bar" style="height: 30%"></div>
                    <div class="chart-bar" style="height: 45%"></div>
                    <div class="chart-bar" style="height: 60%"></div>
                    <div class="chart-bar" style="height: 75%"></div>
                    <div class="chart-bar" style="height: 85%"></div>
                </div>
                <div class="chart-label">Reactivation Rate by Campaign</div>
            </div>
        `;
        reactivationDashboard.appendChild(dashboardPreview);
    }
}

// ========== Methodology Diagrams ==========
function initMethodologyDiagrams() {
    // SPIN Methodology Diagram
    const spinDiagram = document.getElementById('spin-diagram');
    if (spinDiagram) {
        spinDiagram.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="spinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#ff6c00;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ffb800;stop-opacity:1" />
                    </linearGradient>
                </defs>
                
                <!-- Main Flow Path -->
                <path d="M100,150 C200,50 300,250 400,150 C500,50 600,250 700,150" 
                      fill="none" stroke="url(#spinGradient)" stroke-width="3" 
                      stroke-dasharray="5,5" />
                
                <!-- SPIN Circles -->
                <g class="spin-situation">
                    <circle cx="100" cy="150" r="40" fill="#1a1b24" stroke="url(#spinGradient)" stroke-width="2" />
                    <text x="100" y="150" font-family="Arial" font-size="24" fill="url(#spinGradient)" text-anchor="middle" dominant-baseline="middle">S</text>
                    <text x="100" y="200" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle">Situation</text>
                </g>
                
                <g class="spin-problem">
                    <circle cx="300" cy="150" r="40" fill="#1a1b24" stroke="url(#spinGradient)" stroke-width="2" />
                    <text x="300" y="150" font-family="Arial" font-size="24" fill="url(#spinGradient)" text-anchor="middle" dominant-baseline="middle">P</text>
                    <text x="300" y="200" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle">Problem</text>
                </g>
                
                <g class="spin-implication">
                    <circle cx="500" cy="150" r="40" fill="#1a1b24" stroke="url(#spinGradient)" stroke-width="2" />
                    <text x="500" y="150" font-family="Arial" font-size="24" fill="url(#spinGradient)" text-anchor="middle" dominant-baseline="middle">I</text>
                    <text x="500" y="200" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle">Implication</text>
                </g>
                
                <g class="spin-needpayoff">
                    <circle cx="700" cy="150" r="40" fill="#1a1b24" stroke="url(#spinGradient)" stroke-width="2" />
                    <text x="700" y="150" font-family="Arial" font-size="24" fill="url(#spinGradient)" text-anchor="middle" dominant-baseline="middle">N</text>
                    <text x="700" y="200" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle">Need-Payoff</text>
                </g>
                
                <!-- Flow Arrows -->
                <path d="M150,150 L250,150" fill="none" stroke="url(#spinGradient)" stroke-width="2" />
                <polygon points="245,145 255,150 245,155" fill="url(#spinGradient)" />
                
                <path d="M350,150 L450,150" fill="none" stroke="url(#spinGradient)" stroke-width="2" />
                <polygon points="445,145 455,150 445,155" fill="url(#spinGradient)" />
                
                <path d="M550,150 L650,150" fill="none" stroke="url(#spinGradient)" stroke-width="2" />
                <polygon points="645,145 655,150 645,155" fill="url(#spinGradient)" />
            </svg>
        `;
    }
    
    // Sandler Methodology Diagram
    const sandlerDiagram = document.getElementById('sandler-diagram');
    if (sandlerDiagram) {
        sandlerDiagram.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="sandlerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#9215f6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ff6c00;stop-opacity:1" />
                    </linearGradient>
                </defs>
                
                <!-- Steps Path -->
                <path d="M100,250 L700,250" fill="none" stroke="url(#sandlerGradient)" stroke-width="3" />
                
                <!-- Background Pyramid -->
                <polygon points="400,50 100,250 700,250" fill="rgba(146, 21, 246, 0.1)" stroke="url(#sandlerGradient)" stroke-width="2" />
                
                <!-- Sandler Steps -->
                <g class="sandler-rapport">
                    <rect x="100" y="220" width="100" height="30" fill="#1a1b24" stroke="url(#sandlerGradient)" stroke-width="2" />
                    <text x="150" y="240" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Rapport</text>
                </g>
                
                <g class="sandler-pain">
                    <rect x="200" y="190" width="100" height="30" fill="#1a1b24" stroke="url(#sandlerGradient)" stroke-width="2" />
                    <text x="250" y="210" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Pain</text>
                </g>
                
                <g class="sandler-budget">
                    <rect x="300" y="160" width="100" height="30" fill="#1a1b24" stroke="url(#sandlerGradient)" stroke-width="2" />
                    <text x="350" y="180" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Budget</text>
                </g>
                
                <g class="sandler-decision">
                    <rect x="400" y="130" width="100" height="30" fill="#1a1b24" stroke="url(#sandlerGradient)" stroke-width="2" />
                    <text x="450" y="150" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Decision</text>
                </g>
                
                <g class="sandler-fulfillment">
                    <rect x="500" y="100" width="100" height="30" fill="#1a1b24" stroke="url(#sandlerGradient)" stroke-width="2" />
                    <text x="550" y="120" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Fulfillment</text>
                </g>
                
                <g class="sandler-close">
                    <rect x="600" y="70" width="100" height="30" fill="#1a1b24" stroke="url(#sandlerGradient)" stroke-width="2" />
                    <text x="650" y="90" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">Close</text>
                </g>
                
                <!-- Flow Arrows -->
                <path d="M150,220 L225,190" fill="none" stroke="url(#sandlerGradient)" stroke-width="2" />
                <polygon points="220,185 230,187 225,195" fill="url(#sandlerGradient)" />
                
                <path d="M250,190 L325,160" fill="none" stroke="url(#sandlerGradient)" stroke-width="2" />
                <polygon points="320,155 330,157 325,165" fill="url(#sandlerGradient)" />
                
                <path d="M350,160 L425,130" fill="none" stroke="url(#sandlerGradient)" stroke-width="2" />
                <polygon points="420,125 430,127 425,135" fill="url(#sandlerGradient)" />
                
                <path d="M450,130 L525,100" fill="none" stroke="url(#sandlerGradient)" stroke-width="2" />
                <polygon points="520,95 530,97 525,105" fill="url(#sandlerGradient)" />
                
                <path d="M550,100 L625,70" fill="none" stroke="url(#sandlerGradient)" stroke-width="2" />
                <polygon points="620,65 630,67 625,75" fill="url(#sandlerGradient)" />
            </svg>
        `;
    }
}

// ========== Form Submission ==========
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thanks for applying to our beta program! We\'ll be in touch soon.';
            form.reset();
            
            // Simulate actual form submission
            // In a real implementation, you would submit to FormSubmit.co here
            // form.submit();
        } else {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Please fill in all required fields.';
        }
    });
}

// ========== Particles Background ==========
function initParticlesBackground() {
    const heroParticles = document.getElementById('hero-particles');
    if (!heroParticles) return;
    
    // Load particles.js library if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('hero-particles', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#ff6c00", "#ffb800", "#9215f6"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff6c00",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    } else {
        // Fallback if particles.js isn't loaded
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = `${randomInt(2, 4)}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${randomInt(200, 255)}, ${randomInt(100, 150)}, 0, ${Math.random() * 0.5 + 0.3})`;
            particle.style.borderRadius = '50%';
            particle.style.top = `${randomInt(0, 100)}%`;
            particle.style.left = `${randomInt(0, 100)}%`;
            
            // Random animation duration
            const duration = randomInt(3, 8);
            particle.style.animation = `float ${duration}s ease-in-out infinite`;
            
            heroParticles.appendChild(particle);
            
            // Remove after some time to avoid too many particles
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        };
        
        // Create particles at intervals
        setInterval(createParticle, 300);
        
        // Add keyframes animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); }
                50% { transform: translateY(-${randomInt(20, 40)}px) translateX(${randomInt(-20, 20)}px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========== Add Style for Dashboard Preview ==========
function addDashboardStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .dashboard-preview {
            padding: 1rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            height: 100%;
        }
        
        .dashboard-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }
        
        .dashboard-title {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }
        
        .dashboard-stats {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .dashboard-stat {
            background: rgba(255, 255, 255, 0.05);
            padding: 0.5rem;
            border-radius: 4px;
            min-width: 80px;
            text-align: center;
        }
        
        .stat-label {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .stat-value {
            font-size: 1rem;
            font-weight: 600;
            background: linear-gradient(135deg, #ff6c00, #ffb800);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .dashboard-chart {
            margin-top: 1rem;
        }
        
        .chart-placeholder {
            height: 120px;
            display: flex;
            align-items: flex-end;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .chart-bar {
            flex: 1;
            background: linear-gradient(180deg, #ff6c00, #9215f6);
            border-radius: 4px 4px 0 0;
            transition: height 1s ease-out;
        }
        
        .chart-label {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
        }
    `;
    document.head.appendChild(style);
}

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', () => {
    // Header and mobile menu
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initialize animations and demos
    initConversationDemo();
    initSolutionPreviews();
    initMethodologyDiagrams();
    initParticlesBackground();
    addDashboardStyles();
    
    // Animate graph bars when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('problem-graphic')) {
                    animateGraphBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const elementsToObserve = [
        document.querySelector('.problem-graphic'),
        document.querySelector('.solution-card'),
        document.querySelector('.methodology-diagram'),
        document.querySelector('.steps-container')
    ];
    
    elementsToObserve.forEach(el => {
        if (el) observer.observe(el);
    });
    
    // Smooth scrolling for anchor links - FIXED VERSION
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
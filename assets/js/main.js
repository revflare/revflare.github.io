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
        const demo = document.getElementById('conversation-demo');
        demo.appendChild(messageDiv);
        // Scroll only the conversation container, not the whole page
        demo.scrollTop = demo.scrollHeight;
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
    
    const demo = document.getElementById('conversation-demo');
    demo.appendChild(typingDiv);
    // Scroll only the conversation container, not the whole page
    demo.scrollTop = demo.scrollHeight;
    
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

// Import the updated methodology diagrams
function initMethodologyDiagrams() {
    // SPIN Methodology Diagram - New modern version
    const spinDiagram = document.getElementById('spin-diagram');
    if (spinDiagram) {
        spinDiagram.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="spinBg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:rgba(255, 108, 0, 0.05);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:rgba(255, 184, 0, 0.05);stop-opacity:1" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.3" />
                    </filter>
                </defs>
                
                <!-- Background shape -->
                <rect x="50" y="70" width="700" height="160" rx="80" ry="80" fill="url(#spinBg)" />
                
                <!-- Connection Lines -->
                <path d="M170,150 L270,150" stroke="#ff6c00" stroke-width="2" stroke-dasharray="5,5" />
                <path d="M370,150 L470,150" stroke="#ff6c00" stroke-width="2" stroke-dasharray="5,5" />
                <path d="M570,150 L670,150" stroke="#ff6c00" stroke-width="2" stroke-dasharray="5,5" />
                
                <!-- SPIN Elements -->
                <g filter="url(#shadow)">
                    <circle cx="120" cy="150" r="50" fill="#1a1b24" stroke="#ff6c00" stroke-width="2" />
                    <text x="120" y="160" font-family="Poppins, sans-serif" font-size="30" font-weight="600" fill="#ff6c00" text-anchor="middle">S</text>
                </g>
                
                <g filter="url(#shadow)">
                    <circle cx="320" cy="150" r="50" fill="#1a1b24" stroke="#ff6c00" stroke-width="2" />
                    <text x="320" y="160" font-family="Poppins, sans-serif" font-size="30" font-weight="600" fill="#ff6c00" text-anchor="middle">P</text>
                </g>
                
                <g filter="url(#shadow)">
                    <circle cx="520" cy="150" r="50" fill="#1a1b24" stroke="#ff6c00" stroke-width="2" />
                    <text x="520" y="160" font-family="Poppins, sans-serif" font-size="30" font-weight="600" fill="#ff6c00" text-anchor="middle">I</text>
                </g>
                
                <g filter="url(#shadow)">
                    <circle cx="720" cy="150" r="50" fill="#1a1b24" stroke="#ff6c00" stroke-width="2" />
                    <text x="720" y="160" font-family="Poppins, sans-serif" font-size="30" font-weight="600" fill="#ff6c00" text-anchor="middle">N</text>
                </g>
                
                <!-- Labels -->
                <text x="120" y="220" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Situation</text>
                <text x="320" y="220" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Problem</text>
                <text x="520" y="220" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Implication</text>
                <text x="720" y="220" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Need-Payoff</text>
                
                <!-- Progress Arrows -->
                <path d="M185,150 L255,150" stroke="#ff6c00" stroke-width="2" />
                <polygon points="250,145 260,150 250,155" fill="#ff6c00" />
                
                <path d="M385,150 L455,150" stroke="#ff6c00" stroke-width="2" />
                <polygon points="450,145 460,150 450,155" fill="#ff6c00" />
                
                <path d="M585,150 L655,150" stroke="#ff6c00" stroke-width="2" />
                <polygon points="650,145 660,150 650,155" fill="#ff6c00" />
            </svg>
        `;
    }
    
    // Sandler Methodology Diagram - New modern version
    const sandlerDiagram = document.getElementById('sandler-diagram');
    if (sandlerDiagram) {
        sandlerDiagram.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="sandlerBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:rgba(146, 21, 246, 0.05);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:rgba(0, 217, 255, 0.05);stop-opacity:1" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.3" />
                    </filter>
                </defs>
                
                <!-- Background shape - Stair step design -->
                <path d="M100,260 L700,260 L700,70 L100,70 Z" fill="url(#sandlerBg)" />
                
                <!-- Steps -->
                <g filter="url(#shadow)">
                    <rect x="100" y="210" width="100" height="50" rx="6" ry="6" fill="#1a1b24" stroke="#9215f6" stroke-width="2" />
                    <text x="150" y="240" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Rapport</text>
                    <circle cx="115" cy="225" r="12" fill="#9215f6" />
                    <text x="115" y="230" font-family="Poppins, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">1</text>
                </g>
                
                <g filter="url(#shadow)">
                    <rect x="210" y="180" width="100" height="50" rx="6" ry="6" fill="#1a1b24" stroke="#9215f6" stroke-width="2" />
                    <text x="260" y="210" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Pain</text>
                    <circle cx="225" cy="195" r="12" fill="#9215f6" />
                    <text x="225" y="200" font-family="Poppins, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">2</text>
                </g>
                
                <g filter="url(#shadow)">
                    <rect x="320" y="150" width="100" height="50" rx="6" ry="6" fill="#1a1b24" stroke="#9215f6" stroke-width="2" />
                    <text x="370" y="180" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Budget</text>
                    <circle cx="335" cy="165" r="12" fill="#9215f6" />
                    <text x="335" y="170" font-family="Poppins, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">3</text>
                </g>
                
                <g filter="url(#shadow)">
                    <rect x="430" y="120" width="100" height="50" rx="6" ry="6" fill="#1a1b24" stroke="#9215f6" stroke-width="2" />
                    <text x="480" y="150" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Decision</text>
                    <circle cx="445" cy="135" r="12" fill="#9215f6" />
                    <text x="445" y="140" font-family="Poppins, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">4</text>
                </g>
                
                <g filter="url(#shadow)">
                    <rect x="540" y="90" width="100" height="50" rx="6" ry="6" fill="#1a1b24" stroke="#9215f6" stroke-width="2" />
                    <text x="590" y="120" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Fulfillment</text>
                    <circle cx="555" cy="105" r="12" fill="#9215f6" />
                    <text x="555" y="110" font-family="Poppins, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">5</text>
                </g>
                
                <g filter="url(#shadow)">
                    <rect x="650" y="60" width="100" height="50" rx="6" ry="6" fill="#1a1b24" stroke="#9215f6" stroke-width="2" />
                    <text x="700" y="90" font-family="Inter, sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">Close</text>
                    <circle cx="665" cy="75" r="12" fill="#9215f6" />
                    <text x="665" y="80" font-family="Poppins, sans-serif" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">6</text>
                </g>
                
                <!-- Progress Arrows -->
                <path d="M205,225 L235,195" stroke="#9215f6" stroke-width="2" />
                <polygon points="230,190 240,187 235,200" fill="#9215f6" />
                
                <path d="M315,195 L345,165" stroke="#9215f6" stroke-width="2" />
                <polygon points="340,160 350,157 345,165" fill="#9215f6" />
                
                <path d="M425,165 L455,135" stroke="#9215f6" stroke-width="2" />
                <polygon points="450,130 460,127 455,140" fill="#9215f6" />
                
                <path d="M535,135 L565,105" stroke="#9215f6" stroke-width="2" />
                <polygon points="560,100 570,97 565,110" fill="#9215f6" />
                
                <path d="M645,105 L675,75" stroke="#9215f6" stroke-width="2" />
                <polygon points="670,70 680,67 675,80" fill="#9215f6" />
            </svg>
        `;
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
            color: #ff6c00;
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
            background: linear-gradient(180deg, #00d9ff, #9215f6);
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
    // Prevent initial scrolling
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    
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
        document.querySelector('.methodology-tabs'),
        document.querySelector('.steps-container')
    ];
    
    elementsToObserve.forEach(el => {
        if (el) observer.observe(el);
    });
    
    // Initialize particles background
    initParticlesBackground();
    
    // Smooth scrolling for anchor links
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
                
                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
            }
        });
    });
});

// ========== Particles Background ==========
function initParticlesBackground() {
    const heroParticles = document.getElementById('hero-particles');
    if (!heroParticles) return;
    
    // Load particles.js library if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('hero-particles', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                color: {
                    value: ["#ff6c00", "#00d9ff", "#9215f6", "#16e287"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.8,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1.5,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#333",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
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
                            opacity: 0.4
                        }
                    },
                    push: {
                        particles_nb: 2
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
            
            // Use a variety of colors
const colors = [
    'rgba(255, 108, 0, 0.3)',   // Orange
    'rgba(0, 217, 255, 0.3)',   // Cyan
    'rgba(146, 21, 246, 0.3)',  // Purple
    'rgba(22, 226, 135, 0.3)'   // Green
];
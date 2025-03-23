/**
 * revFlare Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navbar = document.querySelector('.navbar');
  const pricingToggle = document.getElementById('pricing-toggle');
  const pricingCards = document.querySelectorAll('.pricing-card');
  const starterPrice = document.getElementById('starter-price');
  const growthPrice = document.getElementById('growth-price');
  const scalePrice = document.getElementById('scale-price');
  const counterElements = document.querySelectorAll('.counter');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const chatDemoContainer = document.getElementById('chat-demo-container');
  const responseCounter = document.getElementById('response-counter');

  // Navigation toggle
  if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function() {
          menuToggle.classList.toggle('active');
          navMenu.classList.toggle('active');
      });
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          if (navMenu && navMenu.classList.contains('active')) {
              menuToggle.classList.remove('active');
              navMenu.classList.remove('active');
          }

          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // Pricing toggle
  if (pricingToggle) {
      pricingToggle.addEventListener('change', function() {
          const isFullPackage = this.checked;
          
          pricingCards.forEach(card => {
              if (isFullPackage) {
                  card.classList.add('full-package');
              } else {
                  card.classList.remove('full-package');
              }
          });
          
          if (starterPrice && growthPrice && scalePrice) {
              // Update pricing based on toggle state
              if (isFullPackage) {
                  starterPrice.innerHTML = '<span class="currency">$</span><span class="amount">399</span><span class="period">/mo</span>';
                  growthPrice.innerHTML = '<span class="currency">$</span><span class="amount">699</span><span class="period">/mo</span>';
                  scalePrice.innerHTML = '<span class="currency">$</span><span class="amount">1199</span><span class="period">/mo</span>';
              } else {
                  starterPrice.innerHTML = '<span class="currency">$</span><span class="amount">299</span><span class="period">/mo</span>';
                  growthPrice.innerHTML = '<span class="currency">$</span><span class="amount">499</span><span class="period">/mo</span>';
                  scalePrice.innerHTML = '<span class="currency">$</span><span class="amount">899</span><span class="period">/mo</span>';
              }
          }
      });
  }

  // Counter animation
  function animateCounters() {
      counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 2000; // 2 seconds
          const steps = 50; // Number of steps
          const stepDuration = duration / steps;
          const increment = target / steps;
          
          let current = 0;
          const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                  counter.textContent = target;
                  clearInterval(timer);
              } else {
                  counter.textContent = Math.round(current);
              }
          }, stepDuration);
      });
  }

  // Methodology tabs
  if (tabButtons && tabButtons.length > 0) {
      tabButtons.forEach(button => {
          button.addEventListener('click', () => {
              // Remove active class from all buttons and panes
              tabButtons.forEach(btn => btn.classList.remove('active'));
              tabPanes.forEach(pane => pane.classList.remove('active'));
              
              // Add active class to current button
              button.classList.add('active');
              
              // Show corresponding tab content
              const tabId = button.getAttribute('data-tab');
              const tabPane = document.getElementById(`${tabId}-tab`);
              if (tabPane) {
                  tabPane.classList.add('active');
              }
          });
      });
  }

  // Methodology switch animation (for comparison tab)
  function animateMethodologySwitch() {
      const spinDot = document.querySelector('.spin-dot');
      const sandlerDot = document.querySelector('.sandler-dot');
      
      if (spinDot && sandlerDot) {
          setInterval(() => {
              spinDot.classList.toggle('active');
              sandlerDot.classList.toggle('active');
          }, 3000);
      }
  }

  // Chat demo animation
  function populateChatDemo() {
      if (!chatDemoContainer) return;
      
      const messages = [
          { type: 'bot', text: 'Hi there! Thanks for your interest in our HVAC services. How can we help you today?', delay: 500 },
          { type: 'user', text: 'My AC isn\'t cooling properly', delay: 2000 },
          { type: 'bot', text: 'I\'m sorry to hear that. How long has it been since your AC stopped cooling effectively?', delay: 2500 },
          { type: 'user', text: 'A couple of days now', delay: 4000 },
          { type: 'bot', text: 'Have you noticed any unusual sounds or smells coming from the unit?', delay: 4500 },
          { type: 'user', text: 'Yes, there\'s a buzzing sound sometimes', delay: 6000 },
          { type: 'bot', text: 'That could indicate an electrical issue or a problem with the fan. What\'s your budget range for the repair?', delay: 6500 },
          { type: 'user', text: 'I\'d prefer not to spend more than $500 if possible', delay: 8000 },
          { type: 'bot', text: 'Understood. We can have a technician come assess the situation. When would be a good time for you?', delay: 8500 }
      ];

      chatDemoContainer.innerHTML = '';
      
      messages.forEach((msg, index) => {
          setTimeout(() => {
              const messageDiv = document.createElement('div');
              messageDiv.classList.add('message');
              messageDiv.classList.add(msg.type === 'bot' ? 'message-bot' : 'message-user');
              messageDiv.textContent = msg.text;
              chatDemoContainer.appendChild(messageDiv);
              
              // Auto-scroll to latest message
              chatDemoContainer.scrollTop = chatDemoContainer.scrollHeight;
          }, msg.delay);
      });
      
      // Reset after all messages have been shown
      setTimeout(() => {
          populateChatDemo();
      }, 12000);
  }

  // Response time counter animation
  function animateResponseCounter() {
      if (!responseCounter) return;
      
      const values = [0.3, 0.4, 0.2, 0.5, 0.3, 0.4];
      let index = 0;
      
      setInterval(() => {
          responseCounter.textContent = values[index];
          index = (index + 1) % values.length;
      }, 3000);
  }

  // Intersection Observer for animations
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              if (entry.target.classList.contains('stats-grid')) {
                  animateCounters();
              }
              
              if (entry.target.classList.contains('methodology-comparison')) {
                  animateMethodologySwitch();
              }
              
              entry.target.classList.add('animate');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  document.querySelectorAll('.stats-grid, .methodology-comparison, .step-item, .solution-card, .advantage-card').forEach(element => {
      observer.observe(element);
  });

  // Handle form submission
  const betaForm = document.getElementById('beta-form');
  if (betaForm) {
      betaForm.addEventListener('submit', function(e) {
          // You can add validation here if needed
          // This is handled by FormSubmit.co already
      });
  }

  // Initialize animations
  populateChatDemo();
  animateResponseCounter();

  // Qualification meter animation
  const meterFill = document.querySelector('.meter-fill');
  if (meterFill) {
      let width = 0;
      const maxWidth = 65; // Maximum width percentage
      
      const animateMeter = () => {
          if (width < maxWidth) {
              width += 1;
              meterFill.style.width = width + '%';
              setTimeout(animateMeter, 50);
          }
      };
      
      const meterObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  animateMeter();
                  meterObserver.unobserve(entry.target);
              }
          });
      }, observerOptions);
      
      meterObserver.observe(document.querySelector('.qualification-meter'));
  }
});
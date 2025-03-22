/**
 * revFlare - Enhanced JS with optimized performance and mobile support
 */
document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const betaForm = document.getElementById('beta-form');
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const thankyouModal = document.getElementById('thank-you-modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
  const backToTop = document.querySelector('.back-to-top');
  const methodologyTabs = document.querySelectorAll('.tab-btn[data-tab]');
  const pricingTabs = document.querySelectorAll('.pricing-controls .tab-btn[data-tab]');
  
  // Stat counters
  const statConversion = document.getElementById('stat-conversion');
  const statResponse = document.getElementById('stat-response');
  const statRevenue = document.getElementById('stat-revenue');
  
  // Hide modals on page load
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });
  
  // Throttle function to limit execution frequency
  function throttle(callback, delay = 100) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
      const context = this;
      const currentTime = Date.now();
      const timeSinceLastExec = currentTime - lastExecTime;
      
      const execute = () => {
        lastExecTime = Date.now();
        callback.apply(context, args);
      };
      
      if (timeSinceLastExec > delay) {
        execute();
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(execute, delay - timeSinceLastExec);
      }
    };
  }
  
  // Add scroll event listener for header and back to top
  window.addEventListener('scroll', throttle(function() {
    // Header scrolled effect
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
    
    // Call animate on scroll
    animateOnScroll();
  }, 50));
  
  // Mobile menu toggle with ARIA support
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
      
      // Toggle hamburger-to-x animation
      if (navLinks.classList.contains('active')) {
        this.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
      } else {
        this.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') && 
          !e.target.closest('.nav-links') && 
          !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#thank-you-modal') {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Get header height for proper scroll positioning
          const headerHeight = header.offsetHeight;
          
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight - 20,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }
  });

  // Tab functionality for methodology and pricing sections
  function setupTabs(tabButtons, tabContentPrefix) {
    if (!tabButtons.length) return;
    
    tabButtons.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get the tab content ID
        const tabId = `${this.getAttribute('data-tab')}-tab`;
        
        // Hide all tab content
        const allTabPanes = document.querySelectorAll(`${tabContentPrefix} .tab-pane`);
        allTabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Show the active tab content
        const activePane = document.getElementById(tabId);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }
  
  // Setup methodology tabs
  setupTabs(methodologyTabs, '.methodology-tabs');
  
  // Setup pricing tabs
  setupTabs(pricingTabs, '.pricing-tabs');

  // Close modal buttons
  if (modalCloseButtons.length > 0) {
    modalCloseButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
      });
    });
  }

  // Close modal when clicking outside of content
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });

  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.querySelector('.modal.show')) {
      closeModal(document.querySelector('.modal.show'));
    }
  });

  // Animate conversation elements
  function animateConversation() {
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
      setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
      }, 800 + (index * 600)); // Faster animation
    });
    
    // Show typing indicator after the last message
    setTimeout(() => {
      const typingMessage = document.querySelector('.message.typing');
      if (typingMessage) {
        typingMessage.style.opacity = '1';
        typingMessage.style.transform = 'translateY(0)';
      }
    }, 800 + (messages.length * 600)); // Faster animation
    
    // Make sure conversation overlays are visible
    setTimeout(() => {
      const overlays = document.querySelectorAll('.conversation-overlay');
      overlays.forEach(overlay => {
        overlay.style.opacity = '1'; 
        overlay.style.transform = 'translateX(0)';
      });
    }, 1200);
  }
  
  // Call animation functions after page load
  window.addEventListener('load', function() {
    animateConversation();
    // Initial call for elements that are already in viewport
    setTimeout(animateOnScroll, 100);
  });

  // Animate stat counters
  function animateCounter(element, targetValue, prefix = '', suffix = '') {
    if (!element) return;
    
    const startValue = 0;
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const valueIncrement = (targetValue - startValue) / totalFrames;
    
    let currentValue = startValue;
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      currentValue += valueIncrement;
      
      if (frame === totalFrames) {
        clearInterval(counter);
        currentValue = targetValue;
      }
      
      element.textContent = Math.floor(currentValue);
    }, frameDuration);
  }
  
  // Function to open modal
  function openModal(modal) {
    if (!modal) return;
    
    // Close any open modals first
    const openModals = document.querySelectorAll('.modal.show');
    openModals.forEach(openModal => closeModal(openModal));
    
    modal.style.display = 'block';
    // Force reflow to enable transition
    modal.offsetHeight;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus the first button in the modal for accessibility
    setTimeout(() => {
      const firstButton = modal.querySelector('button');
      if (firstButton) firstButton.focus();
    }, 100);
  }

  // Function to close modal
  function closeModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // Form validation and submission
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function showFormError(input, message) {
    // Remove any existing error messages
    removeFormError(input);
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    
    // Add visual indication to the input
    input.classList.add('is-invalid');
    
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
    
    // Remove error styling when input changes
    input.addEventListener('input', function() {
      removeFormError(this);
    }, { once: true });
  }
  
  function removeFormError(input) {
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Remove visual indication
    input.classList.remove('is-invalid');
  }
  
  // Beta form submission
  if (betaForm) {
    betaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate required fields
      let isValid = true;
      
      // Validate all required fields
      this.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          showFormError(field, 'This field is required.');
          isValid = false;
          
          // Focus the first invalid field
          if (isValid === false && !document.querySelector(':focus')) {
            field.focus();
          }
        }
      });
      
      // Validate email
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
        showFormError(emailInput, 'Please enter a valid email address.');
        isValid = false;
        
        // Focus the email field if it's invalid
        if (!document.querySelector(':focus')) {
          emailInput.focus();
        }
      }
      
      if (!isValid) return;
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Submitting...';
      submitBtn.disabled = true;
      
      // Use FormSubmit.co as backend service
      const formData = new FormData(this);
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Show success modal
          openModal(thankyouModal);
          
          // Reset form
          betaForm.reset();
          
          // Reset button state
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        // Handle submission error
        console.error('Error:', error);
        
        // Show error message near submit button
        const errorMsg = document.createElement('div');
        errorMsg.className = 'form-error';
        errorMsg.textContent = 'Something went wrong. Please try again later.';
        submitBtn.parentNode.appendChild(errorMsg);
        
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Remove error message after 5 seconds
        setTimeout(() => {
          if (errorMsg.parentNode) {
            errorMsg.remove();
          }
        }, 5000);
      });
    });
  }

  // Animations on scroll
  if (animateElements.length > 0) {
    // Function to check if an element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
      );
    }
    
    // Function to animate elements when in viewport
    function animateOnScroll() {
      animateElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
          element.classList.add('animated');
          
          // If this is a stat-card parent, animate the counters
          if (element.classList.contains('problem-card') || element.querySelector('.stat-highlight')) {
            // Start counters
            if (statConversion && !statConversion.dataset.animated) {
              animateCounter(statConversion, 78);
              statConversion.dataset.animated = true;
            }
            
            if (statResponse && !statResponse.dataset.animated) {
              animateCounter(statResponse, 7);
              statResponse.dataset.animated = true;
            }
            
            if (statRevenue && !statRevenue.dataset.animated) {
              animateCounter(statRevenue, 32);
              statRevenue.dataset.animated = true;
            }
          }
        }
      });
    }
  }
  
  // Animate chart bars
  const chartBars = document.querySelectorAll('.chart-bar');
  if (chartBars.length > 0) {
    setTimeout(() => {
      chartBars.forEach(bar => {
        const height = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
          bar.style.height = height;
        }, 100);
      });
    }, 500);
  }
  
  // Handle URL hash for direct modal opening
  if (window.location.hash === '#thank-you-modal' && thankyouModal) {
    openModal(thankyouModal);
    
    // Clean the URL
    history.replaceState(null, null, ' ');
  }
});
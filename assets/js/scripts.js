document.addEventListener('DOMContentLoaded', function() {
  // Make sure modals are hidden on page load
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
    modal.classList.remove('show');
  });
  // Cache frequently used elements
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const waitlistForm = document.getElementById('waitlist-form');
  const earlyAccessForm = document.getElementById('early-access-form');
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const earlyAccessTrigger = document.getElementById('early-access-trigger');
  const earlyAccessModal = document.getElementById('early-access-modal');
  const thankyouModal = document.getElementById('thank-you-modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
  
  // Initialize stat counters
  const statFollowup = document.getElementById('stat-followup');
  const statCost = document.getElementById('stat-cost');
  const statRevenue = document.getElementById('stat-revenue');
  
  // Add scroll event listener for header
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Call animate on scroll
    animateOnScroll();
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Toggle hamburger-to-x animation
      if (navLinks.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#early-access-modal') {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          }
        }
      });
    }
  });

  // Modal functionality
  if (earlyAccessTrigger && earlyAccessModal) {
    earlyAccessTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(earlyAccessModal);
    });
  }

  // Close modal buttons
  if (modalCloseButtons) {
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
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Function to close modal
  function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Form validation and submission
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function showFormError(input, message) {
    // Remove any existing error messages
    const existingError = input.parentNode.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4d4d';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    
    // Add visual indication to the input
    input.style.borderColor = '#ff4d4d';
    input.style.boxShadow = '0 0 0 2px rgba(255, 77, 77, 0.2)';
    
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
    
    // Remove error styling when input changes
    input.addEventListener('input', function() {
      this.style.borderColor = '';
      this.style.boxShadow = '';
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, { once: true });
  }
  
  // Waitlist form submission
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      // Validate email first
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (!email) {
        e.preventDefault();
        showFormError(emailInput, 'Please enter your email address.');
        return;
      }
      
      if (!validateEmail(email)) {
        e.preventDefault();
        showFormError(emailInput, 'Please enter a valid email address.');
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;
      
      // After successful submission, redirect to thank you page
      // handled by FormSubmit's _next parameter
    });
  }

  // Early access form submission
  if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', function(e) {
      // Validate required fields
      let isValid = true;
      
      // Validate required fields
      this.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          e.preventDefault();
          showFormError(field, 'This field is required.');
          isValid = false;
        }
      });
      
      // Validate email
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
        e.preventDefault();
        showFormError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;
      
      // After successful submission, redirect to thank you page
      // handled by FormSubmit's _next parameter
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
          
          // If this is a stat-card, animate the counters
          const statHighlights = element.querySelectorAll('.stat-highlight');
          if (statHighlights.length > 0) {
            // Start counters
            if (statFollowup && !statFollowup.dataset.animated) {
              animateCounter(statFollowup, 73);
              statFollowup.dataset.animated = true;
            }
            
            if (statCost && !statCost.dataset.animated) {
              animateCounter(statCost, 10);
              statCost.dataset.animated = true;
            }
            
            if (statRevenue && !statRevenue.dataset.animated) {
              animateCounter(statRevenue, 1000);
              statRevenue.dataset.animated = true;
            }
          }
        }
      });
    }
    
    // Run on load
    window.addEventListener('load', animateOnScroll);
    
    // Initial call for elements that are already in viewport
    setTimeout(animateOnScroll, 100);
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
  
  // Increment waitlist counter for demo purposes
  const waitlistCounter = document.querySelector('.waitlist-counter-text');
  if (waitlistCounter) {
    // Get a random number between 120-150
    const baseCount = Math.floor(Math.random() * (150 - 120 + 1)) + 120;
    
    // Set initial count
    let count = baseCount;
    waitlistCounter.textContent = `${count} businesses on the waitlist`;
    
    // Increment occasionally to create FOMO effect
    setInterval(() => {
      // 10% chance to increment on each interval
      if (Math.random() < 0.1) {
        count++;
        waitlistCounter.textContent = `${count} businesses on the waitlist`;
        
        // Add a pulse animation
        waitlistCounter.classList.add('pulse');
        setTimeout(() => {
          waitlistCounter.classList.remove('pulse');
        }, 1000);
      }
    }, 5000); // Check every 5 seconds
  }
});
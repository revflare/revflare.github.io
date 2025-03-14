document.addEventListener('DOMContentLoaded', function() {
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
  const counters = document.querySelectorAll('.counter');
  
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

  // Animate counters
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const speed = 1000; // Animation duration in milliseconds
    const increment = target / (speed / 30); // Update every 30ms
    let currentCount = 0;
    
    const updateCount = () => {
      currentCount += increment;
      if (currentCount < target) {
        counter.innerText = Math.ceil(currentCount);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
        // Add percentage sign if needed
        if (counter.classList.contains('percentage')) {
          counter.innerText += '%';
        }
      }
    };
    
    updateCount();
  }
  
  // Initialize all counters immediately
  document.querySelectorAll('.counter').forEach(counter => {
    animateCounter(counter);
  });

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
          
          // Trigger counter animations if they are inside this element
          const counters = element.querySelectorAll('.counter');
          if (counters.length > 0) {
            counters.forEach(counter => {
              animateCounter(counter);
            });
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

  // Create thank-you.html page if it doesn't exist
  function createThankYouPage() {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - revFlare</title>
      <link rel="stylesheet" href="assets/css/style.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <meta http-equiv="refresh" content="5;url=index.html">
    </head>
    <body style="display: flex; align-items: center; justify-content: center; height: 100vh; background-color: var(--dark);">
      <div style="text-align: center; max-width: 600px; padding: 40px; background-color: var(--gray-dark); border-radius: 10px; box-shadow: var(--shadow-lg);">
        <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></i>
        <h1>Thank You!</h1>
        <p>Your submission has been received. We'll be in touch shortly.</p>
        <p>You'll be redirected to the homepage in 5 seconds...</p>
        <a href="index.html" class="btn btn-primary mt-4">Return to Homepage</a>
      </div>
    </body>
    </html>
    `;
    
    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.download = 'thank-you.html';
    a.href = URL.createObjectURL(blob);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});  // Form validation and submission
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
        }
      });
    }
    
    // Run on load
    window.addEventListener('load', animateOnScroll);
    
    // Initial call for elements that are already in viewport
    setTimeout(animateOnScroll, 100);
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

  // Create thank-you.html page if it doesn't exist
  function createThankYouPage() {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - revFlare</title>
      <link rel="stylesheet" href="assets/css/style.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <meta http-equiv="refresh" content="5;url=index.html">
    </head>
    <body style="display: flex; align-items: center; justify-content: center; height: 100vh; background-color: var(--dark);">
      <div style="text-align: center; max-width: 600px; padding: 40px; background-color: var(--gray-dark); border-radius: 10px; box-shadow: var(--shadow-lg);">
        <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></i>
        <h1>Thank You!</h1>
        <p>Your submission has been received. We'll be in touch shortly.</p>
        <p>You'll be redirected to the homepage in 5 seconds...</p>
        <a href="index.html" class="btn btn-primary mt-4">Return to Homepage</a>
      </div>
    </body>
    </html>
    `;
    
    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.download = 'thank-you.html';
    a.href = URL.createObjectURL(blob);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}); revFlare website scripts.js
document.addEventListener('DOMContentLoaded', function() {
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

  //
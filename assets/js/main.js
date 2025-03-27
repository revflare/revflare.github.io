// main.js

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target); // Trigger only once per section
        }
      });
    }, {
      threshold: 0.1
    });
  
    document.querySelectorAll(
      '.feature, .stat-block, .form-section, .diagram-section'
    ).forEach(section => {
      section.classList.remove('fade-in'); // Ensure fade-in is not triggered before scrolling
      observer.observe(section);
    });
  });
  
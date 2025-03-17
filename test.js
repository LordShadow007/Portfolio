document.addEventListener('DOMContentLoaded', function() {
    // Typing effect
    const occupations = [ "Backend Trainee", "Creative Coder"];
    let occupationIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    let erasingDelay = 100;
    let newTextDelay = 2000;
    
    function typeEffect() {
        const occupationElement = document.getElementById('occupation');
        const currentOccupation = occupations[occupationIndex];
        
        // Set typing speed
        let speed = isDeleting ? erasingDelay : typingDelay;
        
        if (isDeleting) {
            // Removing letters
            occupationElement.textContent = currentOccupation.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Adding letters
            occupationElement.textContent = currentOccupation.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentOccupation.length) {
            // Pause at the end of typing
            speed = newTextDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word when deleted
            isDeleting = false;
            occupationIndex = (occupationIndex + 1) % occupations.length;
            speed = 500;
        }
        
        setTimeout(typeEffect, speed);
    }
    
    // Start typing effect
    typeEffect();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        // Navbar effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll to top button
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
        
        // Animate skill bars
        animateSkillBars();
    });
    
    // Menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    // Close menu when clicking a menu item
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
    
    // Scroll to top button
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Active menu item based on scroll position
    function setActiveMenu() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY+400 ;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    
                    if (navLink.getAttribute('href') === `#${sectionId}`) {
                        navLink.classList.add('active');
                    }
                    if(sectionId=="about" &&scrollPosition -300<= sectionTop){
                        navLink.classList.remove('active');
                        document.getElementById("home").classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveMenu);
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category').split(",");
                
                if (category.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillSection = document.getElementById('skills');
        const progressBars = document.querySelectorAll('.progress-fill');
        
        if (isInViewport(skillSection)) {
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would normally send the data to your server
        console.log('Form Submitted:', { name, email, subject, message });
        
        // Show success message (in a real application)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Initialize animations
    animateSkillBars();
    setActiveMenu();
});

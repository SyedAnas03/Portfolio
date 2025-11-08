/* ---------------------------
   PORTFOLIO INITIALIZATION
   --------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio loading...');
    
    initTheme();
    initHamburgerMenu();
    initAnimations();
    initSmoothScroll();
    initProfileImage();
    initTypingEffect();
    initHeaderScroll();
    initMap();
    initStatsCounter();
    initParticles();
    
    console.log('✅ Portfolio loaded successfully!');
});

/* ---------------------------
   HAMBURGER MENU (Fixed)
   --------------------------- */

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking on theme button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    }
}

/* ---------------------------
   THEME TOGGLE
   --------------------------- */

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* ---------------------------
   PARTICLE BACKGROUND
   --------------------------- */

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(80, Math.floor((W * H) / 10000));
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            radius: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, W, H);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > W) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > H) particle.speedY *= -1;
            
            particle.x = Math.max(0, Math.min(W, particle.x));
            particle.y = Math.max(0, Math.min(H, particle.y));

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 188, 212, 0.1)';
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

/* ---------------------------
   ANIMATIONS
   --------------------------- */

function initAnimations() {
    const faders = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    faders.forEach(fader => fadeObserver.observe(fader));

    const sections = document.querySelectorAll('.fade-section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => sectionObserver.observe(section));
}

/* ---------------------------
   SMOOTH SCROLL
   --------------------------- */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---------------------------
   PROFILE IMAGE
   --------------------------- */

function initProfileImage() {
    const profile = document.getElementById('floatingProfile');
    if (!profile) return;

    setTimeout(() => {
        profile.classList.add('visible');
    }, 800);
}

/* ---------------------------
   TYPING EFFECT
   --------------------------- */

function initTypingEffect() {
    const typedTitle = document.getElementById('typed-title');
    if (!typedTitle) return;

    const titles = ["Full Stack Developer", "Software Engineer", "AI & CyberSecurity Enthusiast"];
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = titles[currentIndex];
        
        if (!isDeleting) {
            typedTitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            }
        } else {
            typedTitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % titles.length;
            }
        }
        
        setTimeout(type, isDeleting ? 50 : 100);
    }

    setTimeout(type, 1000);
}

/* ---------------------------
   HEADER SCROLL
   --------------------------- */

function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ---------------------------
   MAP
   --------------------------- */

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || !window.L) return;

    try {
        const karachi = [24.8607, 67.0011];
        const map = L.map('map').setView(karachi, 11);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);
        
        L.marker(karachi).addTo(map)
            .bindPopup('Karachi, Pakistan')
            .openPopup();
            
    } catch (error) {
        console.log('Map loaded with basic version');
    }
}

/* ---------------------------
   STATS COUNTER
   --------------------------- */

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, 16);

                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

/* ---------------------------
   ERROR HANDLING
   --------------------------- */

window.addEventListener('error', function(e) {
    console.log('Error caught:', e.error);
    return true;
});
// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMobile = document.getElementById('nav-mobile');
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

    // Handle scroll effect on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMobile.classList.toggle('active');
        
        // Animate hamburger menu
        const hamburgers = navToggle.querySelectorAll('.hamburger');
        hamburgers.forEach((hamburger, index) => {
            if (navMobile.classList.contains('active')) {
                if (index === 0) {
                    hamburger.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    hamburger.style.opacity = '0';
                } else {
                    hamburger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                hamburger.style.transform = 'none';
                hamburger.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
            
            // Reset hamburger menu
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers.forEach(hamburger => {
                hamburger.style.transform = 'none';
                hamburger.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars when skills section comes into view
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.skill-category, .specialization-card, .project-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // --- NOUVEAU: Logique de traduction ---

    const translations = {
        'fr': {
            'title': 'Paul Betinelli - Développeur Informatique',
            'meta-desc': 'Paul Betinelli - Développeur informatique spécialisé en C/C++, Python, Java/Kotlin et administration système Linux/Windows. Expert Cisco.',
            'nav-home': 'Accueil',
            'nav-skills': 'Compétences',
            'nav-projects': 'Projets',
            'nav-contact': 'Contact',
            'nav-home-mobile': 'Accueil',
            'nav-skills-mobile': 'Compétences',
            'nav-projects-mobile': 'Projets',
            'nav-contact-mobile': 'Contact',
            'hero-subtitle': 'Développeur Informatique & Administrateur Système',
            'hero-description': "Passionné par le développement logiciel et l'administration système, je maîtrise un large éventail de technologies allant des langages de programmation modernes à l'infrastructure réseau Cisco.",
            'hero-btn-projects': 'Voir mes projets',
            'hero-btn-contact': 'Me contacter',
            'skills-title': 'Compétences Techniques',
            'skills-subtitle': 'Technologies et outils que je maîtrise',
            'skills-lang-title': 'Langages de programmation',
            'skills-sysadmin-title': 'Administration système',
            'skills-tech-title': 'Technologies',
            'spec-cisco-desc': "Configuration et gestion d'équipements réseau",
            'spec-admin-desc': 'Serveurs Linux et Windows Server',
            'spec-dev-desc': 'Applications multi-plateformes',
            'spec-infra-desc': 'Architecture et optimisation',
            'projects-title': 'Projets',
            'projects-subtitle': 'Découvrez mes réalisations',
            'project-byflash-desc': "Plateforme web moderne que je développe et maintiens. Un projet qui combine mes compétences en développement et en administration système pour offrir une expérience utilisateur optimale.",
            'project-byflash-tag1': 'Web Development',
            'project-byflash-tag2': 'Backend',
            'project-byflash-tag3': 'Administration',
            'project-byflash-link': 'Visiter le site',
            'project-github-title': 'Projets Open Source',
            'project-github-desc': "Retrouvez mes contributions et projets personnels sur GitHub. Du code C/C++ aux scripts Python, en passant par des applications Java/Kotlin et des outils d'administration système.",
            'project-github-link': 'Voir sur GitHub',
            'contact-title': 'Restons en contact',
            'contact-subtitle': "Intéressé par une collaboration ? N'hésitez pas à me contacter !",
            'contact-location': 'Localisation',
            'contact-btn-email': 'Envoyer un email',
            'footer-text': "© 2025 Paul Betinelli. Développeur passionné par l'innovation technologique.",
            'lang-toggle-btn': 'EN'
        },
        'en': {
            'title': 'Paul Betinelli - Software Developer',
            'meta-desc': 'Paul Betinelli - Software developer specialized in C/C++, Python, Java/Kotlin and Linux/Windows system administration. Cisco expert.',
            'nav-home': 'Home',
            'nav-skills': 'Skills',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            'nav-home-mobile': 'Home',
            'nav-skills-mobile': 'Skills',
            'nav-projects-mobile': 'Projects',
            'nav-contact-mobile': 'Contact',
            'hero-subtitle': 'Software Developer & System Administrator',
            'hero-description': 'Passionate about software development and system administration, I master a wide range of technologies from modern programming languages to Cisco network infrastructure.',
            'hero-btn-projects': 'See my projects',
            'hero-btn-contact': 'Contact me',
            'skills-title': 'Technical Skills',
            'skills-subtitle': 'Technologies and tools I master',
            'skills-lang-title': 'Programming Languages',
            'skills-sysadmin-title': 'System Administration',
            'skills-tech-title': 'Technologies',
            'spec-cisco-desc': 'Configuration and management of network equipment',
            'spec-admin-desc': 'Linux and Windows Servers',
            'spec-dev-desc': 'Multi-platform applications',
            'spec-infra-desc': 'Architecture and optimization',
            'projects-title': 'Projects',
            'projects-subtitle': 'Discover my work',
            'project-byflash-desc': 'A modern web platform that I develop and maintain. A project that combines my development and system administration skills to offer an optimal user experience.',
            'project-byflash-tag1': 'Web Development',
            'project-byflash-tag2': 'Backend',
            'project-byflash-tag3': 'Administration',
            'project-byflash-link': 'Visit the site',
            'project-github-title': 'Open Source Projects',
            'project-github-desc': 'Find my contributions and personal projects on GitHub. From C/C++ code to Python scripts, including Java/Kotlin applications and system administration tools.',
            'project-github-link': 'See on GitHub',
            'contact-title': "Let's keep in touch",
            'contact-subtitle': 'Interested in collaborating? Feel free to contact me!',
            'contact-location': 'Location',
            'contact-btn-email': 'Send an email',
            'footer-text': '© 2025 Paul Betinelli. Developer passionate about technological innovation.',
            'lang-toggle-btn': 'FR'
        }
    };

    let currentLang = 'fr';
    const langToggleButtons = document.querySelectorAll('.lang-toggle-btn');

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Cas spéciaux pour title et meta description
        document.title = translations[lang]['title'];
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', translations[lang]['meta-desc']);
        }
        
        // Mettre à jour le texte des boutons
        langToggleButtons.forEach(btn => {
            btn.textContent = translations[lang]['lang-toggle-btn'];
        });
    }

    langToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = (currentLang === 'fr') ? 'en' : 'fr';
            setLanguage(newLang);
        });
    });

    // Vérifier la langue sauvegardée au chargement
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage(currentLang); // Définit la langue par défaut (fr)
    }

    // --- Fin de la logique de traduction ---

}); // Fin de DOMContentLoaded

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll-to-top functionality
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll-to-top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
});

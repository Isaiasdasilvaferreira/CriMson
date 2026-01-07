document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadModal = document.getElementById('downloadModal');
    const closeModal = document.querySelector('.close-modal');
    const manualDownload = document.getElementById('manualDownload');
    const allRedButtons = document.querySelectorAll('.btn-primary, .btn-download, .btn-auth, .btn-support');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksElements = document.querySelectorAll('.nav-links a');
        
        if (sections.length === 0 || navLinksElements.length === 0) return;
        
        function highlightNavLink() {
            let scrollY = window.pageYOffset;
            let foundActive = false;
            
            navLinksElements.forEach(link => {
                link.classList.remove('active');
            });
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 150; 
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinksElements.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${sectionId}`) {
                            link.classList.add('active');
                            foundActive = true;
                        }
                    });
                }
            });
            
            if (!foundActive && scrollY < 200) {
                navLinksElements.forEach(link => {
                    if (link.getAttribute('href') === '#home') {
                        link.classList.add('active');
                    }
                });
            }
        }
        
        window.addEventListener('scroll', highlightNavLink);
        
        window.addEventListener('resize', highlightNavLink);
        
        setTimeout(() => {
            highlightNavLink();
        }, 300);
        
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                            navLinks.classList.remove('active');
                        }
                        
                        this.style.transform = 'scale(0.95)';
                        this.style.transition = 'transform 0.2s ease';
                        
                        setTimeout(() => {
                            this.style.transform = 'scale(1)';
                        }, 200);
                        
                        const offsetTop = targetElement.offsetTop - 100;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        history.pushState(null, null, href);
                        
                        navLinksElements.forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
    }
    
    initScrollSpy();
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        downloadModal.style.display = 'flex';
        
        setTimeout(() => {
            document.querySelector('.progress-text').textContent = 'Download completo!';
            document.querySelector('.modal-body p').textContent = 'O download foi concluído com sucesso. Verifique sua pasta de downloads.';
        }, 3000);
    });
    
    closeModal.addEventListener('click', function() {
        downloadModal.style.display = 'none';
        document.querySelector('.progress-fill').style.width = '0';
        document.querySelector('.progress-text').textContent = 'Preparando download...';
        document.querySelector('.modal-body p').textContent = 'O download do CarMesim_Setup_v2.5.1.exe começará automaticamente em alguns segundos.';
    });
    
    manualDownload.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Download iniciado manualmente. O arquivo CarMesim_Setup_v2.5.1.exe será baixado.');
        downloadModal.style.display = 'none';
        document.querySelector('.progress-fill').style.width = '0';
        document.querySelector('.progress-text').textContent = 'Preparando download...';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === downloadModal) {
            downloadModal.style.display = 'none';
            document.querySelector('.progress-fill').style.width = '0';
            document.querySelector('.progress-text').textContent = 'Preparando download...';
            document.querySelector('.modal-body p').textContent = 'O download do CarMesim_Setup_v2.5.1.exe começará automaticamente em alguns segundos.';
        }
    });
    
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const planoButtons = document.querySelectorAll('.btn-plano');
    planoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const plano = this.querySelector('span').textContent;
            alert(`Iniciando processo para: ${plano}. Você será redirecionado para a página de pagamento.`);
        });
    });
    
    const cyberText = document.querySelector('.cyber-text');
    if (cyberText) {
        setInterval(() => {
            cyberText.style.textShadow = `0 0 ${10 + Math.random() * 10}px #b30000, 0 0 ${20 + Math.random() * 10}px #b30000, 0 0 ${30 + Math.random() * 10}px #b30000`;
        }, 1000);
    }
    
    function triggerButtonShine(button) {
        const shine = button.querySelector('.btn-shine');
        if (shine) {
            shine.style.transition = 'left 0.7s ease';
            shine.style.left = '100%';
            
            setTimeout(() => {
                shine.style.transition = 'none';
                shine.style.left = '-100%';
                
                setTimeout(() => {
                    shine.style.transition = 'left 0.7s ease';
                }, 10);
            }, 700);
        }
    }
    
    allRedButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            triggerButtonShine(this);
        });
    });
    
    setInterval(() => {
        const randomButton = allRedButtons[Math.floor(Math.random() * allRedButtons.length)];
        triggerButtonShine(randomButton);
    }, 2000);
    
    const supportButtons = document.querySelectorAll('.btn-support, .btn-support-secondary');
    supportButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === 'suporte.html' || this.getAttribute('href') === 'login.html') {
                e.preventDefault();
                alert('Redirecionando para a página de suporte/login... Em um site real, isso abriria uma nova página.');
            }
        });
    });
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert(`Obrigado por se inscrever! Em breve você receberá novidades no email: ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    }
    
    const avaliacaoCards = document.querySelectorAll('.avaliacao-card');
    avaliacaoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(179, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
        
        section[id] {
            scroll-margin-top: 120px;
        }
        
        .nav-links a {
            position: relative;
            color: #e0e0e0;
            transition: all 0.3s ease;
        }
        
        .nav-links a:hover {
            color: #b30000 !important;
        }
        
        .nav-links a.active {
            color: #b30000 !important;
            font-weight: 600;
        }
        
        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #b30000;
            transition: width 0.3s ease;
        }
        
        .nav-links a:hover::after {
            width: 100%;
        }
        
        .nav-links a.active::after {
            width: 100% !important;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: #121212;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
                z-index: 1001;
            }
            
            .nav-links.active {
                display: flex;
            }
            
            .nav-links li {
                margin: 10px 0;
            }
            
            .nav-links a {
                padding: 10px 0;
                display: block;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        const navLinksElements = document.querySelectorAll('.nav-links a');
        navLinksElements.forEach(link => {
            link.style.position = 'relative';
            link.style.color = '#e0e0e0';
            link.style.transition = 'color 0.3s ease';
            
            if (link.classList.contains('active')) {
                link.style.color = '#b30000';
            }
            
            link.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = '#b30000';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = '#e0e0e0';
                }
            });
        });
    }, 500);
});
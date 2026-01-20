document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const faqItems = document.querySelectorAll('.faq-item');
    const contatoButtons = document.querySelectorAll('.btn-contato');
    const allRedButtons = document.querySelectorAll('.btn-primary');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    item.classList.toggle('active');
                    
                    if (item.classList.contains('active')) {
                        this.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            this.style.transform = 'scale(1)';
                        }, 150);
                    }
                });
            }
        });
    }

    if (contatoButtons.length > 0) {
        contatoButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                const action = this.querySelector('span').textContent.trim();
                
                const config = {
                    whatsapp: '5511979852682',
                    discord: 'https://discord.gg/dSUcfAdTQQ',
                    email: 'crimsonsuporte@gmail.com'
                };
                
                switch(action) {
                    case 'Abrir Chat':
                        window.open(`https://wa.me/${config.whatsapp}`, '_blank');
                        showNotification('Abrindo WhatsApp...', 'info');
                        break;
                        
                    case 'Enviar E-mail':
                        window.location.href = `mailto:${config.email}`;
                        showNotification('Abrindo cliente de e-mail...', 'info');
                        break;
                        
                    case 'Entrar no Discord':
                        window.open(config.discord, '_blank');
                        showNotification('Redirecionando para o Discord...', 'info');
                        break;
                        
                    default:
                        showNotification(`Ação: ${action}`, 'info');
                }
            });
        });
    }

    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        function highlightNavLink() {
            let scrollY = window.pageYOffset;
            let foundActive = false;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                const sectionMap = {
                    'faq': 'Perguntas Frequentes',
                    'contato': 'Central de Contato'
                };
                
                const menuText = sectionMap[sectionId];
                
                if (menuText && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        if (link.textContent.includes(menuText)) {
                            link.classList.add('active');
                            foundActive = true;
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
            
            if (!foundActive && scrollY < 100) {
                navLinks.forEach(link => {
                    if (link.textContent.includes('Perguntas Frequentes')) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        }
        
        window.addEventListener('scroll', highlightNavLink);

        window.addEventListener('resize', highlightNavLink);

        highlightNavLink();
        
        document.querySelectorAll('.nav-links a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const linkText = this.textContent;
                
                const textToIdMap = {
                    'Perguntas Frequentes': 'faq',
                    'Central de Contato': 'contato'
                };
                
                const sectionId = textToIdMap[linkText];
                
                if (sectionId) {
                    e.preventDefault();
                    
                    const targetElement = document.getElementById(sectionId);
                    
                    if (targetElement) {

                        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                            navLinks.classList.remove('active');
                            if (menuToggle) {
                                menuToggle.classList.remove('active');
                                const icon = menuToggle.querySelector('i');
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                        
                        const offsetTop = targetElement.offsetTop - 80;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        history.pushState(null, null, `#${sectionId}`);
                        
                        navLinks.forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });
    }
    
    initScrollSpy();
    
    function initHeaderScrollEffect() {
        const header = document.querySelector('header');
        
        if (!header) return;
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
                header.style.backdropFilter = 'blur(5px)';
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
            }
        });
        
        header.style.transition = 'box-shadow 0.3s ease, backdrop-filter 0.3s ease, background-color 0.3s ease';
    }
    
    initHeaderScrollEffect();

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

    if (allRedButtons.length > 0) {
        allRedButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                triggerButtonShine(this);
            });
        });

        setInterval(() => {
            const randomButton = allRedButtons[Math.floor(Math.random() * allRedButtons.length)];
            triggerButtonShine(randomButton);
        }, 2000);
    }

    function showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationBg(type)};
            border: 1px solid ${getNotificationBorder(type)};
            border-radius: 8px;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 10000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(120%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }

    function getNotificationBg(type) {
        const backgrounds = {
            success: 'rgba(76, 175, 80, 0.9)',
            error: 'rgba(244, 67, 54, 0.9)',
            info: 'rgba(33, 150, 243, 0.9)',
            warning: 'rgba(255, 152, 0, 0.9)'
        };
        return backgrounds[type] || 'rgba(26, 26, 26, 0.9)';
    }

    function getNotificationBorder(type) {
        const borders = {
            success: '#4caf50',
            error: '#f44336',
            info: '#2196f3',
            warning: '#ff9800'
        };
        return borders[type] || '#333';
    }

    const contatoCards = document.querySelectorAll('.contato-card');
    if (contatoCards.length > 0) {
        contatoCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.contato-icon');
                if (icon) {
                    icon.style.transform = 'rotate(15deg) scale(1.1)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.contato-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0) scale(1)';
                }
            });
        });

        setTimeout(() => {
            contatoCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            });
        }, 500);
    }

    if (faqItems.length > 0) {
        setTimeout(() => {
            faqItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 150);
            });
        }, 500);
    }

    const submitButtons = document.querySelectorAll('.btn-primary');
    if (submitButtons.length > 0) {
        submitButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (!this.disabled) {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .file-item {
            animation: slideIn 0.3s ease;
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
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        section[id] {
            scroll-margin-top: 100px;
        }
    `;
    document.head.appendChild(style);
});
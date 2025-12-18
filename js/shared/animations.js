// ===== ANIMATIONS.JS - Funciones de Animación =====

class AnimationManager {
    constructor() {
        this.isAnimating = false;
        this.observers = new Map();
    }

    // Función para animar la entrada del header
    animateHeader() {
        const header = document.querySelector('.header');
        const title = document.querySelector('.header h1');
        const subtitle = document.querySelector('.header p');

        if (!header || !title || !subtitle) return;

        header.style.opacity = '0';
        header.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            title.style.animation = 'slideInFromLeft 0.8s ease forwards';
        }, 300);

        setTimeout(() => {
            subtitle.style.animation = 'slideInFromRight 0.8s ease forwards';
        }, 500);
    }

    // Función para animar los filtros
    animateFilters() {
        const filters = document.querySelectorAll('.filter-btn');
        filters.forEach((filter, index) => {
            filter.style.opacity = '0';
            filter.style.transform = 'translateY(30px)';
            setTimeout(() => {
                filter.style.transition = 'all 0.5s ease';
                filter.style.opacity = '1';
                filter.style.transform = 'translateY(0)';
            }, index * 100 + 700);
        });
    }

    // Función para animar productos con efecto escalonado
    animateProducts(productos) {
        productos.forEach((producto, index) => {
            setTimeout(() => {
                producto.style.animation = 'fadeInUp 0.6s ease forwards';
                producto.style.animationDelay = `${index * CONFIG.animaciones.delayProductos}ms`;
            }, index * 50);
        });
    }

    // Intersection Observer para animaciones de scroll
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'bounceIn 0.6s ease forwards';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar todas las tarjetas de producto
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });

        this.observers.set('products', observer);
    }

    // Función para crear partículas de fondo
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Función para mostrar notificación animada
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const colors = {
            success: 'linear-gradient(45deg, #00ff88, #00cc6a)',
            error: 'linear-gradient(45deg, #ff4757, #ff6b7a)',
            warning: 'linear-gradient(45deg, #ffa502, #ff7675)'
        };

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type] || colors.success};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 1rem 1.5rem;
            border-radius: 15px;
            font-weight: bold;
            z-index: ${CONFIG.zIndex?.notification || 10001};
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            max-width: 300px;
        `;

        notification.innerHTML = message;
        document.body.appendChild(notification);

        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover después del tiempo configurado
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, CONFIG.animaciones.duracionNotificacion);

        return notification;
    }

    // Función para animar transiciones de filtro
    animateFilterTransition(container, callback) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const items = container.querySelectorAll('.product-card');
        
        // Animación de salida
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'fadeInUp 0.3s ease reverse';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-30px) scale(0.8)';
            }, index * 50);
        });

        // Ejecutar callback después de la animación de salida
        setTimeout(() => {
            if (callback) callback();
            this.isAnimating = false;
        }, items.length * 50 + 200);
    }

    // Función para animar modal de entrada
    animateModalEnter(modal) {
        modal.classList.add('active');
        const content = modal.querySelector('.modal-content, .modal-content-base, .cart-modal-content');
        if (content) {
            content.style.animation = 'modalEnter 0.3s ease forwards';
        }
    }

    // Función para animar modal de salida
    animateModalExit(modal, callback) {
        const content = modal.querySelector('.modal-content, .modal-content-base, .cart-modal-content');
        if (content) {
            content.style.animation = 'modalExit 0.3s ease forwards';
        }
        
        setTimeout(() => {
            modal.classList.remove('active');
            if (callback) callback();
        }, CONFIG.animaciones.duracionModal);
    }

    // Función para animar contador del carrito
    animateCartCounter(element) {
        element.classList.add('bounce');
        setTimeout(() => {
            element.classList.remove('bounce');
        }, 600);
    }

    // Función para animar hover de productos
    setupProductHoverAnimations() {
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                card.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
                card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.2)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }
        });
    }

    // Función para limpiar observers
    cleanup() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
    }

    // Función para inicializar todas las animaciones
    init() {
        // Crear partículas de fondo
        this.createParticles();
        
        // Animaciones de entrada
        this.animateHeader();
        this.animateFilters();
        
        // Configurar animaciones de scroll
        this.setupScrollAnimations();
        
        // Configurar hover de productos
        this.setupProductHoverAnimations();
        
        // Scroll suave
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// Crear instancia global
const animationManager = new AnimationManager();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.animationManager = animationManager;
}
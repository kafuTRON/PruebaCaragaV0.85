/* ========== JAVASCRIPT PRINCIPAL INDEX.HTML ========== */

class IndexManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupImageLazyLoading();
        this.setupPerformanceOptimizations();
    }

    // Configurar navegación
    setupNavigation() {
        // Función para navegar a otras páginas
        window.irA = (url) => {
            // Precargar la página antes de navegar (opcional)
            this.preloadPage(url);
            window.location.href = url;
        };
    }

    // Configurar carga perezosa de imágenes
    setupImageLazyLoading() {
        const images = document.querySelectorAll('.panel img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        images.forEach(img => {
            if (img.src) {
                // Si ya tiene src, observar para optimizaciones futuras
                imageObserver.observe(img);
            }
        });
    }

    // Optimizaciones de rendimiento
    setupPerformanceOptimizations() {
        // Precargar recursos críticos
        this.preloadCriticalResources();
        
        // Configurar service worker (si está disponible)
        this.setupServiceWorker();
        
        // Optimizar scroll
        this.optimizeScrolling();
    }

    // Precargar recursos críticos
    preloadCriticalResources() {
        const criticalImages = [
            'recursos/M&M/M&M.png',
            'recursos/A&A/A&A.png',
            'recursos/CDL/CDL.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Configurar Service Worker para cache
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registrado:', registration);
                })
                .catch(error => {
                    console.log('SW falló:', error);
                });
        }
    }

    // Optimizar scrolling
    optimizeScrolling() {
        let ticking = false;

        const updateScrollPosition = () => {
            // Aquí puedes agregar lógica de scroll si es necesaria
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Precargar página (opcional)
    preloadPage(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }

    // Obtener métricas de rendimiento
    getPerformanceMetrics() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            return {
                loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
            };
        }
        return null;
    }
}

// Inicializar cuando el DOM esté listo
const indexManager = new IndexManager();
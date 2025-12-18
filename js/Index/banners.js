// ===== BANNERS.JS - Sistema de Cartelones Laterales =====

class BannerManager {
    constructor() {
        this.currentLeftIndex = 0;
        this.currentRightIndex = 1;
        this.bannerInterval = null;
        this.isPaused = false;
    }

    // Función para obtener el icono según la cantidad de items
    createBannerImage(src, isActive = false) {
        const img = document.createElement('img');
        img.src = src;
        img.className = `banner-image ${isActive ? 'active' : ''}`;
        img.alt = 'Cartelón A&A Perfumería';
        
        // Agregar efecto de carga
        img.onload = function() {
            this.style.opacity = isActive ? '1' : '0';
        };
        
        return img;
    }

    // Función para inicializar los cartelones
    initializeBanners() {
        const leftContainer = document.querySelector('#leftBanner .banner-container');
        const rightContainer = document.querySelector('#rightBanner .banner-container');
        
        if (!leftContainer || !rightContainer) {
            console.warn('Contenedores de banner no encontrados');
            return;
        }
        
        // Limpiar contenedores
        leftContainer.innerHTML = '';
        rightContainer.innerHTML = '';
        
        // Agregar todas las imágenes a ambos contenedores
        CONFIG.cartelones.forEach((cartelon, index) => {
            // Cartelón izquierdo
            const leftImg = this.createBannerImage(cartelon, index === this.currentLeftIndex);
            leftContainer.appendChild(leftImg);
            
            // Cartelón derecho
            const rightImg = this.createBannerImage(cartelon, index === this.currentRightIndex);
            rightContainer.appendChild(rightImg);
        });

        // Configurar eventos de hover
        this.setupHoverEvents();
    }

    // Función para cambiar cartelones con animación suave
    changeBanners() {
        if (this.isPaused) return;

        const leftImages = document.querySelectorAll('#leftBanner .banner-image');
        const rightImages = document.querySelectorAll('#rightBanner .banner-image');
        
        // Ocultar cartelones actuales
        if (leftImages[this.currentLeftIndex]) {
            leftImages[this.currentLeftIndex].classList.remove('active');
        }
        if (rightImages[this.currentRightIndex]) {
            rightImages[this.currentRightIndex].classList.remove('active');
        }
        
        // Calcular nuevos índices aleatorios
        let newLeftIndex, newRightIndex;
        
        do {
            newLeftIndex = Math.floor(Math.random() * CONFIG.cartelones.length);
        } while (newLeftIndex === this.currentLeftIndex);
        
        do {
            newRightIndex = Math.floor(Math.random() * CONFIG.cartelones.length);
        } while (newRightIndex === this.currentRightIndex || newRightIndex === newLeftIndex);
        
        // Actualizar índices
        this.currentLeftIndex = newLeftIndex;
        this.currentRightIndex = newRightIndex;
        
        // Mostrar nuevos cartelones con delay para efecto suave
        setTimeout(() => {
            if (leftImages[this.currentLeftIndex]) {
                leftImages[this.currentLeftIndex].classList.add('active');
            }
            if (rightImages[this.currentRightIndex]) {
                rightImages[this.currentRightIndex].classList.add('active');
            }
        }, 500);
    }

    // Función para iniciar el ciclo automático de cartelones
    startRotation() {
        this.bannerInterval = setInterval(() => {
            this.changeBanners();
        }, CONFIG.animaciones.duracionCartelones);
    }

    // Función para pausar la rotación
    pauseRotation() {
        this.isPaused = true;
        if (this.bannerInterval) {
            clearInterval(this.bannerInterval);
            this.bannerInterval = null;
        }
    }

    // Función para reanudar la rotación
    resumeRotation() {
        this.isPaused = false;
        if (!this.bannerInterval) {
            this.startRotation();
        }
    }

    // Función para cambiar cartelones basado en la categoría seleccionada
    updateForCategory(categoria) {
        // Opcional: hacer que ciertos cartelones aparezcan más frecuentemente
        // según la categoría seleccionada
        
        if (categoria === 'hombre' || categoria === 'mujer') {
            // Cambiar cartelones cuando se selecciona una categoría específica
            this.changeBanners();
        } else if (categoria === 'todos') {
            // Cambio aleatorio normal
            this.changeBanners();
        }
    }

    // Configurar eventos de hover para pausar/reanudar
    setupHoverEvents() {
        const banners = document.querySelectorAll('.side-banners');
        
        banners.forEach(banner => {
            banner.addEventListener('mouseenter', () => {
                this.pauseRotation();
            });
            
            banner.addEventListener('mouseleave', () => {
                this.resumeRotation();
            });
        });
    }

    // Configurar eventos de visibilidad de la página
    setupVisibilityEvents() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseRotation();
            } else {
                this.resumeRotation();
            }
        });
    }

    // Función para verificar si los cartelones son visibles
    areBannersVisible() {
        const leftBanner = document.querySelector('#leftBanner');
        const rightBanner = document.querySelector('#rightBanner');
        
        if (!leftBanner || !rightBanner) return false;
        
        const leftStyle = window.getComputedStyle(leftBanner);
        const rightStyle = window.getComputedStyle(rightBanner);
        
        return leftStyle.display !== 'none' && rightStyle.display !== 'none';
    }

    // Función para redimensionar cartelones según el viewport
    handleResize() {
        if (!this.areBannersVisible()) {
            this.pauseRotation();
            return;
        }
        
        if (this.isPaused && this.areBannersVisible()) {
            this.resumeRotation();
        }
    }

    // Función para limpiar recursos
    cleanup() {
        this.pauseRotation();
        
        // Remover event listeners si es necesario
        const banners = document.querySelectorAll('.side-banners');
        banners.forEach(banner => {
            banner.replaceWith(banner.cloneNode(true));
        });
    }

    // Función para inicializar todo el sistema de banners
    init() {
        // Verificar si los elementos existen
        const leftBanner = document.querySelector('#leftBanner');
        const rightBanner = document.querySelector('#rightBanner');
        
        if (!leftBanner || !rightBanner) {
            console.warn('Elementos de banner no encontrados, saltando inicialización');
            return;
        }

        // Inicializar cartelones
        this.initializeBanners();
        
        // Configurar eventos
        this.setupVisibilityEvents();
        
        // Configurar resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Iniciar rotación después de un delay
        setTimeout(() => {
            if (this.areBannersVisible()) {
                this.startRotation();
            }
        }, 2000);
    }
}

// Crear instancia global
const bannerManager = new BannerManager();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.bannerManager = bannerManager;
}
// ===== MAIN.JS - Inicialización y Eventos Principales =====

class CatalogoApp {
    constructor() {
        this.isInitialized = false;
        this.managers = {};
    }

    // Función para inicializar todos los managers
    initializeManagers() {
        try {
            // Inicializar manager de animaciones
            if (typeof animationManager !== 'undefined') {
                this.managers.animation = animationManager;
                console.log('✅ Animation Manager inicializado');
            }

            // Inicializar manager de banners
            if (typeof bannerManager !== 'undefined') {
                this.managers.banner = bannerManager;
                console.log('✅ Banner Manager inicializado');
            }

            // Inicializar manager de productos
            if (typeof productManager !== 'undefined') {
                this.managers.product = productManager;
                console.log('✅ Product Manager inicializado');
            }

            // Inicializar manager de carrito
            if (typeof cartManager !== 'undefined') {
                this.managers.cart = cartManager;
                console.log('✅ Cart Manager inicializado');
            }

            // Inicializar manager de modales
            if (typeof modalManager !== 'undefined') {
                this.managers.modal = modalManager;
                modalManager.init();
                console.log('✅ Modal Manager inicializado');
            }

        } catch (error) {
            console.error('Error inicializando managers:', error);
        }
    }

    // Función para configurar eventos globales
    setupGlobalEvents() {
        // Cerrar modales con tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Cerrar modales al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-base') || 
                event.target.classList.contains('product-modal') || 
                event.target.classList.contains('cart-modal')) {
                this.closeAllModals();
            }
        });

        // Manejar errores de imágenes
        document.addEventListener('error', (event) => {
            if (event.target.tagName === 'IMG') {
                this.handleImageError(event.target);
            }
        }, true);

        // Optimizar rendimiento en scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 100);
        });

        console.log('✅ Eventos globales configurados');
    }

    // Función para cerrar todos los modales
    closeAllModals() {
        // Cerrar modal de producto
        if (this.managers.modal && typeof this.managers.modal.closeProductModal === 'function') {
            this.managers.modal.closeProductModal();
        }

        // Cerrar modal de carrito
        if (this.managers.cart && typeof this.managers.cart.closeCartModal === 'function') {
            this.managers.cart.closeCartModal();
        }

        // Función de respaldo para cerrar modales
        const modals = document.querySelectorAll('.modal-base.active, .product-modal.active, .cart-modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });

        // Restaurar scroll del body
        document.body.style.overflow = 'auto';
    }

    // Función para manejar errores de imágenes
    handleImageError(img) {
        console.warn('Error cargando imagen:', img.src);
        
        // Agregar clase de error
        img.classList.add('image-error');
        
        // Mostrar placeholder o imagen por defecto
        img.style.background = 'linear-gradient(45deg, #333, #555)';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.color = '#888';
        img.style.fontSize = '0.9rem';
        img.alt = 'Imagen no disponible';
    }

    // Función para manejar scroll
    handleScroll() {
        // Aquí puedes agregar lógica para optimizar el scroll
        // Por ejemplo, lazy loading de imágenes, etc.
    }

    // Función para verificar dependencias
    checkDependencies() {
        const requiredGlobals = ['CONFIG', 'PRODUCTOS', 'STATE'];
        const missingDependencies = [];

        requiredGlobals.forEach(global => {
            if (typeof window[global] === 'undefined') {
                missingDependencies.push(global);
            }
        });

        if (missingDependencies.length > 0) {
            console.error('❌ Dependencias faltantes:', missingDependencies);
            return false;
        }

        console.log('✅ Todas las dependencias están disponibles');
        return true;
    }

    // Función para mostrar loading
    showLoading() {
        const loading = document.createElement('div');
        loading.id = 'app-loading';
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            color: #ffd700;
            font-size: 1.2rem;
        `;
        
        loading.innerHTML = `
            <div style="text-align: center;">
                <div class="loading" style="margin: 0 auto 1rem;"></div>
                <div>Cargando A&A Perfumería...</div>
            </div>
        `;
        
        document.body.appendChild(loading);
    }

    // Función para ocultar loading
    hideLoading() {
        const loading = document.getElementById('app-loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.remove();
            }, 300);
        }
    }

    // Función para inicializar la aplicación
    async init() {
        if (this.isInitialized) {
            console.warn('La aplicación ya está inicializada');
            return;
        }

        console.log('🚀 Iniciando A&A Catálogo...');
        
        try {
            // Mostrar loading
            this.showLoading();

            // Verificar dependencias
            if (!this.checkDependencies()) {
                throw new Error('Dependencias faltantes');
            }

            // Inicializar managers
            this.initializeManagers();

            // Configurar eventos globales
            this.setupGlobalEvents();

            // Inicializar cada manager
            await this.initializeAllSystems();

            // Marcar como inicializado
            this.isInitialized = true;

            // Ocultar loading
            setTimeout(() => {
                this.hideLoading();
            }, 1000);

            console.log('✅ A&A Catálogo inicializado correctamente');

        } catch (error) {
            console.error('❌ Error inicializando la aplicación:', error);
            this.hideLoading();
            this.showErrorMessage('Error al cargar la aplicación. Por favor, recarga la página.');
        }
    }

    // Función para inicializar todos los sistemas
    async initializeAllSystems() {
        const initPromises = [];

        // Inicializar animaciones
        if (this.managers.animation) {
            initPromises.push(
                new Promise(resolve => {
                    setTimeout(() => {
                        this.managers.animation.init();
                        resolve();
                    }, 100);
                })
            );
        }

        // Inicializar productos
        if (this.managers.product) {
            initPromises.push(
                new Promise(resolve => {
                    setTimeout(() => {
                        this.managers.product.init();
                        resolve();
                    }, 500);
                })
            );
        }

        // Inicializar carrito
        if (this.managers.cart) {
            initPromises.push(
                new Promise(resolve => {
                    this.managers.cart.init();
                    resolve();
                })
            );
        }

        // Inicializar banners
        if (this.managers.banner) {
            initPromises.push(
                new Promise(resolve => {
                    setTimeout(() => {
                        this.managers.banner.init();
                        resolve();
                    }, 1500);
                })
            );
        }

        // Esperar a que todos se inicialicen
        await Promise.all(initPromises);
    }

    // Función para mostrar mensaje de error
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff4757, #ff6b7a);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            z-index: 99999;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        errorDiv.innerHTML = `
            <h3 style="margin-bottom: 1rem;">⚠️ Error</h3>
            <p style="margin-bottom: 1.5rem;">${message}</p>
            <button onclick="location.reload()" style="
                background: white;
                color: #ff4757;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            ">Recargar Página</button>
        `;
        
        document.body.appendChild(errorDiv);
    }

    // Función para limpiar recursos al salir
    cleanup() {
        // Limpiar cada manager
        Object.values(this.managers).forEach(manager => {
            if (manager && typeof manager.cleanup === 'function') {
                manager.cleanup();
            }
        });

        // Limpiar eventos globales
        document.removeEventListener('keydown', this.closeAllModals);
        document.removeEventListener('click', this.closeAllModals);

        this.isInitialized = false;
        console.log('🧹 Recursos limpiados');
    }
}

// Crear instancia global de la aplicación
const catalogoApp = new CatalogoApp();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    catalogoApp.init();
});

// Limpiar recursos antes de salir
window.addEventListener('beforeunload', () => {
    catalogoApp.cleanup();
});

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.catalogoApp = catalogoApp;
}
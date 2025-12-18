/**
 * ===== MOBILE ULTRA MAIN.JS =====
 * JavaScript principal para A&A Perfumería - Versión Móvil Ultra Optimizada
 * Arquitectura modular con gestión inteligente de recursos
 */

// ===== CONFIGURACIÓN Y DATOS =====

const CONFIG = {
    whatsapp: '2721224946',
    
    precios: {
        tamaños: {
            '10ml': 90,
            '30ml': 180,
            '60ml': 220,
            '100ml': 280
        },
        extras: {
            'doble_fijador': {
                nombre: 'Doble Fijador',
                descripcion: 'Mayor duración y proyección',
                precio: 35,
                disponibleDesde: '30ml'
            },
            'feromonas': {
                nombre: 'Feromonas',
                descripcion: 'Atracción y magnetismo personal',
                precio: 35,
                disponibleDesde: '30ml'
            }
        },
        entregaDomicilio: 50
    },
    
    iconos: {
        carrito: {
            vacio: 'recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png',
            semiVacio: 'recursos/A&A/Material Grafico/Carrito_de_compras_SemiVacio.png',
            semiLleno: 'recursos/A&A/Material Grafico/Carrito_de_compras_Semilleno.png',
            lleno: 'recursos/A&A/Material Grafico/Carrito_de_compras_Lleno.png'
        }
    },
    
    animaciones: {
        duracionModal: 300,
        duracionNotificacion: 3000,
        delayProductos: 100
    }
};

// Base de datos de productos optimizada para móvil
const PRODUCTOS = [
    // CABALLEROS
    {
        id: 1, nombre: "Alam", inspirado: "Fragancia masculina exclusiva",
        descripcion: "Una fragancia sofisticada y elegante, perfecta para el caballero moderno.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Alam.jpg"
    },
    {
        id: 2, nombre: "Anuar", inspirado: "Fragancia masculina intensa",
        descripcion: "Intenso y carismático, ideal para ocasiones especiales.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Anuar.jpg"
    },
    {
        id: 3, nombre: "Cristian", inspirado: "Fragancia masculina fresca",
        descripcion: "Fresco y dinámico, perfecto para el día a día.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Cristian.jpg"
    },
    {
        id: 4, nombre: "Cucho", inspirado: "Fragancia masculina audaz",
        descripcion: "Audaz y distintivo, para hombres que marcan la diferencia.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Cucho.jpg"
    },
    {
        id: 5, nombre: "Eduardo", inspirado: "Fragancia masculina clásica",
        descripcion: "Clásico y refinado, una fragancia atemporal.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Eduardo.jpg"
    },
    {
        id: 6, nombre: "Ismael", inspirado: "Fragancia masculina seductora",
        descripcion: "Seductor y magnético, conquista desde el primer momento.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Ismael.jpg"
    },
    {
        id: 7, nombre: "Israel", inspirado: "Fragancia masculina poderosa",
        descripcion: "Poderoso y enérgico, para hombres seguros de sí mismos.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Israel.jpg"
    },
    {
        id: 8, nombre: "Mandingo", inspirado: "Fragancia masculina exótica",
        descripcion: "Exótico y misterioso, una fragancia única e irresistible.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Mandingo.jpg"
    },
    {
        id: 9, nombre: "Mateo", inspirado: "Fragancia masculina juvenil",
        descripcion: "Juvenil y vibrante, perfecto para el hombre contemporáneo.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Mateo.jpg"
    },
    {
        id: 10, nombre: "Milton", inspirado: "Fragancia masculina distinguida",
        descripcion: "Distinguido y elegante, para ocasiones importantes.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Milton.jpg"
    },
    {
        id: 11, nombre: "Pedro", inspirado: "Fragancia masculina tradicional",
        descripcion: "Tradicional con un toque moderno, una fragancia versátil.",
        precio: "$45.000", categoria: "hombre", imagen: "recursos/A&A/caballeros_A&A/Pedro.jpg"
    },
    
    // DAMAS
    {
        id: 12, nombre: "Adele", inspirado: "Inspirado en Chance Chanel",
        descripcion: "Elegante y sofisticada, una fragancia que marca presencia.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Adele(Chance_Chanel).jpg"
    },
    {
        id: 13, nombre: "Adelita", inspirado: "Inspirado en Born In Roma Valentino",
        descripcion: "Moderna y audaz, perfecta para la mujer contemporánea.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Adelita(Born_In_Roma_Valentino).jpg"
    },
    {
        id: 14, nombre: "Alondra", inspirado: "Inspirado en Bade'e AI Oud Honor&Glory Lattafa",
        descripcion: "Exótica y misteriosa, con notas orientales cautivadoras.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Alondra(Bade'e_AI_Oud_Honor&Glory_Lattafa).jpg"
    },
    {
        id: 15, nombre: "Angelica", inspirado: "Inspirado en Yara Moi de Lattafa",
        descripcion: "Dulce y envolvente, una fragancia que enamora.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Angelica(Yara_Moi_de_Lattafa).jpg"
    },
    {
        id: 16, nombre: "Anina", inspirado: "Inspirado en Light Blue Dolce&Gabbana",
        descripcion: "Fresca y mediterránea, perfecta para el verano.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Anina(Light_Blue_Dolce&Gabbana).jpg"
    },
    {
        id: 17, nombre: "Blanca", inspirado: "Inspirado en Good Girl Blush Carolina Herrera",
        descripcion: "Seductora y femenina, una fragancia irresistible.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Blanca(Good_Girl_Blush_EAN_Carolina_Herrera).jpg"
    },
    {
        id: 18, nombre: "Diana", inspirado: "Inspirado en Kenzo Flower",
        descripcion: "Floral y delicada, como un jardín en primavera.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Diana(Kenzo_Flower).jpg"
    },
    {
        id: 19, nombre: "Dolores", inspirado: "Inspirado en Scandal Jean Paul Gaultier",
        descripcion: "Provocativa y sensual, para mujeres que no pasan desapercibidas.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Dolores(Scandal_Jean_Paul_Gaultier).jpg"
    },
    {
        id: 20, nombre: "Eaned", inspirado: "Inspirado en Ralph Laurent",
        descripcion: "Clásica y refinada, una fragancia atemporal.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Eaned(Ralph_Laurent).jpg"
    },
    {
        id: 21, nombre: "Esther", inspirado: "Inspirado en Khamrah Qahwa de Lattafa",
        descripcion: "Rica y especiada, con notas de café y especias orientales.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Esther(Khamrah_Qahwa_de_Lattafa).jpg"
    },
    {
        id: 22, nombre: "Inani", inspirado: "Inspirado en Miss Dior",
        descripcion: "Romántica y elegante, la esencia de la feminidad.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Inani(Miss_Dior_Dior).jpg"
    },
    {
        id: 23, nombre: "Ivane", inspirado: "Inspirado en Sweet like Candy Ariana Grande",
        descripcion: "Dulce y juguetona, perfecta para mujeres jóvenes y divertidas.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Ivane(Sweed_like_Candy_Ariana_Grande).jpg"
    },
    {
        id: 24, nombre: "Judith", inspirado: "Inspirado en Yara De Lattafa",
        descripcion: "Intensa y cautivadora, una fragancia que deja huella.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Judith(Yara_De_Lattafa).jpg"
    },
    {
        id: 25, nombre: "Knoz", inspirado: "Inspirado en Cloud Ariana Grande",
        descripcion: "Suave y etérea, como caminar entre nubes.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Knoz(Cloud_Ariana_Grande).jpg"
    },
    {
        id: 26, nombre: "Martha", inspirado: "Inspirado en Chanel No5",
        descripcion: "Icónica y legendaria, la fragancia más famosa del mundo.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Martha(Chanel_No5).jpg"
    },
    {
        id: 27, nombre: "Nahomi", inspirado: "Inspirado en Halloween",
        descripcion: "Misteriosa y seductora, perfecta para noches especiales.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Nahomi(Hallowen).jpg"
    },
    {
        id: 28, nombre: "Olimpia", inspirado: "Inspirado en Libre Yves Saint Laurent",
        descripcion: "Libre y audaz, para mujeres que viven sin límites.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Olimpia(Libre_EAN_Parfum_Yves_Saint_Laurent).jpg"
    },
    {
        id: 29, nombre: "Rosa", inspirado: "Inspirado en Rock In Rio Escada",
        descripcion: "Vibrante y energética, perfecta para festivales y celebraciones.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Rosa(Rock_In_Rio_Escada).jpg"
    },
    {
        id: 30, nombre: "Sarai", inspirado: "Inspirado en Can Can Paris Hilton",
        descripcion: "Glamorosa y sofisticada, para mujeres que aman brillar.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Sarai(Can_Can_Paris_Hilton).jpg"
    },
    {
        id: 31, nombre: "Sofia", inspirado: "Inspirado en Meow Katy Perry",
        descripcion: "Divertida y coqueta, perfecta para mujeres con personalidad.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Sofia(Meow_Katy_perry).jpg"
    },
    {
        id: 32, nombre: "Tamara", inspirado: "Inspirado en 212 Clásico Carolina Herrera",
        descripcion: "Urbana y moderna, la fragancia de la mujer cosmopolita.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Tamara(212_Clasico_Carolina_Herrera).jpg"
    },
    {
        id: 33, nombre: "Yadira", inspirado: "Inspirado en Thank You Next Ariana Grande",
        descripcion: "Empoderada y segura, para mujeres que siguen adelante.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Yadira(Thank_You_Next_Ariana_Grande).jpg"
    },
    {
        id: 34, nombre: "Yatae", inspirado: "Inspirado en Coco Mademoiselle de Chanel",
        descripcion: "Elegante y rebelde, la fragancia de la mujer independiente.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Yatae(Coco_Mademoiselle_de_Chanel).jpg"
    },
    {
        id: 35, nombre: "Yesenia", inspirado: "Inspirado en Olympèa Paco Rabanne",
        descripcion: "Divina y poderosa, como una diosa moderna.",
        precio: "$42.000", categoria: "mujer", imagen: "recursos/A&A/Damas_A&A/Yesenia(Olympèa_PacoRabanne).jpg"
    }
];

// ===== CLASE PRINCIPAL DE LA APLICACIÓN MÓVIL =====

class MobileAAApp {
    constructor() {
        this.currentCategory = 'todos';
        this.cart = [];
        this.isLoading = false;
        this.currentModal = null;
        
        // Configuración adaptativa según capacidades del dispositivo
        this.config = {
            maxImageSize: DeviceCapabilities.isLowEndDevice() ? 200 : 400,
            lazyLoadOffset: DeviceCapabilities.isSlowConnection() ? 100 : 50,
            animationDuration: DeviceCapabilities.isLowEndDevice() ? 150 : 300,
            batchSize: DeviceCapabilities.memory < 2 ? 6 : 12
        };
        
        this.init();
    }
    
    // ===== INICIALIZACIÓN =====
    
    async init() {
        try {
            PerfMonitor.mark('appInit');
            
            console.log('📱 Inicializando A&A Mobile Ultra...');
            
            // Cargar carrito desde localStorage
            this.loadCartFromStorage();
            
            // Inicializar componentes
            await this.initializeComponents();
            
            // Configurar eventos
            this.setupEventListeners();
            
            // Cargar contenido inicial
            await this.loadInitialContent();
            
            PerfMonitor.measure('App Initialization', 'appInit');
            console.log('✅ A&A Mobile Ultra inicializada correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando la aplicación:', error);
            this.showErrorMessage('Error al cargar la aplicación. Por favor, recarga la página.');
        }
    }
    
    async initializeComponents() {
        // Inicializar filtros
        this.renderFilters();
        
        // Actualizar contador del carrito
        this.updateCartCounter();
        
        // Configurar intersection observer para lazy loading
        this.setupLazyLoading();
        
        // Configurar gestos táctiles
        this.setupTouchGestures();
    }
    
    setupEventListeners() {
        // Eventos de filtros
        document.addEventListener('click', (e) => {
            if (e.target.matches('.filter-btn')) {
                this.handleFilterClick(e.target);
            }
        });
        
        // Eventos de productos
        document.addEventListener('click', (e) => {
            if (e.target.matches('.product-card, .product-card *')) {
                const card = e.target.closest('.product-card');
                if (card) {
                    const productId = parseInt(card.dataset.productId);
                    this.openProductModal(productId);
                }
            }
        });
        
        // Eventos del carrito
        document.addEventListener('click', (e) => {
            if (e.target.matches('.cart-button, .cart-button *')) {
                e.preventDefault();
                this.openCart();
            }
        });
        
        // Cerrar modales con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });
        
        // Optimizar scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 100);
        }, { passive: true });
    }
    
    async loadInitialContent() {
        // Mostrar skeletons mientras carga
        this.showLoadingSkeletons();
        
        // Simular delay mínimo para UX suave
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Cargar productos de la categoría actual
        await this.loadProducts(this.currentCategory);
        
        // Ocultar skeletons
        this.hideLoadingSkeletons();
    }
    
    // ===== GESTIÓN DE FILTROS =====
    
    renderFilters() {
        const container = document.getElementById('filtersContainer');
        if (!container) return;
        
        const filters = [
            { key: 'todos', label: 'Todos', icon: '🌟' },
            { key: 'hombre', label: 'Hombre', icon: '👨' },
            { key: 'mujer', label: 'Mujer', icon: '👩' },
            { key: 'unisex', label: 'Unisex', icon: '⚡' }
        ];
        
        container.innerHTML = filters.map(filter => `
            <button class="filter-btn ${filter.key === this.currentCategory ? 'active' : ''}" 
                    data-category="${filter.key}"
                    aria-label="Filtrar por ${filter.label}">
                <span style="margin-right: 0.5rem;">${filter.icon}</span>
                ${filter.label}
            </button>
        `).join('');
    }
    
    async handleFilterClick(button) {
        if (this.isLoading) return;
        
        const category = button.dataset.category;
        if (category === this.currentCategory) return;
        
        // Actualizar estado visual
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Actualizar categoría
        this.currentCategory = category;
        
        // Cargar productos con animación
        await this.loadProducts(category, true);
        
        // Scroll suave al inicio de productos
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // ===== GESTIÓN DE PRODUCTOS =====
    
    async loadProducts(category, animated = false) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        PerfMonitor.mark('loadProducts');
        
        try {
            // Filtrar productos
            let products = category === 'todos' ? PRODUCTOS : PRODUCTOS.filter(p => p.categoria === category);
            
            // Mostrar mensaje si no hay productos
            const noProductsMsg = document.getElementById('noProductsMessage');
            if (products.length === 0) {
                noProductsMsg?.classList.remove('d-none');
                document.getElementById('productsGrid').innerHTML = '';
                return;
            } else {
                noProductsMsg?.classList.add('d-none');
            }
            
            // Renderizar productos
            await this.renderProducts(products, animated);
            
            PerfMonitor.measure('Products Loaded', 'loadProducts');
            console.log(`📦 ${products.length} productos cargados para categoría: ${category}`);
            
        } catch (error) {
            console.error('❌ Error cargando productos:', error);
            this.showErrorMessage('Error al cargar los productos');
        } finally {
            this.isLoading = false;
        }
    }
    
    async renderProducts(products, animated = false) {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;
        
        // Limpiar grid si es necesario
        if (animated) {
            grid.style.opacity = '0.5';
            await new Promise(resolve => setTimeout(resolve, 150));
        }
        
        // Renderizar en lotes para mejor rendimiento
        const batchSize = this.config.batchSize;
        let html = '';
        
        for (let i = 0; i < products.length; i += batchSize) {
            const batch = products.slice(i, i + batchSize);
            html += batch.map((product, index) => this.createProductCard(product, i + index)).join('');
            
            // Permitir que el navegador respire entre lotes
            if (i + batchSize < products.length) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
        
        grid.innerHTML = html;
        
        // Configurar lazy loading para las nuevas imágenes
        this.setupLazyLoadingForImages(grid);
        
        // Animación de entrada si es necesario
        if (animated) {
            grid.style.opacity = '1';
            this.animateProductsEntrance();
        }
    }
    
    createProductCard(product, index) {
        const delay = Math.min(index * 50, 500); // Máximo 500ms de delay
        
        return `
            <article class="product-card" 
                     data-product-id="${product.id}"
                     style="animation-delay: ${delay}ms;"
                     role="button"
                     tabindex="0"
                     aria-label="Ver detalles de ${product.nombre}">
                <div class="product-image-container">
                    <img class="product-image lazy-image" 
                         data-src="${product.imagen}" 
                         alt="${product.nombre}"
                         loading="lazy">
                    <div class="product-category-badge">
                        ${product.categoria === 'hombre' ? '👨' : product.categoria === 'mujer' ? '👩' : '⚡'}
                    </div>
                </div>
                
                <div class="product-info">
                    <h3 class="product-name">${product.nombre}</h3>
                    <p class="product-inspired">${product.inspirado}</p>
                    <p class="product-description">${this.truncateText(product.descripcion, 80)}</p>
                    <div class="product-price">${product.precio}</div>
                    
                    <button class="btn-product-action" 
                            onclick="event.stopPropagation(); MobileApp.openProductModal(${product.id})"
                            aria-label="Ver detalles y precios de ${product.nombre}">
                        Ver detalles
                    </button>
                </div>
            </article>
        `;
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }
    
    animateProductsEntrance() {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    // ===== LAZY LOADING =====
    
    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) {
            // Fallback para navegadores sin soporte
            this.loadAllImages();
            return;
        }
        
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: `${this.config.lazyLoadOffset}px`
        });
    }
    
    setupLazyLoadingForImages(container) {
        const images = container.querySelectorAll('.lazy-image[data-src]');
        images.forEach(img => {
            if (this.imageObserver) {
                this.imageObserver.observe(img);
            } else {
                this.loadImage(img);
            }
        });
    }
    
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;
        
        // Crear imagen temporal para precargar
        const tempImg = new Image();
        
        tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };
        
        tempImg.onerror = () => {
            img.classList.add('error');
            img.alt = 'Error al cargar imagen';
            console.warn('Error cargando imagen:', src);
        };
        
        tempImg.src = src;
    }
    
    loadAllImages() {
        const images = document.querySelectorAll('.lazy-image[data-src]');
        images.forEach(img => this.loadImage(img));
    }
    
    // ===== LOADING SKELETONS =====
    
    showLoadingSkeletons() {
        const container = document.getElementById('loadingSkeletons');
        if (!container) return;
        
        const skeletonCount = this.config.batchSize;
        const skeletons = Array.from({ length: skeletonCount }, () => `
            <div class="skeleton-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-text title"></div>
                <div class="skeleton skeleton-text subtitle"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text price"></div>
            </div>
        `).join('');
        
        container.innerHTML = skeletons;
        container.classList.remove('d-none');
    }
    
    hideLoadingSkeletons() {
        const container = document.getElementById('loadingSkeletons');
        if (container) {
            container.classList.add('d-none');
        }
    }
    
    // ===== GESTIÓN DE ERRORES =====
    
    showErrorMessage(message) {
        // Crear notificación de error
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-text">${message}</span>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Agregar estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 71, 87, 0.95);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// ===== INSTANCIA GLOBAL =====

let MobileApp;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    MobileApp = new MobileAAApp();
    
    // Exponer globalmente para compatibilidad
    window.MobileApp = MobileApp;
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MobileAAApp, CONFIG, PRODUCTOS };
}

// ===== CONTINUACIÓN: GESTIÓN DE MODALES Y CARRITO =====

// Extender la clase MobileAAApp con funcionalidades de modales
Object.assign(MobileAAApp.prototype, {
    
    // ===== MODAL DE PRODUCTO =====
    
    async openProductModal(productId) {
        const product = PRODUCTOS.find(p => p.id === productId);
        if (!product) {
            console.error('Producto no encontrado:', productId);
            return;
        }
        
        PerfMonitor.mark('modalOpen');
        
        // Crear modal
        const modal = this.createProductModal(product);
        
        // Agregar al DOM
        const container = document.getElementById('modalContainer');
        container.innerHTML = modal;
        
        // Configurar eventos del modal
        this.setupProductModalEvents(product);
        
        // Mostrar con animación
        await this.showModal('productModal');
        
        // Prevenir scroll del body
        this.preventBodyScroll();
        
        PerfMonitor.measure('Product Modal Opened', 'modalOpen');
        console.log('📱 Modal de producto abierto:', product.nombre);
    }
    
    createProductModal(product) {
        return `
            <div class="modal-overlay" id="productModal" role="dialog" aria-labelledby="modalTitle" aria-modal="true">
                <div class="modal-content product-modal-content">
                    <button class="modal-close" onclick="MobileApp.closeModal()" aria-label="Cerrar modal">
                        <span aria-hidden="true">×</span>
                    </button>
                    
                    <div class="modal-header">
                        <div class="modal-product-image">
                            <img src="${product.imagen}" alt="${product.nombre}" loading="lazy">
                        </div>
                        <div class="modal-product-info">
                            <h2 id="modalTitle" class="modal-product-name">${product.nombre}</h2>
                            <p class="modal-product-inspired">${product.inspirado}</p>
                            <div class="modal-product-category">
                                <span class="category-badge ${product.categoria}">
                                    ${product.categoria === 'hombre' ? '👨 Hombre' : product.categoria === 'mujer' ? '👩 Mujer' : '⚡ Unisex'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-body">
                        <div class="product-description-full">
                            <h3>Descripción</h3>
                            <p>${product.descripcion}</p>
                        </div>
                        
                        <div class="size-selection">
                            <h3>Selecciona el tamaño</h3>
                            <div class="sizes-grid" id="sizesGrid">
                                ${this.createSizeOptions()}
                            </div>
                        </div>
                        
                        <div class="extras-selection">
                            <h3>Extras opcionales</h3>
                            <div class="extras-grid" id="extrasGrid">
                                ${this.createExtrasOptions()}
                            </div>
                        </div>
                        
                        <div class="delivery-options">
                            <h3>Opciones de entrega</h3>
                            <label class="delivery-option">
                                <input type="checkbox" id="deliveryCheckbox" onchange="MobileApp.updateModalTotal()">
                                <span class="delivery-info">
                                    <strong>Entrega a domicilio</strong>
                                    <small>+$${CONFIG.precios.entregaDomicilio}</small>
                                </span>
                            </label>
                        </div>
                        
                        <div class="price-summary">
                            <div class="price-breakdown" id="priceBreakdown">
                                <!-- Se actualizará dinámicamente -->
                            </div>
                            <div class="total-price" id="totalPrice">
                                Total: $${CONFIG.precios.tamaños['30ml']}
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn-add-to-cart" onclick="MobileApp.addToCartFromModal('${product.id}')" 
                                aria-label="Agregar ${product.nombre} al carrito">
                            🛒 Agregar al carrito
                        </button>
                        <button class="btn-buy-now" onclick="MobileApp.buyNowFromModal('${product.id}')" 
                                aria-label="Comprar ${product.nombre} ahora">
                            💳 Comprar ahora
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    createSizeOptions() {
        return Object.entries(CONFIG.precios.tamaños).map(([size, price]) => `
            <label class="size-option">
                <input type="radio" name="size" value="${size}" ${size === '30ml' ? 'checked' : ''} 
                       onchange="MobileApp.updateModalTotal()">
                <div class="size-info">
                    <span class="size-ml">${size}</span>
                    <span class="size-price">$${price}</span>
                </div>
            </label>
        `).join('');
    }
    
    createExtrasOptions() {
        return Object.entries(CONFIG.precios.extras).map(([key, extra]) => `
            <label class="extra-option">
                <input type="checkbox" name="extras" value="${key}" 
                       onchange="MobileApp.updateModalTotal()">
                <div class="extra-info">
                    <strong>${extra.nombre}</strong>
                    <small>${extra.descripcion}</small>
                    <span class="extra-price">+$${extra.precio}</span>
                </div>
            </label>
        `).join('');
    }
    
    setupProductModalEvents(product) {
        // Configurar eventos específicos del modal
        const modal = document.getElementById('productModal');
        
        // Cerrar modal al hacer clic en el overlay
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Actualizar total inicial
        this.updateModalTotal();
        
        // Configurar gestos de swipe para cerrar
        this.setupModalSwipeGestures(modal);
    }
    
    updateModalTotal() {
        const sizeInput = document.querySelector('input[name="size"]:checked');
        const extrasInputs = document.querySelectorAll('input[name="extras"]:checked');
        const deliveryInput = document.getElementById('deliveryCheckbox');
        
        if (!sizeInput) return;
        
        let total = CONFIG.precios.tamaños[sizeInput.value];
        let breakdown = [`${sizeInput.value}: $${CONFIG.precios.tamaños[sizeInput.value]}`];
        
        // Agregar extras
        extrasInputs.forEach(input => {
            const extra = CONFIG.precios.extras[input.value];
            total += extra.precio;
            breakdown.push(`${extra.nombre}: +$${extra.precio}`);
        });
        
        // Agregar entrega
        if (deliveryInput?.checked) {
            total += CONFIG.precios.entregaDomicilio;
            breakdown.push(`Entrega a domicilio: +$${CONFIG.precios.entregaDomicilio}`);
        }
        
        // Actualizar UI
        const breakdownEl = document.getElementById('priceBreakdown');
        const totalEl = document.getElementById('totalPrice');
        
        if (breakdownEl) {
            breakdownEl.innerHTML = breakdown.map(item => `<div class="price-item">${item}</div>`).join('');
        }
        
        if (totalEl) {
            totalEl.textContent = `Total: $${total}`;
        }
    }
    
    // ===== MODAL DEL CARRITO =====
    
    async openCart() {
        PerfMonitor.mark('cartOpen');
        
        // Crear modal del carrito
        const modal = this.createCartModal();
        
        // Agregar al DOM
        const container = document.getElementById('modalContainer');
        container.innerHTML = modal;
        
        // Configurar eventos
        this.setupCartModalEvents();
        
        // Mostrar con animación
        await this.showModal('cartModal');
        
        // Prevenir scroll del body
        this.preventBodyScroll();
        
        PerfMonitor.measure('Cart Modal Opened', 'cartOpen');
        console.log('🛒 Modal del carrito abierto');
    }
    
    createCartModal() {
        const cartItems = this.cart.length > 0 ? this.cart.map(item => this.createCartItem(item)).join('') : 
            '<div class="empty-cart"><p>Tu carrito está vacío</p><p>¡Agrega algunos productos!</p></div>';
        
        const subtotal = this.calculateCartSubtotal();
        const delivery = this.cart.some(item => item.delivery) ? CONFIG.precios.entregaDomicilio : 0;
        const total = subtotal + delivery;
        
        return `
            <div class="modal-overlay" id="cartModal" role="dialog" aria-labelledby="cartTitle" aria-modal="true">
                <div class="modal-content cart-modal-content">
                    <button class="modal-close" onclick="MobileApp.closeModal()" aria-label="Cerrar carrito">
                        <span aria-hidden="true">×</span>
                    </button>
                    
                    <div class="cart-header">
                        <h2 id="cartTitle" class="cart-title">
                            🛒 Mi Carrito
                            <span class="cart-count">(${this.cart.length})</span>
                        </h2>
                    </div>
                    
                    <div class="cart-body" id="cartBody">
                        ${cartItems}
                    </div>
                    
                    ${this.cart.length > 0 ? `
                        <div class="cart-summary">
                            <div class="summary-row">
                                <span>Subtotal:</span>
                                <span>$${subtotal}</span>
                            </div>
                            ${delivery > 0 ? `
                                <div class="summary-row">
                                    <span>Entrega:</span>
                                    <span>$${delivery}</span>
                                </div>
                            ` : ''}
                            <div class="summary-row total">
                                <span>Total:</span>
                                <span>$${total}</span>
                            </div>
                        </div>
                        
                        <div class="cart-actions">
                            <button class="btn-clear-cart" onclick="MobileApp.clearCart()" 
                                    aria-label="Vaciar carrito">
                                🗑️ Vaciar carrito
                            </button>
                            <button class="btn-checkout" onclick="MobileApp.checkout()" 
                                    aria-label="Proceder al pago">
                                💳 Proceder al pago
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    createCartItem(item) {
        return `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-details">
                        ${item.size} 
                        ${item.extras.length > 0 ? `+ ${item.extras.join(', ')}` : ''}
                        ${item.delivery ? '+ Entrega' : ''}
                    </p>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="MobileApp.updateCartItemQuantity('${item.id}', -1)" 
                                aria-label="Disminuir cantidad">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="MobileApp.updateCartItemQuantity('${item.id}', 1)" 
                                aria-label="Aumentar cantidad">+</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span class="item-total">$${item.price * item.quantity}</span>
                    <button class="remove-item" onclick="MobileApp.removeCartItem('${item.id}')" 
                            aria-label="Eliminar ${item.name} del carrito">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }
    
    setupCartModalEvents() {
        const modal = document.getElementById('cartModal');
        
        // Cerrar modal al hacer clic en el overlay
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Configurar gestos de swipe para cerrar
        this.setupModalSwipeGestures(modal);
    }
    
    // ===== GESTIÓN DEL CARRITO =====
    
    addToCartFromModal(productId) {
        const product = PRODUCTOS.find(p => p.id == productId);
        if (!product) return;
        
        // Obtener selecciones del modal
        const sizeInput = document.querySelector('input[name="size"]:checked');
        const extrasInputs = document.querySelectorAll('input[name="extras"]:checked');
        const deliveryInput = document.getElementById('deliveryCheckbox');
        
        if (!sizeInput) {
            this.showNotification('Por favor selecciona un tamaño', 'warning');
            return;
        }
        
        // Crear item del carrito
        const cartItem = {
            id: `${product.id}_${sizeInput.value}_${Date.now()}`,
            productId: product.id,
            name: product.nombre,
            image: product.imagen,
            size: sizeInput.value,
            extras: Array.from(extrasInputs).map(input => CONFIG.precios.extras[input.value].nombre),
            delivery: deliveryInput?.checked || false,
            price: this.calculateItemPrice(sizeInput.value, extrasInputs, deliveryInput?.checked),
            quantity: 1
        };
        
        // Agregar al carrito
        this.cart.push(cartItem);
        
        // Actualizar UI
        this.updateCartCounter();
        this.saveCartToStorage();
        
        // Mostrar notificación
        this.showNotification(`${product.nombre} agregado al carrito`, 'success');
        
        // Cerrar modal
        this.closeModal();
        
        console.log('🛒 Producto agregado al carrito:', cartItem);
    }
    
    buyNowFromModal(productId) {
        // Agregar al carrito primero
        this.addToCartFromModal(productId);
        
        // Abrir carrito para proceder al pago
        setTimeout(() => {
            this.openCart();
        }, 500);
    }
    
    calculateItemPrice(size, extrasInputs, hasDelivery) {
        let price = CONFIG.precios.tamaños[size];
        
        Array.from(extrasInputs).forEach(input => {
            price += CONFIG.precios.extras[input.value].precio;
        });
        
        if (hasDelivery) {
            price += CONFIG.precios.entregaDomicilio;
        }
        
        return price;
    }
    
    calculateCartSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    updateCartItemQuantity(itemId, change) {
        const item = this.cart.find(item => item.id === itemId);
        if (!item) return;
        
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeCartItem(itemId);
            return;
        }
        
        // Actualizar UI
        this.updateCartCounter();
        this.saveCartToStorage();
        
        // Recargar modal del carrito si está abierto
        if (this.currentModal === 'cartModal') {
            this.openCart();
        }
    }
    
    removeCartItem(itemId) {
        const index = this.cart.findIndex(item => item.id === itemId);
        if (index === -1) return;
        
        const item = this.cart[index];
        this.cart.splice(index, 1);
        
        // Actualizar UI
        this.updateCartCounter();
        this.saveCartToStorage();
        
        // Mostrar notificación
        this.showNotification(`${item.name} eliminado del carrito`, 'info');
        
        // Recargar modal del carrito si está abierto
        if (this.currentModal === 'cartModal') {
            this.openCart();
        }
    }
    
    clearCart() {
        if (this.cart.length === 0) return;
        
        // Confirmar acción
        if (!confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            return;
        }
        
        this.cart = [];
        
        // Actualizar UI
        this.updateCartCounter();
        this.saveCartToStorage();
        
        // Mostrar notificación
        this.showNotification('Carrito vaciado', 'info');
        
        // Recargar modal del carrito
        this.openCart();
    }
    
    checkout() {
        if (this.cart.length === 0) return;
        
        // Generar mensaje para WhatsApp
        const message = this.generateWhatsAppMessage();
        
        // Abrir WhatsApp
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Cerrar modal
        this.closeModal();
        
        console.log('💳 Checkout iniciado via WhatsApp');
    }
    
    generateWhatsAppMessage() {
        let message = '🌟 *Pedido A&A Perfumería* 🌟\n\n';
        
        this.cart.forEach((item, index) => {
            message += `${index + 1}. *${item.name}*\n`;
            message += `   📏 Tamaño: ${item.size}\n`;
            if (item.extras.length > 0) {
                message += `   ✨ Extras: ${item.extras.join(', ')}\n`;
            }
            if (item.delivery) {
                message += `   🚚 Con entrega a domicilio\n`;
            }
            message += `   💰 Precio: $${item.price} x ${item.quantity} = $${item.price * item.quantity}\n\n`;
        });
        
        const total = this.calculateCartSubtotal();
        message += `💳 *Total: $${total}*\n\n`;
        message += '¡Gracias por elegir A&A Perfumería! 💖';
        
        return message;
    }
    
    updateCartCounter() {
        const counter = document.getElementById('cartCounter');
        const icon = document.getElementById('cartIcon');
        
        if (!counter || !icon) return;
        
        const itemCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        
        // Actualizar contador
        counter.textContent = itemCount;
        
        if (itemCount > 0) {
            counter.classList.add('visible');
        } else {
            counter.classList.remove('visible');
        }
        
        // Actualizar icono del carrito
        let iconSrc = CONFIG.iconos.carrito.vacio;
        if (itemCount > 0) {
            if (itemCount <= 2) iconSrc = CONFIG.iconos.carrito.semiVacio;
            else if (itemCount <= 5) iconSrc = CONFIG.iconos.carrito.semiLleno;
            else iconSrc = CONFIG.iconos.carrito.lleno;
        }
        
        icon.src = iconSrc;
    }
    
    // ===== PERSISTENCIA DEL CARRITO =====
    
    saveCartToStorage() {
        try {
            CacheManager.set('cart', this.cart);
        } catch (error) {
            console.warn('Error guardando carrito:', error);
        }
    }
    
    loadCartFromStorage() {
        try {
            const savedCart = CacheManager.get('cart');
            if (savedCart && Array.isArray(savedCart)) {
                this.cart = savedCart;
                console.log('🛒 Carrito cargado desde localStorage:', this.cart.length, 'items');
            }
        } catch (error) {
            console.warn('Error cargando carrito:', error);
            this.cart = [];
        }
    }
});
// ===== CONTINUACIÓN: GESTOS TÁCTILES Y ANIMACIONES =====

// Extender la clase MobileAAApp con funcionalidades avanzadas
Object.assign(MobileAAApp.prototype, {
    
    // ===== GESTIÓN DE MODALES =====
    
    async showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        this.currentModal = modalId;
        
        // Aplicar estilos iniciales
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        // Forzar reflow
        modal.offsetHeight;
        
        // Animar entrada
        modal.style.transition = `all ${this.config.animationDuration}ms ease`;
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
        
        // Configurar focus trap
        this.setupFocusTrap(modal);
        
        return new Promise(resolve => {
            setTimeout(resolve, this.config.animationDuration);
        });
    }
    
    async closeModal() {
        if (!this.currentModal) return;
        
        const modal = document.getElementById(this.currentModal);
        if (!modal) return;
        
        // Animar salida
        modal.style.transition = `all ${this.config.animationDuration}ms ease`;
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        // Restaurar scroll del body
        this.restoreBodyScroll();
        
        // Remover del DOM después de la animación
        setTimeout(() => {
            const container = document.getElementById('modalContainer');
            if (container) {
                container.innerHTML = '';
            }
            this.currentModal = null;
        }, this.config.animationDuration);
        
        return new Promise(resolve => {
            setTimeout(resolve, this.config.animationDuration);
        });
    }
    
    preventBodyScroll() {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.dataset.scrollY = scrollY;
    }
    
    restoreBodyScroll() {
        const scrollY = document.body.dataset.scrollY;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0'));
        delete document.body.dataset.scrollY;
    }
    
    setupFocusTrap(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Focus en el primer elemento
        firstElement.focus();
        
        // Manejar Tab y Shift+Tab
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    // ===== GESTOS TÁCTILES AVANZADOS =====
    
    setupTouchGestures() {
        if (!DeviceCapabilities.touch) return;
        
        // Configurar swipe en productos para navegación rápida
        this.setupProductSwipeGestures();
        
        // Configurar pull-to-refresh
        this.setupPullToRefresh();
        
        console.log('👆 Gestos táctiles configurados');
    }
    
    setupProductSwipeGestures() {
        let startX, startY, startTime;
        const threshold = 50; // Mínimo de píxeles para considerar swipe
        const timeThreshold = 300; // Máximo tiempo para swipe rápido
        
        document.addEventListener('touchstart', (e) => {
            const productCard = e.target.closest('.product-card');
            if (!productCard) return;
            
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            const productCard = e.target.closest('.product-card');
            if (!productCard || !startX) return;
            
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            const deltaTime = Date.now() - startTime;
            
            // Verificar si es un swipe horizontal válido
            if (Math.abs(deltaX) > threshold && 
                Math.abs(deltaX) > Math.abs(deltaY) && 
                deltaTime < timeThreshold) {
                
                const productId = parseInt(productCard.dataset.productId);
                
                if (deltaX > 0) {
                    // Swipe derecha - agregar al carrito rápido
                    this.quickAddToCart(productId);
                } else {
                    // Swipe izquierda - abrir modal
                    this.openProductModal(productId);
                }
            }
            
            // Reset
            startX = startY = startTime = null;
        }, { passive: true });
    }
    
    setupModalSwipeGestures(modal) {
        let startY, currentY;
        const threshold = 100;
        
        modal.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        modal.addEventListener('touchmove', (e) => {
            if (!startY) return;
            
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            // Solo permitir swipe hacia abajo
            if (deltaY > 0) {
                const progress = Math.min(deltaY / threshold, 1);
                modal.style.transform = `translateY(${deltaY * 0.5}px) scale(${1 - progress * 0.1})`;
                modal.style.opacity = 1 - progress * 0.3;
            }
        }, { passive: true });
        
        modal.addEventListener('touchend', (e) => {
            if (!startY) return;
            
            const deltaY = (currentY || startY) - startY;
            
            if (deltaY > threshold) {
                // Cerrar modal
                this.closeModal();
            } else {
                // Restaurar posición
                modal.style.transition = 'all 0.3s ease';
                modal.style.transform = 'translateY(0) scale(1)';
                modal.style.opacity = '1';
                
                setTimeout(() => {
                    modal.style.transition = '';
                }, 300);
            }
            
            startY = currentY = null;
        }, { passive: true });
    }
    
    setupPullToRefresh() {
        let startY, currentY, isRefreshing = false;
        const threshold = 80;
        
        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!startY || isRefreshing || window.scrollY > 0) return;
            
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            if (deltaY > 0) {
                e.preventDefault();
                const progress = Math.min(deltaY / threshold, 1);
                
                // Mostrar indicador de refresh
                this.showPullToRefreshIndicator(progress);
            }
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startY || isRefreshing) return;
            
            const deltaY = (currentY || startY) - startY;
            
            if (deltaY > threshold) {
                this.performRefresh();
            } else {
                this.hidePullToRefreshIndicator();
            }
            
            startY = currentY = null;
        }, { passive: true });
    }
    
    showPullToRefreshIndicator(progress) {
        let indicator = document.getElementById('pullToRefreshIndicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'pullToRefreshIndicator';
            indicator.innerHTML = '🔄 Suelta para actualizar';
            indicator.style.cssText = `
                position: fixed;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 215, 0, 0.9);
                color: #000;
                padding: 10px 20px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
                z-index: 10000;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            `;
            document.body.appendChild(indicator);
        }
        
        indicator.style.top = `${-50 + (progress * 70)}px`;
        indicator.style.opacity = progress;
    }
    
    hidePullToRefreshIndicator() {
        const indicator = document.getElementById('pullToRefreshIndicator');
        if (indicator) {
            indicator.style.top = '-50px';
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 300);
        }
    }
    
    async performRefresh() {
        console.log('🔄 Actualizando contenido...');
        
        // Mostrar indicador de carga
        this.showNotification('Actualizando...', 'info');
        
        // Simular actualización
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Recargar productos
        await this.loadProducts(this.currentCategory, true);
        
        // Ocultar indicador
        this.hidePullToRefreshIndicator();
        
        // Mostrar confirmación
        this.showNotification('Contenido actualizado', 'success');
    }
    
    // ===== ACCIONES RÁPIDAS =====
    
    quickAddToCart(productId) {
        const product = PRODUCTOS.find(p => p.id === productId);
        if (!product) return;
        
        // Crear item con configuración por defecto
        const cartItem = {
            id: `${product.id}_30ml_${Date.now()}`,
            productId: product.id,
            name: product.nombre,
            image: product.imagen,
            size: '30ml',
            extras: [],
            delivery: false,
            price: CONFIG.precios.tamaños['30ml'],
            quantity: 1
        };
        
        // Agregar al carrito
        this.cart.push(cartItem);
        
        // Actualizar UI
        this.updateCartCounter();
        this.saveCartToStorage();
        
        // Feedback visual en la tarjeta
        const card = document.querySelector(`[data-product-id="${productId}"]`);
        if (card) {
            card.style.transform = 'scale(0.95)';
            card.style.background = 'rgba(255, 215, 0, 0.2)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.background = '';
            }, 200);
        }
        
        // Mostrar notificación
        this.showNotification(`${product.nombre} agregado (30ml)`, 'success');
        
        console.log('⚡ Agregado rápido al carrito:', product.nombre);
    }
    
    // ===== SISTEMA DE NOTIFICACIONES =====
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        const colors = {
            success: 'rgba(0, 255, 136, 0.9)',
            error: 'rgba(255, 71, 87, 0.9)',
            warning: 'rgba(255, 165, 2, 0.9)',
            info: 'rgba(255, 215, 0, 0.9)'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type]}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100%);
            background: ${colors[type]};
            color: ${type === 'info' ? '#000' : '#fff'};
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 10001;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 90%;
            text-align: center;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        // Auto-remover
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(-100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 400);
        }, CONFIG.animaciones.duracionNotificacion);
    }
    
    // ===== OPTIMIZACIONES DE SCROLL =====
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Ocultar/mostrar header en scroll
        this.handleHeaderScroll(scrollY);
        
        // Lazy load de imágenes adicionales si es necesario
        this.checkLazyLoadImages();
        
        // Actualizar posición de elementos flotantes
        this.updateFloatingElements(scrollY);
    }
    
    handleHeaderScroll(scrollY) {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const threshold = 100;
        
        if (scrollY > threshold) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    checkLazyLoadImages() {
        // Verificar si hay imágenes pendientes de cargar
        const pendingImages = document.querySelectorAll('.lazy-image[data-src]');
        
        if (pendingImages.length > 0) {
            // Cargar imágenes que están cerca del viewport
            pendingImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight + 200) {
                    this.loadImage(img);
                }
            });
        }
    }
    
    updateFloatingElements(scrollY) {
        // Actualizar elementos que flotan con el scroll
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed || '0.5');
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    
    // ===== UTILIDADES FINALES =====
    
    // Detectar cambios de orientación
    handleOrientationChange() {
        // Esperar a que se complete el cambio de orientación
        setTimeout(() => {
            // Recalcular dimensiones
            this.updateViewportDimensions();
            
            // Reajustar modales si están abiertos
            if (this.currentModal) {
                const modal = document.getElementById(this.currentModal);
                if (modal) {
                    this.adjustModalForOrientation(modal);
                }
            }
            
            // Recargar lazy loading
            this.setupLazyLoadingForImages(document);
            
        }, 100);
    }
    
    updateViewportDimensions() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    adjustModalForOrientation(modal) {
        // Ajustar altura máxima del modal según orientación
        const content = modal.querySelector('.modal-content');
        if (content) {
            if (window.innerHeight < 500) {
                // Landscape - reducir padding
                content.style.padding = '1rem';
                content.style.maxHeight = '85vh';
            } else {
                // Portrait - padding normal
                content.style.padding = '';
                content.style.maxHeight = '90vh';
            }
        }
    }
    
    // Cleanup y destructor
    destroy() {
        // Limpiar event listeners
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        
        // Limpiar cache si es necesario
        if (DeviceCapabilities.memory < 2) {
            CacheManager.clear();
        }
        
        // Restaurar scroll si hay modal abierto
        if (this.currentModal) {
            this.restoreBodyScroll();
        }
        
        console.log('🧹 MobileAAApp destruida correctamente');
    }
});

// ===== EVENTOS GLOBALES =====

// Manejar cambios de orientación
window.addEventListener('orientationchange', () => {
    if (window.MobileApp) {
        window.MobileApp.handleOrientationChange();
    }
});

// Manejar cambios de visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Página oculta - pausar animaciones costosas
        console.log('📱 Página oculta - pausando animaciones');
    } else {
        // Página visible - reanudar
        console.log('📱 Página visible - reanudando');
        if (window.MobileApp) {
            window.MobileApp.checkLazyLoadImages();
        }
    }
});

// Manejar errores globales
window.addEventListener('error', (e) => {
    console.error('❌ Error global capturado:', e.error);
    
    if (window.MobileApp) {
        window.MobileApp.showNotification('Ocurrió un error inesperado', 'error');
    }
});

// Cleanup al cerrar la página
window.addEventListener('beforeunload', () => {
    if (window.MobileApp) {
        window.MobileApp.destroy();
    }
});

// ===== ESTILOS DINÁMICOS PARA COMPONENTES =====

// Agregar estilos CSS para los componentes dinámicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Productos Grid */
    .products-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem 0;
    }
    
    .product-card {
        background: var(--bg-glass);
        border: var(--border-glass);
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: all var(--transition);
        cursor: pointer;
        position: relative;
    }
    
    .product-card:active {
        transform: scale(0.98);
    }
    
    .product-image-container {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
    }
    
    .product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.5s ease;
        opacity: 0;
    }
    
    .product-image.loaded {
        opacity: 1;
    }
    
    .product-image.error {
        opacity: 0.3;
        background: linear-gradient(45deg, #333, #555);
    }
    
    .product-category-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 215, 0, 0.9);
        color: #000;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    .product-info {
        padding: 1rem;
    }
    
    .product-name {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
    
    .product-inspired {
        font-size: 0.9rem;
        color: var(--text-secondary);
        font-style: italic;
        margin-bottom: 0.5rem;
    }
    
    .product-description {
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.4;
        margin-bottom: 1rem;
    }
    
    .product-price {
        font-size: 1.3rem;
        font-weight: bold;
        color: var(--primary);
        margin-bottom: 1rem;
    }
    
    .btn-product-action {
        width: 100%;
        background: linear-gradient(45deg, var(--primary), var(--primary-light));
        color: #000;
        border: none;
        padding: 12px;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: var(--transition);
        min-height: 44px;
    }
    
    .btn-product-action:active {
        transform: scale(0.95);
    }
    
    /* Modales */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: var(--z-modal);
        padding: 1rem;
        backdrop-filter: blur(10px);
    }
    
    .modal-content {
        background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-light) 100%);
        border-radius: var(--radius-lg);
        width: 100%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        border: var(--border-primary);
        box-shadow: var(--shadow-large);
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 2rem;
        cursor: pointer;
        z-index: 1001;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .modal-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .product-modal-content {
        padding: 2rem;
    }
    
    .modal-header {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        align-items: flex-start;
    }
    
    .modal-product-image {
        width: 100px;
        height: 100px;
        border-radius: var(--radius-sm);
        overflow: hidden;
        flex-shrink: 0;
    }
    
    .modal-product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .modal-product-info {
        flex: 1;
    }
    
    .modal-product-name {
        font-size: 1.5rem;
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
    
    .modal-product-inspired {
        color: var(--text-secondary);
        font-style: italic;
        margin-bottom: 1rem;
    }
    
    .category-badge {
        display: inline-block;
        background: rgba(255, 215, 0, 0.2);
        color: var(--primary);
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    .modal-body h3 {
        color: var(--primary);
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }
    
    .modal-body > div {
        margin-bottom: 2rem;
    }
    
    .sizes-grid, .extras-grid {
        display: grid;
        gap: 0.8rem;
    }
    
    .sizes-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .size-option, .extra-option {
        position: relative;
    }
    
    .size-option input, .extra-option input {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    
    .size-info, .extra-info {
        background: var(--bg-glass);
        border: var(--border-glass);
        border-radius: var(--radius-sm);
        padding: 1rem;
        text-align: center;
        transition: var(--transition);
        cursor: pointer;
    }
    
    .size-option input:checked + .size-info,
    .extra-option input:checked + .extra-info {
        background: rgba(255, 215, 0, 0.2);
        border-color: var(--primary);
    }
    
    .size-ml {
        font-weight: bold;
        font-size: 1.1rem;
        color: var(--primary);
    }
    
    .size-price {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .extra-info strong {
        color: var(--primary);
        display: block;
        margin-bottom: 0.3rem;
    }
    
    .extra-info small {
        color: var(--text-muted);
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .extra-price {
        color: var(--primary);
        font-weight: bold;
    }
    
    .delivery-option {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: var(--bg-glass);
        border: var(--border-glass);
        border-radius: var(--radius-sm);
        padding: 1rem;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .delivery-option:has(input:checked) {
        background: rgba(255, 215, 0, 0.2);
        border-color: var(--primary);
    }
    
    .delivery-info strong {
        color: var(--primary);
        display: block;
    }
    
    .delivery-info small {
        color: var(--text-secondary);
    }
    
    .price-summary {
        background: rgba(255, 215, 0, 0.1);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: var(--radius-sm);
        padding: 1rem;
    }
    
    .price-breakdown {
        margin-bottom: 1rem;
    }
    
    .price-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
    }
    
    .total-price {
        font-size: 1.3rem;
        font-weight: bold;
        color: var(--primary);
        text-align: center;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 215, 0, 0.3);
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .btn-add-to-cart, .btn-buy-now {
        flex: 1;
        padding: 14px 20px;
        border: none;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: var(--transition);
        min-height: 48px;
    }
    
    .btn-add-to-cart {
        background: linear-gradient(45deg, var(--primary), var(--primary-light));
        color: #000;
    }
    
    .btn-buy-now {
        background: linear-gradient(45deg, #00ff88, #00cc6a);
        color: #000;
    }
    
    .btn-add-to-cart:active, .btn-buy-now:active {
        transform: scale(0.95);
    }
    
    /* Carrito Modal */
    .cart-modal-content {
        padding: 1.5rem;
    }
    
    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: var(--border-glass);
    }
    
    .cart-title {
        color: var(--primary);
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .cart-count {
        background: rgba(255, 215, 0, 0.2);
        color: var(--primary);
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 0.8rem;
    }
    
    .cart-item {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: var(--bg-glass);
        border: var(--border-glass);
        border-radius: var(--radius-sm);
        margin-bottom: 1rem;
    }
    
    .cart-item-image {
        width: 60px;
        height: 60px;
        border-radius: var(--radius-sm);
        overflow: hidden;
        flex-shrink: 0;
    }
    
    .cart-item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .cart-item-info {
        flex: 1;
    }
    
    .cart-item-name {
        color: var(--primary);
        font-size: 1rem;
        margin-bottom: 0.3rem;
    }
    
    .cart-item-details {
        color: var(--text-secondary);
        font-size: 0.8rem;
        margin-bottom: 0.5rem;
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .qty-btn {
        width: 30px;
        height: 30px;
        border: var(--border-glass);
        background: var(--bg-glass);
        color: var(--text-primary);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        transition: var(--transition);
    }
    
    .qty-btn:active {
        transform: scale(0.9);
    }
    
    .qty-value {
        min-width: 30px;
        text-align: center;
        font-weight: bold;
        color: var(--primary);
    }
    
    .cart-item-price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
    }
    
    .item-total {
        font-weight: bold;
        color: var(--primary);
    }
    
    .remove-item {
        background: rgba(255, 71, 87, 0.2);
        border: 1px solid rgba(255, 71, 87, 0.3);
        color: #ff4757;
        padding: 5px 10px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: var(--transition);
    }
    
    .remove-item:active {
        transform: scale(0.9);
    }
    
    .empty-cart {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--text-secondary);
    }
    
    .empty-cart p:first-child {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
    
    .cart-summary {
        background: rgba(255, 215, 0, 0.1);
        border: 1px solid rgba(255, 215, 0, 0.3);
        border-radius: var(--radius-sm);
        padding: 1rem;
        margin: 1rem 0;
    }
    
    .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
    }
    
    .summary-row.total {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--primary);
        padding-top: 0.5rem;
        border-top: 1px solid rgba(255, 215, 0, 0.3);
        margin-top: 1rem;
    }
    
    .cart-actions {
        display: flex;
        gap: 1rem;
    }
    
    .btn-clear-cart, .btn-checkout {
        flex: 1;
        padding: 14px 20px;
        border: none;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: var(--transition);
        min-height: 48px;
    }
    
    .btn-clear-cart {
        background: rgba(255, 71, 87, 0.2);
        border: 1px solid rgba(255, 71, 87, 0.3);
        color: #ff4757;
    }
    
    .btn-checkout {
        background: linear-gradient(45deg, #00ff88, #00cc6a);
        color: #000;
    }
    
    .btn-clear-cart:active, .btn-checkout:active {
        transform: scale(0.95);
    }
    
    /* Responsive adjustments */
    @media (max-width: 480px) {
        .modal-content {
            margin: 0.5rem;
            max-height: 95vh;
        }
        
        .product-modal-content, .cart-modal-content {
            padding: 1rem;
        }
        
        .modal-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
        }
        
        .modal-product-image {
            width: 80px;
            height: 80px;
            margin: 0 auto;
        }
        
        .sizes-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-actions, .cart-actions {
            flex-direction: column;
        }
        
        .cart-item {
            flex-direction: column;
            text-align: center;
        }
        
        .cart-item-quantity {
            justify-content: center;
        }
        
        .cart-item-price {
            align-items: center;
        }
    }
    
    @media (max-height: 600px) and (orientation: landscape) {
        .modal-content {
            max-height: 85vh;
        }
        
        .product-modal-content, .cart-modal-content {
            padding: 1rem;
        }
        
        .modal-body > div {
            margin-bottom: 1rem;
        }
    }
`;

document.head.appendChild(dynamicStyles);

console.log('🎨 Estilos dinámicos aplicados');
console.log('✅ A&A Mobile Ultra - JavaScript completo cargado');
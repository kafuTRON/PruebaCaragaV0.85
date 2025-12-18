/**
 * ===== MOBILE ULTRA MAIN FIXED.JS =====
 * Versión corregida del JavaScript principal para A&A Perfumería
 */

// ===== CONFIGURACIÓN =====
const CONFIG = {
    whatsapp: '2721224946',
    precios: {
        tamaños: {
            '10ml': 90,
            '30ml': 180,
            '60ml': 220,
            '100ml': 280
        }
    }
};

// ===== DATOS DE PRODUCTOS =====
const PRODUCTOS = [
    {
        id: 1,
        nombre: "Perfume Inspirado Caballero Elite",
        descripcion: "Fragancia masculina inspirada en los más exclusivos",
        categoria: "caballero",
        precio: 180,
        imagen: "recursos/A&A/productos/caballero1.jpg"
    },
    {
        id: 2,
        nombre: "Perfume Inspirado Dama Elegance",
        descripcion: "Fragancia femenina sofisticada y elegante",
        categoria: "dama",
        precio: 180,
        imagen: "recursos/A&A/productos/dama1.jpg"
    },
    {
        id: 3,
        nombre: "Perfume Inspirado Unisex Modern",
        descripcion: "Fragancia versátil para cualquier ocasión",
        categoria: "unisex",
        precio: 200,
        imagen: "recursos/A&A/productos/unisex1.jpg"
    },
    {
        id: 4,
        nombre: "Perfume Inspirado Caballero Sport",
        descripcion: "Fragancia fresca y deportiva",
        categoria: "caballero",
        precio: 220,
        imagen: "recursos/A&A/productos/caballero2.jpg"
    },
    {
        id: 5,
        nombre: "Perfume Inspirado Dama Floral",
        descripcion: "Fragancia floral y romántica",
        categoria: "dama",
        precio: 200,
        imagen: "recursos/A&A/productos/dama2.jpg"
    },
    {
        id: 6,
        nombre: "Perfume Inspirado Unisex Bold",
        descripcion: "Fragancia moderna y atrevida",
        categoria: "unisex",
        precio: 240,
        imagen: "recursos/A&A/productos/unisex2.jpg"
    }
];

// ===== CLASE PRINCIPAL =====
class MobileAAApp {
    constructor() {
        this.currentCategory = 'todos';
        this.cart = [];
        this.isLoading = false;
        
        this.init();
    }
    
    async init() {
        console.log('📱 Inicializando MobileAAApp...');
        
        try {
            // Inicializar componentes
            this.setupEventListeners();
            this.loadFilters();
            await this.loadProducts('todos');
            
            console.log('✅ MobileAAApp inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando MobileAAApp:', error);
        }
    }
    
    setupEventListeners() {
        // Event listeners básicos
        console.log('🔧 Configurando event listeners...');
    }
    
    loadFilters() {
        const filtersContainer = document.getElementById('filtersContainer');
        if (!filtersContainer) return;
        
        const filters = [
            { key: 'todos', label: 'Todos' },
            { key: 'caballero', label: 'Caballero' },
            { key: 'dama', label: 'Dama' },
            { key: 'unisex', label: 'Unisex' }
        ];
        
        const html = filters.map(filter => `
            <button class="filter-btn ${filter.key === 'todos' ? 'active' : ''}" 
                    onclick="MobileApp.loadProducts('${filter.key}')">
                ${filter.label}
            </button>
        `).join('');
        
        filtersContainer.innerHTML = html;
        console.log('🏷️ Filtros cargados');
    }
    
    async loadProducts(category) {
        if (this.isLoading) return;
        
        console.log('📦 Cargando productos para categoría:', category);
        this.isLoading = true;
        this.currentCategory = category;
        
        try {
            // Actualizar filtros activos
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[onclick="MobileApp.loadProducts('${category}')"]`)?.classList.add('active');
            
            // Filtrar productos
            let products = category === 'todos' ? PRODUCTOS : PRODUCTOS.filter(p => p.categoria === category);
            
            // Mostrar productos
            this.renderProducts(products);
            
            console.log(`✅ ${products.length} productos cargados`);
        } catch (error) {
            console.error('❌ Error cargando productos:', error);
        } finally {
            this.isLoading = false;
        }
    }
    
    renderProducts(products) {
        const grid = document.getElementById('productsGrid');
        const noProductsMsg = document.getElementById('noProductsMessage');
        
        if (!grid) return;
        
        if (products.length === 0) {
            grid.innerHTML = '';
            noProductsMsg?.classList.remove('d-none');
            return;
        }
        
        noProductsMsg?.classList.add('d-none');
        
        const html = products.map(product => this.createProductCard(product)).join('');
        grid.innerHTML = html;
    }
    
    createProductCard(product) {
        return `
            <div class="product-card" onclick="MobileApp.openProductModal(${product.id})">
                <div class="product-image">
                    <img src="${product.imagen}" alt="${product.nombre}" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="product-placeholder" style="display: none;">
                        ${this.getProductEmoji(product.categoria)}
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.nombre}</h3>
                    <p class="product-description">${product.descripcion}</p>
                    <div class="product-price">Desde $${product.precio}</div>
                    <button class="btn-product-action" 
                            onclick="event.stopPropagation(); MobileApp.openProductModal(${product.id})">
                        Ver detalles
                    </button>
                </div>
            </div>
        `;
    }
    
    getProductEmoji(categoria) {
        const emojis = {
            'caballero': '👨',
            'dama': '👩',
            'unisex': '💫'
        };
        return emojis[categoria] || '🌟';
    }
    
    openProductModal(productId) {
        const product = PRODUCTOS.find(p => p.id === productId);
        if (!product) {
            console.error('Producto no encontrado:', productId);
            return;
        }
        
        console.log('🔍 Abriendo modal para producto:', product.nombre);
        
        // Por ahora, mostrar alert simple
        alert(`Producto: ${product.nombre}\nPrecio: $${product.precio}\nDescripción: ${product.descripcion}\n\n(Modal completo próximamente)`);
    }
    
    openCart() {
        console.log('🛒 Abriendo carrito...');
        alert('Carrito de compras próximamente');
    }
    
    showNotification(message, type = 'info') {
        console.log(`📢 Notificación (${type}):`, message);
        
        // Crear notificación simple
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 10000;
            background: ${type === 'error' ? '#ff4757' : '#00ff88'};
            color: white; padding: 15px 20px; border-radius: 10px;
            font-weight: bold; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// ===== INICIALIZACIÓN GLOBAL =====
let MobileApp;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM cargado, inicializando MobileApp...');
    
    try {
        MobileApp = new MobileAAApp();
        window.MobileApp = MobileApp;
        
        console.log('✅ MobileApp disponible globalmente');
        
        // Indicador visual de éxito
        document.body.style.borderColor = 'gold';
        
    } catch (error) {
        console.error('❌ Error inicializando MobileApp:', error);
        document.body.style.borderColor = 'red';
    }
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('❌ Error global capturado:', e.error);
    
    if (window.MobileApp) {
        window.MobileApp.showNotification('Ocurrió un error inesperado', 'error');
    }
});

console.log('📱 mobile-ultra-main-fixed.js cargado correctamente');
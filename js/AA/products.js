// ===== PRODUCTS.JS - Gestión de Productos =====

class ProductManager {
    constructor() {
        this.productos = PRODUCTOS;
        this.categoriaActual = STATE.categoriaActual;
        this.isAnimating = false;
    }

    // Función para mostrar productos con animaciones
    mostrarProductos(productosAMostrar) {
        const grid = document.getElementById('productsGrid');
        
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Animación de salida para productos existentes
        const existingCards = grid.querySelectorAll('.product-card');
        this.animateCardsOut(existingCards, () => {
            this.renderProducts(grid, productosAMostrar);
            this.isAnimating = false;
        });
    }

    // Animar salida de tarjetas
    animateCardsOut(cards, callback) {
        if (cards.length === 0) {
            callback();
            return;
        }

        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.3s ease reverse';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-30px) scale(0.8)';
            }, index * 50);
        });

        // Ejecutar callback después de que terminen las animaciones
        setTimeout(callback, cards.length * 50 + 200);
    }

    // Renderizar productos en el grid
    renderProducts(grid, productosAMostrar) {
        grid.innerHTML = '';

        productosAMostrar.forEach((producto, index) => {
            const card = this.createProductCard(producto, index);
            grid.appendChild(card);
        });

        // Activar animación de scroll
        this.observeCards();
    }

    // Crear tarjeta de producto
    createProductCard(producto, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Calcular delay escalonado
        const delay = index * CONFIG.animaciones.delayProductos;
        card.style.animationDelay = `${delay}ms`;
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}" 
                     style="width: 100%; height: 100%; object-fit: cover; border-radius: 0;"
                     onload="this.style.opacity='1'" 
                     onerror="this.src='recursos/placeholder.jpg'"
                     style="opacity: 0; transition: opacity 0.5s ease;">
            </div>
            <div class="product-info">
                <div class="product-category">${producto.categoria.toUpperCase()}</div>
                <div class="product-name">${producto.nombre}</div>
                <div class="product-inspired">${producto.inspirado}</div>
                <div class="product-description">${producto.descripcion}</div>
                <div class="product-price">${producto.precio}</div>
                <button class="btn-contact" onclick="productManager.openProductModal('${producto.nombre}')">
                    Ver detalles y precios
                </button>
            </div>
        `;

        // Agregar efectos de hover personalizados
        this.addHoverEffects(card);

        return card;
    }

    // Agregar efectos de hover
    addHoverEffects(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        });
    }

    // Filtrar productos por categoría
    filterProducts(categoria) {
        if (this.isAnimating) return;

        // Actualizar botones activos con animación
        this.updateFilterButtons(categoria);
        
        this.categoriaActual = categoria;
        STATE.categoriaActual = categoria;
        
        let productosFiltrados;
        if (categoria === 'todos') {
            productosFiltrados = this.productos;
        } else {
            productosFiltrados = this.productos.filter(p => p.categoria === categoria);
        }
        
        this.mostrarProductos(productosFiltrados);

        // Actualizar cartelones según la categoría
        if (window.bannerManager) {
            setTimeout(() => {
                window.bannerManager.updateBannersForCategory(categoria);
            }, 1000);
        }
    }

    // Actualizar botones de filtro
    updateFilterButtons(categoria) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 100);
        });
        
        // Encontrar y activar el botón correcto
        const activeButton = document.querySelector(`[onclick="productManager.filterProducts('${categoria}')"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                activeButton.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Intersection Observer para animaciones de scroll
    observeCards() {
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

        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Buscar producto por nombre
    findProductByName(nombre) {
        return this.productos.find(p => p.nombre === nombre);
    }

    // Obtener productos por categoría
    getProductsByCategory(categoria) {
        if (categoria === 'todos') {
            return this.productos;
        }
        return this.productos.filter(p => p.categoria === categoria);
    }

    // Abrir modal de producto
    openProductModal(nombreProducto) {
        const producto = this.findProductByName(nombreProducto);
        if (producto && window.modalManager) {
            window.modalManager.openProductModal(producto);
        }
    }

    // Inicializar productos
    init() {
        this.mostrarProductos(this.productos);
    }
}

// Crear instancia global
const productManager = new ProductManager();

// Función global para compatibilidad (llamada desde HTML)
function filterProducts(categoria) {
    productManager.filterProducts(categoria);
}

function contactarPorProducto(nombreProducto) {
    productManager.openProductModal(nombreProducto);
}
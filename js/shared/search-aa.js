// ===== SISTEMA DE BÚSQUEDA PARA A&A PERFUMES =====
// Sistema simple que funciona con los datos del config.js

class SearchAA {
    constructor() {
        this.productos = window.PRODUCTOS || [];
        this.searchHistory = [];
        this.maxHistoryItems = 10;
        
        this.initializeSearch();
        console.log('✅ Sistema de búsqueda A&A inicializado con', this.productos.length, 'perfumes');
    }
    
    initializeSearch() {
        // Cargar historial desde localStorage
        const savedHistory = localStorage.getItem('search_history_aa');
        if (savedHistory) {
            this.searchHistory = JSON.parse(savedHistory);
        }
        
        // Configurar eventos de búsqueda
        this.setupSearchEvents();
    }
    
    setupSearchEvents() {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        
        if (searchInput) {
            // Búsqueda en tiempo real con debounce
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim();
                
                if (query.length >= 2) {
                    searchTimeout = setTimeout(() => {
                        this.performSearch(query);
                    }, 300);
                } else if (query.length === 0) {
                    this.clearResults();
                    this.showAllProducts();
                }
            });
            
            // Búsqueda al presionar Enter
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = e.target.value.trim();
                    if (query) {
                        this.performSearch(query);
                    }
                }
            });
        }
        
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                const query = searchInput?.value.trim();
                if (query) {
                    this.performSearch(query);
                }
            });
        }
    }
    
    performSearch(query) {
        console.log('🔍 Buscando:', query);
        
        // Mostrar indicador de carga
        this.showLoading();
        
        // Simular un pequeño delay para mejor UX
        setTimeout(() => {
            const results = this.searchProducts(query);
            this.displayResults(results, query);
            this.addToHistory(query);
        }, 200);
    }
    
    searchProducts(query) {
        const searchTerm = query.toLowerCase().trim();
        
        const results = this.productos.filter(producto => {
            // Búsqueda en nombre
            const nombreMatch = producto.nombre.toLowerCase().includes(searchTerm);
            
            // Búsqueda en descripción
            const descripcionMatch = producto.descripcion.toLowerCase().includes(searchTerm);
            
            // Búsqueda en inspiración
            const inspiradoMatch = producto.inspirado.toLowerCase().includes(searchTerm);
            
            // Búsqueda en categoría
            const categoriaMatch = producto.categoria.toLowerCase().includes(searchTerm);
            
            return nombreMatch || descripcionMatch || inspiradoMatch || categoriaMatch;
        });
        
        // Ordenar por relevancia
        results.sort((a, b) => {
            const aName = a.nombre.toLowerCase();
            const bName = b.nombre.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            // Prioridad 1: Coincidencia exacta en nombre
            if (aName === searchLower) return -1;
            if (bName === searchLower) return 1;
            
            // Prioridad 2: Nombre que empiece con el término
            if (aName.startsWith(searchLower) && !bName.startsWith(searchLower)) return -1;
            if (bName.startsWith(searchLower) && !aName.startsWith(searchLower)) return 1;
            
            // Prioridad 3: Orden alfabético
            return aName.localeCompare(bName);
        });
        
        console.log('📊 Resultados encontrados:', results.length);
        return results;
    }
    
    displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) {
            console.warn('⚠️ No se encontró el contenedor de resultados');
            return;
        }
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>No se encontraron perfumes</h3>
                    <p>No hay perfumes que coincidan con "${query}"</p>
                    <div class="search-suggestions">
                        <p>Intenta con:</p>
                        <ul>
                            <li>Nombres como "Alam", "Gabriel", "Adele"</li>
                            <li>Marcas como "Chanel", "Dior", "Armani"</li>
                            <li>Categorías como "hombre" o "mujer"</li>
                        </ul>
                    </div>
                    <button onclick="searchAA.showAllProducts()" class="btn-show-all">
                        Ver todos los perfumes
                    </button>
                </div>
            `;
            return;
        }
        
        // Mostrar resultados
        let html = `
            <div class="search-header">
                <h3>Resultados de búsqueda</h3>
                <p>Se encontraron ${results.length} perfume${results.length !== 1 ? 's' : ''} para "${query}"</p>
                <button onclick="searchAA.showAllProducts()" class="btn-show-all-small">
                    Ver todos
                </button>
            </div>
            <div class="products-grid">
        `;
        
        results.forEach(producto => {
            html += this.createProductCard(producto);
        });
        
        html += '</div>';
        resultsContainer.innerHTML = html;
        
        // Configurar eventos de los productos
        this.setupProductEvents();
    }
    
    createProductCard(producto) {
        return `
            <div class="product-card" data-product-id="${producto.id}" onclick="searchAA.showProductInCatalog(${producto.id})">
                <div class="product-image">
                    <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" 
                         onerror="this.src='recursos/A&A/placeholder-perfume.jpg'">
                    <div class="product-category">${producto.categoria === 'hombre' ? '👨 Caballero' : '👩 Dama'}</div>
                </div>
                <div class="product-info">
                    <h4 class="product-name">${producto.nombre}</h4>
                    <p class="product-inspired">${producto.inspirado}</p>
                    <p class="product-description">${producto.descripcion}</p>
                    <div class="product-price">${producto.precio}</div>
                    <div class="product-actions">
                        <button class="btn-add-cart" onclick="event.stopPropagation(); searchAA.selectProduct(${producto.id})">
                            <i class="fas fa-shopping-cart"></i> Seleccionar
                        </button>
                        <button class="btn-details" onclick="event.stopPropagation(); searchAA.showProductDetails(${producto.id})">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupProductEvents() {
        // Los eventos se manejan con onclick en el HTML para simplicidad
        console.log('✅ Eventos de productos configurados');
    }
    
    selectProduct(productId) {
        const producto = this.productos.find(p => p.id === productId);
        if (!producto) return;
        
        console.log('🛒 Producto seleccionado:', producto.nombre);
        
        // Usar la función openProductModal del sistema existente
        if (typeof window.openProductModal === 'function') {
            window.openProductModal(producto.nombre);
        } else if (typeof window.mostrarModalTamaños === 'function') {
            window.mostrarModalTamaños(producto);
        } else {
            // Fallback: mostrar alerta simple
            alert(`Perfume seleccionado: ${producto.nombre}\n\nPor favor, verifica que el sistema de carrito esté cargado correctamente.`);
        }
    }
    
    showProductInCatalog(productId) {
        const producto = this.productos.find(p => p.id === productId);
        if (!producto) return;
        
        console.log('📍 Mostrando producto en catálogo:', producto.nombre);
        
        // Limpiar búsqueda y mostrar solo este producto
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Crear una vista especial del producto en el catálogo
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        let html = `
            <div class="search-header">
                <h3>Producto seleccionado</h3>
                <p>Has seleccionado "${producto.nombre}" del catálogo</p>
                <button onclick="searchAA.showAllProducts()" class="btn-show-all-small">
                    Ver todos los perfumes
                </button>
            </div>
            <div class="products-grid">
                <div class="product-card featured-product" data-product-id="${producto.id}">
                    <div class="product-image">
                        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" 
                             onerror="this.src='recursos/A&A/placeholder-perfume.jpg'">
                        <div class="product-category">${producto.categoria === 'hombre' ? '👨 Caballero' : '👩 Dama'}</div>
                    </div>
                    <div class="product-info">
                        <h4 class="product-name">${producto.nombre}</h4>
                        <p class="product-inspired">${producto.inspirado}</p>
                        <p class="product-description">${producto.descripcion}</p>
                        <div class="product-price">${producto.precio}</div>
                        <div class="product-actions">
                            <button class="btn-add-cart" onclick="searchAA.selectProduct(${producto.id})">
                                <i class="fas fa-shopping-cart"></i> Seleccionar
                            </button>
                            <button class="btn-details" onclick="searchAA.showProductDetails(${producto.id})">
                                <i class="fas fa-eye"></i> Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultsContainer.innerHTML = html;
        
        // Scroll suave al producto
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Agregar efecto de resaltado
        setTimeout(() => {
            const featuredCard = document.querySelector('.featured-product');
            if (featuredCard) {
                featuredCard.style.animation = 'pulse 2s ease-in-out';
                featuredCard.style.border = '3px solid #ffd700';
                featuredCard.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
            }
        }, 100);
    }

    showProductDetails(productId) {
        const producto = this.productos.find(p => p.id === productId);
        if (!producto) return;
        
        // Crear modal de detalles
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content product-details">
                <div class="modal-header">
                    <h3>${producto.nombre}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="product-detail-image">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                    </div>
                    <div class="product-detail-info">
                        <div class="product-category-badge">
                            ${producto.categoria === 'hombre' ? '👨 Perfume para Caballero' : '👩 Perfume para Dama'}
                        </div>
                        <h4>${producto.inspirado}</h4>
                        <p class="product-description-full">${producto.descripcion}</p>
                        <div class="price-info">
                            <h5>Precios disponibles:</h5>
                            <ul>
                                <li>10ml - $90 (incluye feromonas y doble fijador)</li>
                                <li>30ml - $160</li>
                                <li>60ml - $220</li>
                                <li>100ml - $285</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" onclick="this.closest('.modal-overlay').remove()">Cerrar</button>
                    <button class="btn-select" onclick="searchAA.selectProduct(${producto.id}); this.closest('.modal-overlay').remove();">
                        Seleccionar Perfume
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    showAllProducts() {
        console.log('📋 Mostrando todos los productos');
        
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        let html = `
            <div class="search-header">
                <h3>Todos nuestros perfumes</h3>
                <p>Catálogo completo de ${this.productos.length} fragancias</p>
            </div>
            <div class="category-filters">
                <button class="filter-btn active" onclick="searchAA.filterByCategory('todos')">
                    Todos (${this.productos.length})
                </button>
                <button class="filter-btn" onclick="searchAA.filterByCategory('hombre')">
                    Caballeros (${this.productos.filter(p => p.categoria === 'hombre').length})
                </button>
                <button class="filter-btn" onclick="searchAA.filterByCategory('mujer')">
                    Damas (${this.productos.filter(p => p.categoria === 'mujer').length})
                </button>
            </div>
            <div class="products-grid">
        `;
        
        this.productos.forEach(producto => {
            html += this.createProductCard(producto);
        });
        
        html += '</div>';
        resultsContainer.innerHTML = html;
        
        // Limpiar input de búsqueda
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
    }
    
    filterByCategory(categoria) {
        console.log('🏷️ Filtrando por categoría:', categoria);
        
        // Actualizar botones activos
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Filtrar productos
        const filteredProducts = categoria === 'todos' 
            ? this.productos 
            : this.productos.filter(p => p.categoria === categoria);
        
        // Actualizar grid
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            let html = '';
            filteredProducts.forEach(producto => {
                html += this.createProductCard(producto);
            });
            productsGrid.innerHTML = html;
        }
    }
    
    addToHistory(query) {
        // Evitar duplicados
        const index = this.searchHistory.indexOf(query);
        if (index > -1) {
            this.searchHistory.splice(index, 1);
        }
        
        // Agregar al inicio
        this.searchHistory.unshift(query);
        
        // Limitar tamaño del historial
        if (this.searchHistory.length > this.maxHistoryItems) {
            this.searchHistory = this.searchHistory.slice(0, this.maxHistoryItems);
        }
        
        // Guardar en localStorage
        localStorage.setItem('search_history_aa', JSON.stringify(this.searchHistory));
    }
    
    showLoading() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="search-loading">
                    <div class="loading-spinner"></div>
                    <p>Buscando perfumes...</p>
                </div>
            `;
        }
    }
    
    clearResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    }
    
    // Métodos públicos para uso externo
    searchByName(nombre) {
        return this.performSearch(nombre);
    }
    
    getSearchHistory() {
        return this.searchHistory;
    }
    
    clearSearchHistory() {
        this.searchHistory = [];
        localStorage.removeItem('search_history_aa');
    }
}

// Crear instancia global
let searchAA = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que config.js se haya cargado
    setTimeout(() => {
        searchAA = new SearchAA();
        window.searchAA = searchAA; // Hacer disponible globalmente
        
        console.log('🚀 Sistema de búsqueda A&A listo');
    }, 100);
});

// Crear función mostrarModalTamaños como alias para compatibilidad
function mostrarModalTamaños(producto) {
    console.log('📦 mostrarModalTamaños llamado para:', producto.nombre);
    
    // Usar la función openProductModal del sistema existente
    if (typeof window.openProductModal === 'function') {
        window.openProductModal(producto.nombre);
    } else {
        console.warn('⚠️ openProductModal no está disponible');
        alert(`Perfume: ${producto.nombre}\n\nEl sistema de modal no está disponible. Por favor, recarga la página.`);
    }
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.mostrarModalTamaños = mostrarModalTamaños;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.SearchAA = SearchAA;
}
// ===== SISTEMA DE BÚSQUEDA MULTI-TIENDA =====
// Sistema avanzado de búsqueda para A&A, CDL y M&M

class SearchSystemMulti {
    constructor(tiendaSlug = 'aa') {
        this.tiendaSlug = tiendaSlug;
        this.apiUrl = '/api'; // Cambiar según tu configuración
        this.searchCache = new Map();
        this.searchHistory = [];
        this.maxHistoryItems = 10;
        
        this.initializeSearch();
    }
    
    initializeSearch() {
        // Cargar historial desde localStorage
        const savedHistory = localStorage.getItem(`search_history_${this.tiendaSlug}`);
        if (savedHistory) {
            this.searchHistory = JSON.parse(savedHistory);
        }
        
        // Configurar eventos de búsqueda
        this.setupSearchEvents();
    }
    
    setupSearchEvents() {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const searchResults = document.getElementById('search-results');
        
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
    
    async performSearch(query, options = {}) {
        const {
            categoria = null,
            limite = 20,
            showLoading = true
        } = options;
        
        // Mostrar indicador de carga
        if (showLoading) {
            this.showLoading();
        }
        
        try {
            // Verificar cache
            const cacheKey = `${query}_${categoria}_${limite}`;
            if (this.searchCache.has(cacheKey)) {
                const cachedResults = this.searchCache.get(cacheKey);
                this.displayResults(cachedResults, query);
                return cachedResults;
            }
            
            // Realizar búsqueda en el servidor
            const searchParams = new URLSearchParams({
                q: query,
                tienda: this.tiendaSlug,
                limite: limite.toString()
            });
            
            if (categoria) {
                searchParams.append('categoria', categoria);
            }
            
            const response = await fetch(`${this.apiUrl}/productos/search?${searchParams}`);
            
            if (!response.ok) {
                throw new Error(`Error en búsqueda: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Guardar en cache
                this.searchCache.set(cacheKey, data);
                
                // Agregar al historial
                this.addToHistory(query);
                
                // Mostrar resultados
                this.displayResults(data, query);
                
                return data;
            } else {
                throw new Error(data.error || 'Error desconocido en búsqueda');
            }
            
        } catch (error) {
            console.error('Error en búsqueda:', error);
            this.showError('Error al realizar la búsqueda. Intenta de nuevo.');
            return null;
        }
    }
    
    displayResults(data, query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        const { count, data: productos } = data;
        
        if (count === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>No se encontraron resultados</h3>
                    <p>No hay productos que coincidan con "${query}"</p>
                    <div class="search-suggestions">
                        <p>Intenta con:</p>
                        <ul>
                            <li>Palabras más generales</li>
                            <li>Verificar la ortografía</li>
                            <li>Usar códigos de producto (ej: PERAL30)</li>
                        </ul>
                    </div>
                </div>
            `;
            return;
        }
        
        // Mostrar resultados
        let html = `
            <div class="search-header">
                <h3>Resultados de búsqueda</h3>
                <p>Se encontraron ${count} producto${count !== 1 ? 's' : ''} para "${query}"</p>
            </div>
            <div class="products-grid">
        `;
        
        productos.forEach(producto => {
            html += this.createProductCard(producto);
        });
        
        html += '</div>';
        resultsContainer.innerHTML = html;
        
        // Configurar eventos de los productos
        this.setupProductEvents();
    }
    
    createProductCard(producto) {
        const {
            id, codigo_producto, nombre, categoria, tienda, descripcion,
            precio_desde, stock_disponible, imagen_url
        } = producto;
        
        // Determinar precios disponibles
        let preciosHtml = '';
        if (this.tiendaSlug === 'aa') {
            // Para perfumes A&A mostrar todos los tamaños
            const precios = [];
            if (producto.precio_10ml) precios.push(`10ml: $${producto.precio_10ml}`);
            if (producto.precio_30ml) precios.push(`30ml: $${producto.precio_30ml}`);
            if (producto.precio_60ml) precios.push(`60ml: $${producto.precio_60ml}`);
            if (producto.precio_100ml) precios.push(`100ml: $${producto.precio_100ml}`);
            
            if (precios.length > 0) {
                preciosHtml = `<div class="precios-tamaños">${precios.join(' • ')}</div>`;
            } else {
                preciosHtml = `<div class="precio-principal">$${precio_desde}</div>`;
            }
        } else {
            preciosHtml = `<div class="precio-principal">$${precio_desde}</div>`;
        }
        
        return `
            <div class="product-card" data-product-id="${id}" data-codigo="${codigo_producto}">
                <div class="product-image">
                    <img src="${imagen_url}" alt="${nombre}" loading="lazy" 
                         onerror="this.src='recursos/placeholder-product.jpg'">
                    ${!stock_disponible ? '<div class="sin-stock">Sin Stock</div>' : ''}
                </div>
                <div class="product-info">
                    <div class="product-code">${codigo_producto}</div>
                    <h4 class="product-name">${nombre}</h4>
                    <p class="product-category">${categoria}</p>
                    ${descripcion ? `<p class="product-description">${descripcion.substring(0, 100)}...</p>` : ''}
                    ${preciosHtml}
                    <div class="product-actions">
                        ${stock_disponible ? 
                            `<button class="btn-add-cart" data-product-id="${id}">
                                <i class="fas fa-shopping-cart"></i> Agregar
                            </button>` : 
                            `<button class="btn-notify" data-product-id="${id}">
                                <i class="fas fa-bell"></i> Notificar
                            </button>`
                        }
                        <button class="btn-details" data-product-id="${id}">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupProductEvents() {
        // Eventos para agregar al carrito
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.btn-add-cart').dataset.productId;
                this.addToCart(productId);
            });
        });
        
        // Eventos para ver detalles
        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.btn-details').dataset.productId;
                this.showProductDetails(productId);
            });
        });
        
        // Eventos para notificaciones
        document.querySelectorAll('.btn-notify').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.btn-notify').dataset.productId;
                this.notifyWhenAvailable(productId);
            });
        });
    }
    
    async addToCart(productId) {
        // Si es perfume A&A, mostrar selector de tamaño
        if (this.tiendaSlug === 'aa') {
            this.showSizeSelector(productId);
        } else {
            // Para otros productos, agregar directamente
            if (window.cartSystem) {
                await window.cartSystem.addItem(productId, 1);
                this.showNotification('Producto agregado al carrito', 'success');
            }
        }
    }
    
    showSizeSelector(productId) {
        // Crear modal para seleccionar tamaño y extras
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content size-selector">
                <div class="modal-header">
                    <h3>Seleccionar Tamaño</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="size-options">
                        <div class="size-option" data-size="10ml" data-price="90">
                            <span class="size">10ml</span>
                            <span class="price">$90</span>
                        </div>
                        <div class="size-option" data-size="30ml" data-price="160">
                            <span class="size">30ml</span>
                            <span class="price">$160</span>
                        </div>
                        <div class="size-option" data-size="60ml" data-price="220">
                            <span class="size">60ml</span>
                            <span class="price">$220</span>
                        </div>
                        <div class="size-option" data-size="100ml" data-price="285">
                            <span class="size">100ml</span>
                            <span class="price">$285</span>
                        </div>
                    </div>
                    <div class="extras-section">
                        <h4>Extras Opcionales</h4>
                        <label class="extra-option">
                            <input type="checkbox" name="extras" value="feromonas" data-price="20">
                            <span>Feromonas (+$20)</span>
                        </label>
                        <label class="extra-option">
                            <input type="checkbox" name="extras" value="doble_fijador" data-price="15">
                            <span>Doble Fijador (+$15)</span>
                        </label>
                    </div>
                    <div class="quantity-section">
                        <label>Cantidad:</label>
                        <input type="number" id="quantity" value="1" min="1" max="10">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel">Cancelar</button>
                    <button class="btn-add-to-cart" disabled>Agregar al Carrito</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Eventos del modal
        this.setupSizeSelectorEvents(modal, productId);
    }
    
    setupSizeSelectorEvents(modal, productId) {
        const sizeOptions = modal.querySelectorAll('.size-option');
        const addButton = modal.querySelector('.btn-add-to-cart');
        const cancelButton = modal.querySelector('.btn-cancel');
        const closeButton = modal.querySelector('.modal-close');
        
        let selectedSize = null;
        
        // Selección de tamaño
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedSize = {
                    size: option.dataset.size,
                    price: parseFloat(option.dataset.price)
                };
                addButton.disabled = false;
            });
        });
        
        // Agregar al carrito
        addButton.addEventListener('click', async () => {
            if (!selectedSize) return;
            
            const extras = Array.from(modal.querySelectorAll('input[name="extras"]:checked'))
                .map(input => ({
                    name: input.value,
                    price: parseFloat(input.dataset.price)
                }));
            
            const quantity = parseInt(modal.querySelector('#quantity').value);
            
            if (window.cartSystem) {
                await window.cartSystem.addPerfume(productId, selectedSize, extras, quantity);
                this.showNotification('Perfume agregado al carrito', 'success');
            }
            
            document.body.removeChild(modal);
        });
        
        // Cerrar modal
        [cancelButton, closeButton].forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
        
        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    showProductDetails(productId) {
        // Implementar modal de detalles del producto
        console.log('Mostrar detalles del producto:', productId);
    }
    
    notifyWhenAvailable(productId) {
        this.showNotification('Te notificaremos cuando esté disponible', 'info');
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
        localStorage.setItem(`search_history_${this.tiendaSlug}`, JSON.stringify(this.searchHistory));
    }
    
    showLoading() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="search-loading">
                    <div class="loading-spinner"></div>
                    <p>Buscando productos...</p>
                </div>
            `;
        }
    }
    
    showError(message) {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="search-error">
                    <div class="error-icon">⚠️</div>
                    <h3>Error en la búsqueda</h3>
                    <p>${message}</p>
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
    
    showNotification(message, type = 'info') {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
    
    // Métodos públicos para uso externo
    searchByCode(codigo) {
        return this.performSearch(codigo);
    }
    
    searchByCategory(categoria) {
        return this.performSearch('', { categoria });
    }
    
    getSearchHistory() {
        return this.searchHistory;
    }
    
    clearSearchHistory() {
        this.searchHistory = [];
        localStorage.removeItem(`search_history_${this.tiendaSlug}`);
    }
}

// Exportar para uso global
window.SearchSystemMulti = SearchSystemMulti;
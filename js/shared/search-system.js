// ===== SISTEMA DE BÚSQUEDA AVANZADO =====
// Sistema de búsqueda integrado con la base de datos

class SearchSystem {
    constructor(options = {}) {
        this.apiBase = options.apiBase || '/api';
        this.container = options.container || document.body;
        this.onResultSelect = options.onResultSelect || this.defaultResultSelect;
        this.placeholder = options.placeholder || 'Buscar perfumes...';
        this.minChars = options.minChars || 2;
        this.debounceTime = options.debounceTime || 300;
        
        this.searchTimeout = null;
        this.isVisible = false;
        this.currentResults = [];
        this.selectedIndex = -1;
        
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.bindEvents();
    }

    createSearchInterface() {
        // Crear contenedor principal
        this.searchContainer = document.createElement('div');
        this.searchContainer.className = 'search-system';
        this.searchContainer.innerHTML = `
            <div class="search-input-container">
                <input type="text" 
                       class="search-input" 
                       placeholder="${this.placeholder}"
                       autocomplete="off">
                <div class="search-icon">🔍</div>
                <div class="search-clear" style="display: none;">✕</div>
            </div>
            <div class="search-results" style="display: none;">
                <div class="search-results-content"></div>
            </div>
        `;

        // Agregar estilos
        this.addStyles();
        
        // Insertar en el contenedor
        this.container.appendChild(this.searchContainer);
        
        // Referencias a elementos
        this.searchInput = this.searchContainer.querySelector('.search-input');
        this.searchResults = this.searchContainer.querySelector('.search-results');
        this.searchResultsContent = this.searchContainer.querySelector('.search-results-content');
        this.searchClear = this.searchContainer.querySelector('.search-clear');
    }

    addStyles() {
        if (document.getElementById('search-system-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'search-system-styles';
        styles.textContent = `
            .search-system {
                position: relative;
                width: 100%;
                max-width: 500px;
                margin: 0 auto;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .search-input-container {
                position: relative;
                display: flex;
                align-items: center;
            }

            .search-input {
                width: 100%;
                padding: 15px 50px 15px 20px;
                border: 2px solid #e1e5e9;
                border-radius: 25px;
                font-size: 16px;
                background: white;
                transition: all 0.3s ease;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .search-input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
            }

            .search-icon {
                position: absolute;
                right: 20px;
                color: #6c757d;
                font-size: 18px;
                pointer-events: none;
            }

            .search-clear {
                position: absolute;
                right: 20px;
                color: #6c757d;
                font-size: 16px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.2s ease;
            }

            .search-clear:hover {
                background: #f8f9fa;
                color: #dc3545;
            }

            .search-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #e1e5e9;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                z-index: 1000;
                max-height: 400px;
                overflow-y: auto;
                margin-top: 5px;
            }

            .search-results-content {
                padding: 10px 0;
            }

            .search-result-item {
                padding: 15px 20px;
                cursor: pointer;
                border-bottom: 1px solid #f8f9fa;
                transition: background-color 0.2s ease;
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .search-result-item:hover,
            .search-result-item.selected {
                background: #f8f9fa;
            }

            .search-result-item:last-child {
                border-bottom: none;
            }

            .search-result-image {
                width: 50px;
                height: 50px;
                border-radius: 8px;
                object-fit: cover;
                background: #f8f9fa;
                flex-shrink: 0;
            }

            .search-result-info {
                flex: 1;
            }

            .search-result-name {
                font-weight: 600;
                color: #2c3e50;
                margin-bottom: 5px;
                font-size: 16px;
            }

            .search-result-description {
                color: #6c757d;
                font-size: 14px;
                margin-bottom: 5px;
            }

            .search-result-price {
                color: #27ae60;
                font-weight: 600;
                font-size: 14px;
            }

            .search-result-category {
                background: #667eea;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }

            .search-no-results {
                padding: 30px 20px;
                text-align: center;
                color: #6c757d;
            }

            .search-loading {
                padding: 20px;
                text-align: center;
                color: #6c757d;
            }

            .search-popular-terms {
                padding: 15px 20px;
                border-top: 1px solid #f8f9fa;
            }

            .search-popular-title {
                font-size: 14px;
                font-weight: 600;
                color: #6c757d;
                margin-bottom: 10px;
            }

            .search-popular-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            .search-popular-tag {
                background: #f8f9fa;
                color: #495057;
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .search-popular-tag:hover {
                background: #667eea;
                color: white;
            }

            @media (max-width: 768px) {
                .search-system {
                    max-width: 100%;
                }
                
                .search-input {
                    padding: 12px 45px 12px 15px;
                    font-size: 16px;
                }
                
                .search-results {
                    max-height: 300px;
                }
                
                .search-result-item {
                    padding: 12px 15px;
                }
                
                .search-result-image {
                    width: 40px;
                    height: 40px;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }

    bindEvents() {
        // Evento de escritura en el input
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            // Mostrar/ocultar botón de limpiar
            this.searchClear.style.display = query ? 'block' : 'none';
            
            // Limpiar timeout anterior
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            
            // Buscar después del debounce
            this.searchTimeout = setTimeout(() => {
                if (query.length >= this.minChars) {
                    this.performSearch(query);
                } else if (query.length === 0) {
                    this.showPopularTerms();
                } else {
                    this.hideResults();
                }
            }, this.debounceTime);
        });

        // Evento de focus - mostrar términos populares si está vacío
        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim().length === 0) {
                this.showPopularTerms();
            } else if (this.currentResults.length > 0) {
                this.showResults();
            }
        });

        // Evento de blur - ocultar resultados después de un delay
        this.searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                this.hideResults();
            }, 200);
        });

        // Navegación con teclado
        this.searchInput.addEventListener('keydown', (e) => {
            if (!this.isVisible) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateResults(1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateResults(-1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    this.selectCurrentResult();
                    break;
                case 'Escape':
                    this.hideResults();
                    this.searchInput.blur();
                    break;
            }
        });

        // Limpiar búsqueda
        this.searchClear.addEventListener('click', () => {
            this.clearSearch();
        });

        // Prevenir que el contenedor de resultados pierda el foco
        this.searchResults.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });
    }

    async performSearch(query) {
        try {
            this.showLoading();
            
            const response = await fetch(`${this.apiBase}/productos/search/${encodeURIComponent(query)}`);
            const data = await response.json();
            
            if (data.success) {
                this.currentResults = data.data;
                this.displayResults(data.data, query);
            } else {
                this.showNoResults(query);
            }
        } catch (error) {
            console.error('Error en búsqueda:', error);
            this.showError('Error al realizar la búsqueda');
        }
    }

    async showPopularTerms() {
        try {
            const response = await fetch(`${this.apiBase}/productos/busquedas/populares`);
            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
                this.displayPopularTerms(data.data);
            }
        } catch (error) {
            console.error('Error cargando términos populares:', error);
        }
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }

        let html = '';
        results.forEach((product, index) => {
            const precioDesde = product.precio_desde ? `Desde $${this.formatPrice(product.precio_desde)}` : 'Consultar precio';
            const imagen = product.imagen_url || 'recursos/placeholder.jpg';
            
            html += `
                <div class="search-result-item" data-index="${index}">
                    <img src="${imagen}" alt="${product.nombre}" class="search-result-image" 
                         onerror="this.src='recursos/placeholder.jpg'">
                    <div class="search-result-info">
                        <div class="search-result-name">${this.highlightText(product.nombre, query)}</div>
                        <div class="search-result-description">${this.highlightText(product.descripcion || '', query)}</div>
                        <div class="search-result-price">${precioDesde}</div>
                    </div>
                    <div class="search-result-category">${product.categoria}</div>
                </div>
            `;
        });

        this.searchResultsContent.innerHTML = html;
        this.bindResultEvents();
        this.showResults();
        this.selectedIndex = -1;
    }

    displayPopularTerms(terms) {
        const html = `
            <div class="search-popular-terms">
                <div class="search-popular-title">Búsquedas populares:</div>
                <div class="search-popular-tags">
                    ${terms.slice(0, 8).map(term => 
                        `<span class="search-popular-tag" data-term="${term.termino_busqueda}">
                            ${term.termino_busqueda}
                        </span>`
                    ).join('')}
                </div>
            </div>
        `;

        this.searchResultsContent.innerHTML = html;
        this.bindPopularTermsEvents();
        this.showResults();
    }

    bindResultEvents() {
        const items = this.searchResultsContent.querySelectorAll('.search-result-item');
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectResult(index);
            });
            
            item.addEventListener('mouseenter', () => {
                this.selectedIndex = index;
                this.updateSelection();
            });
        });
    }

    bindPopularTermsEvents() {
        const tags = this.searchResultsContent.querySelectorAll('.search-popular-tag');
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                const term = tag.dataset.term;
                this.searchInput.value = term;
                this.performSearch(term);
            });
        });
    }

    navigateResults(direction) {
        const maxIndex = this.currentResults.length - 1;
        
        if (direction > 0) {
            this.selectedIndex = this.selectedIndex < maxIndex ? this.selectedIndex + 1 : 0;
        } else {
            this.selectedIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : maxIndex;
        }
        
        this.updateSelection();
    }

    updateSelection() {
        const items = this.searchResultsContent.querySelectorAll('.search-result-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
        
        // Scroll al elemento seleccionado
        if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
            items[this.selectedIndex].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    }

    selectCurrentResult() {
        if (this.selectedIndex >= 0 && this.currentResults[this.selectedIndex]) {
            this.selectResult(this.selectedIndex);
        }
    }

    selectResult(index) {
        const product = this.currentResults[index];
        if (product) {
            this.onResultSelect(product);
            this.hideResults();
        }
    }

    defaultResultSelect(product) {
        // Comportamiento por defecto: mostrar modal del producto
        if (typeof mostrarModal === 'function') {
            mostrarModal(product.id);
        } else {
            console.log('Producto seleccionado:', product);
        }
    }

    showLoading() {
        this.searchResultsContent.innerHTML = `
            <div class="search-loading">
                🔍 Buscando...
            </div>
        `;
        this.showResults();
    }

    showNoResults(query) {
        this.searchResultsContent.innerHTML = `
            <div class="search-no-results">
                <div style="font-size: 24px; margin-bottom: 10px;">😔</div>
                <div>No se encontraron resultados para "<strong>${query}</strong>"</div>
                <div style="margin-top: 10px; font-size: 14px;">
                    Intenta con otros términos o revisa la ortografía
                </div>
            </div>
        `;
        this.showResults();
        this.currentResults = [];
    }

    showError(message) {
        this.searchResultsContent.innerHTML = `
            <div class="search-no-results">
                <div style="color: #dc3545;">❌ ${message}</div>
            </div>
        `;
        this.showResults();
    }

    showResults() {
        this.searchResults.style.display = 'block';
        this.isVisible = true;
    }

    hideResults() {
        this.searchResults.style.display = 'none';
        this.isVisible = false;
        this.selectedIndex = -1;
    }

    clearSearch() {
        this.searchInput.value = '';
        this.searchClear.style.display = 'none';
        this.hideResults();
        this.currentResults = [];
        this.searchInput.focus();
    }

    highlightText(text, query) {
        if (!text || !query) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark style="background: #fff3cd; padding: 1px 2px; border-radius: 2px;">$1</mark>');
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-MX', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    // Métodos públicos para control externo
    focus() {
        this.searchInput.focus();
    }

    setValue(value) {
        this.searchInput.value = value;
        if (value.trim().length >= this.minChars) {
            this.performSearch(value.trim());
        }
    }

    getValue() {
        return this.searchInput.value;
    }

    destroy() {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchContainer.remove();
    }
}

// Función de inicialización global
function initSearchSystem(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Contenedor ${containerId} no encontrado`);
        return null;
    }
    
    return new SearchSystem({
        container: container,
        ...options
    });
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SearchSystem, initSearchSystem };
}
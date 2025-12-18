// ===== MODAL.JS - Modales y Popups =====

class ModalManager {
    constructor() {
        this.modalActual = null;
        this.productoSeleccionado = null;
        this.tamañoSeleccionado = '30ml';
        this.extrasSeleccionados = [];
    }

    // Crear el modal HTML
    createProductModal() {
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.id = 'productModal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="modalManager.closeProductModal()">&times;</button>
                
                <div class="modal-header">
                    <img class="modal-product-image" id="modalProductImage" src="" alt="">
                    <h2 class="modal-product-name" id="modalProductName"></h2>
                    <p class="modal-product-inspired" id="modalProductInspired"></p>
                    <p class="modal-product-description" id="modalProductDescription"></p>
                    <div class="availability-indicator">
                        <div class="availability-dot"></div>
                        <span>Disponible - Entrega inmediata</span>
                    </div>
                </div>
                
                <div class="sizes-section">
                    <h3 class="section-title">Selecciona el tamaño</h3>
                    <div class="sizes-grid" id="sizesGrid">
                        <!-- Los tamaños se generarán dinámicamente -->
                    </div>
                </div>
                
                <div class="extras-section">
                    <h3 class="section-title">Extras disponibles (puedes elegir ambos)</h3>
                    <div class="extras-grid" id="extrasGrid">
                        <!-- Los extras se generarán dinámicamente -->
                    </div>
                </div>
                
                <div class="price-summary">
                    <div class="price-breakdown">
                        <span>Perfume (<span id="selectedSize">30ml</span>):</span>
                        <span>$<span id="basePrice">180</span></span>
                    </div>
                    <div id="extrasBreakdown">
                        <!-- Breakdown de extras se generará dinámicamente -->
                    </div>
                    <div class="price-breakdown total">
                        <span>Total:</span>
                        <span>$<span id="totalPrice">180</span></span>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-action btn-primary" onclick="modalManager.addToCart()">
                        Agregar al Carrito
                    </button>
                    <button class="btn-action btn-secondary" onclick="modalManager.contactForProduct()">
                        Consultar por WhatsApp
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return modal;
    }

    // Abrir modal de producto
    openProductModal(producto) {
        this.productoSeleccionado = producto;
        
        // Crear modal si no existe
        if (!this.modalActual) {
            this.modalActual = this.createProductModal();
        }
        
        // Llenar información del producto
        this.fillProductInfo(producto);
        
        // Generar opciones
        this.generateSizeOptions();
        this.generateExtraOptions();
        
        // Resetear selecciones
        this.tamañoSeleccionado = '30ml';
        this.extrasSeleccionados = [];
        
        // Actualizar precio
        this.updatePriceBreakdown();
        
        // Mostrar modal
        this.modalActual.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Llenar información del producto
    fillProductInfo(producto) {
        const elements = {
            image: document.getElementById('modalProductImage'),
            name: document.getElementById('modalProductName'),
            inspired: document.getElementById('modalProductInspired'),
            description: document.getElementById('modalProductDescription')
        };

        if (elements.image) elements.image.src = producto.imagen;
        if (elements.name) elements.name.textContent = producto.nombre;
        if (elements.inspired) elements.inspired.textContent = producto.inspirado;
        if (elements.description) elements.description.textContent = producto.descripcion;
    }

    // Cerrar modal
    closeProductModal() {
        if (this.modalActual) {
            this.modalActual.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Generar opciones de tamaño
    generateSizeOptions() {
        const sizesGrid = document.getElementById('sizesGrid');
        if (!sizesGrid) return;
        
        sizesGrid.innerHTML = '';
        
        Object.entries(CONFIG.precios.tamaños).forEach(([tamaño, precio]) => {
            const sizeOption = document.createElement('div');
            sizeOption.className = `size-option ${tamaño === this.tamañoSeleccionado ? 'selected' : ''}`;
            sizeOption.onclick = () => this.selectSize(tamaño);
            
            sizeOption.innerHTML = `
                <div class="size-ml">${tamaño}</div>
                <div class="size-price">$${precio}</div>
            `;
            
            sizesGrid.appendChild(sizeOption);
        });
    }

    // Generar opciones de extras
    generateExtraOptions() {
        const extrasGrid = document.getElementById('extrasGrid');
        if (!extrasGrid) return;
        
        extrasGrid.innerHTML = '';
        
        const is10ml = this.tamañoSeleccionado === '10ml';
        
        Object.entries(CONFIG.precios.extras).forEach(([key, extra]) => {
            const isSelected = this.extrasSeleccionados.includes(key);
            
            const extraOption = document.createElement('div');
            extraOption.className = `extra-option ${isSelected ? 'selected' : ''}`;
            extraOption.onclick = () => this.toggleExtra(key);
            
            // Para 10ml, mostrar "Ya viene incluido" y permitir selección sin costo
            const priceText = is10ml ? 'Ya viene incluido' : `+$${extra.precio}`;
            const priceColor = is10ml ? '#00ff88' : '#ffd700';
            
            extraOption.innerHTML = `
                <div class="extra-info">
                    <div class="extra-name">${extra.nombre}</div>
                    <div class="extra-description">${extra.descripcion}</div>
                    ${is10ml ? '<div class="extra-description" style="color: #00ff88;">Incluido sin costo adicional</div>' : ''}
                </div>
                <div class="extra-price" style="color: ${priceColor}">${priceText}</div>
            `;
            
            extrasGrid.appendChild(extraOption);
        });
    }

    // Seleccionar tamaño
    selectSize(tamaño) {
        this.tamañoSeleccionado = tamaño;
        
        // Actualizar UI de tamaños
        document.querySelectorAll('.size-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Encontrar y seleccionar el tamaño correcto
        const selectedOption = Array.from(document.querySelectorAll('.size-option')).find(option => 
            option.querySelector('.size-ml').textContent === tamaño
        );
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
        
        // Regenerar extras
        this.generateExtraOptions();
        
        // Actualizar precio
        this.updatePriceBreakdown();
    }

    // Alternar extras - ACTUALIZADO: Permite múltiples extras
    toggleExtra(extraKey) {
        const index = this.extrasSeleccionados.indexOf(extraKey);
        
        if (index > -1) {
            // Si ya está seleccionado, deseleccionarlo
            this.extrasSeleccionados.splice(index, 1);
        } else {
            // Permitir múltiples extras (doble fijador y feromonas)
            this.extrasSeleccionados.push(extraKey);
        }
        
        // Actualizar UI
        this.generateExtraOptions();
        this.updatePriceBreakdown();
    }

    // Actualizar desglose de precios
    updatePriceBreakdown() {
        const basePrice = CONFIG.precios.tamaños[this.tamañoSeleccionado];
        const is10ml = this.tamañoSeleccionado === '10ml';
        let totalExtras = 0;
        
        // Actualizar precio base
        const selectedSizeEl = document.getElementById('selectedSize');
        const basePriceEl = document.getElementById('basePrice');
        
        if (selectedSizeEl) selectedSizeEl.textContent = this.tamañoSeleccionado;
        if (basePriceEl) basePriceEl.textContent = basePrice;
        
        // Generar desglose de extras
        const extrasBreakdown = document.getElementById('extrasBreakdown');
        if (extrasBreakdown) {
            extrasBreakdown.innerHTML = '';
            
            this.extrasSeleccionados.forEach(extraKey => {
                const extra = CONFIG.precios.extras[extraKey];
                const extraPrice = is10ml ? 0 : extra.precio; // No cobrar en 10ml
                totalExtras += extraPrice;
                
                const extraLine = document.createElement('div');
                extraLine.className = 'price-breakdown';
                extraLine.innerHTML = `
                    <span>${extra.nombre}:</span>
                    <span>${is10ml ? 'Incluido' : `+$${extraPrice}`}</span>
                `;
                extrasBreakdown.appendChild(extraLine);
            });
        }
        
        // Actualizar precio total
        const totalPrice = basePrice + totalExtras;
        const totalPriceEl = document.getElementById('totalPrice');
        if (totalPriceEl) totalPriceEl.textContent = totalPrice;
    }

    // Agregar al carrito
    addToCart() {
        if (!this.productoSeleccionado) return;
        
        // Usar el cart manager para agregar el producto
        if (window.cartManager) {
            window.cartManager.addToCart(
                this.productoSeleccionado,
                this.tamañoSeleccionado,
                this.extrasSeleccionados
            );
        }
        
        this.closeProductModal();
    }

    // Contactar por WhatsApp
    contactForProduct() {
        const extras = this.extrasSeleccionados.map(key => CONFIG.precios.extras[key].nombre);
        const totalPriceEl = document.getElementById('totalPrice');
        const totalPrice = totalPriceEl ? totalPriceEl.textContent : '0';
        
        const mensaje = `Hola! Me interesa el perfume "${this.productoSeleccionado.nombre}" en ${this.tamañoSeleccionado}${extras.length > 0 ? ` con ${extras.join(', ')}` : ''}. Precio total: $${totalPrice}`;
        
        const url = `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
        this.closeProductModal();
    }

    // Inicializar modal manager
    init() {
        // Cerrar modal al hacer clic fuera de él
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('product-modal')) {
                this.closeProductModal();
            }
        });

        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modalActual && this.modalActual.classList.contains('active')) {
                this.closeProductModal();
            }
        });
    }
}

// Crear instancia global
const modalManager = new ModalManager();
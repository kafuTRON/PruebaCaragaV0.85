// ===== CART.JS - Sistema de Carrito de Compras =====

class CartManager {
    constructor() {
        this.items = STATE.carritoItems;
        this.entregaDomicilio = STATE.entregaDomicilio;
        this.modalCarrito = null;
    }

    // Obtener icono según la cantidad de items
    getCartIcon(cantidad) {
        if (cantidad === 0) return CONFIG.iconos.carrito.vacio;
        if (cantidad === 1) return CONFIG.iconos.carrito.semiVacio;
        if (cantidad <= 3) return CONFIG.iconos.carrito.semiLleno;
        return CONFIG.iconos.carrito.lleno;
    }

    // Actualizar icono del carrito
    updateCartIcon() {
        const cartIcon = document.getElementById('cartIcon');
        const cartCounter = document.getElementById('cartCounter');
        const cantidad = this.items.length;
        
        if (!cartIcon || !cartCounter) return;
        
        // Actualizar icono
        cartIcon.src = this.getCartIcon(cantidad);
        
        // Actualizar contador
        cartCounter.textContent = cantidad;
        
        if (cantidad > 0) {
            cartCounter.classList.add('visible');
            cartCounter.classList.add('bounce');
            setTimeout(() => cartCounter.classList.remove('bounce'), 600);
        } else {
            cartCounter.classList.remove('visible');
        }
    }

    // Agregar producto al carrito
    addToCart(producto, tamaño, extras) {
        const is10ml = tamaño === '10ml';
        
        // Calcular precio
        const precioBase = CONFIG.precios.tamaños[tamaño];
        const precioExtras = is10ml ? 0 : extras.length * 35;
        const precioTotal = precioBase + precioExtras;
        
        const item = {
            id: Date.now(), // ID único
            producto: producto.nombre,
            imagen: producto.imagen,
            inspirado: producto.inspirado,
            tamaño: tamaño,
            extras: extras.map(key => CONFIG.precios.extras[key].nombre),
            precioBase: precioBase,
            precioExtras: precioExtras,
            precioTotal: precioTotal,
            is10ml: is10ml
        };
        
        this.items.push(item);
        STATE.carritoItems = this.items;
        this.updateCartIcon();
        
        // Mostrar confirmación
        this.showAddToCartConfirmation(item);
        
        return item;
    }

    // Mostrar confirmación de agregado al carrito
    showAddToCartConfirmation(item) {
        const notification = document.createElement('div');
        notification.className = 'notification-enter';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(45deg, #00ff88, #00cc6a);
            color: #000;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            font-weight: bold;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 8px 25px rgba(0,255,136,0.3);
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">✓</span>
                <div>
                    <div style="font-size: 0.9rem;">${item.producto}</div>
                    <div style="font-size: 0.8rem; opacity: 0.8;">${item.tamaño} - $${item.precioTotal}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.classList.add('notification-exit');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Eliminar producto del carrito
    removeFromCart(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        STATE.carritoItems = this.items;
        this.updateCartIcon();
        this.updateCartModalContent();
        
        // Si el carrito queda vacío, actualizar el ícono del header
        if (this.items.length === 0) {
            const headerIcon = document.querySelector('.cart-title img');
            if (headerIcon) {
                headerIcon.src = CONFIG.iconos.carrito.vacio;
            }
        }
    }

    // Alternar entrega a domicilio
    toggleDelivery() {
        this.entregaDomicilio = !this.entregaDomicilio;
        STATE.entregaDomicilio = this.entregaDomicilio;
        this.updateCartModalContent();
    }

    // Calcular totales
    calculateTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + item.precioTotal, 0);
        const costoEntrega = this.entregaDomicilio ? CONFIG.precios.entregaDomicilio : 0;
        const total = subtotal + costoEntrega;
        
        return { subtotal, costoEntrega, total };
    }

    // Crear modal del carrito
    createCartModal() {
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.id = 'cartModal';
        
        modal.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h2 class="cart-title">
                        <img src="${CONFIG.iconos.carrito.vacio}" alt="Carrito" style="width: 30px; height: 30px;">
                        Mi Carrito
                    </h2>
                    <button class="cart-close" onclick="cartManager.closeCartModal()">&times;</button>
                </div>
                
                <div id="cartContent">
                    <!-- El contenido se generará dinámicamente -->
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return modal;
    }

    // Abrir modal del carrito
    openCartModal() {
        if (!this.modalCarrito) {
            this.modalCarrito = this.createCartModal();
        }
        
        this.updateCartModalContent();
        this.modalCarrito.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal del carrito
    closeCartModal() {
        if (this.modalCarrito) {
            this.modalCarrito.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Actualizar contenido del modal del carrito
    updateCartModalContent() {
        const cartContent = document.getElementById('cartContent');
        if (!cartContent) return;
        
        if (this.items.length === 0) {
            cartContent.innerHTML = this.renderEmptyCart();
            return;
        }
        
        const { subtotal, costoEntrega, total } = this.calculateTotals();
        cartContent.innerHTML = this.renderCartContent(subtotal, costoEntrega, total);
    }

    // Renderizar carrito vacío
    renderEmptyCart() {
        return `
            <div class="cart-empty">
                <img class="cart-empty-icon" src="${CONFIG.iconos.carrito.vacio}" alt="Carrito vacío">
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algunos perfumes para comenzar</p>
            </div>
        `;
    }

    // Renderizar contenido del carrito
    renderCartContent(subtotal, costoEntrega, total) {
        return `
            <div class="cart-items">
                ${this.items.map(item => this.renderCartItem(item)).join('')}
            </div>
            
            <div class="delivery-option ${this.entregaDomicilio ? 'selected' : ''}" onclick="cartManager.toggleDelivery()">
                <div class="delivery-info">
                    <strong>Entrega a domicilio</strong>
                    <div style="font-size: 0.9rem; color: #bbb;">Recibe tu pedido en casa</div>
                </div>
                <div class="delivery-price">+$${CONFIG.precios.entregaDomicilio}</div>
            </div>
            
            <div class="cart-summary">
                <div class="cart-summary-row">
                    <span>Subtotal (${this.items.length} ${this.items.length === 1 ? 'producto' : 'productos'}):</span>
                    <span>$${subtotal}</span>
                </div>
                ${this.entregaDomicilio ? `
                    <div class="cart-summary-row">
                        <span>Entrega a domicilio:</span>
                        <span>$${costoEntrega}</span>
                    </div>
                ` : ''}
                <div class="cart-summary-row total">
                    <span>Total:</span>
                    <span>$${total}</span>
                </div>
            </div>
            
            <div class="cart-actions">
                <button class="btn-cart-action btn-cart-primary" onclick="cartManager.proceedToCheckout()">
                    Proceder al Pago
                </button>
                <button class="btn-cart-action btn-cart-secondary" onclick="cartManager.contactForCart()">
                    Consultar por WhatsApp
                </button>
            </div>
        `;
    }

    // Renderizar item del carrito
    renderCartItem(item) {
        return `
            <div class="cart-item">
                <div class="cart-item-header">
                    <div class="cart-item-info">
                        <h4>${item.producto}</h4>
                        <div class="cart-item-details">
                            <div>${item.inspirado}</div>
                            <div><strong>Tamaño:</strong> ${item.tamaño}</div>
                            ${item.extras.length > 0 ? `<div><strong>Extra:</strong> ${item.extras.join(', ')} ${item.is10ml ? '(Incluido)' : '(+$' + item.precioExtras + ')'}</div>` : ''}
                        </div>
                    </div>
                    <div class="cart-item-price">$${item.precioTotal}</div>
                </div>
                <button class="cart-item-remove" onclick="cartManager.removeFromCart(${item.id})">
                    Eliminar del carrito
                </button>
            </div>
        `;
    }

    // Proceder al pago
    proceedToCheckout() {
        const { total } = this.calculateTotals();
        
        alert('¡Gracias por tu compra!\\n\\nResumen:\\n' + this.items.length + ' productos\\nTotal: $' + total + '\\n' + (this.entregaDomicilio ? 'Con entrega a domicilio' : 'Retiro en tienda') + '\\n\\nTe contactaremos pronto para confirmar tu pedido.');
        
        // Limpiar carrito
        this.clearCart();
    }

    // Contactar por WhatsApp con todo el carrito
    contactForCart() {
        const { subtotal, total } = this.calculateTotals();
        
        let mensaje = '¡Hola! Me interesa hacer el siguiente pedido:\\n\\n';
        
        this.items.forEach((item, index) => {
            mensaje += (index + 1) + '. ' + item.producto + ' - ' + item.tamaño + '\\n';
            if (item.extras.length > 0) {
                mensaje += '   Extra: ' + item.extras.join(', ') + ' ' + (item.is10ml ? '(Incluido)' : '') + '\\n';
            }
            mensaje += '   Precio: $' + item.precioTotal + '\\n\\n';
        });
        
        mensaje += 'Subtotal: $' + subtotal + '\\n';
        if (this.entregaDomicilio) {
            mensaje += 'Entrega a domicilio: $' + CONFIG.precios.entregaDomicilio + '\\n';
        }
        mensaje += 'Total: $' + total + '\\n\\n';
        mensaje += this.entregaDomicilio ? 'Con entrega a domicilio' : 'Retiro en tienda';
        
        const url = 'https://wa.me/' + CONFIG.whatsapp.numero + '?text=' + encodeURIComponent(mensaje);
        window.open(url, '_blank');
        this.closeCartModal();
    }

    // Limpiar carrito
    clearCart() {
        this.items = [];
        STATE.carritoItems = [];
        this.updateCartIcon();
        this.closeCartModal();
    }

    // Inicializar carrito
    init() {
        this.updateCartIcon();
        
        // Cerrar modal al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('cart-modal')) {
                this.closeCartModal();
            }
        });
    }
}

// Crear instancia global
const cartManager = new CartManager();

// Función global para compatibilidad (llamada desde HTML)
function openCartModal() {
    cartManager.openCartModal();
}
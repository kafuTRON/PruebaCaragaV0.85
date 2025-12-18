// ===== CART-SIMPLE.JS - Sistema de Carrito Simplificado =====
// VERSIÓN ACTUALIZADA: Permite seleccionar múltiples extras (doble fijador y feromonas)

// Variables globales del carrito
let carritoItems = [];
let entregaDomicilio = false;
let modalCarrito = null;

// Función para obtener icono del carrito
function getCartIcon(cantidad) {
    if (cantidad === 0) return 'recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png';
    if (cantidad === 1) return 'recursos/A&A/Material Grafico/Carrito_de_compras_SemiVacio.png';
    if (cantidad <= 3) return 'recursos/A&A/Material Grafico/Carrito_de_compras_Semilleno.png';
    return 'recursos/A&A/Material Grafico/Carrito_de_compras_Lleno.png';
}

// Función para actualizar icono del carrito
function updateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    const cartCounter = document.getElementById('cartCounter');
    const cantidad = carritoItems.length;
    
    if (cartIcon) {
        cartIcon.src = getCartIcon(cantidad);
    }
    
    if (cartCounter) {
        cartCounter.textContent = cantidad;
        if (cantidad > 0) {
            cartCounter.classList.add('visible');
        } else {
            cartCounter.classList.remove('visible');
        }
    }
}

// FUNCIÓN CORREGIDA: Permite múltiples extras (doble fijador y feromonas)
function selectExtra(extra) {
    const index = window.selectedExtras.indexOf(extra);
    if (index > -1) {
        // Si ya está seleccionado, lo removemos
        window.selectedExtras.splice(index, 1);
    } else {
        // Si no está seleccionado, lo agregamos (permite múltiples)
        window.selectedExtras.push(extra);
    }
    
    updatePriceDisplay();
}

// FUNCIÓN CORREGIDA: Calcula precio de múltiples extras
function updatePriceDisplay() {
    const precioBase = CONFIG.precios.tamaños[window.selectedSize];
    const is10ml = window.selectedSize === '10ml';
    
    let precioExtras = 0;
    if (!is10ml && window.selectedExtras.length > 0) {
        // Sumar el precio de TODOS los extras seleccionados
        window.selectedExtras.forEach(extraKey => {
            precioExtras += CONFIG.precios.extras[extraKey].precios[window.selectedSize];
        });
    }
    
    const total = precioBase + precioExtras;
    
    document.getElementById('selectedSizeDisplay').textContent = window.selectedSize;
    document.getElementById('basePriceDisplay').textContent = precioBase;
    document.getElementById('totalPriceDisplay').textContent = total;
    
    // Actualizar extras dinámicamente
    updateExtrasDisplay();
    
    // Actualizar desglose de extras - MUESTRA TODOS LOS EXTRAS SELECCIONADOS
    const extrasBreakdown = document.getElementById('extrasBreakdown');
    if (window.selectedExtras.length > 0) {
        let extrasHTML = '';
        window.selectedExtras.forEach(extraKey => {
            const extraName = CONFIG.precios.extras[extraKey].nombre;
            const extraPrice = is10ml ? 0 : CONFIG.precios.extras[extraKey].precios[window.selectedSize];
            
            extrasHTML += '<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: #ccc;">';
            extrasHTML += '<span>' + extraName + ':</span>';
            extrasHTML += '<span>' + (is10ml ? 'Incluido' : '+$' + extraPrice) + '</span>';
            extrasHTML += '</div>';
        });
        extrasBreakdown.innerHTML = extrasHTML;
    } else {
        extrasBreakdown.innerHTML = '';
    }
}

// Función para actualizar display de extras dinámicamente
function updateExtrasDisplay() {
    const extrasContainer = document.getElementById('extrasContainer');
    if (!extrasContainer) return;
    
    const is10ml = window.selectedSize === '10ml';
    
    let extrasHTML = '';
    Object.entries(CONFIG.precios.extras).forEach(([key, extra]) => {
        const isSelected = window.selectedExtras.includes(key);
        const extraPrice = is10ml ? 0 : extra.precios[window.selectedSize];
        const priceText = is10ml ? 'Ya incluido' : '+$' + extraPrice;
        const priceColor = is10ml ? '#00ff88' : '#ffd700';
        
        extrasHTML += '<div class="extra-option ' + (isSelected ? 'selected' : '') + '" onclick="selectExtra(\'' + key + '\')" ';
        extrasHTML += 'style="background: ' + (isSelected ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)') + '; ';
        extrasHTML += 'border: 2px solid ' + (isSelected ? '#ffd700' : 'rgba(255,255,255,0.1)') + '; ';
        extrasHTML += 'border-radius: 10px; padding: 1rem; cursor: pointer; margin-bottom: 0.5rem; ';
        extrasHTML += 'display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease;">';
        extrasHTML += '<div>';
        extrasHTML += '<div style="color: white; font-weight: bold; margin-bottom: 0.2rem;">' + extra.nombre + '</div>';
        extrasHTML += '<div style="color: #bbb; font-size: 0.9rem;">' + extra.descripcion + '</div>';
        if (is10ml) {
            extrasHTML += '<div style="color: #00ff88; font-size: 0.8rem; margin-top: 0.3rem;">✓ Incluido sin costo adicional</div>';
        }
        extrasHTML += '</div>';
        extrasHTML += '<div style="color: ' + priceColor + '; font-weight: bold;">' + priceText + '</div>';
        extrasHTML += '</div>';
    });
    
    extrasContainer.innerHTML = extrasHTML;
}
// Función para abrir modal de producto
function openProductModal(nombreProducto) {
    console.log('Abriendo modal de producto:', nombreProducto);
    
    // Buscar producto
    const producto = window.PRODUCTOS.find(p => p.nombre === nombreProducto);
    if (!producto) {
        console.error('Producto no encontrado:', nombreProducto);
        return;
    }
    
    // Crear modal de producto
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    
    let modalHTML = '<div class="modal-content">';
    modalHTML += '<button class="modal-close" onclick="closeProductModal()">&times;</button>';
    modalHTML += '<div class="modal-header">';
    modalHTML += '<img class="modal-product-image" src="' + producto.imagen + '" alt="' + producto.nombre + '" style="width: 120px; height: 120px; object-fit: cover; border-radius: 15px; margin: 0 auto 1rem; display: block;">';
    modalHTML += '<h2 style="color: #ffd700; text-align: center; margin-bottom: 0.5rem;">' + producto.nombre + '</h2>';
    modalHTML += '<p style="color: #ccc; text-align: center; font-style: italic; margin-bottom: 0.5rem;">' + producto.inspirado + '</p>';
    modalHTML += '<p style="color: #bbb; text-align: center; margin-bottom: 1rem;">' + producto.descripcion + '</p>';
    modalHTML += '<div style="text-align: center; background: rgba(0, 255, 0, 0.1); color: #00ff88; padding: 0.5rem; border-radius: 10px; margin-bottom: 1rem;">';
    modalHTML += '<span style="display: inline-block; width: 8px; height: 8px; background: #00ff88; border-radius: 50%; margin-right: 0.5rem;"></span>';
    modalHTML += 'Disponible - Entrega inmediata';
    modalHTML += '</div>';
    modalHTML += '</div>';
    
    modalHTML += '<div style="margin-bottom: 1.5rem;">';
    modalHTML += '<h3 style="color: #ffd700; text-align: center; margin-bottom: 1rem;">Selecciona el tamaño</h3>';
    modalHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">';
    modalHTML += '<div class="size-option" onclick="selectSize(\'10ml\', this)" style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">';
    modalHTML += '<div style="font-size: 1.2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">10ml</div>';
    modalHTML += '<div style="color: #ffd700; font-weight: bold;">$90</div>';
    modalHTML += '<div style="color: #00ff88; font-size: 0.8rem; margin-top: 0.3rem;">Todo incluido</div>';
    modalHTML += '</div>';
    modalHTML += '<div class="size-option selected" onclick="selectSize(\'30ml\', this)" style="background: rgba(255,215,0,0.2); border: 2px solid #ffd700; border-radius: 10px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">';
    modalHTML += '<div style="font-size: 1.2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">30ml</div>';
    modalHTML += '<div style="color: #ffd700; font-weight: bold;">$160</div>';
    modalHTML += '</div>';
    modalHTML += '<div class="size-option" onclick="selectSize(\'60ml\', this)" style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">';
    modalHTML += '<div style="font-size: 1.2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">60ml</div>';
    modalHTML += '<div style="color: #ffd700; font-weight: bold;">$220</div>';
    modalHTML += '</div>';
    modalHTML += '<div class="size-option" onclick="selectSize(\'100ml\', this)" style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">';
    modalHTML += '<div style="font-size: 1.2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">100ml</div>';
    modalHTML += '<div style="color: #ffd700; font-weight: bold;">$285</div>';
    modalHTML += '</div>';
    modalHTML += '</div>';
    modalHTML += '</div>';
    
    modalHTML += '<div style="margin-bottom: 1.5rem;">';
    modalHTML += '<h3 style="color: #ffd700; text-align: center; margin-bottom: 1rem;">Extras disponibles (puedes elegir ambos)</h3>';
    modalHTML += '<div id="extrasContainer"></div>';
    modalHTML += '</div>';
    
    modalHTML += '<div style="background: rgba(255,215,0,0.1); border: 2px solid rgba(255,215,0,0.3); border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem;">';
    modalHTML += '<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: #ccc;">';
    modalHTML += '<span>Perfume (<span id="selectedSizeDisplay">30ml</span>):</span>';
    modalHTML += '<span>$<span id="basePriceDisplay">160</span></span>';
    modalHTML += '</div>';
    modalHTML += '<div id="extrasBreakdown"></div>';
    modalHTML += '<div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(255,215,0,0.3); padding-top: 0.5rem; margin-top: 1rem; font-weight: bold; font-size: 1.2rem; color: #ffd700;">';
    modalHTML += '<span>Total:</span>';
    modalHTML += '<span>$<span id="totalPriceDisplay">160</span></span>';
    modalHTML += '</div>';
    modalHTML += '</div>';
    
    modalHTML += '<div style="display: flex; gap: 1rem; justify-content: center;">';
    modalHTML += '<button onclick="addProductToCart()" style="background: linear-gradient(45deg, #ffd700, #ffed4e); color: #000; border: none; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">Agregar al Carrito</button>';
    modalHTML += '<button onclick="requestCustomerDataForProduct()" style="background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">Consultar por WhatsApp</button>';
    modalHTML += '</div>';
    modalHTML += '</div>';
    
    modal.innerHTML = modalHTML;
    document.body.appendChild(modal);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Guardar producto actual
    window.currentProduct = producto;
    window.selectedSize = '30ml';
    window.selectedExtras = [];
    
    // Inicializar display de extras
    setTimeout(() => {
        updateExtrasDisplay();
    }, 100);
}

// Función para cerrar modal de producto
function closeProductModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Función para seleccionar tamaño
function selectSize(size, element) {
    window.selectedSize = size;
    
    // Reset extras al cambiar tamaño
    window.selectedExtras = [];
    
    // Actualizar UI de tamaños
    document.querySelectorAll('.size-option').forEach(option => {
        option.style.background = 'rgba(255,255,255,0.05)';
        option.style.border = '2px solid rgba(255,255,255,0.1)';
    });
    
    // Si no se pasa element, buscar por el evento
    const targetElement = element || event?.target?.closest('.size-option');
    if (targetElement) {
        targetElement.style.background = 'rgba(255,215,0,0.2)';
        targetElement.style.border = '2px solid #ffd700';
    }
    
    updatePriceDisplay();
}
// Función para agregar producto actual al carrito
function addProductToCart() {
    if (window.currentProduct) {
        addToCart(window.currentProduct, window.selectedSize, window.selectedExtras);
        closeProductModal();
    }
}

// Función para agregar producto al carrito - ACTUALIZADA PARA MÚLTIPLES EXTRAS
function addToCart(producto, tamaño, extras) {
    const is10ml = tamaño === '10ml';
    
    // Usar precios de CONFIG
    const precioBase = CONFIG.precios.tamaños[tamaño];
    
    // Calcular precio de extras - SUMA TODOS LOS EXTRAS SELECCIONADOS
    let precioExtras = 0;
    if (!is10ml && extras.length > 0) {
        extras.forEach(extraKey => {
            precioExtras += CONFIG.precios.extras[extraKey].precios[tamaño];
        });
    }
    
    const precioTotal = precioBase + precioExtras;
    
    // Convertir extras a nombres legibles
    const extrasNombres = extras.map(extra => {
        if (extra === 'doble_fijador') return 'Doble Fijador';
        if (extra === 'feromonas') return 'Feromonas';
        return extra;
    });
    
    const item = {
        id: Date.now(),
        producto: producto.nombre,
        imagen: producto.imagen,
        inspirado: producto.inspirado,
        tamaño: tamaño,
        extras: extrasNombres,
        precioBase: precioBase,
        precioExtras: precioExtras,
        precioTotal: precioTotal,
        is10ml: is10ml
    };
    
    carritoItems.push(item);
    updateCartIcon();
    
    // Mostrar notificación
    const extrasText = extrasNombres.length > 0 ? ' con ' + extrasNombres.join(' y ') : '';
    showNotification('Producto agregado al carrito: ' + producto.nombre + ' (' + tamaño + ')' + extrasText);
    
    console.log('Producto agregado al carrito:', item);
}

// Función para mostrar notificación
function showNotification(mensaje) {
    const notification = document.createElement('div');
    notification.style.cssText = 'position: fixed; top: 100px; right: 20px; background: linear-gradient(45deg, #00ff88, #00cc6a); color: #000; padding: 1rem 1.5rem; border-radius: 15px; font-weight: bold; z-index: 10001; transform: translateX(100%); transition: transform 0.3s ease; box-shadow: 0 8px 25px rgba(0,255,136,0.3); max-width: 300px;';
    
    notification.textContent = mensaje;
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Función para abrir modal del carrito
function openCartModal() {
    console.log('Abriendo modal del carrito...', carritoItems);
    
    // Crear modal si no existe
    if (!modalCarrito) {
        modalCarrito = document.createElement('div');
        modalCarrito.className = 'cart-modal';
        modalCarrito.id = 'cartModal';
        
        let modalHTML = '<div class="cart-modal-content">';
        modalHTML += '<div class="cart-header">';
        modalHTML += '<h2 class="cart-title">';
        modalHTML += '<img src="recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png" alt="Carrito" style="width: 30px; height: 30px;">';
        modalHTML += 'Mi Carrito';
        modalHTML += '</h2>';
        modalHTML += '<button class="cart-close" onclick="closeCartModal()">&times;</button>';
        modalHTML += '</div>';
        modalHTML += '<div id="cartContent"></div>';
        modalHTML += '</div>';
        
        modalCarrito.innerHTML = modalHTML;
        document.body.appendChild(modalCarrito);
    }
    
    // Actualizar contenido del carrito
    updateCartContent();
    
    // Mostrar modal
    modalCarrito.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal del carrito abierto');
}

// Función para actualizar el contenido del carrito
function updateCartContent() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;
    
    if (carritoItems.length === 0) {
        cartContent.innerHTML = '<div class="cart-empty"><img class="cart-empty-icon" src="recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png" alt="Carrito vacío" style="width: 80px; height: 80px; margin: 20px auto; display: block; opacity: 0.5;"><h3 style="text-align: center; color: #ffd700;">Tu carrito está vacío</h3><p style="text-align: center; color: #ccc;">Agrega algunos perfumes para comenzar</p></div>';
    } else {
        // Calcular totales
        const subtotal = carritoItems.reduce((sum, item) => sum + item.precioTotal, 0);
        const costoEntrega = entregaDomicilio ? 50 : 0;
        const total = subtotal + costoEntrega;
        
        let contentHTML = '<div class="cart-items">';
        contentHTML += carritoItems.map(item => renderCartItem(item)).join('');
        contentHTML += '</div>';
        
        contentHTML += '<div class="delivery-option ' + (entregaDomicilio ? 'selected' : '') + '" onclick="toggleDelivery()" style="background: rgba(255,255,255,0.05); border: 2px solid ' + (entregaDomicilio ? '#ffd700' : 'rgba(255,255,255,0.1)') + '; border-radius: 10px; padding: 1rem; margin-bottom: 1rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">';
        contentHTML += '<div class="delivery-info"><strong style="color: white;">Entrega a domicilio</strong><div style="font-size: 0.9rem; color: #bbb;">Recibe tu pedido en casa</div></div>';
        contentHTML += '<div class="delivery-price" style="color: #ffd700; font-weight: bold;">+$50</div>';
        contentHTML += '</div>';
        
        contentHTML += '<div class="cart-summary" style="background: rgba(255,215,0,0.1); border: 2px solid rgba(255,215,0,0.3); border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem;">';
        contentHTML += '<div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; color: #ccc;"><span>Subtotal (' + carritoItems.length + ' ' + (carritoItems.length === 1 ? 'producto' : 'productos') + '):</span><span>$' + subtotal + '</span></div>';
        if (entregaDomicilio) {
            contentHTML += '<div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; color: #ccc;"><span>Entrega a domicilio:</span><span>$' + costoEntrega + '</span></div>';
        }
        contentHTML += '<div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(255,215,0,0.3); padding-top: 0.8rem; margin-top: 1rem; font-weight: bold; font-size: 1.2rem; color: #ffd700;"><span>Total:</span><span>$' + total + '</span></div>';
        contentHTML += '</div>';
        
        contentHTML += '<div class="cart-actions" style="display: flex; gap: 1rem; justify-content: center;">';
        contentHTML += '<button onclick="proceedToCheckout()" style="background: linear-gradient(45deg, #ffd700, #ffed4e); color: #000; border: none; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">Proceder al Pago</button>';
        contentHTML += '<button onclick="contactForCart()" style="background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">Consultar por WhatsApp</button>';
        contentHTML += '</div>';
        
        cartContent.innerHTML = contentHTML;
    }
}

// Función para renderizar un item del carrito
function renderCartItem(item) {
    const extrasText = item.extras.length > 0 ? ` con ${item.extras.join(' y ')}` : '';
    const extrasPrice = item.precioExtras > 0 ? ` (+$${item.precioExtras})` : '';
    
    return `
        <div class="cart-item" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 15px; padding: 1.5rem; margin-bottom: 1rem;">
            <div class="cart-item-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div class="cart-item-info" style="flex: 1;">
                    <div class="cart-item-image" style="width: 60px; height: 60px; border-radius: 10px; overflow: hidden; float: left; margin-right: 1rem;">
                        <img src="${item.imagen}" alt="${item.producto}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div>
                        <h4 style="color: #ffd700; font-size: 1.1rem; margin-bottom: 0.3rem;">${item.producto}</h4>
                        <p style="color: #ccc; font-size: 0.9rem; margin-bottom: 0.3rem; font-style: italic;">${item.inspirado}</p>
                        <p style="color: #bbb; font-size: 0.9rem;">
                            ${item.tamaño}${extrasText}
                            ${item.is10ml ? ' (Todo incluido)' : extrasPrice}
                        </p>
                    </div>
                </div>
                <div class="cart-item-price" style="color: #ffd700; font-weight: bold; font-size: 1.3rem;">
                    $${item.precioTotal}
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" style="width: 100%; background: rgba(255,0,0,0.1); color: #ff6b7a; border: 1px solid rgba(255,0,0,0.3); padding: 8px; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">
                🗑️ Eliminar del carrito
            </button>
        </div>
    `;
}

// Función para cerrar modal del carrito
function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            if (modal && !modal.classList.contains('active')) {
                // Solo remover si no se ha vuelto a abrir
            }
        }, 300);
    }
}

// Función para remover producto del carrito
function removeFromCart(itemId) {
    const index = carritoItems.findIndex(item => item.id === itemId);
    if (index > -1) {
        const removedItem = carritoItems.splice(index, 1)[0];
        updateCartIcon();
        updateCartContent();
        
        showNotification(`Producto eliminado: ${removedItem.producto}`);
        console.log('Producto eliminado del carrito:', removedItem);
    }
}

// Función para alternar entrega a domicilio
function toggleDelivery() {
    entregaDomicilio = !entregaDomicilio;
    updateCartContent();
    
    const message = entregaDomicilio ? 'Entrega a domicilio activada (+$50)' : 'Entrega a domicilio desactivada';
    showNotification(message);
    
    console.log('Entrega a domicilio:', entregaDomicilio);
}

// Función para proceder al checkout
function proceedToCheckout() {
    if (carritoItems.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    // Verificar si el sistema de datos del cliente está disponible
    if (typeof customerDataManager !== 'undefined') {
        // Siempre solicitar datos del cliente para tener información completa
        customerDataManager.requestData('checkout').then((customerData) => {
            processCheckoutWithData(customerData);
        }).catch((error) => {
            console.error('Error obteniendo datos del cliente:', error);
            processCheckoutWithData(null);
        });
    } else {
        // Fallback si no está disponible el sistema de datos
        processCheckoutWithData(null);
    }
}

// Función auxiliar para procesar el checkout con o sin datos
function processCheckoutWithData(customerData) {
    // Calcular totales
    const subtotal = carritoItems.reduce((sum, item) => sum + item.precioTotal, 0);
    const costoEntrega = entregaDomicilio ? 50 : 0;
    const total = subtotal + costoEntrega;
    
    // Crear mensaje para WhatsApp
    let mensaje = '🛍️ *PEDIDO A&A PERFUMERÍA*\n\n';
    mensaje += '📋 *PRODUCTOS:*\n';
    
    carritoItems.forEach((item, index) => {
        const extrasText = item.extras.length > 0 ? ` con ${item.extras.join(' y ')}` : '';
        mensaje += `${index + 1}. ${item.producto} (${item.tamaño})${extrasText}\n`;
        mensaje += `   💰 $${item.precioTotal}\n\n`;
    });
    
    mensaje += `💵 *RESUMEN:*\n`;
    mensaje += `Subtotal: $${subtotal}\n`;
    if (entregaDomicilio) {
        mensaje += `Entrega a domicilio: $${costoEntrega}\n`;
    }
    mensaje += `*TOTAL: $${total}*\n\n`;
    
    // SIEMPRE incluir datos del cliente si están disponibles
    if (customerData && customerData.nombreCompleto) {
        mensaje += '👤 *DATOS DEL CLIENTE:*\n';
        mensaje += `Nombre: ${customerData.nombreCompleto}\n`;
        mensaje += `Teléfono: ${customerData.telefono}\n\n`;
        mensaje += `🏠 *DIRECCIÓN:*\n`;
        mensaje += `${customerData.calleAvenida} #${customerData.numeroCasa}\n`;
        mensaje += `${customerData.municipio}, ${customerData.estado}\n`;
        mensaje += `CP: ${customerData.codigoPostal}\n`;
        if (customerData.referencia) {
            mensaje += `📍 Referencia: ${customerData.referencia}\n`;
        }
        mensaje += '\n';
    }
    
    // Indicar tipo de entrega
    if (entregaDomicilio) {
        if (customerData && customerData.nombreCompleto) {
            mensaje += '🚚 *ENTREGA A DOMICILIO CONFIRMADA*\n';
            mensaje += 'Todos los datos están completos para procesar la entrega.\n\n';
        } else {
            mensaje += '🚚 *ENTREGA A DOMICILIO SOLICITADA*\n';
            mensaje += 'Por favor proporciona tu dirección completa.\n\n';
        }
    } else {
        mensaje += '🏪 *RECOGER EN TIENDA*\n';
        if (customerData && customerData.nombreCompleto) {
            mensaje += 'Datos de contacto incluidos para coordinar la recogida.\n\n';
        } else {
            mensaje += 'Te contactaremos para coordinar la recogida.\n\n';
        }
    }
    
    mensaje += '¡Gracias por elegir A&A Perfumería! 🌟';
    
    // Abrir WhatsApp
    const numeroWhatsApp = CONFIG.whatsapp.numero;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    console.log('Procediendo al checkout via WhatsApp');
}

// Función para contactar por WhatsApp con el carrito
function contactForCart() {
    if (carritoItems.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    // Si hay entrega a domicilio, ofrecer incluir datos del cliente
    if (entregaDomicilio && typeof customerDataManager !== 'undefined') {
        // Preguntar si quiere incluir datos para cotización más precisa
        if (confirm('¿Deseas incluir tus datos de entrega para una cotización más precisa?')) {
            customerDataManager.requestData('consultation').then((customerData) => {
                processConsultationWithData(customerData);
            }).catch((error) => {
                console.error('Error obteniendo datos del cliente:', error);
                processConsultationWithData(null);
            });
        } else {
            processConsultationWithData(null);
        }
    } else {
        processConsultationWithData(null);
    }
}

// Función auxiliar para procesar la consulta con o sin datos
function processConsultationWithData(customerData) {
    // Crear mensaje de consulta
    let mensaje = '👋 ¡Hola! Tengo algunas consultas sobre estos productos:\n\n';
    
    carritoItems.forEach((item, index) => {
        const extrasText = item.extras.length > 0 ? ` con ${item.extras.join(' y ')}` : '';
        mensaje += `${index + 1}. ${item.producto} (${item.tamaño})${extrasText}\n`;
    });
    
    if (entregaDomicilio) {
        mensaje += '\n🚚 *Entrega a domicilio solicitada*\n';
        
        if (customerData) {
            mensaje += `📍 Ubicación: ${customerData.municipio}, ${customerData.estado}\n`;
        }
    } else {
        mensaje += '\n🏪 *Recoger en tienda*\n';
    }
    
    mensaje += '\n¿Podrían darme más información sobre:\n';
    mensaje += '• Disponibilidad de productos\n';
    mensaje += '• Tiempos de entrega\n';
    mensaje += '• Precio final con extras\n\n';
    mensaje += 'Gracias 😊';
    
    // Abrir WhatsApp
    const numeroWhatsApp = CONFIG.whatsapp.numero;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    console.log('Contactando por WhatsApp para consulta');
}

// Función para limpiar el carrito
function clearCart() {
    carritoItems = [];
    updateCartIcon();
    updateCartContent();
    showNotification('Carrito vaciado');
    console.log('Carrito limpiado');
}

// Función para solicitar datos del cliente para un producto específico
function requestCustomerDataForProduct() {
    if (!window.currentProduct) {
        console.error('No hay producto seleccionado');
        return;
    }
    
    const producto = window.currentProduct;
    const tamaño = window.selectedSize || '30ml';
    const extras = window.selectedExtras || [];
    
    // Calcular precio
    const precioBase = CONFIG.precios.tamaños[tamaño];
    const is10ml = tamaño === '10ml';
    
    let precioExtras = 0;
    if (!is10ml && extras.length > 0) {
        extras.forEach(extraKey => {
            precioExtras += CONFIG.precios.extras[extraKey].precios[tamaño];
        });
    }
    
    const precioTotal = precioBase + precioExtras;
    
    // Convertir extras a nombres legibles
    const extrasNombres = extras.map(extra => {
        if (extra === 'doble_fijador') return 'Doble Fijador';
        if (extra === 'feromonas') return 'Feromonas';
        return extra;
    });
    
    // Preguntar si quiere incluir datos para entrega
    if (typeof customerDataManager !== 'undefined') {
        const includeDelivery = confirm('¿Te interesa la entrega a domicilio? (Incluir datos de entrega)');
        
        if (includeDelivery) {
            customerDataManager.requestData('product-consultation').then((customerData) => {
                processProductConsultationWithData(producto, tamaño, extrasNombres, precioTotal, is10ml, customerData);
            }).catch((error) => {
                console.error('Error obteniendo datos del cliente:', error);
                processProductConsultationWithData(producto, tamaño, extrasNombres, precioTotal, is10ml, null);
            });
        } else {
            processProductConsultationWithData(producto, tamaño, extrasNombres, precioTotal, is10ml, null);
        }
    } else {
        processProductConsultationWithData(producto, tamaño, extrasNombres, precioTotal, is10ml, null);
    }
}

// Función auxiliar para procesar consulta de producto con o sin datos
function processProductConsultationWithData(producto, tamaño, extrasNombres, precioTotal, is10ml, customerData) {
    // Crear mensaje para WhatsApp
    let mensaje = '👋 ¡Hola! Me interesa este perfume:\n\n';
    mensaje += `🧴 *${producto.nombre}*\n`;
    mensaje += `✨ ${producto.inspirado}\n`;
    mensaje += `📏 Tamaño: ${tamaño}\n`;
    
    if (extrasNombres.length > 0) {
        mensaje += `➕ Extras: ${extrasNombres.join(' y ')}\n`;
    }
    
    mensaje += `💰 Precio: $${precioTotal}\n\n`;
    
    if (is10ml) {
        mensaje += '✅ *Tamaño 10ml incluye feromonas y doble fijador sin costo adicional*\n\n';
    }
    
    if (customerData) {
        mensaje += '🚚 *Entrega a domicilio solicitada*\n';
        mensaje += `📍 Ubicación: ${customerData.municipio}, ${customerData.estado}\n`;
        mensaje += `👤 Contacto: ${customerData.nombreCompleto} - ${customerData.telefono}\n\n`;
        mensaje += '¿Podrían confirmar disponibilidad y costo de entrega?\n\n';
    } else {
        mensaje += '¿Podrían darme más información sobre disponibilidad?\n\n';
    }
    
    mensaje += 'Gracias 😊';
    
    // Abrir WhatsApp
    const numeroWhatsApp = CONFIG.whatsapp.numero;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    // Cerrar modal
    closeProductModal();
    
    console.log('Consultando producto por WhatsApp:', producto.nombre);
}

// Inicialización del carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar icono del carrito
    updateCartIcon();
    
    // Inicializar variables globales si no existen
    if (typeof window.selectedSize === 'undefined') {
        window.selectedSize = '30ml';
    }
    if (typeof window.selectedExtras === 'undefined') {
        window.selectedExtras = [];
    }
    
    console.log('Sistema de carrito inicializado');
});

// Exportar funciones para uso global
if (typeof window !== 'undefined') {
    window.openProductModal = openProductModal;
    window.closeProductModal = closeProductModal;
    window.openCartModal = openCartModal;
    window.closeCartModal = closeCartModal;
    window.selectSize = selectSize;
    window.selectExtra = selectExtra;
    window.addProductToCart = addProductToCart;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.toggleDelivery = toggleDelivery;
    window.proceedToCheckout = proceedToCheckout;
    window.contactForCart = contactForCart;
    window.clearCart = clearCart;
    window.requestCustomerDataForProduct = requestCustomerDataForProduct;
    window.updateCartIcon = updateCartIcon;
    window.showNotification = showNotification;
}

console.log('✅ CART-SIMPLE.JS - Sistema completo cargado correctamente');
/**
 * ===== CUSTOMER DATA MANAGER =====
 * Sistema para recopilar y manejar datos del cliente
 * Reutilizable en todas las páginas del proyecto
 */

class CustomerDataManager {
    constructor() {
        this.customerData = {
            nombreCompleto: '',
            telefono: '',
            estado: '',
            municipio: '',
            codigoPostal: '',
            calleAvenida: '',
            numeroCasa: '',
            referencia: ''
        };
        
        this.isModalOpen = false;
        this.onDataComplete = null;
        this.currentContext = null; // 'product', 'cart', etc.
        
        this.init();
    }
    
    init() {
        // Cargar datos guardados si existen
        this.loadSavedData();
        
        // Configurar eventos globales
        this.setupGlobalEvents();
        
        console.log('📋 CustomerDataManager inicializado');
    }
    
    // ===== GESTIÓN DE DATOS =====
    
    loadSavedData() {
        try {
            const savedData = localStorage.getItem('aa_customer_data');
            if (savedData) {
                this.customerData = { ...this.customerData, ...JSON.parse(savedData) };
                console.log('📋 Datos del cliente cargados desde localStorage');
            }
        } catch (error) {
            console.warn('⚠️ Error cargando datos del cliente:', error);
        }
    }
    
    saveData() {
        try {
            localStorage.setItem('aa_customer_data', JSON.stringify(this.customerData));
            console.log('💾 Datos del cliente guardados');
        } catch (error) {
            console.warn('⚠️ Error guardando datos del cliente:', error);
        }
    }
    
    clearData() {
        this.customerData = {
            nombreCompleto: '',
            telefono: '',
            estado: '',
            municipio: '',
            codigoPostal: '',
            calleAvenida: '',
            numeroCasa: '',
            referencia: ''
        };
        localStorage.removeItem('aa_customer_data');
        console.log('🗑️ Datos del cliente eliminados');
    }
    
    // ===== VALIDACIÓN =====
    
    validateData() {
        const errors = [];
        
        if (!this.customerData.nombreCompleto.trim()) {
            errors.push('Nombre completo es requerido');
        }
        
        if (!this.customerData.telefono.trim()) {
            errors.push('Número de teléfono es requerido');
        } else if (!/^\d{10}$/.test(this.customerData.telefono.replace(/\s/g, ''))) {
            errors.push('Número de teléfono debe tener 10 dígitos');
        }
        
        if (!this.customerData.estado.trim()) {
            errors.push('Estado es requerido');
        }
        
        if (!this.customerData.municipio.trim()) {
            errors.push('Municipio/Ciudad es requerido');
        }
        
        if (!this.customerData.codigoPostal.trim()) {
            errors.push('Código postal es requerido');
        } else if (!/^\d{5}$/.test(this.customerData.codigoPostal)) {
            errors.push('Código postal debe tener 5 dígitos');
        }
        
        if (!this.customerData.calleAvenida.trim()) {
            errors.push('Calle o avenida es requerida');
        }
        
        if (!this.customerData.numeroCasa.trim()) {
            errors.push('Número de casa es requerido');
        }
        
        return errors;
    }
    
    isDataComplete() {
        return this.validateData().length === 0;
    }
    
    // ===== MODAL DE DATOS =====
    
    showDataModal(context = 'general', onComplete = null) {
        if (this.isModalOpen) return;
        
        this.currentContext = context;
        this.onDataComplete = onComplete;
        this.isModalOpen = true;
        
        const modal = this.createDataModal();
        document.body.appendChild(modal);
        
        // Mostrar con animación
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Llenar campos con datos existentes
        this.fillFormFields();
        
        console.log('📋 Modal de datos del cliente abierto');
    }
    
    createDataModal() {
        const modal = document.createElement('div');
        modal.className = 'customer-data-modal';
        modal.id = 'customerDataModal';
        
        modal.innerHTML = `
            <div class="customer-modal-overlay" onclick="customerDataManager.closeDataModal()"></div>
            <div class="customer-modal-content">
                <div class="customer-modal-header">
                    <h3>📋 Datos de Entrega</h3>
                    <p>Por favor completa tus datos para procesar tu pedido</p>
                    <button class="customer-modal-close" onclick="customerDataManager.closeDataModal()">×</button>
                </div>
                
                <form class="customer-data-form" id="customerDataForm">
                    <div class="form-section">
                        <h4>👤 Información Personal</h4>
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="nombreCompleto">Nombre Completo *</label>
                                <input type="text" id="nombreCompleto" name="nombreCompleto" 
                                       placeholder="Ej: Juan Pérez García" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="telefono">Teléfono *</label>
                                <input type="tel" id="telefono" name="telefono" 
                                       placeholder="Ej: 2721234567" required maxlength="10">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4>📍 Dirección de Entrega</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="estado">Estado *</label>
                                <input type="text" id="estado" name="estado" 
                                       placeholder="Ej: Veracruz" required>
                            </div>
                            <div class="form-group">
                                <label for="municipio">Municipio/Ciudad *</label>
                                <input type="text" id="municipio" name="municipio" 
                                       placeholder="Ej: Xalapa" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="codigoPostal">Código Postal *</label>
                                <input type="text" id="codigoPostal" name="codigoPostal" 
                                       placeholder="Ej: 91000" required maxlength="5">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="calleAvenida">Calle o Avenida *</label>
                                <input type="text" id="calleAvenida" name="calleAvenida" 
                                       placeholder="Ej: Av. Xalapa" required>
                            </div>
                            <div class="form-group">
                                <label for="numeroCasa">Número *</label>
                                <input type="text" id="numeroCasa" name="numeroCasa" 
                                       placeholder="Ej: 123" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group full-width">
                                <label for="referencia">Referencia Cercana</label>
                                <input type="text" id="referencia" name="referencia" 
                                       placeholder="Ej: Frente al parque central, casa azul">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="customerDataManager.closeDataModal()">
                            Cancelar
                        </button>
                        <button type="submit" class="btn-primary">
                            Continuar con Pedido
                        </button>
                    </div>
                </form>
                
                <div class="data-privacy-note">
                    <small>🔒 Tus datos están seguros y solo se usan para procesar tu pedido</small>
                </div>
            </div>
        `;
        
        return modal;
    }
    
    fillFormFields() {
        Object.keys(this.customerData).forEach(key => {
            const field = document.getElementById(key);
            if (field && this.customerData[key]) {
                field.value = this.customerData[key];
            }
        });
    }
    
    closeDataModal() {
        const modal = document.getElementById('customerDataModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
                this.isModalOpen = false;
            }, 300);
        }
    }
    
    // ===== MANEJO DEL FORMULARIO =====
    
    setupGlobalEvents() {
        // Manejar envío del formulario
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'customerDataForm') {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
        
        // Formatear campos automáticamente
        document.addEventListener('input', (e) => {
            if (e.target.name === 'telefono') {
                this.formatPhoneNumber(e.target);
            } else if (e.target.name === 'codigoPostal') {
                this.formatPostalCode(e.target);
            }
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeDataModal();
            }
        });
    }
    
    handleFormSubmit(form) {
        // Recopilar datos del formulario
        const formData = new FormData(form);
        
        Object.keys(this.customerData).forEach(key => {
            this.customerData[key] = formData.get(key) || '';
        });
        
        // Validar datos
        const errors = this.validateData();
        
        if (errors.length > 0) {
            this.showFormErrors(errors);
            return;
        }
        
        // Guardar datos
        this.saveData();
        
        // Cerrar modal
        this.closeDataModal();
        
        // Ejecutar callback si existe
        if (this.onDataComplete) {
            this.onDataComplete(this.customerData);
        }
        
        console.log('✅ Datos del cliente completados:', this.customerData);
    }
    
    showFormErrors(errors) {
        // Remover errores anteriores
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        
        // Crear contenedor de errores
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-error';
        errorContainer.innerHTML = `
            <div class="error-content">
                <h4>⚠️ Por favor corrige los siguientes errores:</h4>
                <ul>
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Insertar antes de las acciones del formulario
        const formActions = document.querySelector('.form-actions');
        if (formActions) {
            formActions.parentNode.insertBefore(errorContainer, formActions);
        }
        
        // Scroll al error
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // ===== FORMATEO DE CAMPOS =====
    
    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        input.value = value;
    }
    
    formatPostalCode(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5);
        }
        input.value = value;
    }
    
    // ===== GENERACIÓN DE MENSAJE =====
    
    generateDeliveryMessage() {
        if (!this.isDataComplete()) {
            return '';
        }
        
        return `
📍 *Datos de Entrega:*
👤 Nombre: ${this.customerData.nombreCompleto}
📱 Teléfono: ${this.customerData.telefono}

🏠 Dirección:
${this.customerData.calleAvenida} #${this.customerData.numeroCasa}
${this.customerData.municipio}, ${this.customerData.estado}
CP: ${this.customerData.codigoPostal}
${this.customerData.referencia ? `📍 Referencia: ${this.customerData.referencia}` : ''}
        `.trim();
    }
    
    // ===== API PÚBLICA =====
    
    // Verificar si hay datos completos
    hasCompleteData() {
        return this.isDataComplete();
    }
    
    // Obtener datos del cliente
    getCustomerData() {
        return { ...this.customerData };
    }
    
    // Solicitar datos con callback
    requestData(context = 'general') {
        return new Promise((resolve, reject) => {
            if (this.isDataComplete()) {
                resolve(this.customerData);
            } else {
                this.showDataModal(context, (data) => {
                    resolve(data);
                });
            }
        });
    }
    
    // Mostrar resumen de datos
    showDataSummary() {
        if (!this.isDataComplete()) {
            return 'No hay datos de entrega completos';
        }
        
        return `${this.customerData.nombreCompleto} - ${this.customerData.municipio}, ${this.customerData.estado}`;
    }
}

// Crear instancia global
const customerDataManager = new CustomerDataManager();

// Exportar para uso en otros módulos
if (typeof window !== 'undefined') {
    window.customerDataManager = customerDataManager;
}
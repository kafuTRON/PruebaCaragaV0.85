/**
 * ===== CONFIGURACIÓN DE APIs =====
 * Centraliza todas las claves de API y configuraciones
 */

const API_CONFIG = {
    // Google Maps API
    googleMaps: {
        apiKey: 'AIzaSyBvAGWgDrMBF7GqLxWQZgs2BD2K2Yhn6L0', // API Key configurada
        language: 'es',
        region: 'MX',
        libraries: ['places', 'geometry']
    },
    
    // WhatsApp Business API (si decides usarla en el futuro)
    whatsapp: {
        numero: '2721224946',
        businessId: '', // ID de WhatsApp Business (opcional)
        apiUrl: 'https://wa.me/'
    },
    
    // TikTok API (si decides integrar más funciones)
    tiktok: {
        username: 'aa.perfumes7',
        profileUrl: 'https://www.tiktok.com/@aa.perfumes7'
    },
    
    // Configuración de tiendas (puede moverse aquí desde google-maps.js)
    stores: [
        {
            id: 1,
            nombre: 'Industrias TKM - Sucursal Principal',
            direccion: 'Prol. de Nte. 8, UNE, 94310 Orizaba, Ver.',
            telefono: '272 122 4946',
            telefono2: '272 723 1605',
            whatsapp: '2721224946',
            email: 'contacto@industriastkm.com',
            horario: {
                lunesSabado: '9:00 AM - 6:00 PM',
                domingo: '8:00 AM - 5:00 PM'
            },
            horarioTexto: 'Lun-Sáb: 9:00 AM - 6:00 PM, Dom: 8:00 AM - 5:00 PM',
            coordenadas: {
                lat: 18.851167,
                lng: -97.098889
            },
            googleMapsUrl: 'https://maps.app.goo.gl/TNDWQqaApHguUMki9',
            tipo: 'principal',
            servicios: ['A&A Perfumes', 'M&M Limpieza', 'CDL Accesorios'],
            caracteristicas: [
                'Todas las líneas de productos',
                'Estacionamiento disponible',
                'Acceso para sillas de ruedas',
                'Probadores de fragancias'
            ],
            imagen: 'recursos/tiendas/sucursal-principal.jpg',
            activa: true
        },
        {
            id: 2,
            nombre: 'Industrias TKM - Sucursal 2',
            direccion: 'Oriente 3, Nte. 10, 94300 Orizaba, Ver.',
            telefono: '272 122 4946',
            telefono2: '272 723 1605',
            whatsapp: '2721224946',
            email: 'contacto@industriastkm.com',
            horario: {
                lunesSabado: '9:00 AM - 6:00 PM',
                domingo: '8:00 AM - 5:00 PM'
            },
            horarioTexto: 'Lun-Sáb: 9:00 AM - 6:00 PM, Dom: 8:00 AM - 5:00 PM',
            coordenadas: {
                lat: 18.852333,
                lng: -97.097778
            },
            googleMapsUrl: 'https://maps.app.goo.gl/KiqtnECpPwBTSVFL7',
            tipo: 'sucursal',
            servicios: ['A&A Perfumes', 'M&M Limpieza'],
            caracteristicas: [
                'Perfumes y productos de limpieza',
                'Estacionamiento cercano',
                'Probadores de fragancias'
            ],
            imagen: 'recursos/tiendas/sucursal-2.jpg',
            activa: true
        }
        // Agregar más tiendas aquí
    ],
    
    // Configuración de redes sociales
    socialMedia: {
        tiktok: 'https://www.tiktok.com/@aa.perfumes7',
        facebook: 'https://www.facebook.com/aaperfumeria',
        instagram: 'https://www.instagram.com/aaperfumeria',
        whatsapp: 'https://wa.me/2721224946'
    },
    
    // Configuración de entrega
    delivery: {
        costoBase: 50,
        costoGratis: 500, // Envío gratis en compras mayores a $500
        tiempoEstimado: '1-3 días hábiles',
        zonas: [
            { nombre: 'Xalapa Centro', costo: 50 },
            { nombre: 'Xalapa Norte', costo: 60 },
            { nombre: 'Xalapa Sur', costo: 60 },
            { nombre: 'Coatepec', costo: 80 },
            { nombre: 'Banderilla', costo: 70 }
        ]
    }
};

// Función helper para obtener URL de Google Maps con API key
function getGoogleMapsUrl() {
    const { apiKey, language, region, libraries } = API_CONFIG.googleMaps;
    const libsParam = libraries.length > 0 ? `&libraries=${libraries.join(',')}` : '';
    return `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=${language}&region=${region}${libsParam}&callback=initGoogleMaps`;
}

// Función helper para obtener tiendas activas
function getActiveStores() {
    return API_CONFIG.stores.filter(store => store.activa);
}

// Función helper para obtener tienda por ID
function getStoreById(id) {
    return API_CONFIG.stores.find(store => store.id === id);
}

// Función helper para obtener tiendas por tipo
function getStoresByType(tipo) {
    return API_CONFIG.stores.filter(store => store.tipo === tipo && store.activa);
}

// Exportar configuración
window.API_CONFIG = API_CONFIG;
window.getGoogleMapsUrl = getGoogleMapsUrl;
window.getActiveStores = getActiveStores;
window.getStoreById = getStoreById;
window.getStoresByType = getStoresByType;

console.log('⚙️ Configuración de APIs cargada');

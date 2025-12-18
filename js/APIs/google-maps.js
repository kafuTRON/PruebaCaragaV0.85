/**
 * ===== SISTEMA DE GOOGLE MAPS PARA A&A =====
 * Muestra ubicaciones de tiendas en un mapa interactivo
 * Incluye marcadores personalizados, info windows y direcciones
 */

class GoogleMapsManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.infoWindows = [];
        this.userLocation = null;
        
        // Obtener configuración de tiendas desde API_CONFIG
        this.stores = window.API_CONFIG ? window.API_CONFIG.stores : [
            {
                id: 1,
                nombre: 'Industrias TKM - Sucursal Principal',
                direccion: 'Prol. de Nte. 8, UNE, 94310 Orizaba, Ver.',
                telefono: '272 122 4946',
                telefono2: '272 723 1605',
                horario: 'Lun-Sáb: 9:00 AM - 6:00 PM, Dom: 8:00 AM - 5:00 PM',
                lat: 18.851167,
                lng: -97.098889,
                tipo: 'principal',
                servicios: ['A&A Perfumes', 'M&M Limpieza', 'CDL Accesorios'],
                googleMapsUrl: 'https://maps.app.goo.gl/TNDWQqaApHguUMki9'
            },
            {
                id: 2,
                nombre: 'Industrias TKM - Sucursal 2',
                direccion: 'Oriente 3, Nte. 10, 94300 Orizaba, Ver.',
                telefono: '272 122 4946',
                telefono2: '272 723 1605',
                horario: 'Lun-Sáb: 9:00 AM - 6:00 PM, Dom: 8:00 AM - 5:00 PM',
                lat: 18.852333,
                lng: -97.097778,
                tipo: 'sucursal',
                servicios: ['A&A Perfumes', 'M&M Limpieza'],
                googleMapsUrl: 'https://maps.app.goo.gl/KiqtnECpPwBTSVFL7'
            }
        ];
        
        console.log('🗺️ GoogleMapsManager inicializado');
    }
    
    /**
     * Inicializar el mapa
     */
    async initMap(containerId = 'map') {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error('❌ Contenedor del mapa no encontrado:', containerId);
                return;
            }
            
            // Centro del mapa (promedio de todas las tiendas)
            const centerLat = this.stores.reduce((sum, store) => sum + store.lat, 0) / this.stores.length;
            const centerLng = this.stores.reduce((sum, store) => sum + store.lng, 0) / this.stores.length;
            
            // Configuración del mapa
            const mapOptions = {
                center: { lat: centerLat, lng: centerLng },
                zoom: 13,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                zoomControl: true,
                styles: this.getMapStyles() // Estilo personalizado
            };
            
            // Crear mapa
            this.map = new google.maps.Map(container, mapOptions);
            
            // Agregar marcadores de tiendas
            this.addStoreMarkers();
            
            // Intentar obtener ubicación del usuario
            this.getUserLocation();
            
            console.log('✅ Mapa inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando mapa:', error);
            this.showError(containerId, 'No se pudo cargar el mapa. Verifica tu conexión a internet.');
        }
    }
    
    /**
     * Agregar marcadores de tiendas
     */
    addStoreMarkers() {
        this.stores.forEach(store => {
            // Icono personalizado según tipo de tienda
            const icon = {
                url: store.tipo === 'principal' 
                    ? 'recursos/iconos/marker-principal.png' 
                    : 'recursos/iconos/marker-sucursal.png',
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40)
            };
            
            // Crear marcador
            const marker = new google.maps.Marker({
                position: { lat: store.lat, lng: store.lng },
                map: this.map,
                title: store.nombre,
                icon: icon,
                animation: google.maps.Animation.DROP
            });
            
            // Crear ventana de información
            const infoWindow = new google.maps.InfoWindow({
                content: this.createInfoWindowContent(store)
            });
            
            // Evento click en marcador
            marker.addListener('click', () => {
                // Cerrar otras ventanas
                this.infoWindows.forEach(iw => iw.close());
                
                // Abrir esta ventana
                infoWindow.open(this.map, marker);
                
                // Centrar mapa en marcador
                this.map.panTo(marker.getPosition());
                this.map.setZoom(15);
            });
            
            // Guardar referencias
            this.markers.push(marker);
            this.infoWindows.push(infoWindow);
        });
        
        console.log(`📍 ${this.markers.length} marcadores agregados`);
    }
    
    /**
     * Crear contenido HTML para info window
     */
    createInfoWindowContent(store) {
        return `
            <div class="store-info-window" style="max-width: 300px; font-family: Arial, sans-serif;">
                <div style="background: linear-gradient(45deg, #ffd700, #ffed4e); padding: 10px; margin: -10px -10px 10px -10px; border-radius: 5px 5px 0 0;">
                    <h3 style="margin: 0; color: #1e1e1e; font-size: 1.1rem;">${store.nombre}</h3>
                    <span style="background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; color: white;">
                        ${store.tipo === 'principal' ? '⭐ Principal' : '📍 Sucursal'}
                    </span>
                </div>
                
                <div style="padding: 5px 0;">
                    <p style="margin: 8px 0; color: #333;">
                        <strong>📍 Dirección:</strong><br>
                        ${store.direccion}
                    </p>
                    
                    <p style="margin: 8px 0; color: #333;">
                        <strong>📞 Teléfonos:</strong><br>
                        <a href="tel:${store.telefono.replace(/\s/g, '')}" style="color: #ffd700; text-decoration: none;">
                            ${store.telefono}
                        </a>
                        ${store.telefono2 ? `<br><a href="tel:${store.telefono2.replace(/\s/g, '')}" style="color: #ffd700; text-decoration: none;">${store.telefono2}</a>` : ''}
                    </p>
                    
                    <p style="margin: 8px 0; color: #333;">
                        <strong>🕐 Horario:</strong><br>
                        ${store.horario}
                    </p>
                    
                    <p style="margin: 8px 0; color: #333;">
                        <strong>🛍️ Servicios:</strong><br>
                        ${store.servicios.map(s => `<span style="background: #f0f0f0; padding: 2px 6px; border-radius: 5px; font-size: 0.85rem; margin-right: 4px;">${s}</span>`).join('')}
                    </p>
                    
                    <div style="margin-top: 15px; display: flex; gap: 8px; flex-wrap: wrap;">
                        <button onclick="mapsManager.getDirections(${store.lat}, ${store.lng}, ${store.id})" 
                                style="flex: 1; background: linear-gradient(45deg, #ffd700, #ffed4e); color: #1e1e1e; border: none; padding: 8px 12px; border-radius: 20px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">
                            🚗 Cómo llegar
                        </button>
                        
                        <button onclick="mapsManager.callStore('${store.telefono}')" 
                                style="flex: 1; background: #25D366; color: white; border: none; padding: 8px 12px; border-radius: 20px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">
                            📞 Llamar
                        </button>
                        
                        <button onclick="window.open('https://wa.me/2721224946', '_blank')" 
                                style="flex: 1; background: #25D366; color: white; border: none; padding: 8px 12px; border-radius: 20px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">
                            💬 WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Obtener ubicación del usuario
     */
    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Agregar marcador de usuario
                    const userMarker = new google.maps.Marker({
                        position: this.userLocation,
                        map: this.map,
                        title: 'Tu ubicación',
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: '#4285F4',
                            fillOpacity: 1,
                            strokeColor: '#ffffff',
                            strokeWeight: 2
                        }
                    });
                    
                    console.log('📍 Ubicación del usuario obtenida');
                },
                (error) => {
                    console.warn('⚠️ No se pudo obtener ubicación del usuario:', error.message);
                }
            );
        }
    }
    
    /**
     * Obtener direcciones a una tienda
     */
    getDirections(lat, lng, storeId = null) {
        // Buscar la tienda por ID para obtener su URL de Google Maps
        const store = storeId ? this.stores.find(s => s.id === storeId) : 
                      this.stores.find(s => s.lat === lat && s.lng === lng);
        
        if (store && store.googleMapsUrl) {
            // Usar el enlace directo de Google Maps proporcionado
            window.open(store.googleMapsUrl, '_blank');
        } else if (this.userLocation) {
            // Fallback: usar API de direcciones
            const url = `https://www.google.com/maps/dir/?api=1&origin=${this.userLocation.lat},${this.userLocation.lng}&destination=${lat},${lng}&travelmode=driving`;
            window.open(url, '_blank');
        } else {
            // Si no hay ubicación del usuario, solo mostrar el destino
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            window.open(url, '_blank');
        }
    }
    
    /**
     * Llamar a una tienda
     */
    callStore(telefono) {
        window.location.href = `tel:${telefono.replace(/\s/g, '')}`;
    }
    
    /**
     * Centrar mapa en una tienda específica
     */
    focusStore(storeId) {
        const store = this.stores.find(s => s.id === storeId);
        if (store) {
            const marker = this.markers[storeId - 1];
            const infoWindow = this.infoWindows[storeId - 1];
            
            // Cerrar otras ventanas
            this.infoWindows.forEach(iw => iw.close());
            
            // Centrar y abrir
            this.map.panTo({ lat: store.lat, lng: store.lng });
            this.map.setZoom(16);
            infoWindow.open(this.map, marker);
        }
    }
    
    /**
     * Encontrar tienda más cercana
     */
    findNearestStore() {
        if (!this.userLocation) {
            alert('⚠️ Necesitamos tu ubicación para encontrar la tienda más cercana. Por favor, permite el acceso a tu ubicación.');
            return;
        }
        
        let nearestStore = null;
        let minDistance = Infinity;
        
        this.stores.forEach((store, index) => {
            const distance = this.calculateDistance(
                this.userLocation.lat,
                this.userLocation.lng,
                store.lat,
                store.lng
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestStore = { ...store, index, distance };
            }
        });
        
        if (nearestStore) {
            this.focusStore(nearestStore.id);
            console.log(`📍 Tienda más cercana: ${nearestStore.nombre} (${nearestStore.distance.toFixed(2)} km)`);
        }
    }
    
    /**
     * Calcular distancia entre dos puntos (fórmula de Haversine)
     */
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radio de la Tierra en km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    deg2rad(deg) {
        return deg * (Math.PI/180);
    }
    
    /**
     * Estilos personalizados del mapa
     */
    getMapStyles() {
        return [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            }
        ];
    }
    
    /**
     * Mostrar error
     */
    showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; border-radius: 10px; padding: 20px; text-align: center;">
                    <div>
                        <div style="font-size: 3rem; margin-bottom: 10px;">🗺️</div>
                        <p style="color: #666; margin: 0;">${message}</p>
                    </div>
                </div>
            `;
        }
    }
}

// Crear instancia global
let mapsManager = null;

// Función de inicialización para Google Maps API
function initGoogleMaps() {
    mapsManager = new GoogleMapsManager();
    mapsManager.initMap('map');
    console.log('🗺️ Google Maps cargado y listo');
}

// Exportar para uso global
window.mapsManager = mapsManager;
window.initGoogleMaps = initGoogleMaps;

console.log('🗺️ Sistema de Google Maps cargado');

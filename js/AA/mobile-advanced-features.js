/**
 * ===== MOBILE ADVANCED FEATURES.JS =====
 * Funcionalidades avanzadas para dispositivos móviles
 * - Sistema de audio inteligente
 * - Vibración táctil (haptic feedback)
 * - Efectos parallax
 * - Detección de batería y conexión
 */

// ===== CONFIGURACIÓN DE FUNCIONALIDADES AVANZADAS =====

const ADVANCED_CONFIG = {
    // Sistema de Audio
    audio: {
        enabled: true,
        volume: 0.6,
        preloadCritical: true,
        respectDataSaver: true,
        respectBatteryLevel: true,
        sounds: {
            click: 'recursos/A&A/Material_FX/sonidos/click_button.mp3',
            swipe: 'recursos/A&A/Material_FX/sonidos/swipe_transition.mp3',
            addToCart: 'recursos/A&A/Material_FX/sonidos/add_to_cart.mp3',
            removeFromCart: 'recursos/A&A/Material_FX/sonidos/remove_from_cart.mp3',
            modalOpen: 'recursos/A&A/Material_FX/sonidos/modal_open.mp3',
            modalClose: 'recursos/A&A/Material_FX/sonidos/modal_close.mp3',
            notificationSuccess: 'recursos/A&A/Material_FX/sonidos/notification_success.mp3',
            notificationError: 'recursos/A&A/Material_FX/sonidos/notification_error.mp3',
            filterChange: 'recursos/A&A/Material_FX/sonidos/filter_change.mp3',
            checkout: 'recursos/A&A/Material_FX/sonidos/checkout_success.mp3'
        },
        music: {
            main: 'recursos/A&A/Material_FX/musica_fondo/001.mp3',
            catalog: 'recursos/A&A/Material_FX/musica_fondo/001.mp3',
            checkout: 'recursos/A&A/Material_FX/musica_fondo/001.mp3'
        }
    },
    
    // Vibración Táctil
    haptics: {
        enabled: true,
        patterns: {
            light: [10],
            medium: [20],
            heavy: [50],
            success: [10, 50, 10],
            error: [100, 50, 100],
            notification: [20, 20, 20]
        }
    },
    
    // Efectos Parallax
    parallax: {
        enabled: true,
        intensity: 0.3,
        respectMotionPreference: true
    },
    
    // Detección de Hardware
    hardware: {
        checkBattery: true,
        checkConnection: true,
        lowBatteryThreshold: 0.2, // 20%
        slowConnectionTypes: ['slow-2g', '2g']
    }
};

// ===== SISTEMA DE AUDIO INTELIGENTE =====

class MobileAudioSystem {
    constructor() {
        this.sounds = new Map();
        this.music = new Map();
        this.currentMusic = null;
        this.enabled = ADVANCED_CONFIG.audio.enabled;
        this.volume = ADVANCED_CONFIG.audio.volume;
        this.userInteracted = false;
        
        this.init();
    }
    
    async init() {
        // Esperar interacción del usuario para cumplir políticas de autoplay
        document.addEventListener('touchstart', () => {
            if (!this.userInteracted) {
                this.userInteracted = true;
                this.preloadCriticalSounds();
                console.log('🔊 Sistema de audio activado tras interacción del usuario');
            }
        }, { once: true });
        
        // Verificar condiciones del dispositivo
        await this.checkDeviceConditions();
    }
    
    async checkDeviceConditions() {
        // Verificar ahorro de datos
        if (navigator.connection && navigator.connection.saveData) {
            console.log('📱 Modo ahorro de datos detectado - Audio deshabilitado');
            this.enabled = false;
            return;
        }
        
        // Verificar conexión lenta
        if (navigator.connection && 
            ADVANCED_CONFIG.hardware.slowConnectionTypes.includes(navigator.connection.effectiveType)) {
            console.log('🐌 Conexión lenta detectada - Audio limitado');
            this.enabled = false;
            return;
        }
        
        // Verificar batería baja
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                if (battery.level < ADVANCED_CONFIG.hardware.lowBatteryThreshold) {
                    console.log('🔋 Batería baja detectada - Audio deshabilitado');
                    this.enabled = false;
                    return;
                }
                
                // Monitorear cambios de batería
                battery.addEventListener('levelchange', () => {
                    if (battery.level < ADVANCED_CONFIG.hardware.lowBatteryThreshold) {
                        this.enabled = false;
                        this.stopAllAudio();
                        console.log('🔋 Batería baja - Audio deshabilitado automáticamente');
                    }
                });
            } catch (e) {
                console.log('🔋 API de batería no disponible');
            }
        }
    }
    
    preloadCriticalSounds() {
        if (!this.enabled || !ADVANCED_CONFIG.audio.preloadCritical) return;
        
        const criticalSounds = ['click', 'swipe', 'addToCart', 'notificationSuccess'];
        
        criticalSounds.forEach(soundKey => {
            const soundPath = ADVANCED_CONFIG.audio.sounds[soundKey];
            if (soundPath) {
                this.loadSound(soundKey, soundPath);
            }
        });
    }
    
    loadSound(key, path) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.volume = this.volume;
            
            audio.addEventListener('canplaythrough', () => {
                this.sounds.set(key, audio);
                resolve(audio);
            });
            
            audio.addEventListener('error', (e) => {
                console.warn(`⚠️ Error cargando sonido ${key}:`, e);
                reject(e);
            });
            
            audio.src = path;
        });
    }
    
    async playSound(key, volume = null) {
        if (!this.enabled || !this.userInteracted) return;
        
        let audio = this.sounds.get(key);
        
        // Cargar sonido si no está en cache
        if (!audio) {
            const soundPath = ADVANCED_CONFIG.audio.sounds[key];
            if (!soundPath) {
                console.warn(`⚠️ Sonido '${key}' no configurado`);
                return;
            }
            
            try {
                audio = await this.loadSound(key, soundPath);
            } catch (e) {
                console.warn(`⚠️ No se pudo cargar sonido '${key}'`);
                return;
            }
        }
        
        try {
            // Configurar volumen
            audio.volume = volume !== null ? volume : this.volume;
            
            // Reiniciar si ya está reproduciéndose
            audio.currentTime = 0;
            
            // Reproducir
            await audio.play();
        } catch (e) {
            console.warn(`⚠️ Error reproduciendo sonido '${key}':`, e);
        }
    }
    
    async loadMusic(key, path) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.preload = 'metadata';
            audio.loop = true;
            audio.volume = this.volume * 0.5; // Música más baja que efectos
            
            audio.addEventListener('canplaythrough', () => {
                this.music.set(key, audio);
                resolve(audio);
            });
            
            audio.addEventListener('error', reject);
            
            audio.src = path;
        });
    }
    
    async playMusic(key, fadeIn = true) {
        if (!this.enabled || !this.userInteracted) return;
        
        // Parar música actual
        if (this.currentMusic) {
            await this.stopMusic(true);
        }
        
        let audio = this.music.get(key);
        
        // Cargar música si no está en cache
        if (!audio) {
            const musicPath = ADVANCED_CONFIG.audio.music[key];
            if (!musicPath) {
                console.warn(`⚠️ Música '${key}' no configurada`);
                return;
            }
            
            try {
                audio = await this.loadMusic(key, musicPath);
            } catch (e) {
                console.warn(`⚠️ No se pudo cargar música '${key}'`);
                return;
            }
        }
        
        try {
            this.currentMusic = audio;
            
            if (fadeIn) {
                audio.volume = 0;
                await audio.play();
                this.fadeIn(audio, this.volume * 0.5, 2000);
            } else {
                await audio.play();
            }
            
            console.log(`🎵 Reproduciendo música: ${key}`);
        } catch (e) {
            console.warn(`⚠️ Error reproduciendo música '${key}':`, e);
        }
    }
    
    async stopMusic(fadeOut = true) {
        if (!this.currentMusic) return;
        
        if (fadeOut) {
            await this.fadeOut(this.currentMusic, 1000);
        }
        
        this.currentMusic.pause();
        this.currentMusic.currentTime = 0;
        this.currentMusic = null;
    }
    
    fadeIn(audio, targetVolume, duration) {
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = targetVolume / steps;
        
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            audio.volume = Math.min(volumeStep * currentStep, targetVolume);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }
    
    fadeOut(audio, duration) {
        return new Promise(resolve => {
            const steps = 20;
            const stepDuration = duration / steps;
            const initialVolume = audio.volume;
            const volumeStep = initialVolume / steps;
            
            let currentStep = 0;
            
            const fadeInterval = setInterval(() => {
                currentStep++;
                audio.volume = Math.max(initialVolume - (volumeStep * currentStep), 0);
                
                if (currentStep >= steps) {
                    clearInterval(fadeInterval);
                    resolve();
                }
            }, stepDuration);
        });
    }
    
    stopAllAudio() {
        // Parar todos los sonidos
        this.sounds.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
        // Parar música
        this.stopMusic(false);
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        // Actualizar volumen de sonidos cargados
        this.sounds.forEach(audio => {
            audio.volume = this.volume;
        });
        
        // Actualizar volumen de música
        if (this.currentMusic) {
            this.currentMusic.volume = this.volume * 0.5;
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
        
        if (!this.enabled) {
            this.stopAllAudio();
        }
        
        console.log(`🔊 Audio ${this.enabled ? 'habilitado' : 'deshabilitado'}`);
        return this.enabled;
    }
}

// ===== SISTEMA DE VIBRACIÓN TÁCTIL =====

class MobileHapticsSystem {
    constructor() {
        this.enabled = ADVANCED_CONFIG.haptics.enabled && 'vibrate' in navigator;
        this.patterns = ADVANCED_CONFIG.haptics.patterns;
        
        if (this.enabled) {
            console.log('📳 Sistema de vibración táctil disponible');
        }
    }
    
    vibrate(pattern) {
        if (!this.enabled) return;
        
        let vibrationPattern;
        
        if (typeof pattern === 'string' && this.patterns[pattern]) {
            vibrationPattern = this.patterns[pattern];
        } else if (Array.isArray(pattern)) {
            vibrationPattern = pattern;
        } else if (typeof pattern === 'number') {
            vibrationPattern = [pattern];
        } else {
            console.warn('⚠️ Patrón de vibración inválido:', pattern);
            return;
        }
        
        try {
            navigator.vibrate(vibrationPattern);
        } catch (e) {
            console.warn('⚠️ Error en vibración:', e);
        }
    }
    
    light() {
        this.vibrate('light');
    }
    
    medium() {
        this.vibrate('medium');
    }
    
    heavy() {
        this.vibrate('heavy');
    }
    
    success() {
        this.vibrate('success');
    }
    
    error() {
        this.vibrate('error');
    }
    
    notification() {
        this.vibrate('notification');
    }
    
    stop() {
        if (this.enabled) {
            navigator.vibrate(0);
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
        console.log(`📳 Vibración ${this.enabled ? 'habilitada' : 'deshabilitada'}`);
        return this.enabled;
    }
}

// ===== SISTEMA DE EFECTOS PARALLAX =====

class MobileParallaxSystem {
    constructor() {
        this.enabled = ADVANCED_CONFIG.parallax.enabled;
        this.intensity = ADVANCED_CONFIG.parallax.intensity;
        this.elements = new Map();
        this.isScrolling = false;
        
        // Respetar preferencias de movimiento reducido
        if (ADVANCED_CONFIG.parallax.respectMotionPreference) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                this.enabled = false;
                console.log('🎭 Parallax deshabilitado - usuario prefiere movimiento reducido');
                return;
            }
        }
        
        if (this.enabled) {
            this.init();
        }
    }
    
    init() {
        // Throttled scroll handler para mejor rendimiento
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    this.isScrolling = false;
                });
            }
            this.isScrolling = true;
            
            // Limpiar timeout anterior
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Marcar como no scrolling después de un delay
            scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
            }, 100);
        }, { passive: true });
        
        console.log('🎭 Sistema de parallax inicializado');
    }
    
    addElement(element, speed = 0.5, direction = 'vertical') {
        if (!this.enabled) return;
        
        const elementData = {
            element: element,
            speed: speed * this.intensity,
            direction: direction,
            initialOffset: element.getBoundingClientRect().top + window.scrollY
        };
        
        this.elements.set(element, elementData);
        
        // Aplicar will-change para optimización
        element.style.willChange = 'transform';
    }
    
    removeElement(element) {
        if (this.elements.has(element)) {
            element.style.willChange = 'auto';
            element.style.transform = '';
            this.elements.delete(element);
        }
    }
    
    updateParallax() {
        if (!this.enabled || this.elements.size === 0) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        this.elements.forEach((data, element) => {
            const rect = element.getBoundingClientRect();
            
            // Solo actualizar elementos visibles o cerca del viewport
            if (rect.bottom < -100 || rect.top > windowHeight + 100) {
                return;
            }
            
            const offset = (scrollY - data.initialOffset) * data.speed;
            
            if (data.direction === 'vertical') {
                element.style.transform = `translateY(${offset}px)`;
            } else if (data.direction === 'horizontal') {
                element.style.transform = `translateX(${offset}px)`;
            } else if (data.direction === 'both') {
                element.style.transform = `translate(${offset * 0.5}px, ${offset}px)`;
            }
        });
    }
    
    setIntensity(intensity) {
        this.intensity = Math.max(0, Math.min(1, intensity));
        
        // Actualizar velocidades de elementos existentes
        this.elements.forEach((data) => {
            data.speed = data.speed * (this.intensity / ADVANCED_CONFIG.parallax.intensity);
        });
    }
    
    toggle() {
        this.enabled = !this.enabled;
        
        if (!this.enabled) {
            // Resetear transformaciones
            this.elements.forEach((data, element) => {
                element.style.transform = '';
            });
        }
        
        console.log(`🎭 Parallax ${this.enabled ? 'habilitado' : 'deshabilitado'}`);
        return this.enabled;
    }
}

// ===== MANAGER PRINCIPAL DE FUNCIONALIDADES AVANZADAS =====

class MobileAdvancedManager {
    constructor() {
        this.audio = new MobileAudioSystem();
        this.haptics = new MobileHapticsSystem();
        this.parallax = new MobileParallaxSystem();
        
        this.init();
    }
    
    init() {
        // Configurar eventos globales para feedback
        this.setupGlobalFeedback();
        
        // Configurar controles de usuario
        this.setupUserControls();
        
        console.log('🚀 Funcionalidades móviles avanzadas inicializadas');
    }
    
    setupGlobalFeedback() {
        // Feedback para clicks en botones
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, .filter-btn, .cart-button')) {
                this.audio.playSound('click');
                this.haptics.light();
            }
        });
        
        // Feedback para agregar al carrito
        document.addEventListener('cartItemAdded', () => {
            this.audio.playSound('addToCart');
            this.haptics.success();
        });
        
        // Feedback para remover del carrito
        document.addEventListener('cartItemRemoved', () => {
            this.audio.playSound('removeFromCart');
            this.haptics.medium();
        });
        
        // Feedback para notificaciones
        document.addEventListener('notificationShown', (e) => {
            const type = e.detail?.type || 'info';
            
            if (type === 'success') {
                this.audio.playSound('notificationSuccess');
                this.haptics.success();
            } else if (type === 'error') {
                this.audio.playSound('notificationError');
                this.haptics.error();
            }
        });
    }
    
    setupUserControls() {
        // Crear panel de control flotante (opcional)
        if (localStorage.getItem('aa_show_audio_controls') === 'true') {
            this.createAudioControls();
        }
    }
    
    createAudioControls() {
        const controls = document.createElement('div');
        controls.id = 'audioControls';
        controls.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            border-radius: 10px;
            z-index: 10000;
            font-size: 0.8rem;
            backdrop-filter: blur(10px);
        `;
        
        controls.innerHTML = `
            <div style="margin-bottom: 5px;">
                <button onclick="MobileAdvanced.audio.toggle()" style="background: none; border: none; color: white; cursor: pointer;">
                    🔊 Audio
                </button>
            </div>
            <div style="margin-bottom: 5px;">
                <button onclick="MobileAdvanced.haptics.toggle()" style="background: none; border: none; color: white; cursor: pointer;">
                    📳 Vibración
                </button>
            </div>
            <div>
                <button onclick="MobileAdvanced.parallax.toggle()" style="background: none; border: none; color: white; cursor: pointer;">
                    🎭 Parallax
                </button>
            </div>
        `;
        
        document.body.appendChild(controls);
    }
    
    // Métodos de conveniencia
    playSound(key, volume) {
        return this.audio.playSound(key, volume);
    }
    
    playMusic(key, fadeIn) {
        return this.audio.playMusic(key, fadeIn);
    }
    
    vibrate(pattern) {
        return this.haptics.vibrate(pattern);
    }
    
    addParallaxElement(element, speed, direction) {
        return this.parallax.addElement(element, speed, direction);
    }
}

// ===== INSTANCIA GLOBAL =====

let MobileAdvanced;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Solo inicializar en dispositivos móviles o si se fuerza
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    
    if (isMobile || localStorage.getItem('aa_force_mobile_features') === 'true') {
        MobileAdvanced = new MobileAdvancedManager();
        
        // Exponer globalmente
        window.MobileAdvanced = MobileAdvanced;
        
        console.log('📱 Funcionalidades móviles avanzadas disponibles globalmente');
    }
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MobileAudioSystem,
        MobileHapticsSystem,
        MobileParallaxSystem,
        MobileAdvancedManager,
        ADVANCED_CONFIG
    };
}
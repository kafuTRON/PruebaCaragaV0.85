/**
 * ===== SIMPLE MUSIC SYSTEM =====
 * Sistema simplificado de música de fondo para A&A
 * Sin dependencias complejas, solo música de fondo básica
 */

class SimpleMusicSystem {
    constructor() {
        this.audio = null;
        this.targetVolume = 0.25; // 25% como solicitado
        this.currentVolume = 0;
        this.isPlaying = false;
        this.userInteracted = false;
        this.musicFile = 'recursos/A&A/Material_FX/musica_fondo/001.mp3';
        this.fadeInterval = null;
        this.fadeDuration = 5000; // 5 segundos de fade-in
        
        console.log('🎵 SimpleMusicSystem inicializado con fade-in de 5s y volumen al 25%');
        this.init();
    }
    
    init() {
        // Esperar interacción del usuario
        const startMusic = () => {
            if (!this.userInteracted) {
                this.userInteracted = true;
                this.loadAndPlay();
                console.log('🎵 Música iniciada tras interacción del usuario');
            }
        };
        
        // Eventos para detectar interacción
        document.addEventListener('click', startMusic, { once: true });
        document.addEventListener('touchstart', startMusic, { once: true });
        document.addEventListener('keydown', startMusic, { once: true });
        
        // Pausar/reanudar según visibilidad de la página
        document.addEventListener('visibilitychange', () => {
            if (this.audio) {
                if (document.hidden) {
                    this.pause();
                } else {
                    this.resume();
                }
            }
        });
    }
    
    loadAndPlay() {
        try {
            this.audio = new Audio(this.musicFile);
            this.audio.volume = 0; // Comenzar en silencio para el fade-in
            this.audio.loop = true;
            
            this.audio.addEventListener('canplaythrough', () => {
                this.playWithFadeIn();
            });
            
            this.audio.addEventListener('error', (e) => {
                console.warn('⚠️ Error cargando música:', e);
                // Intentar con el nombre original como fallback
                this.tryOriginalFile();
            });
            
        } catch (error) {
            console.error('❌ Error inicializando audio:', error);
        }
    }
    
    tryOriginalFile() {
        console.log('🔄 Intentando con archivo original...');
        try {
            this.audio = new Audio('recursos/A&A/Material_FX/musica_fondo/043 Finding Shapes in the Clouds.mp3');
            this.audio.volume = 0; // Comenzar en silencio para el fade-in
            this.audio.loop = true;
            
            this.audio.addEventListener('canplaythrough', () => {
                this.playWithFadeIn();
                console.log('✅ Música cargada con nombre original');
            });
            
            this.audio.addEventListener('error', () => {
                console.error('❌ No se pudo cargar ningún archivo de música');
            });
            
        } catch (error) {
            console.error('❌ Error con archivo original:', error);
        }
    }
    
    play() {
        if (this.audio && !this.isPlaying) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                console.log('🎵 Música reproduciéndose');
            }).catch(error => {
                console.warn('⚠️ Error reproduciendo música:', error);
            });
        }
    }
    
    playWithFadeIn() {
        if (this.audio && !this.isPlaying) {
            // Comenzar la reproducción en silencio
            this.audio.volume = 0;
            this.currentVolume = 0;
            
            this.audio.play().then(() => {
                this.isPlaying = true;
                console.log('🎵 Iniciando música con fade-in de 5 segundos...');
                this.startFadeIn();
            }).catch(error => {
                console.warn('⚠️ Error reproduciendo música:', error);
            });
        }
    }
    
    startFadeIn() {
        // Limpiar cualquier fade anterior
        if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
        }
        
        const fadeSteps = 50; // 50 pasos para suavidad
        const stepDuration = this.fadeDuration / fadeSteps; // Duración de cada paso
        const volumeIncrement = this.targetVolume / fadeSteps; // Incremento por paso
        
        let currentStep = 0;
        
        this.fadeInterval = setInterval(() => {
            currentStep++;
            this.currentVolume = Math.min(volumeIncrement * currentStep, this.targetVolume);
            
            if (this.audio) {
                this.audio.volume = this.currentVolume;
            }
            
            // Log del progreso cada segundo aproximadamente
            if (currentStep % 10 === 0) {
                const progress = Math.round((currentStep / fadeSteps) * 100);
                const currentVol = Math.round(this.currentVolume * 100);
                console.log(`🔊 Fade-in: ${progress}% - Volumen: ${currentVol}%`);
            }
            
            // Fade completado
            if (currentStep >= fadeSteps) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
                console.log('✅ Fade-in completado - Volumen final: 25%');
            }
        }, stepDuration);
    }
    
    pause() {
        if (this.audio && this.isPlaying) {
            // Detener fade-in si está en progreso
            if (this.fadeInterval) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
            }
            
            this.audio.pause();
            this.isPlaying = false;
            console.log('⏸️ Música pausada');
        }
    }
    
    resume() {
        if (this.audio && !this.isPlaying) {
            // Restaurar el volumen al nivel actual (sin fade-in al reanudar)
            this.audio.volume = this.currentVolume;
            
            this.audio.play().then(() => {
                this.isPlaying = true;
                console.log('▶️ Música reanudada al ' + Math.round(this.currentVolume * 100) + '%');
            }).catch(error => {
                console.warn('⚠️ Error reanudando música:', error);
            });
        }
    }
    
    stop() {
        if (this.audio) {
            // Detener fade-in si está en progreso
            if (this.fadeInterval) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
            }
            
            this.audio.pause();
            this.audio.currentTime = 0;
            this.currentVolume = 0;
            this.isPlaying = false;
            console.log('⏹️ Música detenida');
        }
    }
    
    setVolume(volume) {
        this.targetVolume = Math.max(0, Math.min(1, volume));
        this.currentVolume = this.targetVolume;
        if (this.audio) {
            this.audio.volume = this.currentVolume;
            console.log(`🔊 Volumen ajustado a ${Math.round(this.currentVolume * 100)}%`);
        }
    }
}

// Crear instancia global
const simpleMusic = new SimpleMusicSystem();

// Exportar para uso global
window.simpleMusic = simpleMusic;

console.log('🎵 Sistema de música simple cargado');
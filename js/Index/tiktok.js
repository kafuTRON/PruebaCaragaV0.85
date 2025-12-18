/* ========== MÓDULO TIKTOK ========== */

class TikTokManager {
    constructor() {
        this.videosAA = [
            // ===== VIDEOS REALES DE @aa.perfumes7 =====
            
            {
                id: "7580562100410469650",
                url: "https://www.tiktok.com/@aa.perfumes7/video/7580562100410469650",
                descripcion: "🌟 Perfumes para parejas en Orizaba 🌟",
                hashtags: "#orizaba #orizabapueblomagico #orizabaveracruz #perfumes #parejas"
            },
            {
                id: "7578545540170910984",
                url: "https://www.tiktok.com/@aa.perfumes7/video/7578545540170910984",
                descripcion: "💝 Perfumes ideales para regalar 💝",
                hashtags: "#perfumes #parejas #orizabapueblomagico #regalo #madeinchayotitlan"
            },
            {
                id: "7578528348503018770",
                url: "https://www.tiktok.com/@aa.perfumes7/video/7578528348503018770",
                descripcion: "💕 Regalos perfectos para parejas 💕",
                hashtags: "#parejas #orizaba #regalos #perfumes #madeinchayotitlan"
            },
            {
                id: "7582728223838997778",
                url: "https://www.tiktok.com/@aa.perfumes7/video/7582728223838997778",
                descripcion: "🚚 Aprovecha la oferta y el envío GRATIS 🚚",
                hashtags: "#ofertas #enviogratis #perfumes #promociones"
            },
            {
                id: "7582363975011126536",
                url: "https://www.tiktok.com/@aa.perfumes7/video/7582363975011126536",
                descripcion: "🤔 ¿Qué layos dijo? 🤔",
                hashtags: "#divertido #perfumes #humor #orizaba"
            },
            {
                id: "7581945035961257234",
                url: "https://www.tiktok.com/@aa.perfumes7/video/7581945035961257234",
                descripcion: "✨ Preparando Yamil inspirado en Sauvage Elixir de Dior ✨",
                hashtags: "#yamil #sauvage #dior #perfumes #inspirado #10ml"
            },
            {
                id: "7581543484776107271",
                url: "https://www.tiktok.com/@aa.perfumes7/video/7581543484776107271",
                descripcion: "🏪 Visítanos en Orizaba, Pueblo Mágico 🏪",
                hashtags: "#orizaba #orizabapueblomagico #orizabaveracruz #perfumes #parejas"
            }
        ];
        
        this.isLoaded = false;
        this.isLoading = false;
        this.container = null;
    }

    // Inicializar el módulo
    init() {
        this.container = document.getElementById('tiktokVideos');
        this.setupLazyLoading();
        this.setupButton();
    }

    // Configurar carga perezosa
    setupLazyLoading() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoaded) {
                    this.cargarVideosIniciales();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        const videosSection = document.querySelector('.videos-section');
        if (videosSection) {
            observer.observe(videosSection);
        }
    }

    // Configurar botón
    setupButton() {
        const button = document.querySelector('.btn-cargar-videos');
        if (button) {
            button.addEventListener('click', () => this.cargarVideosAleatorios());
        }
    }

    // Crear embed de video
    crearVideoEmbed(video) {
        return `
            <div class="video-item">
                <blockquote class="tiktok-embed" 
                    cite="${video.url}" 
                    data-video-id="${video.id}" 
                    style="max-width: 605px;min-width: 325px;">
                    <section>
                        <a target="_blank" title="@aa.perfumes7" 
                           href="https://www.tiktok.com/@aa.perfumes7?refer=embed">@aa.perfumes7</a>
                        <p>${video.descripcion}</p>
                        <p>${video.hashtags}</p>
                        <a target="_blank" title="♬ sonido original - A&A perfumes" 
                           href="https://www.tiktok.com/music/sonido-original-7580562123089136405?refer=embed">
                           ♬ sonido original - A&A perfumes</a>
                    </section>
                </blockquote>
            </div>
        `;
    }

    // Cargar videos iniciales
    async cargarVideosIniciales() {
        if (this.isLoaded || this.isLoading) return;
        
        this.isLoading = true;
        
        try {
            // Cargar script de TikTok solo cuando sea necesario
            await this.loadTikTokScript();
            
            // Cargar videos
            this.cargarVideosAleatorios();
            this.isLoaded = true;
        } catch (error) {
            console.error('Error cargando TikTok:', error);
            this.mostrarError();
        } finally {
            this.isLoading = false;
        }
    }

    // Cargar script de TikTok dinámicamente
    loadTikTokScript() {
        return new Promise((resolve, reject) => {
            // Si ya está cargado, resolver inmediatamente
            if (window.tiktokEmbed) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Cargar videos aleatorios
    cargarVideosAleatorios() {
        if (!this.container) return;

        const button = document.querySelector('.btn-cargar-videos');
        const originalText = button?.innerHTML;

        // Mostrar loading
        if (button) {
            button.innerHTML = '<span class="loading-spinner"></span> Cargando...';
            button.disabled = true;
        }

        // Mezclar array aleatoriamente
        const videosAleatorios = [...this.videosAA].sort(() => Math.random() - 0.5);
        
        // Tomar 3 videos aleatorios
        const videosSeleccionados = videosAleatorios.slice(0, 3);
        
        // Generar HTML
        this.container.innerHTML = videosSeleccionados
            .map(video => this.crearVideoEmbed(video))
            .join('');

        // Simular delay para mejor UX
        setTimeout(() => {
            // Recargar el script de TikTok para los nuevos embeds
            if (window.tiktokEmbed && window.tiktokEmbed.lib) {
                window.tiktokEmbed.lib.render();
            }

            // Restaurar botón
            if (button) {
                button.innerHTML = originalText;
                button.disabled = false;
            }
        }, 1000);
    }

    // Mostrar error
    mostrarError() {
        if (this.container) {
            this.container.innerHTML = `
                <div style="text-align: center; color: #ff6b35; padding: 40px;">
                    <h3>⚠️ Error al cargar videos</h3>
                    <p>No se pudieron cargar los videos de TikTok en este momento.</p>
                    <button onclick="tiktokManager.cargarVideosIniciales()" 
                            class="btn-cargar-videos">
                        🔄 Intentar de nuevo
                    </button>
                </div>
            `;
        }
    }

    // Agregar nuevo video (para uso futuro)
    agregarVideo(video) {
        this.videosAA.push(video);
    }

    // Obtener estadísticas
    getStats() {
        return {
            totalVideos: this.videosAA.length,
            isLoaded: this.isLoaded,
            isLoading: this.isLoading
        };
    }
}

// Instancia global
const tiktokManager = new TikTokManager();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => tiktokManager.init());
} else {
    tiktokManager.init();
}
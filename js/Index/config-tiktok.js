/* ========== CONFIGURACIÓN TIKTOK ========== */

// Configuración centralizada para fácil mantenimiento
const TIKTOK_CONFIG = {
    // Información de la cuenta
    username: 'aa.perfumes7',
    displayName: 'A&A perfumes',
    profileUrl: 'https://www.tiktok.com/@aa.perfumes7?refer=embed',
    
    // Configuración de carga
    videosPerLoad: 3,
    lazyLoadThreshold: 0.1,
    lazyLoadMargin: '50px',
    
    // Videos disponibles
    videos: [
        {
            id: "7580562100410469650",
            url: "https://www.tiktok.com/@aa.perfumes7/video/7580562100410469650",
            descripcion: "🌟 Perfumes para parejas en Orizaba 🌟",
            hashtags: "#orizaba #orizabapueblomagico #orizabaveracruz #perfumes #parejas",
            musicUrl: "https://www.tiktok.com/music/sonido-original-7580562123089136405?refer=embed",
            musicTitle: "♬ sonido original - A&A perfumes"
        }
        // Agregar más videos aquí cuando estén disponibles
        // {
        //     id: "NUEVO_VIDEO_ID",
        //     url: "https://www.tiktok.com/@aa.perfumes7/video/NUEVO_VIDEO_ID",
        //     descripcion: "🌟 Nueva descripción 🌟",
        //     hashtags: "#nuevos #hashtags",
        //     musicUrl: "URL_DE_MUSICA",
        //     musicTitle: "♬ título de música"
        // }
    ],
    
    // Mensajes de la interfaz
    messages: {
        loading: 'Cargando videos...',
        loadMore: '🔄 Cargar Más Videos',
        error: '⚠️ Error al cargar videos',
        errorDescription: 'No se pudieron cargar los videos de TikTok en este momento.',
        retry: '🔄 Intentar de nuevo'
    },
    
    // Configuración de rendimiento
    performance: {
        loadDelay: 1000, // Delay para mejor UX
        retryAttempts: 3,
        cacheEnabled: true
    }
};

// Función para agregar nuevos videos fácilmente
function agregarVideoTikTok(videoData) {
    TIKTOK_CONFIG.videos.push(videoData);
    console.log('Video agregado:', videoData.id);
}

// Función para obtener videos aleatorios
function obtenerVideosAleatorios(cantidad = TIKTOK_CONFIG.videosPerLoad) {
    const videos = [...TIKTOK_CONFIG.videos];
    
    // Si hay menos videos que la cantidad solicitada, duplicar algunos
    while (videos.length < cantidad && TIKTOK_CONFIG.videos.length > 0) {
        videos.push(...TIKTOK_CONFIG.videos);
    }
    
    // Mezclar y tomar la cantidad solicitada
    return videos
        .sort(() => Math.random() - 0.5)
        .slice(0, cantidad);
}

// Exportar configuración para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TIKTOK_CONFIG, agregarVideoTikTok, obtenerVideosAleatorios };
}
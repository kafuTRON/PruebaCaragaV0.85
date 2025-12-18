# 🎶 Música de Fondo - A&A Perfumería

## 📋 Lista de Música Requerida

### 🌟 **Música Principal**
- `ambient_main.mp3` - Música principal del sitio (loop)
- `welcome_intro.mp3` - Introducción de bienvenida (una vez)

### 🧴 **Música del Catálogo**
- `ambient_catalog.mp3` - Música mientras navega productos
- `ambient_perfumes.mp3` - Música específica para perfumes
- `ambient_romantic.mp3` - Música romántica para parejas

### 🛒 **Música de Compras**
- `ambient_checkout.mp3` - Música durante el proceso de compra
- `success_purchase.mp3` - Música de compra exitosa

### 🎨 **Música Estacional**
- `ambient_valentine.mp3` - Para San Valentín
- `ambient_christmas.mp3` - Para Navidad
- `ambient_summer.mp3` - Para verano

## 🎵 **Características Técnicas**

**Formato:** MP3 (compatibilidad universal)  
**Bitrate:** 192kbps (calidad alta para música)  
**Duración:** 30s - 3min (diseñado para loop)  
**Volumen:** Normalizado a -18dB (música de fondo)  
**Tamaño:** < 2MB por archivo  
**Loop:** Sin clicks audibles al repetir  

## 🎧 **Estilo Musical Sugerido**

### **Género:** Ambient/Chill/Lounge
- **Tempo:** 70-90 BPM (relajado)
- **Instrumentos:** Piano, cuerdas suaves, pads sintéticos
- **Mood:** Elegante, sofisticado, romántico
- **Inspiración:** Música de spa, tiendas de lujo, perfumerías

### **Evitar:**
- Música con letra (distrae de la navegación)
- Ritmos muy marcados o agresivos
- Cambios bruscos de volumen
- Frecuencias muy altas o bajas

## 🔧 **Configuración de Reproducción**

```javascript
const MUSIC_CONFIG = {
    autoplay: false,        // Requiere interacción del usuario
    loop: true,            // Repetir automáticamente
    volume: 0.2,           // Volumen bajo (20%)
    fadeIn: 2000,          // Fade in de 2 segundos
    fadeOut: 1000,         // Fade out de 1 segundo
    crossfade: true        // Transición suave entre pistas
};
```

## 🎛️ **Control del Usuario**

La música incluye controles para que el usuario pueda:
- ▶️ **Play/Pause** - Reproducir o pausar
- 🔊 **Volumen** - Ajustar nivel de audio
- 🔇 **Mute** - Silenciar completamente
- 🎵 **Cambiar pista** - Seleccionar música diferente
- ⚙️ **Configuración** - Guardar preferencias

## 📱 **Optimización Móvil**

- **Detección de conexión:** No cargar en 2G/3G lento
- **Batería baja:** Pausar automáticamente si batería < 20%
- **Modo ahorro:** Respetar configuración de ahorro de datos
- **Background:** Pausar cuando la app no está visible
- **Auriculares:** Detectar conexión/desconexión

---

**Nota:** La música es completamente opcional y mejora la experiencia del usuario sin ser intrusiva.
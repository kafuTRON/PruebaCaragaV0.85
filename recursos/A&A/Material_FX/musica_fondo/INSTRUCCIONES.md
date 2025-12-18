# 🎵 Música de Fondo - A&A Perfumería

## 📁 Instrucciones para Archivos de Música

### 🔄 Cambio de Nombre Requerido

Para que el sistema de música de fondo funcione correctamente, necesitas **renombrar** el archivo de música:

**Nombre actual:**
```
043 Finding Shapes in the Clouds.mp3
```

**Nuevo nombre requerido:**
```
001.mp3
```

### 🛠️ Pasos para Renombrar:

1. **Localiza el archivo**: `043 Finding Shapes in the Clouds.mp3`
2. **Haz click derecho** → Renombrar (o F2)
3. **Cambia el nombre a**: `001.mp3`
4. **Confirma el cambio**

### ❓ ¿Por qué este cambio?

- **Espacios en el nombre**: Los espacios pueden causar problemas en URLs
- **Caracteres especiales**: El símbolo `&` puede interferir con la carga
- **Compatibilidad web**: Los nombres simples son más confiables
- **Facilidad de manejo**: Nombres cortos son más fáciles de gestionar

### ✅ Después del Cambio:

Una vez renombrado el archivo a `001.mp3`, el sistema de música funcionará correctamente en:

- ✅ **A&A.html** - Página principal
- ✅ **A&A-mobile-ultra.html** - Versión móvil
- ✅ **test-background-music.html** - Página de pruebas

### 🎛️ Configuración Actual:

- **Volumen**: 60% (0.6)
- **Reproducción**: Loop continuo
- **Inicio**: Tras primera interacción del usuario
- **Pausa automática**: Al cambiar de pestaña

### 🧪 Para Probar:

1. Renombra el archivo a `001.mp3`
2. Abre `tests/test-background-music.html`
3. Carga una página A&A en el iframe
4. Haz click en cualquier parte de la página
5. La música debe iniciar automáticamente

### 📝 Notas:

- Si agregas más música, usa nombres simples: `002.mp3`, `003.mp3`, etc.
- Mantén los archivos en formato MP3 para mejor compatibilidad
- El sistema está optimizado para archivos de música ambiental/instrumental
// ===== CATÁLOGO A&A - JAVASCRIPT =====
// Base de datos de productos - Perfumes A&A
const productos = [
    // PERFUMES PARA CABALLEROS
    {
        id: 1,
        nombre: "Alam",
        inspirado: "Fragancia masculina exclusiva",
        descripcion: "Una fragancia sofisticada y elegante, perfecta para el caballero moderno.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Alam.jpg"
    },
    {
        id: 2,
        nombre: "Anuar",
        inspirado: "Fragancia masculina intensa",
        descripcion: "Intenso y carismático, ideal para ocasiones especiales.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Anuar.jpg"
    },
    {
        id: 3,
        nombre: "Cristian",
        inspirado: "Fragancia masculina fresca",
        descripcion: "Fresco y dinámico, perfecto para el día a día.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Cristian.jpg"
    },
    {
        id: 4,
        nombre: "Cucho",
        inspirado: "Fragancia masculina audaz",
        descripcion: "Audaz y distintivo, para hombres que marcan la diferencia.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Cucho.jpg"
    },
    {
        id: 5,
        nombre: "Eduardo",
        inspirado: "Fragancia masculina clásica",
        descripcion: "Clásico y refinado, una fragancia atemporal.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Eduardo.jpg"
    },
    {
        id: 6,
        nombre: "Ismael",
        inspirado: "Fragancia masculina seductora",
        descripcion: "Seductor y magnético, conquista desde el primer momento.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Ismael.jpg"
    },
    {
        id: 7,
        nombre: "Israel",
        inspirado: "Fragancia masculina poderosa",
        descripcion: "Poderoso y enérgico, para hombres seguros de sí mismos.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Israel.jpg"
    },
    {
        id: 8,
        nombre: "Mandingo",
        inspirado: "Fragancia masculina exótica",
        descripcion: "Exótico y misterioso, una fragancia única e irresistible.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Mandingo.jpg"
    },
    {
        id: 9,
        nombre: "Mateo",
        inspirado: "Fragancia masculina juvenil",
        descripcion: "Juvenil y vibrante, perfecto para el hombre contemporáneo.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Mateo.jpg"
    },
    {
        id: 10,
        nombre: "Milton",
        inspirado: "Fragancia masculina distinguida",
        descripcion: "Distinguido y elegante, para ocasiones importantes.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Milton.jpg"
    },
    {
        id: 11,
        nombre: "Pedro",
        inspirado: "Fragancia masculina tradicional",
        descripcion: "Tradicional con un toque moderno, una fragancia versátil.",
        precio: "$45.000",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Pedro.jpg"
    },

    // PERFUMES PARA DAMAS
    {
        id: 12,
        nombre: "Adele",
        inspirado: "Inspirado en Chance Chanel",
        descripcion: "Elegante y sofisticada, una fragancia que marca presencia.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Adele(Chance_Chanel).jpg"
    },
    {
        id: 13,
        nombre: "Adelita",
        inspirado: "Inspirado en Born In Roma Valentino",
        descripcion: "Moderna y audaz, perfecta para la mujer contemporánea.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Adelita(Born_In_Roma_Valentino).jpg"
    },
    {
        id: 14,
        nombre: "Alondra",
        inspirado: "Inspirado en Bade'e AI Oud Honor&Glory Lattafa",
        descripcion: "Exótica y misteriosa, con notas orientales cautivadoras.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Alondra(Bade'e_AI_Oud_Honor&Glory_Lattafa).jpg"
    },
    {
        id: 15,
        nombre: "Angelica",
        inspirado: "Inspirado en Yara Moi de Lattafa",
        descripcion: "Dulce y envolvente, una fragancia que enamora.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Angelica(Yara_Moi_de_Lattafa).jpg"
    },
    {
        id: 16,
        nombre: "Anina",
        inspirado: "Inspirado en Light Blue Dolce&Gabbana",
        descripcion: "Fresca y mediterránea, perfecta para el verano.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Anina(Light_Blue_Dolce&Gabbana).jpg"
    },
    {
        id: 17,
        nombre: "Blanca",
        inspirado: "Inspirado en Good Girl Blush Carolina Herrera",
        descripcion: "Seductora y femenina, una fragancia irresistible.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Blanca(Good_Girl_Blush_EAN_Carolina_Herrera).jpg"
    },
    {
        id: 18,
        nombre: "Diana",
        inspirado: "Inspirado en Kenzo Flower",
        descripcion: "Floral y delicada, como un jardín en primavera.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Diana(Kenzo_Flower).jpg"
    },
    {
        id: 19,
        nombre: "Dolores",
        inspirado: "Inspirado en Scandal Jean Paul Gaultier",
        descripcion: "Provocativa y sensual, para mujeres que no pasan desapercibidas.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Dolores(Scandal_Jean_Paul_Gaultier).jpg"
    },
    {
        id: 20,
        nombre: "Eaned",
        inspirado: "Inspirado en Ralph Laurent",
        descripcion: "Clásica y refinada, una fragancia atemporal.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Eaned(Ralph_Laurent).jpg"
    },
    {
        id: 21,
        nombre: "Esther",
        inspirado: "Inspirado en Khamrah Qahwa de Lattafa",
        descripcion: "Rica y especiada, con notas de café y especias orientales.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Esther(Khamrah_Qahwa_de_Lattafa).jpg"
    },
    {
        id: 22,
        nombre: "Inani",
        inspirado: "Inspirado en Miss Dior",
        descripcion: "Romántica y elegante, la esencia de la feminidad.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Inani(Miss_Dior_Dior).jpg"
    },
    {
        id: 23,
        nombre: "Ivane",
        inspirado: "Inspirado en Sweet like Candy Ariana Grande",
        descripcion: "Dulce y juguetona, perfecta para mujeres jóvenes y divertidas.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Ivane(Sweed_like_Candy_Ariana_Grande).jpg"
    },
    {
        id: 24,
        nombre: "Judith",
        inspirado: "Inspirado en Yara De Lattafa",
        descripcion: "Intensa y cautivadora, una fragancia que deja huella.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Judith(Yara_De_Lattafa).jpg"
    },
    {
        id: 25,
        nombre: "Knoz",
        inspirado: "Inspirado en Cloud Ariana Grande",
        descripcion: "Suave y etérea, como caminar entre nubes.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Knoz(Cloud_Ariana_Grande).jpg"
    },
    {
        id: 26,
        nombre: "Martha",
        inspirado: "Inspirado en Chanel No5",
        descripcion: "Icónica y legendaria, la fragancia más famosa del mundo.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Martha(Chanel_No5).jpg"
    },
    {
        id: 27,
        nombre: "Nahomi",
        inspirado: "Inspirado en Halloween",
        descripcion: "Misteriosa y seductora, perfecta para noches especiales.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Nahomi(Hallowen).jpg"
    },
    {
        id: 28,
        nombre: "Olimpia",
        inspirado: "Inspirado en Libre Yves Saint Laurent",
        descripcion: "Libre y audaz, para mujeres que viven sin límites.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Olimpia(Libre_EAN_Parfum_Yves_Saint_Laurent).jpg"
    },
    {
        id: 29,
        nombre: "Rosa",
        inspirado: "Inspirado en Rock In Rio Escada",
        descripcion: "Vibrante y energética, perfecta para festivales y celebraciones.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Rosa(Rock_In_Rio_Escada).jpg"
    },
    {
        id: 30,
        nombre: "Sarai",
        inspirado: "Inspirado en Can Can Paris Hilton",
        descripcion: "Glamorosa y sofisticada, para mujeres que aman brillar.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Sarai(Can_Can_Paris_Hilton).jpg"
    },
    {
        id: 31,
        nombre: "Sofia",
        inspirado: "Inspirado en Meow Katy Perry",
        descripcion: "Divertida y coqueta, perfecta para mujeres con personalidad.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Sofia(Meow_Katy_perry).jpg"
    },
    {
        id: 32,
        nombre: "Tamara",
        inspirado: "Inspirado en 212 Clásico Carolina Herrera",
        descripcion: "Urbana y moderna, la fragancia de la mujer cosmopolita.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Tamara(212_Clasico_Carolina_Herrera).jpg"
    },
    {
        id: 33,
        nombre: "Yadira",
        inspirado: "Inspirado en Thank You Next Ariana Grande",
        descripcion: "Empoderada y segura, para mujeres que siguen adelante.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yadira(Thank_You_Next_Ariana_Grande).jpg"
    },
    {
        id: 34,
        nombre: "Yatae",
        inspirado: "Inspirado en Coco Mademoiselle de Chanel",
        descripcion: "Elegante y rebelde, la fragancia de la mujer independiente.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yatae(Coco_Mademoiselle_de_Chanel).jpg"
    },
    {
        id: 35,
        nombre: "Yesenia",
        inspirado: "Inspirado en Olympèa Paco Rabanne",
        descripcion: "Divina y poderosa, como una diosa moderna.",
        precio: "$42.000",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yesenia(Olympèa_PacoRabanne).jpg"
    }
];

// ===== VARIABLES GLOBALES =====
let categoriaActual = 'todos';
let animationDelay = 0;
let isAnimating = false;

// ===== FUNCIONES PRINCIPALES =====

// Función mejorada para mostrar productos con animaciones
function mostrarProductos(productosAMostrar) {
    const grid = document.getElementById('productsGrid');
    
    if (isAnimating) return;
    isAnimating = true;

    // Animación de salida para productos existentes
    const existingCards = grid.querySelectorAll('.product-card');
    existingCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.3s ease reverse';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-30px) scale(0.8)';
        }, index * 50);
    });

    // Limpiar y agregar nuevos productos después de la animación de salida
    setTimeout(() => {
        grid.innerHTML = '';
        animationDelay = 0;

        productosAMostrar.forEach((producto, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // Calcular delay escalonado
            const delay = index * 100;
            card.style.animationDelay = `${delay}ms`;
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${producto.imagen}" alt="${producto.nombre}" 
                         style="width: 100%; height: 100%; object-fit: cover; border-radius: 0;"
                         onload="this.style.opacity='1'" 
                         style="opacity: 0; transition: opacity 0.5s ease;">
                </div>
                <div class="product-info">
                    <div class="product-category">${producto.categoria.toUpperCase()}</div>
                    <div class="product-name">${producto.nombre}</div>
                    <div class="product-inspired">${producto.inspirado}</div>
                    <div class="product-description">${producto.descripcion}</div>
                    <div class="product-price">${producto.precio}</div>
                    <button class="btn-contact" onclick="contactarPorProducto('${producto.nombre}')">
                        Consultar disponibilidad
                    </button>
                </div>
            `;

            // Agregar efectos de hover personalizados
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
                this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.2)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            });

            grid.appendChild(card);
        });

        // Activar animación de scroll
        observeCards();
        isAnimating = false;
    }, existingCards.length * 50 + 200);
}

// Función mejorada para filtrar con animaciones
function filterProducts(categoria) {
    if (isAnimating) return;

    // Actualizar botones activos con animación
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    });
    
    event.target.classList.add('active');
    event.target.style.transform = 'scale(1.05)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 200);

    categoriaActual = categoria;
    
    let productosFiltrados;
    if (categoria === 'todos') {
        productosFiltrados = productos;
    } else {
        productosFiltrados = productos.filter(p => p.categoria === categoria);
    }
    
    mostrarProductos(productosFiltrados);
}

// Función mejorada para contactar con animación
function contactarPorProducto(nombreProducto) {
    // Crear overlay de confirmación animado
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
        padding: 2rem;
        border-radius: 20px;
        text-align: center;
        color: white;
        border: 1px solid rgba(255,215,0,0.3);
        transform: scale(0.7);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    modal.innerHTML = `
        <h3 style="color: #ffd700; margin-bottom: 1rem;">¡Excelente elección!</h3>
        <p style="margin-bottom: 1.5rem;">Te interesa el perfume <strong>"${nombreProducto}"</strong></p>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: linear-gradient(45deg, #ffd700, #ffed4e); 
                       color: #000; border: none; padding: 12px 24px; 
                       border-radius: 25px; cursor: pointer; font-weight: bold;">
            Cerrar
        </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animaciones de entrada
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);

    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    }, 3000);
}

// ===== FUNCIONES DE ANIMACIÓN =====

// Intersection Observer para animaciones de scroll
function observeCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'bounceIn 0.6s ease forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// Crear partículas de fondo
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Animación del header al cargar
function animateHeader() {
    const header = document.querySelector('.header');
    const title = document.querySelector('.header h1');
    const subtitle = document.querySelector('.header p');

    header.style.opacity = '0';
    header.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        header.style.transition = 'all 0.8s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        title.style.animation = 'slideInFromLeft 0.8s ease forwards';
    }, 300);

    setTimeout(() => {
        subtitle.style.animation = 'slideInFromRight 0.8s ease forwards';
    }, 500);
}

// Animación de los filtros
function animateFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach((filter, index) => {
        filter.style.opacity = '0';
        filter.style.transform = 'translateY(30px)';
        setTimeout(() => {
            filter.style.transition = 'all 0.5s ease';
            filter.style.opacity = '1';
            filter.style.transform = 'translateY(0)';
        }, index * 100 + 700);
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Crear efectos visuales
    createParticles();
    
    // Animaciones de entrada
    animateHeader();
    animateFilters();
    
    // Cargar productos con delay para mejor efecto
    setTimeout(() => {
        mostrarProductos(productos);
    }, 1000);

    // Agregar efectos de scroll suave
    document.documentElement.style.scrollBehavior = 'smooth';
});

// ===== SISTEMA DE CARTELONES LATERALES =====

// Array con todas las imágenes de cartelones disponibles
const cartelones = [
    'recursos/A&A/Material Grafico/CartelonDamayCabellero.jpg',
    'recursos/A&A/Material Grafico/CartelonDePerdumesInspirados.jpg',
    'recursos/A&A/Material Grafico/CartelonDeUbicacionVariante1.jpg',
    'recursos/A&A/Material Grafico/CartelonDeUbicacionVriante2.jpg',
    'recursos/A&A/Material Grafico/CartelonDeUbicacionVriante3.jpg',
    'recursos/A&A/Material Grafico/CartelonMarcoPerfume.jpg',
    'recursos/A&A/Material Grafico/ParonamaDeLogoConRedesSociales.jpg',
    'recursos/A&A/Material Grafico/VistaProductoConContactos.jpg'
];

// Variables para controlar los cartelones
let currentLeftIndex = 0;
let currentRightIndex = 1;
let bannerInterval;

// Función para crear elementos de imagen de cartelones
function createBannerImage(src, isActive = false) {
    const img = document.createElement('img');
    img.src = src;
    img.className = `banner-image ${isActive ? 'active' : ''}`;
    img.alt = 'Cartelón A&A Perfumería';
    
    // Agregar efecto de carga
    img.onload = function() {
        this.style.opacity = isActive ? '1' : '0';
    };
    
    return img;
}

// Función para inicializar los cartelones
function initializeBanners() {
    const leftContainer = document.querySelector('#leftBanner .banner-container');
    const rightContainer = document.querySelector('#rightBanner .banner-container');
    
    if (!leftContainer || !rightContainer) return;
    
    // Limpiar contenedores
    leftContainer.innerHTML = '';
    rightContainer.innerHTML = '';
    
    // Agregar todas las imágenes a ambos contenedores
    cartelones.forEach((cartelon, index) => {
        // Cartelón izquierdo
        const leftImg = createBannerImage(cartelon, index === currentLeftIndex);
        leftContainer.appendChild(leftImg);
        
        // Cartelón derecho
        const rightImg = createBannerImage(cartelon, index === currentRightIndex);
        rightContainer.appendChild(rightImg);
    });
}

// Función para cambiar cartelones con animación suave
function changeBanners() {
    const leftImages = document.querySelectorAll('#leftBanner .banner-image');
    const rightImages = document.querySelectorAll('#rightBanner .banner-image');
    
    // Ocultar cartelones actuales
    if (leftImages[currentLeftIndex]) {
        leftImages[currentLeftIndex].classList.remove('active');
    }
    if (rightImages[currentRightIndex]) {
        rightImages[currentRightIndex].classList.remove('active');
    }
    
    // Calcular nuevos índices aleatorios
    let newLeftIndex, newRightIndex;
    
    do {
        newLeftIndex = Math.floor(Math.random() * cartelones.length);
    } while (newLeftIndex === currentLeftIndex);
    
    do {
        newRightIndex = Math.floor(Math.random() * cartelones.length);
    } while (newRightIndex === currentRightIndex || newRightIndex === newLeftIndex);
    
    // Actualizar índices
    currentLeftIndex = newLeftIndex;
    currentRightIndex = newRightIndex;
    
    // Mostrar nuevos cartelones con delay para efecto suave
    setTimeout(() => {
        if (leftImages[currentLeftIndex]) {
            leftImages[currentLeftIndex].classList.add('active');
        }
        if (rightImages[currentRightIndex]) {
            rightImages[currentRightIndex].classList.add('active');
        }
    }, 500);
}

// Función para iniciar el ciclo automático de cartelones
function startBannerRotation() {
    // Cambiar cartelones cada 8 segundos
    bannerInterval = setInterval(changeBanners, 8000);
}

// Función para pausar la rotación cuando el usuario interactúa
function pauseBannerRotation() {
    if (bannerInterval) {
        clearInterval(bannerInterval);
    }
}

// Función para reanudar la rotación
function resumeBannerRotation() {
    pauseBannerRotation();
    startBannerRotation();
}

// Función para cambiar cartelones basado en la categoría seleccionada
function updateBannersForCategory(categoria) {
    // Opcional: puedes hacer que ciertos cartelones aparezcan más frecuentemente
    // según la categoría seleccionada
    
    if (categoria === 'hombre') {
        // Priorizar cartelones relacionados con hombres
        changeBanners();
    } else if (categoria === 'mujer') {
        // Priorizar cartelones relacionados con mujeres
        changeBanners();
    } else {
        // Cambio aleatorio normal
        changeBanners();
    }
}

// Agregar eventos para pausar/reanudar cuando el usuario interactúa
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseBannerRotation();
    } else {
        resumeBannerRotation();
    }
});

// Pausar cuando el mouse está sobre los cartelones
document.addEventListener('DOMContentLoaded', function() {
    const banners = document.querySelectorAll('.side-banners');
    
    banners.forEach(banner => {
        banner.addEventListener('mouseenter', pauseBannerRotation);
        banner.addEventListener('mouseleave', resumeBannerRotation);
    });
});

// ===== INTEGRACIÓN CON EL SISTEMA EXISTENTE =====

// Modificar la función de filtros existente para incluir cambio de cartelones
const originalFilterProducts = window.filterProducts;
window.filterProducts = function(categoria) {
    // Llamar a la función original
    if (originalFilterProducts) {
        originalFilterProducts.call(this, categoria);
    }
    
    // Actualizar cartelones según la categoría
    setTimeout(() => {
        updateBannersForCategory(categoria);
    }, 1000);
};

// Inicializar cartelones cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que se cargue todo el contenido
    setTimeout(() => {
        initializeBanners();
        startBannerRotation();
    }, 2000);
});
// ===== SISTEMA DE MODAL DE PRODUCTO =====

// Configuración de precios y opciones
const preciosConfig = {
    tamaños: {
        '10ml': 90,
        '30ml': 180,
        '60ml': 220,
        '100ml': 280
    },
    extras: {
        'doble_fijador': {
            nombre: 'Doble Fijador',
            descripcion: 'Mayor duración y proyección',
            precio: 35,
            disponibleDesde: '30ml'
        },
        'feromonas': {
            nombre: 'Feromonas',
            descripcion: 'Atracción y magnetismo personal',
            precio: 35,
            disponibleDesde: '30ml'
        }
    }
};

// Variables del modal
let modalActual = null;
let productoSeleccionado = null;
let tamañoSeleccionado = '30ml'; // Tamaño por defecto
let extrasSeleccionados = [];

// Función para crear el modal HTML
function createProductModal() {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.id = 'productModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeProductModal()">&times;</button>
            
            <div class="modal-header">
                <img class="modal-product-image" id="modalProductImage" src="" alt="">
                <h2 class="modal-product-name" id="modalProductName"></h2>
                <p class="modal-product-inspired" id="modalProductInspired"></p>
                <p class="modal-product-description" id="modalProductDescription"></p>
                <div class="availability-indicator">
                    <div class="availability-dot"></div>
                    <span>Disponible - Entrega inmediata</span>
                </div>
            </div>
            
            <div class="sizes-section">
                <h3 class="section-title">Selecciona el tamaño</h3>
                <div class="sizes-grid" id="sizesGrid">
                    <!-- Los tamaños se generarán dinámicamente -->
                </div>
            </div>
            
            <div class="extras-section">
                <h3 class="section-title">Extras disponibles (puedes elegir ambos)</h3>
                <div class="extras-grid" id="extrasGrid">
                    <!-- Los extras se generarán dinámicamente -->
                </div>
            </div>
            
            <div class="price-summary">
                <div class="price-breakdown">
                    <span>Perfume (<span id="selectedSize">30ml</span>):</span>
                    <span>$<span id="basePrice">180</span></span>
                </div>
                <div id="extrasBreakdown">
                    <!-- Breakdown de extras se generará dinámicamente -->
                </div>
                <div class="price-breakdown total">
                    <span>Total:</span>
                    <span>$<span id="totalPrice">180</span></span>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-action btn-primary" onclick="addToCart()">
                    Agregar al Carrito
                </button>
                <button class="btn-action btn-secondary" onclick="contactForProduct()">
                    Consultar por WhatsApp
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

// Función para abrir el modal de producto
function openProductModal(producto) {
    productoSeleccionado = producto;
    
    // Crear modal si no existe
    if (!modalActual) {
        modalActual = createProductModal();
    }
    
    // Llenar información del producto
    document.getElementById('modalProductImage').src = producto.imagen;
    document.getElementById('modalProductName').textContent = producto.nombre;
    document.getElementById('modalProductInspired').textContent = producto.inspirado;
    document.getElementById('modalProductDescription').textContent = producto.descripcion;
    
    // Generar opciones de tamaño
    generateSizeOptions();
    
    // Generar opciones de extras
    generateExtraOptions();
    
    // Resetear selecciones
    tamañoSeleccionado = '30ml';
    extrasSeleccionados = [];
    
    // Actualizar precio
    updatePriceBreakdown();
    
    // Mostrar modal
    modalActual.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del fondo
}

// Función para cerrar el modal
function closeProductModal() {
    if (modalActual) {
        modalActual.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

// Función para generar opciones de tamaño
function generateSizeOptions() {
    const sizesGrid = document.getElementById('sizesGrid');
    sizesGrid.innerHTML = '';
    
    Object.entries(preciosConfig.tamaños).forEach(([tamaño, precio]) => {
        const sizeOption = document.createElement('div');
        sizeOption.className = `size-option ${tamaño === tamañoSeleccionado ? 'selected' : ''}`;
        sizeOption.onclick = () => selectSize(tamaño);
        
        sizeOption.innerHTML = `
            <div class="size-ml">${tamaño}</div>
            <div class="size-price">$${precio}</div>
        `;
        
        sizesGrid.appendChild(sizeOption);
    });
}

// Función para generar opciones de extras
function generateExtraOptions() {
    const extrasGrid = document.getElementById('extrasGrid');
    extrasGrid.innerHTML = '';
    
    const is10ml = tamañoSeleccionado === '10ml';
    
    Object.entries(preciosConfig.extras).forEach(([key, extra]) => {
        const isSelected = extrasSeleccionados.includes(key);
        
        const extraOption = document.createElement('div');
        extraOption.className = `extra-option ${isSelected ? 'selected' : ''}`;
        extraOption.onclick = () => toggleExtra(key);
        
        // Para 10ml, mostrar "Ya viene incluido" y permitir selección sin costo
        const priceText = is10ml ? 'Ya viene incluido' : `+$${extra.precio}`;
        const priceColor = is10ml ? '#00ff88' : '#ffd700';
        
        extraOption.innerHTML = `
            <div class="extra-info">
                <div class="extra-name">${extra.nombre}</div>
                <div class="extra-description">${extra.descripcion}</div>
                ${is10ml ? '<div class="extra-description" style="color: #00ff88;">Incluido sin costo adicional</div>' : ''}
            </div>
            <div class="extra-price" style="color: ${priceColor}">${priceText}</div>
        `;
        
        extrasGrid.appendChild(extraOption);
    });
}

// Función para verificar si un extra está disponible
function isExtraAvailable(extraKey) {
    // Todos los extras están disponibles para todos los tamaños
    // Para 10ml vienen incluidos sin costo, para 30ml+ tienen costo adicional
    return true;
}

// Función para seleccionar tamaño
function selectSize(tamaño) {
    tamañoSeleccionado = tamaño;
    
    // Actualizar UI de tamaños
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.closest('.size-option').classList.add('selected');
    
    // Mantener el extra seleccionado (ya que solo puede haber uno)
    // No necesitamos hacer nada especial aquí
    
    // Regenerar extras
    generateExtraOptions();
    
    // Actualizar precio
    updatePriceBreakdown();
}

// Función para alternar extras
function toggleExtra(extraKey) {
    const index = extrasSeleccionados.indexOf(extraKey);
    
    if (index > -1) {
        // Si ya está seleccionado, deseleccionarlo
        extrasSeleccionados.splice(index, 1);
    } else {
        // ACTUALIZADO: Permitir múltiples extras (doble fijador y feromonas)
        extrasSeleccionados.push(extraKey);
    }
    
    // Actualizar UI
    generateExtraOptions();
    updatePriceBreakdown();
}

// Función para actualizar el desglose de precios
function updatePriceBreakdown() {
    const basePrice = preciosConfig.tamaños[tamañoSeleccionado];
    const is10ml = tamañoSeleccionado === '10ml';
    let totalExtras = 0;
    
    // Actualizar precio base
    document.getElementById('selectedSize').textContent = tamañoSeleccionado;
    document.getElementById('basePrice').textContent = basePrice;
    
    // Generar desglose de extras
    const extrasBreakdown = document.getElementById('extrasBreakdown');
    extrasBreakdown.innerHTML = '';
    
    extrasSeleccionados.forEach(extraKey => {
        const extra = preciosConfig.extras[extraKey];
        const extraPrice = is10ml ? 0 : extra.precio; // No cobrar en 10ml
        totalExtras += extraPrice;
        
        const extraLine = document.createElement('div');
        extraLine.className = 'price-breakdown';
        extraLine.innerHTML = `
            <span>${extra.nombre}:</span>
            <span>${is10ml ? 'Incluido' : `+$${extraPrice}`}</span>
        `;
        extrasBreakdown.appendChild(extraLine);
    });
    
    // Actualizar precio total
    const totalPrice = basePrice + totalExtras;
    document.getElementById('totalPrice').textContent = totalPrice;
}

// Función para agregar al carrito (placeholder)
function addToCart() {
    const resumen = {
        producto: productoSeleccionado.nombre,
        tamaño: tamañoSeleccionado,
        extras: extrasSeleccionados.map(key => preciosConfig.extras[key].nombre),
        precioTotal: parseInt(document.getElementById('totalPrice').textContent)
    };
    
    // Aquí puedes implementar la lógica del carrito
    alert(`¡Producto agregado al carrito!\n\n${resumen.producto} - ${resumen.tamaño}\nExtras: ${resumen.extras.join(', ') || 'Ninguno'}\nTotal: $${resumen.precioTotal}`);
    
    closeProductModal();
}

// Función para contactar por WhatsApp
function contactForProduct() {
    const extras = extrasSeleccionados.map(key => preciosConfig.extras[key].nombre).join(' y ');
    const mensaje = `Hola! Me interesa el perfume "${productoSeleccionado.nombre}" en ${tamañoSeleccionado}${extras ? ` con ${extras}` : ''}. Precio total: $${document.getElementById('totalPrice').textContent}`;
    
    // Aquí puedes poner tu número de WhatsApp
    const numeroWhatsApp = '2721224946'; // Número actualizado de A&A Perfumería
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, '_blank');
    closeProductModal();
}

// Modificar la función existente de contacto para usar el modal
function contactarPorProducto(nombreProducto) {
    // Buscar el producto en el array
    const producto = productos.find(p => p.nombre === nombreProducto);
    if (producto) {
        openProductModal(producto);
    }
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('product-modal')) {
        closeProductModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalActual && modalActual.classList.contains('active')) {
        closeProductModal();
    }
});
// ===== SISTEMA DE CARRITO DE COMPRAS =====

// Variables del carrito
let carritoItems = [];
let entregaDomicilio = false;
let modalCarrito = null;

// Configuración de iconos del carrito
const iconosCarrito = {
    vacio: 'recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png',
    semiVacio: 'recursos/A&A/Material Grafico/Carrito_de_compras_SemiVacio.png',
    semiLleno: 'recursos/A&A/Material Grafico/Carrito_de_compras_Semilleno.png',
    lleno: 'recursos/A&A/Material Grafico/Carrito_de_compras_Lleno.png'
};

// Función para obtener el icono según la cantidad de items
function getCartIcon(cantidad) {
    if (cantidad === 0) return iconosCarrito.vacio;
    if (cantidad === 1) return iconosCarrito.semiVacio;
    if (cantidad <= 3) return iconosCarrito.semiLleno;
    return iconosCarrito.lleno;
}

// Función para actualizar el icono del carrito
function updateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    const cartCounter = document.getElementById('cartCounter');
    const cantidad = carritoItems.length;
    
    // Actualizar icono
    cartIcon.src = getCartIcon(cantidad);
    
    // Actualizar contador
    cartCounter.textContent = cantidad;
    
    if (cantidad > 0) {
        cartCounter.classList.add('visible');
        cartCounter.classList.add('bounce');
        setTimeout(() => cartCounter.classList.remove('bounce'), 600);
    } else {
        cartCounter.classList.remove('visible');
    }
}

// Función para agregar producto al carrito (modificar la existente)
function addToCart() {
    const extras = extrasSeleccionados.map(key => preciosConfig.extras[key].nombre);
    const is10ml = tamañoSeleccionado === '10ml';
    
    // Calcular precio
    const precioBase = preciosConfig.tamaños[tamañoSeleccionado];
    const precioExtras = is10ml ? 0 : extrasSeleccionados.length * 35;
    const precioTotal = precioBase + precioExtras;
    
    const item = {
        id: Date.now(), // ID único
        producto: productoSeleccionado.nombre,
        imagen: productoSeleccionado.imagen,
        inspirado: productoSeleccionado.inspirado,
        tamaño: tamañoSeleccionado,
        extras: extras,
        precioBase: precioBase,
        precioExtras: precioExtras,
        precioTotal: precioTotal,
        is10ml: is10ml
    };
    
    carritoItems.push(item);
    updateCartIcon();
    
    // Mostrar confirmación
    showAddToCartConfirmation(item);
    
    closeProductModal();
}

// Función para mostrar confirmación de agregado al carrito
function showAddToCartConfirmation(item) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00ff88, #00cc6a);
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        font-weight: bold;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px rgba(0,255,136,0.3);
    `;
    
    notification.innerHTML = `
        ✓ ${item.producto} agregado al carrito
    `;
    
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

// Función para crear el modal del carrito
function createCartModal() {
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.id = 'cartModal';
    
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-header">
                <h2 class="cart-title">
                    <img src="${iconosCarrito.vacio}" alt="Carrito" style="width: 30px; height: 30px;">
                    Mi Carrito
                </h2>
                <button class="cart-close" onclick="closeCartModal()">&times;</button>
            </div>
            
            <div id="cartContent">
                <!-- El contenido se generará dinámicamente -->
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

// Función para abrir el modal del carrito
function openCartModal() {
    if (!modalCarrito) {
        modalCarrito = createCartModal();
    }
    
    updateCartModalContent();
    modalCarrito.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal del carrito
function closeCartModal() {
    if (modalCarrito) {
        modalCarrito.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Función para actualizar el contenido del modal del carrito
function updateCartModalContent() {
    const cartContent = document.getElementById('cartContent');
    
    if (carritoItems.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <img class="cart-empty-icon" src="${iconosCarrito.vacio}" alt="Carrito vacío">
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algunos perfumes para comenzar</p>
            </div>
        `;
        return;
    }
    
    // Calcular totales
    const subtotal = carritoItems.reduce((sum, item) => sum + item.precioTotal, 0);
    const costoEntrega = entregaDomicilio ? 50 : 0;
    const total = subtotal + costoEntrega;
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${carritoItems.map(item => `
                <div class="cart-item">
                    <div class="cart-item-header">
                        <div class="cart-item-info">
                            <h4>${item.producto}</h4>
                            <div class="cart-item-details">
                                <div>${item.inspirado}</div>
                                <div><strong>Tamaño:</strong> ${item.tamaño}</div>
                                ${item.extras.length > 0 ? `<div><strong>Extra:</strong> ${item.extras.join(', ')} ${item.is10ml ? '(Incluido)' : '(+$' + item.precioExtras + ')'}</div>` : ''}
                            </div>
                        </div>
                        <div class="cart-item-price">$${item.precioTotal}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        Eliminar del carrito
                    </button>
                </div>
            `).join('')}
        </div>
        
        <div class="delivery-option ${entregaDomicilio ? 'selected' : ''}" onclick="toggleDelivery()">
            <div class="delivery-info">
                <strong>Entrega a domicilio</strong>
                <div style="font-size: 0.9rem; color: #bbb;">Recibe tu pedido en casa</div>
            </div>
            <div class="delivery-price">+$50</div>
        </div>
        
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Subtotal (${carritoItems.length} ${carritoItems.length === 1 ? 'producto' : 'productos'}):</span>
                <span>$${subtotal}</span>
            </div>
            ${entregaDomicilio ? `
                <div class="cart-summary-row">
                    <span>Entrega a domicilio:</span>
                    <span>$${costoEntrega}</span>
                </div>
            ` : ''}
            <div class="cart-summary-row total">
                <span>Total:</span>
                <span>$${total}</span>
            </div>
        </div>
        
        <div class="cart-actions">
            <button class="btn-cart-action btn-cart-primary" onclick="proceedToCheckout()">
                Proceder al Pago
            </button>
            <button class="btn-cart-action btn-cart-secondary" onclick="contactForCart()">
                Consultar por WhatsApp
            </button>
        </div>
    `;
}

// Función para eliminar producto del carrito
function removeFromCart(itemId) {
    carritoItems = carritoItems.filter(item => item.id !== itemId);
    updateCartIcon();
    updateCartModalContent();
    
    // Si el carrito queda vacío, actualizar el ícono del header
    if (carritoItems.length === 0) {
        const headerIcon = document.querySelector('.cart-title img');
        if (headerIcon) {
            headerIcon.src = iconosCarrito.vacio;
        }
    }
}

// Función para alternar entrega a domicilio
function toggleDelivery() {
    entregaDomicilio = !entregaDomicilio;
    updateCartModalContent();
}

// Función para proceder al pago (placeholder)
function proceedToCheckout() {
    const subtotal = carritoItems.reduce((sum, item) => sum + item.precioTotal, 0);
    const total = subtotal + (entregaDomicilio ? 50 : 0);
    
    alert(`¡Gracias por tu compra!\n\nResumen:\n${carritoItems.length} productos\nTotal: $${total}\n${entregaDomicilio ? 'Con entrega a domicilio' : 'Retiro en tienda'}\n\nTe contactaremos pronto para confirmar tu pedido.`);
    
    // Limpiar carrito
    carritoItems = [];
    updateCartIcon();
    closeCartModal();
}

// Función para contactar por WhatsApp con todo el carrito
function contactForCart() {
    const subtotal = carritoItems.reduce((sum, item) => sum + item.precioTotal, 0);
    const total = subtotal + (entregaDomicilio ? 50 : 0);
    
    let mensaje = `¡Hola! Me interesa hacer el siguiente pedido:\n\n`;
    
    carritoItems.forEach((item, index) => {
        mensaje += `${index + 1}. ${item.producto} - ${item.tamaño}\n`;
        if (item.extras.length > 0) {
            mensaje += `   Extra: ${item.extras.join(', ')} ${item.is10ml ? '(Incluido)' : ''}\n`;
        }
        mensaje += `   Precio: $${item.precioTotal}\n\n`;
    });
    
    mensaje += `Subtotal: $${subtotal}\n`;
    if (entregaDomicilio) {
        mensaje += `Entrega a domicilio: $50\n`;
    }
    mensaje += `Total: $${total}\n\n`;
    mensaje += entregaDomicilio ? 'Con entrega a domicilio' : 'Retiro en tienda';
    
    const numeroWhatsApp = '2721224946'; // Número actualizado de A&A Perfumería
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, '_blank');
    closeCartModal();
}

// Cerrar modal del carrito al hacer clic fuera
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('cart-modal')) {
        closeCartModal();
    }
});

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
});
// ===== CONFIG.JS - Configuración y Datos ===== 

// Configuración de precios y opciones
const CONFIG = {
    precios: {
        tamaños: {
            '10ml': 90,   // Ya incluye feromonas y doble fijador
            '30ml': 160,
            '60ml': 220,
            '100ml': 285
        },
        extras: {
            'feromonas': {
                nombre: 'Feromonas',
                descripcion: 'Atracción y magnetismo personal',
                precios: {
                    '10ml': 0,    // Ya incluido
                    '30ml': 35,
                    '60ml': 45,
                    '100ml': 50
                },
                disponibleDesde: '10ml'
            },
            'doble_fijador': {
                nombre: 'Doble Fijador',
                descripcion: 'Mayor duración y proyección',
                precios: {
                    '10ml': 0,    // Ya incluido
                    '30ml': 45,
                    '60ml': 60,
                    '100ml': 70
                },
                disponibleDesde: '10ml'
            }
        },
        entregaDomicilio: 50,
        notas: {
            '10ml': 'Ya incluye feromonas y doble fijador',
            '30ml': 'Extras opcionales disponibles',
            '60ml': 'Extras opcionales disponibles', 
            '100ml': 'Extras opcionales disponibles'
        }
    },
    
    iconos: {
        carrito: {
            vacio: 'recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png',
            semiVacio: 'recursos/A&A/Material Grafico/Carrito_de_compras_SemiVacio.png',
            semiLleno: 'recursos/A&A/Material Grafico/Carrito_de_compras_Semilleno.png',
            lleno: 'recursos/A&A/Material Grafico/Carrito_de_compras_Lleno.png'
        }
    },
    
    cartelones: [
        'recursos/A&A/Material Grafico/CartelonDamayCabellero.jpg',
        'recursos/A&A/Material Grafico/CartelonDePerdumesInspirados.jpg',
        'recursos/A&A/Material Grafico/CartelonDeUbicacionVariante1.jpg',
        'recursos/A&A/Material Grafico/CartelonDeUbicacionVriante2.jpg',
        'recursos/A&A/Material Grafico/CartelonDeUbicacionVriante3.jpg',
        'recursos/A&A/Material Grafico/CartelonMarcoPerfume.jpg',
        'recursos/A&A/Material Grafico/ParonamaDeLogoConRedesSociales.jpg',
        'recursos/A&A/Material Grafico/VistaProductoConContactos.jpg'
    ],
    
    whatsapp: {
        numero: '2721224946' // Número actualizado de A&A Perfumería
    },
    
    animaciones: {
        duracionCartelones: 800, // 8 segundos
        duracionNotificacion: 3000, // 3 segundos
        delayProductos: 100, // delay entre productos
        duracionModal: 300 // duración de animaciones de modal
    }
};
// Base de datos de productos - Perfumes A&A
const PRODUCTOS = [
    // PERFUMES PARA CABALLEROS
    {
        id: 1,
        nombre: "Abel",
        inspirado: "Inspirado en Boss Soul Hugo Boss",
        descripcion: "Elegante y sofisticado, perfecto para el caballero moderno.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Abel(Boss_Soul_Hugo_Boss).jpg"
    },
    {
        id: 2,
        nombre: "Abnes",
        inspirado: "Inspirado en Bleu de Chanel",
        descripcion: "Fresco y refinado, una fragancia atemporal.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Abnes(Blen_de_Chanel).jpg"
    },
    {
        id: 3,
        nombre: "Adamah",
        inspirado: "Inspirado en Invictus Paco Rabanne",
        descripcion: "Poderoso y victorioso, para hombres invencibles.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Adamah(Invictus_Paco_Rabanne).jpg"
    },
    {
        id: 4,
        nombre: "Alam",
        inspirado: "Inspirado en Acqua di Gio Profondo de Giorgio Armani",
        descripcion: "Acuático y profundo, como las aguas del mediterráneo.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Alam(Acqua_di_Gio_Profondo_de_Giorgio_Armani).jpg"
    },
    {
        id: 5,
        nombre: "Alberto",
        inspirado: "Inspirado en Black XS L'Excès Paco Rabanne",
        descripcion: "Intenso y rebelde, para hombres que rompen las reglas.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Alberto(Black_XS_L'Exces_Paco_Rabanne).jpg"
    },
    {
        id: 6,
        nombre: "Antonio",
        inspirado: "Inspirado en Phantom Paco Rabanne",
        descripcion: "Futurista y magnético, la fragancia del mañana.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Antonio(Phantom_Paco_Rabanne).jpg"
    },
    {
        id: 7,
        nombre: "Anuar",
        inspirado: "Inspirado en Gentleman 1974 de Givenchy",
        descripcion: "Clásico y distinguido, la esencia del caballero.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Anuar(Gentleman1974_de_Givenchy).jpg"
    },
    {
        id: 8,
        nombre: "Augusto",
        inspirado: "Inspirado en Acqua Di Gio Armani",
        descripcion: "Fresco y mediterráneo, como una brisa marina.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Augusto(Acqua_Di_Gio_Armani).jpg"
    },
    {
        id: 9,
        nombre: "Bruno",
        inspirado: "Inspirado en Legend Montblanc",
        descripcion: "Legendario y carismático, para hombres excepcionales.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Bruno(Legend_Montblanc).jpg"
    },
    {
        id: 10,
        nombre: "Cristian",
        inspirado: "Inspirado en One Million Paco Rabanne",
        descripcion: "Dorado y seductor, vale un millón.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Cristian(One_Million_Paco_Rabanne).jpg"
    },
    {
        id: 11,
        nombre: "Cucho",
        inspirado: "Inspirado en Imagination Louis Vuitton",
        descripcion: "Creativo y visionario, sin límites para la imaginación.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Cucho(Imagination_Louis_Vuitton).jpg"
    },
    {
        id: 12,
        nombre: "Duke",
        inspirado: "Inspirado en Valentino Uomo Born In Roma De Valentino",
        descripcion: "Romano y elegante, nacido para conquistar.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Duke(Valentino_Uomo_Born_In_Roma_De_Valentino).jpg"
    },
    {
        id: 13,
        nombre: "Eduardo",
        inspirado: "Inspirado en L'Immensité Louis Vuitton",
        descripcion: "Infinito y majestuoso, como la inmensidad del universo.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Eduardo(L'Immensite_Louis_Vuitton).jpg"
    },
    {
        id: 14,
        nombre: "Ernesto",
        inspirado: "Inspirado en The Most Wanted Azzaro",
        descripcion: "El más buscado, irresistiblemente atractivo.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Ernesto(The_Most_Wanted_Azzaro).jpg"
    },
    {
        id: 15,
        nombre: "Fidencio",
        inspirado: "Inspirado en Le Beau De Jean Paul Gaultier",
        descripcion: "Hermoso y seductor, la belleza masculina.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Fidencio(Le_Bean_De_Jean_Paul_Gaultier).jpg"
    },
    {
        id: 16,
        nombre: "Gabriel",
        inspirado: "Inspirado en Aventus Creed",
        descripcion: "Aventurero y noble, para conquistadores modernos.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Gabriel(Aventus_Creed).jpg"
    },
    {
        id: 17,
        nombre: "General",
        inspirado: "Inspirado en Asad de Lattafa",
        descripcion: "Fuerte y dominante, como un verdadero líder.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/General(Asad_de_lattafa).jpg"
    },
    {
        id: 18,
        nombre: "Genesis",
        inspirado: "Inspirado en CK One Calvin Klein",
        descripcion: "El origen de todo, fresco y universal.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Genesis(CK_One_Calvin_Klein).jpg"
    },
    {
        id: 19,
        nombre: "Irving",
        inspirado: "Inspirado en Versace Eros",
        descripcion: "Apasionado y seductor, como el dios del amor.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Irving(Versace_Eros).jpg"
    },
    {
        id: 20,
        nombre: "Ismael",
        inspirado: "Inspirado en Oud Wood Tom Ford",
        descripcion: "Maderoso y exótico, con notas orientales cautivadoras.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Ismael(Oud_Wood_Tom_Ford).jpg"
    },
    {
        id: 21,
        nombre: "Israel",
        inspirado: "Inspirado en Dolce&Gabbana Classic",
        descripcion: "Clásico italiano, elegancia mediterránea.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Israel(Dolce&Gabbana_Classic).jpg"
    },
    {
        id: 22,
        nombre: "Ithan",
        inspirado: "Inspirado en The Most Wanted Intense De Azzaro",
        descripcion: "Intensamente deseado, magnetismo puro.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Ithan(The_Most_Wanted_Intense_De_Azzaro).jpg"
    },
    {
        id: 23,
        nombre: "Ivan",
        inspirado: "Inspirado en Bleu de Chanel EDP de Parfum",
        descripcion: "Azul profundo, sofisticación francesa.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Ivan(Blen_de_Chanel_EAN_de_Parfum).jpg"
    },
    {
        id: 24,
        nombre: "Jose",
        inspirado: "Inspirado en Wanted Azzaro",
        descripcion: "Buscado y deseado, rebelde con causa.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Jose(Wanted_Azzaro).jpg"
    },
    {
        id: 25,
        nombre: "Luis",
        inspirado: "Inspirado en Le Male Le Parfum Jean Paul Gaultier",
        descripcion: "Masculino y seductor, el perfume del hombre.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Luis(Le_Male_Le_Parfum_Jean_Paul_Gaultier).jpg"
    },
    {
        id: 26,
        nombre: "Mandingo",
        inspirado: "Inspirado en Terre D'Hermès",
        descripcion: "Terroso y mineral, conectado con la naturaleza.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Mandingo(Terre_D'Hermes).jpg"
    },
    {
        id: 27,
        nombre: "Marco",
        inspirado: "Inspirado en Santal 33 Le Labo",
        descripcion: "Sándalo cremoso, sofisticación neoyorquina.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Marco(Santal_33_Le_Lobo).jpg"
    },
    {
        id: 28,
        nombre: "Mateo",
        inspirado: "Inspirado en Blue Lacoste",
        descripcion: "Deportivo y fresco, como una victoria en la cancha.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Mateo(Blue_Lacoste).jpg"
    },
    {
        id: 29,
        nombre: "Milton",
        inspirado: "Inspirado en Toy Boy EAU de Parfum Moschino",
        descripcion: "Juguetón y moderno, para hombres que se divierten.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Milton(Toy_Boy_EAU_de_Parfum_Moschino).jpg"
    },
    {
        id: 30,
        nombre: "Pedro",
        inspirado: "Inspirado en One Million Lucky Paco Rabanne",
        descripcion: "Afortunado y dorado, la suerte hecha fragancia.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Pedro(One_Million_Lucky_Paco_Rabanne).jpg"
    },
    {
        id: 31,
        nombre: "Rioga",
        inspirado: "Inspirado en Club de Nuit Armaf",
        descripcion: "Nocturno y misterioso, para noches inolvidables.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Rioga(Club_de_nuit,_Armaf).jpg"
    },
    {
        id: 32,
        nombre: "Tomas",
        inspirado: "Inspirado en Rouge Lacoste",
        descripcion: "Rojo pasión, energía deportiva.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Tomas(Rouge_Lacoste).jpg"
    },
    {
        id: 33,
        nombre: "Toy",
        inspirado: "Inspirado en MYSLF Yves Saint Laurent",
        descripcion: "Auténtico y personal, sé tú mismo.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Toy(MYSLF_Yves_Saint_Laurent).jpg"
    },
    {
        id: 34,
        nombre: "Yamil",
        inspirado: "Inspirado en Sauvage Elixir Dior",
        descripcion: "Salvaje y concentrado, poder en estado puro.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Yamil(Sauvage_Elixir_Dior).jpg"
    },

    // PERFUMES PARA DAMAS
    {
        id: 35,
        nombre: "Adele",
        inspirado: "Inspirado en Chance Chanel",
        descripcion: "Elegante y sofisticada, una fragancia que marca presencia.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Adele(Chance_Chanel).jpg"
    },
    {
        id: 36,
        nombre: "Adelita",
        inspirado: "Inspirado en Born In Roma Valentino",
        descripcion: "Moderna y audaz, perfecta para la mujer contemporánea.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Adelita(Born_In_Roma_Valentino).jpg"
    },
    {
        id: 37,
        nombre: "Alondra",
        inspirado: "Inspirado en Bade'e AI Oud Honor&Glory Lattafa",
        descripcion: "Exótica y misteriosa, con notas orientales cautivadoras.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Alondra(Bade'e_AI_Oud_Honor&Glory_Lattafa).jpg"
    },
    {
        id: 38,
        nombre: "Angelica",
        inspirado: "Inspirado en Yara Moi de Lattafa",
        descripcion: "Dulce y envolvente, una fragancia que enamora.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Angelica(Yara_Moi_de_Lattafa).jpg"
    },
    {
        id: 39,
        nombre: "Anina",
        inspirado: "Inspirado en Light Blue Dolce&Gabbana",
        descripcion: "Fresca y mediterránea, perfecta para el verano.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Anina(Light_Blue_Dolce&Gabbana).jpg"
    },
    {
        id: 40,
        nombre: "Blanca",
        inspirado: "Inspirado en Good Girl Blush Carolina Herrera",
        descripcion: "Seductora y femenina, una fragancia irresistible.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Blanca(Good_Girl_Blush_EAN_Carolina_Herrera).jpg"
    },
    {
        id: 41,
        nombre: "Diana",
        inspirado: "Inspirado en Kenzo Flower",
        descripcion: "Floral y delicada, como un jardín en primavera.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Diana(Kenzo_Flower).jpg"
    },
    {
        id: 42,
        nombre: "Dolores",
        inspirado: "Inspirado en Scandal Jean Paul Gaultier",
        descripcion: "Provocativa y sensual, para mujeres que no pasan desapercibidas.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Dolores(Scandal_Jean_Paul_Gaultier).jpg"
    },
    {
        id: 43,
        nombre: "Eaned",
        inspirado: "Inspirado en Ralph Laurent",
        descripcion: "Clásica y refinada, una fragancia atemporal.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Eaned(Ralph_Laurent).jpg"
    },
    {
        id: 44,
        nombre: "Esther",
        inspirado: "Inspirado en Khamrah Qahwa de Lattafa",
        descripcion: "Rica y especiada, con notas de café y especias orientales.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Esther(Khamrah_Qahwa_de_Lattafa).jpg"
    },
    {
        id: 45,
        nombre: "Inani",
        inspirado: "Inspirado en Miss Dior",
        descripcion: "Romántica y elegante, la esencia de la feminidad.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Inani(Miss_Dior_Dior).jpg"
    },
    {
        id: 46,
        nombre: "Ivane",
        inspirado: "Inspirado en Sweet like Candy Ariana Grande",
        descripcion: "Dulce y juguetona, perfecta para mujeres jóvenes y divertidas.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Ivane(Sweed_like_Candy_Ariana_Grande).jpg"
    },
    {
        id: 47,
        nombre: "Judith",
        inspirado: "Inspirado en Yara De Lattafa",
        descripcion: "Intensa y cautivadora, una fragancia que deja huella.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Judith(Yara_De_Lattafa).jpg"
    },
    {
        id: 48,
        nombre: "Knoz",
        inspirado: "Inspirado en Cloud Ariana Grande",
        descripcion: "Suave y etérea, como caminar entre nubes.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Knoz(Cloud_Ariana_Grande).jpg"
    },
    {
        id: 49,
        nombre: "Martha",
        inspirado: "Inspirado en Chanel No5",
        descripcion: "Icónica y legendaria, la fragancia más famosa del mundo.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Martha(Chanel_No5).jpg"
    },
    {
        id: 50,
        nombre: "Nahomi",
        inspirado: "Inspirado en Halloween",
        descripcion: "Misteriosa y seductora, perfecta para noches especiales.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Nahomi(Hallowen).jpg"
    },
    {
        id: 51,
        nombre: "Olimpia",
        inspirado: "Inspirado en Libre Yves Saint Laurent",
        descripcion: "Libre y audaz, para mujeres que viven sin límites.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Olimpia(Libre_EAN_Parfum_Yves_Saint_Laurent).jpg"
    },
    {
        id: 52,
        nombre: "Rosa",
        inspirado: "Inspirado en Rock In Rio Escada",
        descripcion: "Vibrante y energética, perfecta para festivales y celebraciones.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Rosa(Rock_In_Rio_Escada).jpg"
    },
    {
        id: 53,
        nombre: "Sarai",
        inspirado: "Inspirado en Can Can Paris Hilton",
        descripcion: "Glamorosa y sofisticada, para mujeres que aman brillar.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Sarai(Can_Can_Paris_Hilton).jpg"
    },
    {
        id: 54,
        nombre: "Sofia",
        inspirado: "Inspirado en Meow Katy Perry",
        descripcion: "Divertida y coqueta, perfecta para mujeres con personalidad.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Sofia(Meow_Katy_perry).jpg"
    },
    {
        id: 55,
        nombre: "Tamara",
        inspirado: "Inspirado en 212 Clásico Carolina Herrera",
        descripcion: "Urbana y moderna, la fragancia de la mujer cosmopolita.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Tamara(212_Clasico_Carolina_Herrera).jpg"
    },
    {
        id: 56,
        nombre: "Yadira",
        inspirado: "Inspirado en Thank You Next Ariana Grande",
        descripcion: "Empoderada y segura, para mujeres que siguen adelante.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yadira(Thank_You_Next_Ariana_Grande).jpg"
    },
    {
        id: 57,
        nombre: "Yatae",
        inspirado: "Inspirado en Coco Mademoiselle de Chanel",
        descripcion: "Elegante y rebelde, la fragancia de la mujer independiente.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yatae(Coco_Mademoiselle_de_Chanel).jpg"
    },
    {
        id: 58,
        nombre: "Yesenia",
        inspirado: "Inspirado en Olympèa Paco Rabanne",
        descripcion: "Divina y poderosa, como una diosa moderna.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yesenia(Olympèa_PacoRabanne).jpg"
    }
];
// Estados globales de la aplicación
const STATE = {
    categoriaActual: 'todos',
    tamañoSeleccionado: '30ml',
    extrasSeleccionados: [],
    productoSeleccionado: null,
    carritoItems: [],
    entregaDomicilio: false,
    isAnimating: false,
    modalActual: null,
    modalCarrito: null
};

// Exportar para uso global (si es necesario)
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
    window.PRODUCTOS = PRODUCTOS;
    window.STATE = STATE;
}
// Función para crear copos de nieve
function createSnowflake() {
    const snowContainer = document.querySelector('.snow-container');
    const snowflake = document.createElement('div');
    
    // Diferentes símbolos de nieve
    const snowSymbols = ['❄', '❅', '❆', '✻', '✼', '❋'];
    const randomSymbol = snowSymbols[Math.floor(Math.random() * snowSymbols.length)];
    
    snowflake.innerHTML = randomSymbol;
    snowflake.className = 'snowflake';
    
    // Posición aleatoria horizontal
    snowflake.style.left = Math.random() * 100 + '%';
    
    // Tamaño aleatorio
    const size = Math.random() * 0.8 + 0.5; // Entre 0.5 y 1.3
    snowflake.style.fontSize = size + 'em';
    
    // Duración de caída aleatoria
    const duration = Math.random() * 8 + 5; // Entre 5 y 13 segundos
    snowflake.style.animationDuration = duration + 's';
    
    // Retraso aleatorio
    const delay = Math.random() * 2;
    snowflake.style.animationDelay = delay + 's';
    
    // Opacidad aleatoria
    const opacity = Math.random() * 0.6 + 0.4; // Entre 0.4 y 1
    snowflake.style.opacity = opacity;
    
    snowContainer.appendChild(snowflake);
    
    // Eliminar el copo después de que termine la animación
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, (duration + delay) * 1000);
}

// Función para inicializar la nieve
function initSnow() {
    // Crear copos iniciales
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createSnowflake();
        }, Math.random() * 5000);
    }
    
    // Continuar creando copos cada cierto tiempo
    setInterval(() => {
        createSnowflake();
    }, 200);
}

// Función para agregar efectos de sonido navideño (opcional)
function addChristmasAmbience() {
    // Agregar un sutil efecto de brillo a las estrellas cuando se hace clic
    document.addEventListener('click', function(e) {
        // Crear un efecto de brillo temporal
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.background = 'radial-gradient(circle, #fffacd, transparent)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        sparkle.style.zIndex = '1000';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    });
}

// Agregar animación de brillo
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar todo cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    initSnow();
    addChristmasAmbience();
    
    // Mensaje de bienvenida en consola
    console.log('🎄 ¡Feliz Navidad! El árbol mágico está listo 🎄');
});

// Optimización para dispositivos móviles
if (window.innerWidth <= 768) {
    // Reducir la cantidad de nieve en móviles para mejor rendimiento
    const originalInterval = 200;
    const mobileInterval = 400;
    
    // Ajustar la creación de copos para móviles
    setInterval(() => {
        if (Math.random() > 0.5) { // 50% de probabilidad
            createSnowflake();
        }
    }, mobileInterval);
}
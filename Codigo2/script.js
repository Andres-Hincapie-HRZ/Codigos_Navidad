// Autor: Andrés Hincapie Ruiz (A.HRZ)
// Fecha de creación: 24 de diciembre de 2024
// Programa: Interacción simplificada de imágenes navideñas

// Espero a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtengo referencias a los elementos
    const image4 = document.getElementById('image4');
    const image5 = document.getElementById('image5');
    const christmasCard = document.getElementById('christmas-card');
    const confettiContainer = document.getElementById('confetti-container');

    // Añado pulso inicial a la primera imagen
    image4.classList.add('gift-pulse');

    // Función para crear confeti/serpentina
    function createConfetti() {
        // Limpio confeti anterior
        confettiContainer.innerHTML = '';
        
        // Creo 50 partículas de confeti
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confettiContainer.appendChild(confetti);
        }

        // Creo 20 serpentinas
        for (let i = 0; i < 20; i++) {
            const streamer = document.createElement('div');
            streamer.classList.add('streamer');
            streamer.style.left = Math.random() * 100 + '%';
            streamer.style.animationDelay = Math.random() * 1.5 + 's';
            confettiContainer.appendChild(streamer);
        }

        // Limpio después de 6 segundos
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 6000);
    }

    // Función principal: abrir regalo y mostrar carta inmediatamente
    function openGiftAndShowCard() {
        // Quito el pulso y añado animación de apertura
        image4.classList.remove('gift-pulse');
        image4.classList.add('gift-opening');
        
        // Creo el efecto de confeti
        createConfetti();
        
        // Después de 1 segundo, muestro el regalo abierto
        setTimeout(() => {
            image4.classList.remove('active');
            image4.classList.add('hidden');
            image5.classList.remove('hidden');
            image5.classList.add('active', 'gift-revealed');
            
            // Inmediatamente muestro la carta
            showChristmasCard();
        }, 1000);
    }

    // Función para mostrar la carta de Navidad
    function showChristmasCard() {
        // Muevo la imagen 2 hacia abajo
        image5.classList.add('gift-move-down');
        
        // Muestro la carta saliendo desde la imagen
        christmasCard.classList.remove('hidden');
        setTimeout(() => {
            christmasCard.style.opacity = '1';
        }, 10);
    }

    // Función para volver al inicio con animación de carta entrando a la caja
    function resetToStart() {
        // Añado animación de la carta entrando de vuelta a la caja
        const cardContent = christmasCard.querySelector('.card-content');
        cardContent.classList.add('card-return-to-gift');
        
        setTimeout(() => {
            christmasCard.style.opacity = '0';
            setTimeout(() => {
                christmasCard.classList.add('hidden');
                cardContent.classList.remove('card-return-to-gift');
                
                // Oculto la segunda imagen y quito todas las clases de animación
                image5.classList.remove('active', 'gift-revealed', 'gift-move-down');
                image5.classList.add('hidden');
                
                // Muestro la primera imagen con pulso
                image4.classList.remove('hidden', 'gift-opening');
                image4.classList.add('active', 'gift-pulse');
            }, 300);
        }, 800);
    }

    // Event listeners para las interacciones
    image4.addEventListener('click', openGiftAndShowCard);
    
    // Clic en la segunda imagen (regalo abierto) para volver al inicio
    image5.addEventListener('click', resetToStart);
    
    // Clic en la carta para volver al inicio
    christmasCard.addEventListener('click', resetToStart);
});
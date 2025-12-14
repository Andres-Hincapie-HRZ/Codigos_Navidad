const card = document.getElementById('christmasCard');
let isOpen = false;

card.addEventListener('click', function () {
    isOpen = !isOpen;
    if (isOpen) {
        card.classList.add('open');
        createChristmasConfetti();
    } else {
        card.classList.remove('open');
    }
});

function createChristmasConfetti() {
    // Colores azules navideños
    const colors = ['#1e3c72', '#2a5298', '#4a90e2', '#74b9ff', '#0984e3', '#6c5ce7'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = '1';
            confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear`;
            confetti.style.zIndex = '1000';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Agregar nieve de fondo (opcional)
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.style.position = 'fixed';
    snowflake.style.top = '-10px';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.color = 'rgba(255, 255, 255, 0.8)';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear`;
    snowflake.style.pointerEvents = 'none';
    snowflake.style.zIndex = '1';
    document.body.appendChild(snowflake);

    setTimeout(() => snowflake.remove(), 5000);
}

// Crear copos de nieve cada cierto tiempo
setInterval(createSnowflake, 300);
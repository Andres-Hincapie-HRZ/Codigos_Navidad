# 🌟 Árbol de Navidad 3D Mágico

## Descripción
Árbol de Navidad 3D creado con CSS puro, sin librerías externas. Presenta 100 estrellas flotantes en el espacio 3D con nieve cayendo y efectos interactivos al hacer clic.

## Características
- 🌟 100 estrellas en 3D con rotación y posiciones aleatorias
- ❄️ Nieve cayendo con diferentes símbolos (❄, ❅, ❆, ✻, ✼, ❋)
- ✨ Efecto de brillo al hacer clic en cualquier parte
- 🎨 Gradiente de fondo azul navideño
- 📱 Optimización para dispositivos móviles
- 🎄 Título navideño con mensaje

## Tecnologías
- HTML5
- CSS3 (Transformaciones 3D, variables CSS)
- JavaScript vanilla

## Cómo usar
1. Abre `index.html` en tu navegador
2. Observa las estrellas flotando en 3D
3. Haz clic en cualquier parte para crear efectos de brillo
4. Disfruta de la nieve cayendo

## Características técnicas
- **Estrellas**: 100 elementos con propiedades CSS custom (--rox, --roy, --roz, --sf)
- **Animación 3D**: Rotación continua en múltiples ejes
- **Nieve**: Generación dinámica con JavaScript
- **Optimización móvil**: Reducción de copos de nieve en pantallas pequeñas

## Archivos
- `index.html` - Estructura con 100 estrellas pre-generadas
- `styles.css` - Estilos y animaciones 3D
- `script.js` - Generación de nieve y efectos interactivos

## Personalización
Puedes modificar:
- Cantidad de nieve ajustando el intervalo en `script.js`
- Colores del gradiente de fondo en `styles.css`
- Velocidad de rotación de las estrellas
- Símbolos de nieve en el array `snowSymbols`

## Rendimiento
- Optimizado para móviles con menos partículas
- Limpieza automática de elementos DOM
- Animaciones CSS hardware-accelerated

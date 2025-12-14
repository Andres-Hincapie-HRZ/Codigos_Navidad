# 🎄 Árbol de Navidad 3D Interactivo

## Descripción
Árbol de Navidad 3D completamente interactivo creado con Three.js. Incluye adornos brillantes, estrella dorada, nieve cayendo y efectos de iluminación realistas. Puedes rotar el árbol con el mouse o touch.

## Características
- 🌲 Árbol 3D con textura realista y forma irregular
- ⭐ Estrella dorada en la punta con luz propia
- 🔴🔵⚪🩷 Adornos de colores (rojo, azul, blanco, fucsia) con patrón específico
- ❄️ Efecto de nieve cayendo con movimiento ondulatorio
- 💡 Sistema de iluminación con luces de colores parpadeantes
- ✨ Partículas decorativas en el árbol
- 🖱️ Control interactivo con mouse y touch
- 📱 Compatible con dispositivos móviles

## Tecnologías
- HTML5
- CSS3
- JavaScript
- Three.js r128 (WebGL)

## Cómo usar
1. Abre `index.html` en tu navegador
2. Arrastra con el mouse para rotar el árbol
3. En móviles, usa gestos táctiles para rotar
4. Disfruta de las animaciones automáticas

## Características técnicas
- **Geometría**: Cono con 32 segmentos + irregularidades aleatorias
- **Materiales**: Phong con texturas, normal maps y displacement maps
- **Iluminación**: SpotLight principal + 20 PointLights de colores + luz ambiental
- **Partículas**: 15,000 partículas decorativas + 1,500 copos de nieve
- **Adornos**: 8 niveles con patrón de colores específico

## Controles
- **Mouse**: Click y arrastra para rotar
- **Touch**: Toca y arrastra en dispositivos móviles
- **Auto-rotación**: El árbol gira lentamente de forma automática

## Optimización
- Texturas cargadas desde CDN
- Blending aditivo para efectos de luz
- Depth write desactivado en partículas transparentes
- Responsive design que se adapta al tamaño de ventana

## Autor
Andrés Hincapie Ruiz (A.HRZ)
Fecha: 24 de diciembre de 2024

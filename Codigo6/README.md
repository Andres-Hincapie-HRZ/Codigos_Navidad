# 🎵 Reproductor Navideño React

## Descripción
Aplicación React moderna con tema navideño que incluye un reproductor de música de YouTube, nieve animada, imagen de árbol de Navidad y controles de reproducción completos.

## Características
- 🎵 Reproductor de YouTube integrado con controles
- ▶️ Botón Play/Pause con iconos SVG
- ⏹️ Botón Stop
- 🔊 Control de volumen con slider (0-100%)
- ❄️ 50 copos de nieve animados cayendo
- 🎄 Imagen de árbol de Navidad con animación flotante
- 🎨 Diseño glassmorphism moderno
- 📱 Responsive design

## Tecnologías
- React 18.2.0
- Vite 5.0.8
- react-youtube 10.1.0
- CSS3 (Animaciones y efectos)

## Instalación

```bash
cd Codigo6
npm install
```

## Ejecución

```bash
npm run dev
```

El proyecto se abrirá en `http://localhost:5173`

## Estructura del proyecto

```
Codigo6/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos
│   └── main.jsx         # Punto de entrada
├── index.html           # HTML base
├── package.json         # Dependencias
└── vite.config.js       # Configuración de Vite
```

## Características del reproductor
- **Play/Pause**: Controla la reproducción de la música
- **Stop**: Detiene completamente la reproducción
- **Volumen**: Ajusta el volumen de 0 a 100%
- **Indicador de estado**: Muestra si está reproduciendo o pausado
- **Loop automático**: La canción se repite automáticamente

## Canción incluida
- Video ID de YouTube: `lJawRaON8h0`
- Puedes cambiar el video modificando el `videoId` en `App.jsx`

## Personalización

### Cambiar la canción
En `App.jsx`, modifica:
```javascript
videoId="lJawRaON8h0"  // Reemplaza con tu video ID
```

### Cambiar la imagen del árbol
Coloca tu imagen en la carpeta `public/` con el nombre `arbol.png`

### Ajustar cantidad de nieve
En `App.jsx`, modifica:
```javascript
const flakes = Array.from({ length: 50 }, ...)  // Cambia 50 por el número deseado
```

## Iconos SVG incluidos
- 🎵 Nota musical
- ▶️ Play (triángulo)
- ⏸️ Pause (dos barras)
- ⏹️ Stop (cuadrado)
- 🔊 Volumen (altavoz)

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Requisitos
- Node.js 16+ 
- npm o yarn

## Build para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## Notas
- La imagen `arbol.png` debe estar en la carpeta `public/`
- El reproductor de YouTube está oculto visualmente pero funcional
- Los controles son completamente funcionales y estilizados

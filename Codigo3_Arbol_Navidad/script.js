 // Configuro la escena, cámara y renderizador básicos
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Establezco el fondo negro para la escena
        scene.background = new THREE.Color(0x000000);

        // Creo la geometría del árbol con forma de cono
        const segments = 32;
        const treeGeometry = new THREE.ConeGeometry(2.5, 7, segments);
        const positionAttribute = treeGeometry.attributes.position;

        // Añado irregularidades sutiles al árbol para hacerlo más realista
        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);
            const z = positionAttribute.getZ(i);
            
            if (y < 3.4) {
                positionAttribute.setX(i, x + (Math.random() - 0.5) * 0.15);
                positionAttribute.setZ(i, z + (Math.random() - 0.5) * 0.15);
            }
        }

        // Configuro el material del árbol con texturas y efectos
        const treeMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a472a,  // Verde oscuro natural
            shininess: 3,
            roughness: 1,
            transparent: true,
            opacity: 0.98,
            // Cargo texturas para dar realismo al árbol
            map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/terrain/grasslight-big.jpg'),
            normalMap: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/terrain/grasslight-big-nm.jpg'),
            displacementMap: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/terrain/grasslight-big-nm.jpg'),
            displacementScale: 0.1,
            displacementBias: -0.03
        });

        // Creo el mesh del árbol y lo añado a un grupo
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);
        const treeGroup = new THREE.Group();
        scene.add(treeGroup);
        treeGroup.add(tree);

        // Defino la geometría y materiales para los adornos
        const ornamentGeometry = new THREE.SphereGeometry(0.15, 32, 32);
        const ornamentMaterials = [
            // Material rojo brillante
            new THREE.MeshPhongMaterial({ 
                color: 0xff0000,
                shininess: 150,
                emissive: 0xff0000,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.9
            }),
            // Material azul brillante
            new THREE.MeshPhongMaterial({ 
                color: 0x00ffff,
                shininess: 150,
                emissive: 0x00ffff,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.9
            }),
            // Material blanco brillante
            new THREE.MeshPhongMaterial({ 
                color: 0xffffff,
                shininess: 150,
                emissive: 0xffffff,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.9
            }),
            // Material fucsia brillante
            new THREE.MeshPhongMaterial({ 
                color: 0xFF1493,
                shininess: 150,
                emissive: 0xFF1493,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.9
            })
        ];

        // Función para crear y distribuir los adornos en el árbol
        function createOrnaments() {
            const ornaments = [];
            const levels = 8; 
            
            // Patrones actualizados incluyendo el color fucsia ('pink')
            const levelPatterns = [
                ['white', 'red', 'blue', 'pink'], // Superior
                ['red', 'blue', 'white', 'pink', 'red'],
                ['blue', 'pink', 'red', 'white', 'blue', 'pink'],
                ['pink', 'white', 'blue', 'red', 'pink', 'white'],
                ['red', 'blue', 'pink', 'white', 'red', 'blue', 'pink'],
                ['blue', 'pink', 'white', 'red', 'blue', 'pink', 'white'],
                ['pink', 'red', 'blue', 'white', 'pink', 'red', 'blue'],
                ['white', 'pink', 'red', 'blue', 'white', 'pink', 'red', 'blue'] // Inferior
            ];

            for(let level = 0; level < levels; level++) {
                const y = 3 - (level * 0.85); // Ajuste del espaciado vertical
                const pattern = levelPatterns[level];
                const radius = 0.4 + (level * 0.35); 
                
                for(let i = 0; i < pattern.length; i++) {
                    let materialIndex;
                    switch(pattern[i]) {
                        case 'red': materialIndex = 0; break;
                        case 'blue': materialIndex = 1; break;
                        case 'white': materialIndex = 2; break;
                        case 'pink': materialIndex = 3; break;
                    }
                    
                    const ornament = new THREE.Mesh(ornamentGeometry, ornamentMaterials[materialIndex]);
                    
                    const angle = (i / pattern.length) * Math.PI * 2 + (level % 2 ? 0 : Math.PI / pattern.length);
                    
                    ornament.position.set(
                        radius * Math.cos(angle),
                        y,
                        radius * Math.sin(angle)
                    );
                    
                    ornament.lookAt(new THREE.Vector3(0, y, 0));
                    
                    const ornamentLight = new THREE.PointLight(
                        ornamentMaterials[materialIndex].color,
                        0.4,  // Aumentado de 0.3 a 0.4
                        0.6   // Aumentado de 0.4 a 0.6
                    );
                    ornamentLight.position.copy(ornament.position);
                    
                    treeGroup.add(ornament);
                    treeGroup.add(ornamentLight);
                    ornaments.push(ornament);
                }
            }
            return ornaments;
        }

        // Creo los adornos
        const ornaments = createOrnaments();

        // Función para crear la estrella en la punta del árbol
        function createStar() {
            const starShape = new THREE.Shape();
            const points = 5;
            const outerRadius = 0.5;
            const innerRadius = 0.2;
            
            for(let i = 0; i < points * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i / (points * 2)) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                if(i === 0) starShape.moveTo(x, y);
                else starShape.lineTo(x, y);
            }
            
            const geometry = new THREE.ExtrudeGeometry(starShape, {
                depth: 0.1,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.02,
                bevelSegments: 3
            });
            
            const material = new THREE.MeshPhongMaterial({ 
                color: 0xFFD700,
                emissive: 0xFFD700,
                emissiveIntensity: 0.6,
                shininess: 100,
                metalness: 0.5
            });
            
            const star = new THREE.Mesh(geometry, material);
            
            // Añadir luz a la estrella
            const starLight = new THREE.PointLight(0xFFD700, 2, 3);
            star.add(starLight);
            
            star.rotation.z = Math.PI / 2;
            return star;
        }

        // Coloco la estrella en la punta del árbol
        const star = createStar();
        star.position.y = 4;
        treeGroup.add(star);

        // Añado luces alrededor del árbol
        const colors = [0xff0000, 0x00ffff, 0xffffff, 0xFFD700];
        for(let i = 0; i < 20; i++) {
            const light = new THREE.PointLight(colors[i % colors.length], 0.5, 2.0); // Aumentado intensidad y rango
            const angle = (i / 20) * Math.PI * 2;
            const height = (i / 20) * 5 - 2;
            const radius = 1.8;
            
            light.position.set(
                radius * Math.cos(angle),
                height,
                radius * Math.sin(angle)
            );
            treeGroup.add(light);
        }

        // Configuro la iluminación general de la escena
        const mainLight = new THREE.SpotLight(0xFFFFFF, 0.8);
        mainLight.position.set(10, 10, 10);
        mainLight.angle = Math.PI / 4;
        mainLight.penumbra = 0.2;
        mainLight.decay = 1.5;
        mainLight.distance = 150;
        scene.add(mainLight);

        // Añado luz ambiental para iluminación general
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        scene.add(ambientLight);

        // Posiciono la cámara
        camera.position.z = 10;

        // Configuro el control interactivo con el mouse y touch
        let isDragging = false;
        let previousX = 0;
        let previousY = 0;

        // Eventos para interacción con mouse
        document.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousX = e.clientX;
            previousY = e.clientY;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousX;
                const deltaY = e.clientY - previousY;
                
                treeGroup.rotation.y += deltaX * 0.01;
                treeGroup.rotation.x += deltaY * 0.01;
                
                previousX = e.clientX;
                previousY = e.clientY;
            }
        });

        // Eventos para interacción táctil
        document.addEventListener('touchstart', (e) => {
            isDragging = true;
            previousX = e.touches[0].clientX;
            previousY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', () => {
            isDragging = false;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const deltaX = e.touches[0].clientX - previousX;
                const deltaY = e.touches[0].clientY - previousY;
                
                treeGroup.rotation.y += deltaX * 0.01;
                treeGroup.rotation.x += deltaY * 0.01;
                
                previousX = e.touches[0].clientX;
                previousY = e.touches[0].clientY;
            }
        }, { passive: true });

        // Función para crear el efecto de nieve
        function createSnow() {
            const snowGeometry = new THREE.BufferGeometry();
            const snowCount = 1500; // Aumentado para más densidad
            const posArray = new Float32Array(snowCount * 3);
            const velocityArray = new Float32Array(snowCount); // Array para velocidades individuales
            const sizeArray = new Float32Array(snowCount);     // Array para tamaños variables
            
            for(let i = 0; i < snowCount * 3; i += 3) {
                posArray[i] = (Math.random() - 0.5) * 30;     // Área más amplia en X
                posArray[i + 1] = Math.random() * 20;         // Altura
                posArray[i + 2] = (Math.random() - 0.5) * 30; // Área más amplia en Z
                
                // Velocidad y tamaño aleatorios para cada copo
                velocityArray[i/3] = 0.02 + Math.random() * 0.03;
                sizeArray[i/3] = 0.05 + Math.random() * 0.15;
            }
            
            snowGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            // Textura personalizada para los copos
            const snowTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/sprites/snowflake2.png');
            
            const snowMaterial = new THREE.PointsMaterial({
                size: 0.2,
                map: snowTexture,
                transparent: true,
                opacity: 0.8,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: false
            });
            
            const snow = new THREE.Points(snowGeometry, snowMaterial);
            
            // Función de animación específica para la nieve
            function animateSnow() {
                const positions = snow.geometry.attributes.position.array;
                
                for(let i = 0; i < positions.length; i += 3) {
                    // Movimiento vertical
                    positions[i + 1] -= velocityArray[i/3];
                    
                    // Movimiento ondulatorio horizontal
                    positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.01;
                    positions[i + 2] += Math.cos(Date.now() * 0.001 + i) * 0.01;
                    
                    // Reiniciar posición cuando llega abajo
                    if(positions[i + 1] < -5) {
                        positions[i + 1] = 15;
                        positions[i] = (Math.random() - 0.5) * 30;
                        positions[i + 2] = (Math.random() - 0.5) * 30;
                    }
                }
                
                snow.geometry.attributes.position.needsUpdate = true;
                requestAnimationFrame(animateSnow);
            }
            
            animateSnow();
            return snow;
        }

        // Añado el efecto de nieve a la escena
        const snow = createSnow();
        scene.add(snow);

        // Función para crear partículas decorativas en el árbol
        function createTreeParticles() {
            const particlesGeometry = new THREE.BufferGeometry();
            const particleCount = 15000;
            const posArray = new Float32Array(particleCount * 3);
            
            for(let i = 0; i < particleCount * 3; i += 3) {
                const height = Math.random() * 7;
                const radiusMax = 2.8;
                const radius = (radiusMax * (1 - Math.pow(height/7, 1.2))) + 0.1;
                const angle = Math.random() * Math.PI * 2;
                
                const randomOffset = (Math.random() - 0.5) * 0.1;
                
                posArray[i] = Math.cos(angle) * radius + randomOffset;
                posArray[i + 1] = height - 3.5;
                posArray[i + 2] = Math.sin(angle) * radius + randomOffset;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.1,     // Reducido de 0.12 a 0.1
                color: 0x45a049,
                transparent: true,
                opacity: 0.98,  // Aumentado de 0.95 a 0.98
                map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/sprites/disc.png'),
                alphaTest: 0.2,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            
            return new THREE.Points(particlesGeometry, particlesMaterial);
        }

        // Añado las partículas decorativas al árbol
        const treeParticles = createTreeParticles();
        treeGroup.add(treeParticles);

        // Función principal de animación
        function animate() {
            requestAnimationFrame(animate);
            // Animo la rotación del árbol y los efectos
            treeGroup.rotation.y += 0.001;
            
            // Animar partículas del árbol
            const treeParticlePositions = treeParticles.geometry.attributes.position.array;
            for(let i = 0; i < treeParticlePositions.length; i += 3) {
                const time = Date.now() * 0.0005;
                const offset = i * 0.05;
                
                treeParticlePositions[i] += Math.sin(time + offset) * 0.001;
                treeParticlePositions[i + 2] += Math.cos(time + offset) * 0.001;
            }
            treeParticles.geometry.attributes.position.needsUpdate = true;
            
            // Efecto de brillo pulsante en las luces
            const time = Date.now() * 0.001;
            treeGroup.children.forEach(child => {
                if (child instanceof THREE.PointLight && child !== mainLight) {
                    child.intensity = 0.3 + Math.sin(time + child.position.x) * 0.1;
                }
            });
            
            renderer.render(scene, camera);
        }
        
        // Inicio la animación
        animate();

        // Manejo el redimensionamiento de la ventana
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
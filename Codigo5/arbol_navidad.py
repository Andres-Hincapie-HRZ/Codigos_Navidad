import turtle
import random

# Configuración de la ventana
ventana = turtle.Screen()
ventana.bgcolor("midnightblue")
ventana.title("Árbol de Navidad Animado")
ventana.setup(width=800, height=600)

# Crear tortuga
t = turtle.Turtle()
t.speed(0)
t.hideturtle()

# Lista para almacenar las tortugas de los adornos
adornos = []

# Función para dibujar el tronco
def dibujar_tronco():
    t.penup()
    t.goto(-25, -250)
    t.pendown()
    t.color("saddlebrown")
    t.begin_fill()
    for _ in range(2):
        t.forward(50)
        t.left(90)
        t.forward(80)
        t.left(90)
    t.end_fill()

# Función para dibujar un triángulo del árbol con textura
def dibujar_triangulo(x, y, base, altura, color):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color(color)
    t.begin_fill()
    t.goto(x + base, y)
    t.goto(x + base/2, y + altura)
    t.goto(x, y)
    t.end_fill()

# Función para dibujar una estrella
def dibujar_estrella(x, y, tamano):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color("gold")
    t.begin_fill()
    for _ in range(5):
        t.forward(tamano)
        t.right(144)
    t.end_fill()

# Función para crear adornos animados
def crear_adornos():
    colores = ["red", "gold", "blue", "cyan", "magenta", "orange", "lime"]
    posiciones = [
        (-90, -180), (90, -180), (-60, -120), (60, -120),
        (-110, -80), (110, -80), (-80, -20), (80, -20),
        (-50, 40), (50, 40), (-30, 90), (30, 90),
        (0, -150), (-40, -100), (40, -100)
    ]
    
    for i, pos in enumerate(posiciones):
        adorno = turtle.Turtle()
        adorno.shape("circle")
        adorno.color(random.choice(colores))
        adorno.penup()
        adorno.goto(pos[0], pos[1])
        adorno.shapesize(0.8, 0.8)
        adornos.append({
            'tortuga': adorno,
            'color_original': adorno.color()[0],
            'contador': i * 10
        })

# Función para dibujar nieve en el suelo
def dibujar_nieve():
    t.penup()
    t.goto(-400, -250)
    t.pendown()
    t.color("white")
    t.begin_fill()
    for _ in range(2):
        t.forward(800)
        t.right(90)
        t.forward(50)
        t.right(90)
    t.end_fill()

# Función para dibujar copos de nieve cayendo
def dibujar_copos_fondo():
    for _ in range(30):
        x = random.randint(-400, 400)
        y = random.randint(-200, 300)
        t.penup()
        t.goto(x, y)
        t.pendown()
        t.color("white")
        t.begin_fill()
        t.circle(2)
        t.end_fill()

# Animación de parpadeo de adornos
def animar_adornos():
    for adorno in adornos:
        adorno['contador'] += 1
        if adorno['contador'] % 30 < 15:
            adorno['tortuga'].color("yellow")
        else:
            adorno['tortuga'].color(adorno['color_original'])
    
    ventana.ontimer(animar_adornos, 100)

# Dibujar nieve en el suelo
dibujar_nieve()

# Dibujar copos de nieve en el fondo
dibujar_copos_fondo()

# Dibujar el tronco
dibujar_tronco()

# Dibujar las capas del árbol (4 triángulos para más volumen)
dibujar_triangulo(-140, -170, 280, 90, "darkgreen")
dibujar_triangulo(-120, -100, 240, 90, "forestgreen")
dibujar_triangulo(-100, -30, 200, 90, "green")
dibujar_triangulo(-80, 40, 160, 90, "limegreen")

# Dibujar solo una estrella en la punta
dibujar_estrella(-15, 130, 35)

# Crear los adornos animados
crear_adornos()

# Iniciar animación
animar_adornos()

# Mantener la ventana abierta
ventana.mainloop()

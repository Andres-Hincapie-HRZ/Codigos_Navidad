import turtle

# Configuración de la ventana
ventana = turtle.Screen()
ventana.bgcolor("navy")
ventana.title("Animación de Copo de Nieve")
ventana.setup(width=800, height=600)

# Crear tortuga
t = turtle.Turtle()
t.speed(0)
t.hideturtle()
t.color("white")
t.pensize(2)

# Variables de animación
tamano = 80
copo_dibujado = False

# Función para dibujar un brazo del copo de nieve
def dibujar_brazo(longitud):
    if longitud < 10:
        return
    
    # Dibujar línea principal
    t.forward(longitud)
    
    # Dibujar ramificaciones
    angulo = 30
    for i in range(2):
        t.backward(longitud * 0.3)
        t.left(angulo) if i == 0 else t.right(angulo * 2)
        t.forward(longitud * 0.4)
        t.backward(longitud * 0.4)
        t.right(angulo) if i == 0 else t.left(angulo * 2)
    
    t.backward(longitud * 0.7)

# Función para dibujar el copo completo
def dibujar_copo():
    global copo_dibujado
    
    if copo_dibujado:
        return
    
    t.penup()
    t.goto(0, 0)
    t.setheading(0)
    t.pendown()
    
    # Dibujar 6 brazos (simetría hexagonal)
    for _ in range(6):
        dibujar_brazo(tamano)
        t.left(60)
    
    copo_dibujado = True

# Dibujar el copo una sola vez
dibujar_copo()

# Mantener la ventana abierta
ventana.mainloop()


const canvas =  document.querySelector('#lienzo'); //Se selecciona el canvas para poder hacer referencia a que se trabajara cn graficos
const c = canvas.getContext('2d');

class Proyectil{
    constructor(posicion, velocidad){
        this.posicion = posicion;
        this.velocidad = velocidad;

        this.radio = 3;
    }
    dibujar(){
        c.beginPath()
        c.arc(this.posicion.x, this.posicion.y, this.radio, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }
    actualizar(){
        this.dibujar()
        this.posicion.x+=this.velocidad.x
        this.posicion.y+=this.velocidad.y 
    }
}

const proyectiles = [new Proyectil({
    posicion: {
        x:300,
        y:300
    }, velocidad: {
        x:0,
        y:0
    }
})]

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height,);
   
    
        proyectiles.forEach(proyectil => {
            proyectil.actualizar()
        })
    
   

    
    // console.log("aqui se anima");
}

animate();
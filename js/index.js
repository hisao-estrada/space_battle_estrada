// let score = document.getElementById("score");  //Se obtiene el elemento Score del HTML
//  let nameJugador = prompt("Ingresa el nombre del jugador"); //Se pide el nombre del jugador

//  score.innerText = "Score del jugador " + nameJugador; //se agrega el nombre del jugador al HTML 
//  console.log(nameJugador);

const canvas =  document.querySelector('#lienzo'); //Se selecciona el canvas para poder hacer referencia a que se trabajara cn graficos
const c = canvas.getContext('2d');

//canvas.width = innerWidth; //se le asigna al canvas el ancho de la ventana
//canvas.height =  innerHeight; //se le asigna al canvas el alto de la ventana

//Creacion de la clase player
class Player {
    constructor(){  //Inicia la delcaracion del constructor del jugador
        //Se le asigna una velocidad
        this.velocidad = {
            x:0,
            y:0
        }

        this.rotacion = 0;

        const image = new Image()  //Se crea una constante image donde se guardara la imagen 
        image.src = './img/halcon.png' // se hace referencia a la direccion de la imagen
        image.onload = () => { //asignacion de la imagen altura y ancho dandole tambien una escala y posicion
            const scale = 0.55;
            this.image = image; 
            this.ancho = 100 * scale;
            this.alto = 100 * scale;
            this.posicion = {
                x: canvas.width / 2 - this.ancho / 2, 
                y: canvas.height - this.alto - 10
            }
        }   
    }
    //Se dibuja el jugador
    dibujar(){
        
        c.save()
       // c.rotar(this.rotacion)
        c.drawImage(
                this.image, 
                this.posicion.x, 
                this.posicion.y, 
                this.ancho, 
                this.alto
            )        //Se le agrega la imagen   
        c.restore()
    }
    actualizar(){
        if(this.image){
            this.dibujar()
            this.posicion.x += this.velocidad.x
        }
    }
}

class Proyectil{
    constructor({posicion, velocidad}){
        this.posicion = posicion
        this.velocidad = velocidad

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
        //console.log(this.pos.x, this.vel.y);
            this.dibujar()
            this.posicion.x += this.velocidad.x
            this.posicion.y += this.velocidad.y 
    }
}


//Creacion de la clase enemigo
class Enemy {
    constructor(){  //Inicia la delcaracion del constructor del jugador
        //Se le asigna una velocidad
        this.velocidad = {
            x:0,
            y:0
        }

        const image = new Image()  //Se crea una constante image donde se guardara la imagen 
        image.src = './img/enemigo.png' // se hace referencia a la direccion de la imagen
        image.onload = () => { //asignacion de la imagen altura y ancho dandole tambien una escala y posicion
            const scale = 0.55;
            this.image = image; 
            this.ancho = 100 * scale;
            this.alto = 100 * scale;
            this.posicion = {
                x: canvas.width / 2 - this.ancho / 2, 
                y: canvas.height / 2
            }
        }   
    }
    //Se dibuja el jugador
    dibujar(){
        
        c.drawImage(
                this.image, 
                this.posicion.x, 
                this.posicion.y, 
                this.ancho, 
                this.alto
            )        //Se le agrega la imagen   
    }
    actualizar(){
        if(this.image){
            this.dibujar()
            this.posicion.x += this.velocidad.x
            this.posicion.y += this.velocidad.y
        }
    }
}


const p1 = new Player();  // Creacion del nuevo jugador 
const proyectiles = [ ] // Creacion de los proyectiles
const enem = new Enemy(); // Creacion del enemigo

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}


function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'black'    // fondo negro
    c.fillRect(0, 0, canvas.width, canvas.height);  
    p1.actualizar()
    enem.actualizar()

     proyectiles.forEach(proyectil => {
     proyectil.actualizar()
     })


    if(keys.a.pressed && p1.posicion.x >= 0){
        p1.velocidad.x = -7
       // p1.rotacion = -0.15
    } else if(
        keys.d.pressed &&
        p1.posicion.x + p1.ancho <= canvas.width 
    ){
        p1.velocidad.x = 7
        //p1.rotacion = 0.15
    } else {
        p1.velocidad.x = 0
        //p1.rotacion = 0
    }
    // console.log("aqui se anima");
}

animate();

addEventListener('keydown', ({key}) => {
    switch(key){
        case 'a':
            p1.velocidad.x += -5
            keys.a.pressed = true
            console.log("El halcon se movio a la izquierda");
            break;
        case 'd':
            p1.velocidad.x += 5
            keys.d.pressed = true
            console.log("El halcon se movio a la derecha");
            break;
        case ' ':
            proyectiles.push( 
                new Proyectil({
                    posicion: {
                        x: p1.posicion.x + (p1.ancho /2),
                        y: p1.posicion.y
                },
                    velocidad: {
                        x: 0,
                        y: -10 
               }
            }
        ))
            console.log("El halcon disparó");
            keys.space.pressed = true
            break;  
        default:
            break;
    }  
})

addEventListener('keyup', ({key}) => {
    switch(key){
        case 'a':
            p1.velocidad.x += 5
            keys.a.pressed = false
            console.log("El halcon se movio a la izquierda");
            break;
        case 'd':
            p1.velocidad.x += -5
            keys.d.pressed = false
            console.log("El halcon se movio a la derecha");
            break;
        case ' ':
            console.log("El halcon disparó");
            keys.space.pressed = false
            break;  
        default:
            break;
    }  
})
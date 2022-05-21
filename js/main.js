class Personajes {
    constructor(nombre, clase) {
        this.nombre = nombre;
        this.clase = clase;
        this.vida;
        this.ataque;
        this.defensa;
    }

    atacar(origen, destino) {
        buscarNombres(origen, destino);
        let luckyNumber = between((nombreOrigen.ataque - nombreDestino.defensa), nombreOrigen.ataque);
        let puntosADescontar = 0;
        let esCrit = (Math.random() * 11)
        console.log(esCrit);
        if ( esCrit > 7) {
            puntosADescontar = Math.round((nombreOrigen.ataque - nombreDestino.defensa) * luckyNumber);
            alert("El ataque ha sido critico!!")
        } else {
            puntosADescontar = Math.round((nombreOrigen.ataque - nombreDestino.defensa));
        }
        nombreDestino.vida -= puntosADescontar;
        console.log(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar} puntos de vida !`);
        alert(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar} puntos de vida !`);
        if (nombreDestino.vida < 0) {
            nombreDestino.vida = 0;
        }
        nombreOrigen.exp += Math.floor(Math.random() * 10);
        expNivel(nombreOrigen);
    };

}

//Defino variables globales
let nombreOrigen, nombreDestino;

//Funcion numero aleatorio
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

//Defino función auxiliar de busqueda para metodos
function buscarNombres(origen, destino) {
    pjActivo.forEach(element => {
        if (element.nombre.toLowerCase() == origen.toLowerCase()) {
            nombreOrigen = element;
        }
    });
    pjActivo.forEach(element => {
        if (element.nombre.toLowerCase() == destino.toLowerCase()) {
            nombreDestino = element;
        }
    });
}


//Función de experiencia y nivel
function expNivel(nombreOrigen) {
    if (nombreOrigen.exp > 100) {
        nombreOrigen.exp -= 100;
        nombreOrigen.nivel += 1;
        alert(`${nombreOrigen.nombre} ha subido al nivel ${nombreOrigen.nivel}`);
        nombreOrigen.vida = Math.round(nombreOrigen.vida * 1.04);
        nombreOrigen.vidaMax = Math.round(nombreOrigen.vidaMax * 1.04);
        nombreOrigen.ataque = Math.round(nombreOrigen.ataque * 1.03);
        nombreOrigen.defensa = Math.round(nombreOrigen.defensa * 1.03);
    }
}

// Funcion que agregar stats segun clase   ---- Acá también las defino
function statClase() {
    do {
        pjActivo.forEach(element => {
            switch (element.clase.toLowerCase()) {
                case `enemigo`:
                    element.nivel = 1;
                    element.vida = 100;
                    element.ataque = 100;
                    element.defensa = 100;
                    element.img ="./img/enemigo.png";
                    repeat = true;
                    break;
                case `halcon`:
                    element.nivel = 1;
                    element.vida = 100;
                    element.ataque = 100;
                    element.defensa = 100;
                    element.img = `./img/halcon.png`;
                    repeat = false;
                    break;
                default:
                    alert(`la clase especificada no existe`);
                    element.clase = prompt("Ingresa la clase del personaje: \n\nPaladin\nCazador\nGuerrero\nMago\nBrujo").toLowerCase();
                    repeat = true;
                    break;
            }
        });
    } while (repeat);
}

// Función que imprime Jugador enemigo y halcon en pantalla
function printPJ() {
    let nombreImagenID = document.getElementById(`nombreImagen`);
    let statsID = document.getElementById(`stats`);
    nombreImagenID.innerHTML = " ";
    statsID.innerHTML = " ";
    pjActivo.forEach(element => {
        nombreImagenID.innerHTML += "<img src=" + element.img + " </img> <p>" + element.nombre + " </p>";
        statsID.innerHTML += "<p> "+ "<br><strong>Vida:</strong> " + element.vida + "<br><strong>Ataque:</strong> " + element.ataque + "<br><strong>Defensa:</strong> " + element.defensa + " </p> <br><br><br><br>";
    });
}

//Funcion que inicia el juego
function initG() {
    let ocultarBtn = document.getElementById("btnAP");
    ocultarBtn.className = "ocultar";
    ocultarBtn = document.getElementById("btnIniciar");
    ocultarBtn.className = "ocultar";

    let mostrarBtn = document.getElementById("btnA");
    mostrarBtn.className = "";
    mostrarBtn = document.getElementById("btnC");
    mostrarBtn.className = "";
    mostrarBtn = document.getElementById("btnI");
    mostrarBtn.className = "";
    mostrarBtn = document.getElementById("btnR");
    mostrarBtn.className = "";
}

//Funcion que reinicia el juego
function resetG() {
    let ocultarBtn = document.getElementById("btnAP");
    ocultarBtn.className = "";
    ocultarBtn = document.getElementById("btnIniciar");
    ocultarBtn.className = "";

    let mostrarBtn = document.getElementById("btnA");
    mostrarBtn.className = "ocultar";
    mostrarBtn = document.getElementById("btnC");
    mostrarBtn.className = "ocultar";
    mostrarBtn = document.getElementById("btnI");
    mostrarBtn.className = "ocultar";
    mostrarBtn = document.getElementById("btnR");
    mostrarBtn.className = "ocultar";
}

//Abreviación del metodo para atacar
function pjA(origen, destino) {
    pjActivo[0].atacar(origen, destino)
};
//Abreviación del metodo para curarse
function pjC(origen, destino) {
    pjActivo[0].curar(origen, destino)
};
//Abreviación del metodo para insultar
function pjI(origen, destino) {
    pjActivo[0].insultar(origen, destino)
};

//Armo el array donde irán los personajes activos
const pjActivo = [];

pjActivo.push(new Personajes("Tie", "enemigo"));
pjActivo.push(new Personajes("Halcon", "halcon"));

/* let parrafo = document.createElement("p")
parrafo.textContent = (<></>) */

//TEST
/* console.log("Estado inicial");
console.log(pjActivo);
pjA("myle", "brotana");
console.log("Luego de recibir ataque")
for (let i = 0; i < 50; i++) {
    pjA("myle", "brotana");
}
for (let i = 0; i < 50; i++) {
    pjC("brotana", "brotana");
}
for (let i = 0; i < 130; i++) {
    pjI("brotana", "myle");
}
alert("oko")
console.log(pjActivo); */



// Atacar
// pjA(prompt(`origen`), prompt(`destino`));

// Curar
// pjC(prompt(`origen`), prompt(`destino`));

// Insultar
// pjI(prompt(`origen`), prompt(`destino`));


statClase();
printPJ();
console.log(pjActivo);



//Logica para detectar la entrada del teclado y si el halcon se mueve a la izquierda o derecha, o si tiene que disparar.
let halcon =  document.getElementById(`Halcon`);
let cantidad = 0;

window.addEventListener(`keydown`, e => {
    let teclado = e.key;
    switch(teclado){
        case 'ArrowRight':
            //halcon.style.transform="translateX(100px)";
            console.log("El halcon se movio a la derecha");
            break;
        case 'ArrowLeft':
            //halcon.style.transform="translateX(-100px)";
            console.log("El halcon se movio a la izquierda");
            break;
        case ' ':
            console.log("El halcon disparó");
            break;  
        default:
            break;
    }
    
})
const canvas = document.getElementById('canvas')
import Pieza from "./pieza.js";
class Juego{
    columnas = 10;
    filas = 20;
    tamañoCuadrado = Math.floor(window.innerHeight * .9 /20);
    constructor(canvas){
        this.canvas = canvas;
        this.canvas.width = this.columnas * this.tamañoCuadrado;
        this.canvas.height = this.filas * this.tamañoCuadrado;
        this.ctx = this.canvas.getContext('2d');
        this.crearGrilla();
        const a = new Pieza(1,this.actualizarGrilla)
        a.dibujar(5,5)
        a.rotar()
        a.dibujar(5,8)
        a.rotar()
        a.dibujar(5,12)
        a.rotar()
        a.dibujar(5,16)
    }
    seleccionarPieza(){
        const random = Math.floor(Math.random() * 7)
        this.piezaActual = new Pieza(random, this.ctx, this.tamañoCuadrado)
    }
    crearGrilla(){
        this.grilla = [];
        for (let i = 0; i < this.filas; i++) {
            const fila = []
            for (let j = 0; j < this.columnas; j++) {
                (i+j) % 2 == 0 ? this.ctx.fillStyle = "#434343" :this.ctx.fillStyle = "#474747";
                fila.push(this.ctx.fillStyle)
                this.ctx.fillRect(j*this.tamañoCuadrado, i*this.tamañoCuadrado, this.tamañoCuadrado, this.tamañoCuadrado)
            }
            this.grilla.push(fila)
        }
    }
    actualizarGrilla(x,y,color){
        this.grilla[x][y] = color
        this.ctx.fillStyle = color
        this.ctx.fillRect(x*this.tamañoCuadrado, y*this.tamañoCuadrado, this.tamañoCuadrado, this.tamañoCuadrado)
    }
    actualizarGrilla = this.actualizarGrilla.bind(this)
}

const a = new Juego(canvas)
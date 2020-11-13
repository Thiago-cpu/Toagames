// bug al pasar por  los pinches 
// tratar de optimizar la funcion pinches la parte del constrain
// Sí sigue andando con lag en la escuela, acordate que podes optimizar el juego haciendo que no dibuje el fondo si ya estaba dibujado anteriormente
const largo = 20;
const alto = 20;
let aux6 = false;
const tamañoCuadrado = 20;
var Estaenpinche;
var tail = [];
var cant_color, var_color;
var datos = "THIAGO@gmail.com";
var posmanzanax;
var posmanzanay;
var aux1;
var ceros;
let color_rdm;
var puntos;
var aux2 = 1;
var total = 0;
var velocidad = 4;
var velocidad_x = 4;
var velocidad_y = 0;
var img;
var movimientos = [];
var movidas = 0;
var manzana_color;
//pared
var pared_vertical;
var pared_horizontal;
//pinchos
var pinches_gris;
var pinches_gris_x = [];
var pinches_gris_y = [];
var cant_pinches = 0;
var pinches_47;
// llave
var SinColision;
let restart = document.getElementById('restart')
restart.addEventListener('click', reiniciar)
function reiniciar(){
    location.reload();
}
function preload() {
    img = loadImage('imagenes/cuadrado_verde.png');
    manzana = loadImage('imagenes/cuadrado_rojo.png')
    azul = loadImage('imagenes/cuadrado_azul.png')
    amarillo = loadImage('imagenes/cuadrado_amarillo.png')
    violeta = loadImage('imagenes/cuadrado_violeta.png')
    celeste = loadImage('imagenes/cuadrado_celeste.png')
    naranja = loadImage('imagenes/cuadrado_naranja.png')
    pinches_gris = loadImage('imagenes/pinchos.png')
    pinches_47 = loadImage('imagenes/pinchos_47.png')
    pared_vertical = loadImage('imagenes/pared_vertical.png')
    pared_horizontal = loadImage('imagenes/pared_horizontal.png')
    
    tail[0] = createVector( 60, 120);
    aux1 = tail[0].x
    manzana_color = manzana;

    
}

function setup(){
    createCanvas(tamañoCuadrado*largo, tamañoCuadrado*alto);
    manzana.resize(tamañoCuadrado, tamañoCuadrado)
    posmanzanax = floor(random(1, largo-2)) * tamañoCuadrado
    posmanzanay = floor(random(1, alto-2)) * tamañoCuadrado
    image(manzana_color, posmanzanax, posmanzanay)
    pared()
}
function draw() {

    frameRate(60)
    x=tail[0].x
    y=tail[0].y
    
    aux1 = x;
    aux2 =  y;
    actualizar()
    if (aux1==tail[0].x && aux2==tail[0].y){
        fin()
        noloop()
    }
    secuencia()
    mostrar()
    

}
function fin(){
    var respuesta;
    document.getElementById('modal_id').click()
    if (total < 100){
        document.getElementById('presumir').innerText = "Has ganado un total de " + total.toString() + " puntos, te falta práctica.";
        
        
    } else if(total > 200){
    document.getElementById('presumir').innerText = "Has ganado un total de " + total.toString() + " puntos, te recibiste de capo";
    document.getElementById('explicar').innerText = "Waw, jugas re bien (mejor que yo) así que te ganaste el instalador del juego simon y snake. Dejame tu gmail o numero de telefono y después te lo paso"
    var input = document.createElement('input')
    input.type = "text"
    input.id = "inputdatos"
    var guardar = document.createElement('guardar')
    guardar.classList = "btn btn-primary"
    guardar.innerText = "Guardar datos"
    guardar.style = "position: relative; left: 20px; border: 2px solid; border-color: black;"
    guardar.id = "guardarcampeon"
    document.getElementById('modal-body').appendChild(input)
    document.getElementById('modal-body').appendChild(guardar)
    document.getElementById('guardarcampeon').addEventListener('click', function(){
        datos = document.getElementById('inputdatos').value
        localStorage.setItem(datos, datos)
        document.getElementById('restart').click()
    })

    } else{
        document.getElementById('presumir').innerText = "Has ganado un total de " + total.toString() + " puntos, te falta poco para el premio";
        
    }
}


function actualizar(){
    //pinches
    if (total === tail.length){
        for (let i = 1; i < tail.length; i++){
            tail[i] = tail[i+1]
        }
    } 
    tail[total-1] = createVector( tail[0].x, tail[0].y);
    
    
    tail[0].x += velocidad_x;
    tail[0].y += velocidad_y;
    //Si esta dentro de los límites dar esa posición, sino matener la posición de la pared
    tail[0].x = constrain(tail[0].x, tamañoCuadrado, largo*tamañoCuadrado-2*tamañoCuadrado)
    tail[0].y = constrain(tail[0].y, tamañoCuadrado, alto*tamañoCuadrado-2*tamañoCuadrado)
    come()
    Colision_Cuerpo()
    Colision_Pinches()
}
function actualizar2(){
    if (total === tail.length){
        for (let i = 1; i < tail.length; i++){
            tail[i] = tail[i+1]
        }
    } 
    
    tail[total-1] = createVector( tail[0].x, tail[0].y);
}
function actualizar3(){

    if (total === tail.length){
        for (let i = 1; i < tail.length; i++){
            tail[i] = tail[i+1]
        }
    } 
    
    tail[total-1] = createVector( tail[0].x, tail[0].y);
    
    



    tail[0].x += velocidad_x;
    tail[0].y += velocidad_y;
    tail[0].x = constrain(tail[0].x, 0 + tamañoCuadrado, largo*tamañoCuadrado-2*tamañoCuadrado)
    tail[0].y = constrain(tail[0].y, 0 + tamañoCuadrado, alto*tamañoCuadrado-2*tamañoCuadrado)
    
    Colision_Cuerpo()
    
    Colision_Pinches()
}


function Colision_Cuerpo(){
    if (SinColision === 0){
        for(let i = 1; i<tail.length-1;i++){
            if (16 === dist(tail[0].x, tail[0].y, tail[i].x, tail[i].y) && 12 === dist(tail[0].x + (velocidad_x), tail[0].y + (velocidad_y), tail[i].x, tail[i].y) ){
                fin()
                noloop()
            }
        }
    }
}
function Colision_Pinches(){
    if (SinColision != 2){
        for(let i = 0; i<cant_pinches;i++){
            if (0 == dist(tail[0].x, tail[0].y, pinches_gris_x[i], pinches_gris_y[i])){
                fin()
                noloop()
            }
        }
    }
}
function aumentar(){ 
 for (let i = 0; i<10;i++){
     total++
     puntos = document.getElementById('puntos');
     ceros = 6 - total.toString().length;
     puntos.innerText = "Puntos: " + "0".repeat(ceros) + total.toString()
     actualizar2()
 }


}


function come(){
    if (0 == dist(tail[0].x, tail[0].y, posmanzanax, posmanzanay)){
        color_rdm = Math.random()
        if (manzana_color === amarillo){
            SinColision = 1;
        } else if(manzana_color === azul){
            SinColision = 2;
        } else {
            SinColision = 0;
        }
        if (color_rdm < 0.6){
            manzana_color = manzana;
        } else if (color_rdm < 0.95) {
            manzana_color = amarillo;
        } else {
            manzana_color = azul;
        }
        secuencia()
        aumentar()
        PasarDeNivel()
        comida()
        pinches()
        for (let i = 0; i < cant_pinches; i++){
            if ((pinches_gris_x[i] / tamañoCuadrado +pinches_gris_y[i] / tamañoCuadrado) % 2 == 0){
                image(pinches_47, pinches_gris_x[i], pinches_gris_y[i] )
            } else {
                image(pinches_gris, pinches_gris_x[i], pinches_gris_y[i] )
            }
        }
        image(manzana_color, posmanzanax, posmanzanay)
    }
}
function PasarDeNivel(){
    if (total%3 === 0){
        cant_pinches += 2
    }
}
function pinches(){
    for(let i = 0; i < cant_pinches; i++){
        pinches_gris_x[i] = floor(random(1, largo-1)) * tamañoCuadrado
        pinches_gris_y[i] = floor(random(1, alto-1)) * tamañoCuadrado
        if (pinches_gris_x[i] === posmanzanax && pinches_gris_y[i] === posmanzanay){ //que no aparezca en la manzana
            i -=1;
            continue;
            
        } else {
            for (let j = 0; j < i; j++){
                if (pinches_gris_x[i] === pinches_gris_x[j] && pinches_gris_y[i] === pinches_gris_y[j]){ // que no aparezca en un pinche creado anteriormente
                    i -= 1;
                    continue;
                    
                }
            }
            for (let h = 0; h < tail.length; h++){
                if (pinches_gris_x[i] === tail[h].x && pinches_gris_y[i] === tail[h].y){ // que no aparezca en el cuerpo del snake
                    i -= 1;
                    continue;
                    
                }
            }
            // la idea es el rango en el que no puede aparecer una vez que coma la manzana creo que se puede optimizar pero no se como
            if (pinches_gris_x[i] === tail[0].x){
               if (pinches_gris_y[i] < tail[0].y){
                   pinches_gris_y[i] = constrain(pinches_gris_y[i], tamañoCuadrado, tail[0].y - 5*tamañoCuadrado);
               } else {
                   if (tail[0].y + 5*tamañoCuadrado >=  alto * tamañoCuadrado - 2 * tamañoCuadrado){
                       i -= 1;
                       continue;

                   } else {
                       pinches_gris_y[i] = constrain(pinches_gris_y[i],  tail[0].y + 5*tamañoCuadrado, alto * tamañoCuadrado - 2 * tamañoCuadrado);
                   }
               }
           }
           if (pinches_gris_y[i] === tail[0].y){
            if (pinches_gris_x[i] < tail[0].x){
                pinches_gris_x[i] = constrain(pinches_gris_x[i], tamañoCuadrado, tail[0].x - 5 * tamañoCuadrado);
            } else {
                if (tail[0].x + 5 * tamañoCuadrado >= largo*tamañoCuadrado - 2 * tamañoCuadrado){
                    i -= 1;
                    continue;

                } else {
                    pinches_gris_x[i] = constrain(pinches_gris_x[i], tail[0].x + 5 * tamañoCuadrado,largo*tamañoCuadrado - 2 * tamañoCuadrado )
                }
            }
        }if (tail[1]){
            if (pinches_gris_x[i] === tail[1].x){
                if (pinches_gris_y[i] < tail[1].y){
                    pinches_gris_y[i] = constrain(pinches_gris_y[i], tamañoCuadrado, tail[1].y - 2*tamañoCuadrado);
                } else {
                    if (tail[1].y + 2*tamañoCuadrado >=  alto * tamañoCuadrado - 2 * tamañoCuadrado){
                        i -= 1;
                        continue;                        
                    } else {
                        pinches_gris_y[i] = constrain(pinches_gris_y[i],  tail[1].y + 2*tamañoCuadrado, alto * tamañoCuadrado - 2 * tamañoCuadrado);
                    }
                }
            }
            if (pinches_gris_y[i] === tail[1].y){
             if (pinches_gris_x[i] < tail[1].x){
                 pinches_gris_x[i] = constrain(pinches_gris_x[i], tamañoCuadrado, tail[1].x - 2 * tamañoCuadrado);
             } else {
                 if (tail[1].x + 2 * tamañoCuadrado >= largo*tamañoCuadrado - 2 * tamañoCuadrado){
                     i -= 1;
                     continue;
                 } else {
                     pinches_gris_x[i] = constrain(pinches_gris_x[i], tail[1].x + 2 * tamañoCuadrado,largo*tamañoCuadrado - 2 * tamañoCuadrado )
                 }
             }
         }
     }
 }
}
}








function comida(){
    posmanzanax = floor(random(1, largo-2)) * tamañoCuadrado
    posmanzanay = floor(random(1, alto-2)) * tamañoCuadrado
    if (posmanzanax === tail[1].x || posmanzanay === tail[1].y){

        comida()
    }
    for (let i = 0; i<tail.length;i++){
        if (posmanzanax === tail[i].x && posmanzanay === tail[i].y){
        
            comida()
        }

    }
}
function mostrar(){


    crearGrilla();
    //cuando pasa por encima del pinche
    if (SinColision == 2){
        for (let i = 0; i < cant_pinches; i++){
            if ((pinches_gris_x[i] / tamañoCuadrado +pinches_gris_y[i] / tamañoCuadrado) % 2 == 0){
                image(pinches_47, pinches_gris_x[i], pinches_gris_y[i] )
            } else {
                image(pinches_gris, pinches_gris_x[i], pinches_gris_y[i] )
            }
        }
    }
    
    for (let i = tail.length-1; i > -1; i--){
        if(SinColision === 2){
            randomColor(tail[i].x,tail[i].y)
        } else {
        image(img, tail[i].x , tail[i].y)
        }
    }   




//    image(img,x ,y);
}

function randomColor(x,y) {
    cant_color = floor(random(1,8))
    switch (cant_color){
        case 1: var_color = manzana 
        break;
        case 2: var_color = img
        break;
        case 3: var_color = azul
        break;
        case 4: var_color = naranja
        break;
        case 5: var_color = celeste
        break;
        case 6: var_color = violeta
        break;
        case 7: var_color = amarillo
        break;
        default: break;
    }
    image(var_color, x , y)
}






function keyPressed(){

    if (keyCode === UP_ARROW && velocidad_y != 1 * velocidad){

        movimientos.push('u');
    } else if (keyCode === DOWN_ARROW && velocidad_y != -1 * velocidad){

        movimientos.push('d');
    } else if (keyCode === LEFT_ARROW && velocidad_x != 1 * velocidad){

        movimientos.push('l');
    }else if (keyCode === RIGHT_ARROW && velocidad_x != -1 * velocidad){

        movimientos.push('r');
    }else if (keyCode === 32){
        if (aux6){
            SinColision = 0
            aux6 = false
        } else {
        aux6 = true
        SinColision = 2

        }

    }
}
function secuencia(){
    i = movidas

    for (i; i < movimientos.length;i++){
        switch (movimientos[i]) {
            case 'u': if (tail[0].x%tamañoCuadrado === 0 && tail[0].y%tamañoCuadrado === 0){
                mover(0,-velocidad)
            }
            continue;
            case 'd':
            if (tail[0].x%tamañoCuadrado === 0 && tail[0].y%tamañoCuadrado === 0){
                mover(0,velocidad)
            }
            continue;
            case 'l':
            if (tail[0].x%tamañoCuadrado === 0 && tail[0].y%tamañoCuadrado === 0){
                mover(-velocidad,0)
            }
            continue;
            case 'r':
            if (tail[0].x%tamañoCuadrado === 0 && tail[0].y%tamañoCuadrado === 0){
                mover(velocidad,0)
            }

            continue;
            default:
            continue;
        }
        movidas = i;
    }

}
function mover(x,y){
    velocidad_x = x;
    velocidad_y = y;
}
function pared(){
    for(let j = 0; j<alto;j++){
        image (pared_vertical, largo*tamañoCuadrado - tamañoCuadrado, j*tamañoCuadrado)
        image (pared_vertical,0, j*tamañoCuadrado)
    }
    for(let j = 0; j<largo;j++){
        image (pared_horizontal,j*tamañoCuadrado, 0)
        image (pared_horizontal,j*tamañoCuadrado, alto*tamañoCuadrado - tamañoCuadrado)
    }
}
function crearGrilla(){
    for(let i = 1;i<largo-1;i ++){
        for(let j = 1; j<alto-1;j++){
            if (posmanzanax / tamañoCuadrado !== i || posmanzanay / tamañoCuadrado !== j ){
                for (let h = 0; h < cant_pinches; h++){
                    if (pinches_gris_x[h] / tamañoCuadrado === i && pinches_gris_y[h] / tamañoCuadrado === j){
                        Estaenpinche = true;
                    }
                }
                if (!Estaenpinche){
                    crearFondo(i, j)
                } else {
                    Estaenpinche = false;
                }
            }
        }
    }
    function crearFondo(posx,posy){
        if((posx+posy) % 2 == 0){
            fill("#434343");
        }else{
            fill("#474747");
        }
        stroke("#343434")
        rect(posx*tamañoCuadrado, posy*tamañoCuadrado, tamañoCuadrado, tamañoCuadrado);
    }}


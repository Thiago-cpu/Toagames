export default class Pieza{
  I = [[0,0,0,1],
       [0,0,0,1],
       [0,0,0,1],
       [0,0,0,1]];
  T = [[0,0,0],
       [0,1,0],
       [1,1,1]];
  L = [[1,0,0],
       [1,0,0],
       [1,1,0]]
  J = [[0,0,1],
       [0,0,1],
       [0,1,1]] 
  O = [[1,1],
       [1,1]]
  Z = [[0,0,0],
       [1,1,0],
       [0,1,1]]
  S = [[0,0,0],
       [0,1,1],
       [1,1,0]]
  constructor(tipo,actualizarGrilla){
    this.determinarTipo(tipo)
    this.actualizarGrilla = actualizarGrilla
  }
  dibujar(x,y){
    for (let i = 0; i < this.pieza.length; i++) {
      for (let j = 0; j < this.pieza[0].length; j++) {
        const element = this.pieza[i][j];
        if(element === 1){
          this.actualizarGrilla(x+j, y+i, this.color)
        }
      }
    }
  }
  determinarTipo(tipo){
    switch(tipo){
      case 0:
        this.pieza= this.I
        this.color = "cyan"
        break;
        case 1:
        this.pieza= this.T
        this.color = "purple"
        break;
      case 2:
        this.pieza= this.L
        this.color = "orange"
        break;
      case 3:
        this.pieza= this.J
        this.color = "blue"
        break;
      case 4:
        this.pieza= this.O
        this.color = "yellow"
        break;
      case 5:
        this.pieza= this.Z
        this.color = "red"
        break;
      case 6:
        this.pieza= this.S
        this.color = "green"
        break;
    }
  }
  rotar(){
    const clon = this.pieza.map((arr)=>arr.slice())
    for (let i = 0; i < clon.length; i++) {
      for (let j = 0; j < clon[0].length; j++) {
        this.pieza[i][j] = clon[j][clon.length-1-i];
      }
    } 
  }
}
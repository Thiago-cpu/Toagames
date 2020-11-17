const header = document.getElementsByClassName('header')[0]

function crearHeader(){
  const title = document.createElement('a')
  title.href = "../../index.html"

  title.textContent = "🌌Toagames"
  header.style = `

  position:sticky;
  top:0;
  width:100%;
  background:#474747;
  height: 56px;
  display:flex;
  align-items: center;
  padding: 0 5px;"`
  title.style = `
  text-decoration: none;
  color:white;
  cursor:pointer;`
  header.appendChild(title)
}

crearHeader()

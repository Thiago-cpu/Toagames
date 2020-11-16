const content = require('fs').readFileSync(__dirname + '/../index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const rooms = []

const io = require('socket.io')(httpServer);

io.on('connection', socket => {

    socket.on('crear', crear=>{
      if(!rooms.includes(crear)){
        console.log(crear)
        socket.join(crear)
        rooms.push(crear)
        socket.emit('crear', 'La sala ha sido incorporada existosamente querido usuario')
      }else{
        socket.emit('crear', 'La sala ya existe')
      }
    })


    socket.on('entrar', entrar=>{
        if (rooms.includes(entrar)){
            socket.join(entrar)
            socket.emit('entrar', 'Has entrado exitosamente')
          } else {
            socket.emit('entrar', 'la sala no existe')
        }
      console.log(entrar);
    })
    socket.on('msg', msg=>{
        console.log(socket.rooms)
        socket.emit('msg', msg)
        socket.rooms.forEach(room=> {socket.in(room).emit('msg', msg)})
    })
});



httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
}); 
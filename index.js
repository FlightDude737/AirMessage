const fs = require("fs");
const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const hbs = require('hbs');

app.set('view engine', 'hbs')
app.set('views', "public")

const users = {}

io.on('connection', (socket) => {
  console.log('New User')
  socket.on('new-user', (name) => {
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (message, name) => {
    io.emit('chat-message', message, name)
  })
  socket.on('user-typing', (name) => {
    socket.broadcast.emit('user-is-typing', name)
  })
})

app.get('/', (req, res) => {
  res.render('index.hbs')
})

http.listen(3000, () => {
  console.log("Server is up on 3000!")
})
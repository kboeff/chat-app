const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    io.emit('notification', 'A new user is connected.')

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
    
    socket.on('nickname change', (name) => {
        io.emit(
            'notification',
            `${name.old} changed their name to ${name.latest}.`
        )
    })
})

http.listen(3000, () => {
    console.log('Listening on port 3000.')
})
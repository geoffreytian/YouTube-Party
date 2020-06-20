const express = require('express')
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))
server.listen(PORT, () => console.log(`Listening on ${ PORT }`))


io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('playEvent', function(msg) {
        //console.log('play ' + msg);
        var newReq = msg.b;
        socket.broadcast.emit('play', msg);
    });
    socket.on('pauseEvent', function(msg) {
        //console.log('pause: ' + msg);
        var newReq = msg.b;
        socket.broadcast.emit('pause', msg);
    });
    socket.on('bufferEvent', function(msg) {
        //console.log('buffer: ' + msg);
        var newReq = msg.b;
        socket.broadcast.emit('buffer', msg);
    });
    socket.on('disconnect', function() {
        console.log('a user disconnected');
    });
});

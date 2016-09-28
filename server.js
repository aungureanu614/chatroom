var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var people = {};
var count = 0;

io.on('connection', function (socket) {
    count +=1;
    
    console.log(count + ' client(s) connected');
    
    socket.on('message', function(user, message){
        console.log('Received message: ', user, message);
        socket.broadcast.emit('message', user, message);
    })
    
    socket.on('join', function(user){
        people[socket.id] = user;
        socket.broadcast.emit('join', user + 'has joined');
        // socket.sockets.emit('update-people', people);
    })
    
    
    socket.on('disconnect', function(){
        count -=1;
        console.log(count + ' client(s) connected');
        // socket.broadcast.emit('left');
        // socket.sockets.emit('update', people[socket.id]);
        //delete people[socket.id];
        // socket.sockets.emit('update-people', people);
    })
});



server.listen(process.env.PORT || 8080);
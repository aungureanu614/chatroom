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
        console.log('Received message: ', people[socket.id], message);
        socket.broadcast.emit('message', people[socket.id], message);
    })
    
    socket.on('join', function(user){
        people[socket.id] = user;
        console.log(user, "has joined the room");
        
        socket.broadcast.emit('join', user);
        
    })
    
    
    socket.on('disconnect', function(){
        count -=1;
        console.log(count + ' client(s) connected');
        console.log(people[socket.id] + " has left");
        //socket.broadcast.emit('disconnect');
       
       
    })
});



server.listen(process.env.PORT || 8080);
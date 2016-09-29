$(document).ready(function() {
    var socket = io();
    var msg = $('#msg');
    var join = $('#join');
    var send = $('#send');
    var messages = $('#messages');
    var name = $('#name');
    

    var addMessage = function(user, message) {
            messages.append('<div>' + user + " says: " + message + '</div>')
    };
    
    var addUser = function(user){
        messages.append('<div>' + user + " has joined the room" + '</div>')
    }
    
     var removeUser = function(user){
         
         
        messages.append('<div>' +  user + ' has left the room' + '</div>');
        
    }
    

  
    join.on('click', function(event){
       
        var user = name.val();
        addUser(user);
        socket.emit('join', user);
        
            msg.on('keydown', function(event) {
            if (event.keyCode != 13) {
                return;
            }
            
            var message = msg.val();
                if(message != ''){
                addMessage(user, message);
                socket.emit('message', user, message);
                msg.val('');
                }
        });
           
            send.on('click', function(event){
                var message = msg.val();
                if(message != ''){
                addMessage(user, message);
                socket.emit('message', user, message);
                msg.val('');
                }
            });
    
});
    
    
    socket.on('join', addUser);
    socket.on('message', addMessage);
    socket.on('remove-user', removeUser);
    
});
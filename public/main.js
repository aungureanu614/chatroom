$(document).ready(function() {
    var socket = io();
    var msg = $('#msg');
    var join = $('#join');
    var send = $('#send');
    var messages = $('#messages');
    var name = $('#name');
    

    var addMessage = function(user, message) {
        messages.append('<div>' + user + " says: " + message + '</div>');
    };
    


    msg.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
        var user = name.val();
        if(user != ''){
            var message = msg.val();
            addMessage(user, message);
            socket.emit('message', user, message);
            msg.val('');
        }
            
            
    });
    
    
    socket.on('message', addMessage);
   
});
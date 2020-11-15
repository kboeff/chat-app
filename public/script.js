var socket = io();
var changeNickname = document.querySelector('#change-nickname');
var sendMessageForm = document.querySelector('#send-message');
var nameInput = document.querySelector('#nickname')
var msgInput = document.querySelector('#m');
var messages = document.querySelector('#messages');
var notifications = document.querySelector('#notifications');

let nickname = 'Anonymous';

changeNickname.onsubmit = (e) => {
    e.preventDefault();
    socket.emit('nickname change', {
        'old': nickname,
        'latest': nameInput.value
    });
    nickname = nameInput.value;
    return false;
}

sendMessageForm.onsubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', {
        'user': nickname,
        'message': msgInput.value
    });
    msgInput.value = '';
    return false;
}

socket.on('chat message', ({ user, message }) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(`${user}: ${message}`));
    messages.appendChild(li);
})

socket.on('notification', (msg) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    notifications.appendChild(li);
})
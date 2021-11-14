const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('有人連線了!SocketId:'+socket.id);

    socket.on("login", (logData) => {

    });
});

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/views/index.html');
});
app.get('/index.css', (req, res) => {
    res.sendFile( __dirname + '/views/index.css');
});
app.get('/scripts/:id', (req, res) => {
    res.sendFile( __dirname + '/views/scripts/'+req.params.id);
});
app.get('/views/img/:id', (req, res) => {
    res.sendFile( __dirname + '/views/img/'+req.params.id);
});
server.listen(3000, () => {
    console.log("Server Started. http://localhost:3000");
});

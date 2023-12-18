const WebSocket = require('ws')
const webSocketServidor = new WebSocket.Server({ port: 5555 })
const pessoasConectadas = []
const express = require('express')
const cors = require('cors')
const porta = 2525
const servidor = express()
servidor.use(cors({
    allowedHeaders: "*",
    origin: "*"
}))
servidor.use(express.json())
servidor.use(express.static('public'))

webSocketServidor.on('listening', (arg) => console.log('SERVIDOR WEBSOCKET ATIVO'))

webSocketServidor.on('connection', (socket) => {
    console.log('Cliente conectado.');
    pessoasConectadas.push(socket)
    
    // Enviar uma mensagem para o cliente quando ele se conectar 
    socket.send(JSON.stringify('Conexão aceita!'));

    // Lidar com mensagens do cliente
    socket.on('message', (message) => {
        console.log(message)
    });

    // Lidar com o evento de fechamento da conexão
    socket.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

servidor.listen(porta, '195.35.37.40',() => {
    console.log(`http://195.35.37.40:${porta}`)
})

servidor.post('/api/mensagem', (req, res) => {
    pessoasConectadas.forEach((socket) => socket.send(JSON.stringify(req.body.msg)))
    return res.status(200).json(req.body)
})
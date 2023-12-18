const WebSocket = require('ws')
const webSocketServidor = new WebSocket.Server({ port: 5555 })
const pessoasConectadas = []

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
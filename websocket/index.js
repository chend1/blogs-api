

const useWebsocketServer = (port) => {
  const WebSocket = require('ws')
  const server = new WebSocket.Server({ port })
  server.on('connection', (ws) => {
    ws.on('error', console.error);
    ws.on('message', (message) => {
      console.log(message.toString())
    })
    ws.on('close', () => {
      
    })
  })
}



module.exports = {
  useWebsocketServer
}

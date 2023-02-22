import { socketChat } from './socket.chat.js';
import { socketProducts } from './socket.products.js';


export const SocketServer = (socketServer) => {         
    socketServer.on('connection', async(socket)=>{
        console.log('Cliente Conectado! ID:', socket.id)
        socket.on('disconnect', () => console.log('Usuario Desconectado! ID:', socket.id))

        // PRODUCTS
        socketProducts(socketServer,socket)
        // CHAT
        socketChat(socketServer,socket)
    })
 }



// PARA EL SOCKET SERVER, que esta con products
import { chatModel } from "../components/db/models/chat.models.js"


export const socketChat = async (socketServer,socket)=>{
    const chat = await chatModel.find({})
    socketServer.emit('server:chat', chat)

    socket.on('client:newMessage', async(obj)=>{
        const message = await chatModel.create(obj)
        if(message){
            const chat = await chatModel.find({})
            socket.emit('server:newMessage', message)
            socketServer.emit('server:chat', chat)
            console.log(message)
        }
    })

    


}


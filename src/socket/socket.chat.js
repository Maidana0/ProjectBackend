// PARA EL SOCKET SERVER, que esta con products
import { chatModel } from "../components/db/models/chat.models.js"
// user:{
//     type: String,
//     minLength: 5
// }, 
// message: {
//     type: String,
// }
export const socketChat = async (socketServer,socket)=>{
    const chat = await chatModel.find({})
    socketServer.emit('server:chat', chat)

    socket.on('client:newMessage', async(obj)=>{
        const message = await chatModel.create(obj)
        if(message){
            socket.emit('server:newMessage', message)
            console.log(message)
        }
    })

    


}


// (socket) => {
//     const lista = await onlineProducts.getProducts()
//     socketServer.emit('server:list', lista)

//     socket.on('client:newProduct', async (obj) => {
//         const product = await onlineProducts.addProduct(obj)
//         if (product.error) {
//             return socket.emit('server:error', product.error)
//         }
//         socket.emit('server:newProduct', product.sucess)
//         console.log(product)
//     })

//     socket.on('client:deleteProd', async (id) => {
//         await onlineProducts.deleteProduct(id)
//         const list = await onlineProducts.getProducts()
//         socketServer.emit('server:deleteProduct', list)

//     })
import { ProductManagerDB } from '../components/mongoDB/ProductManagerDB.js';
const onlineProducts = new ProductManagerDB()


export const socketProducts = async (socketServer, socket) => {
    const lista = await onlineProducts.getProducts()

    socketServer.emit('server:list', lista)

    socket.on('client:newProduct', async (obj) => {
        const product = await onlineProducts.addProduct(obj)
        if (product.error) {
            return socket.emit('server:error', product.error)
        }
        socket.emit('server:newProduct', product.sucess)
        console.log(product)
    })

    socket.on('client:deleteProd', async (id) => {
        await onlineProducts.deleteProduct(id)
        const list = await onlineProducts.getProducts()
        socketServer.emit('server:deleteProduct', list)
    })


}

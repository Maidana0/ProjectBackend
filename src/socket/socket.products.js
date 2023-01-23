import ProductManager from '../components/js/ProductManager.js';
import { __dirname } from '../utils.js';
// const onlineURL = __dirname + '/dataProducts.json'
const onlineURL = __dirname + '/components/db/Productos.json'

const onlineProducts = new ProductManager(onlineURL)
const lista = await onlineProducts.getProducts()

const socketProducts=(socketServer)=>{
    socketServer.on('connection',(socket)=>{
        socketServer.emit('server:list',lista)
    
    
        console.log('Cliente Conectado! ID:',socket.id)
        socket.on('disconnect', () => console.log('Usuario Desconectado! ID:',socket.id))
         
    
        socket.on('client:newProduct',async(obj)=>{
           const product=  await  onlineProducts.addProduct(obj)
           if(product.error){
            return socket.emit('server:error',product.error)
           }
            socket.emit('server:newProduct',product.sucess)
            console.log(product)
        })
        
        socket.on('client:deleteProd',async(id)=>{
            await onlineProducts.deleteProduct(id)
            const list = await onlineProducts.getProducts()
            socketServer.emit('server:deleteProduct', list)
            
        })
    
    
    })
}

export default socketProducts

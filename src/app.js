import express from 'express';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'


import socketProducts from './socket/socket.products.js';

// import ProductManager from './components/js/ProductManager.js';
// // const onlineURL = __dirname + '/dataProducts.json'
// const onlineURL = __dirname + '/components/db/Productos.json'

// const onlineProducts = new ProductManager(onlineURL)
// const lista = await onlineProducts.getProducts()


const PORT = 8080
const app = express()

app.engine( 'handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')
app.use(express.static(__dirname + '/../public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/views', viewsRouter)
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)


const httpServer = app.listen(PORT, () => console.log(`Server on Port: ${PORT}`))
const socketServer = new Server(httpServer)
socketProducts(socketServer)


// SEPARE ESTO Y LO PUSE EN LA CARPETA SOCKET
// socketServer.on('connection',(socket)=>{
//     socketServer.emit('server:list',lista)


//     console.log('Cliente Conectado! ID:',socket.id)
//     socket.on('disconnect', () => console.log('Usuario Desconectado! ID:',socket.id))
     

//     socket.on('client:newProduct',async(obj)=>{
//        const product=  await  onlineProducts.addProduct(obj)
//        if(product.error){
//         return socket.emit('server:error',product.error)
//        }
//         socket.emit('server:newProduct',product.sucess)
//         console.log(product)
//     })
    
//     socket.on('client:deleteProd',async(id)=>{
//         await onlineProducts.deleteProduct(id)
//         const list = await onlineProducts.getProducts()
//         socketServer.emit('server:deleteProduct', list)
        
//     })


// })

















// socketServer.on('connection', async (socket) => { 
//     const onProducts = await onlineProducts.getProducts()
//     console.log(onProducts)

//      socketServer.emit('listProducts', onProducts)

//     socket.on('lastProduct',async(obj)=>{
//       const last = await onlineProducts.addProduct(obj)
//        console.log(last)
//     //    socketServer.emit('lastProducts', last)
//         //  productos.push(obj)

//         // socketServer.emit('listProducts',productos[productos.length-1])
//     })
    
//  })


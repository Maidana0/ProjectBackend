import express from 'express';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'

import ProductManager from './components/js/ProductManager.js';
const onlineURL = __dirname + '/dataProducts.json'
const onlineProducts = new ProductManager(onlineURL)


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


socketServer.on('connection',(socket)=>{
    console.log('Cliente Conectado! ID:',socket.id)
    socket.on('disconnect', () => { 
        console.log('Usuario Desconectado! ID:',socket.id)
     })
    socket.on('newProduct',async(obj)=>{
       const product=  await  onlineProducts.addProduct(obj)
        if(product.sucess) return socketServer.emit('newProduct',product.newProduct)
        console.log(product)
        socket.emit('error',product.error)
    })
    



})

















// socketServer.on('connection', async (socket) => { 
//     const onProducts = await onlineProducts.getProducts()
//     console.log(onProducts)


//     console.log('Cliente Conectado! ID:',socket.id)
//     socket.on('disconnect', () => { 
//         console.log('Usuario Desconectado! ID:',socket.id)
//      })
//      socketServer.emit('listProducts', onProducts)

//     socket.on('lastProduct',async(obj)=>{
//       const last = await onlineProducts.addProduct(obj)
//        console.log(last)
//     //    socketServer.emit('lastProducts', last)
//         //  productos.push(obj)

//         // socketServer.emit('listProducts',productos[productos.length-1])
//     })
    
//  })


import express from 'express';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js'

import './components/db/dbConfig.js';


import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'


import socketProducts from './socket/socket.products.js';
// import socketChat from './socket/socket.chat.js';


const PORT = 8080
const app = express()


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/../public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/views', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



    const httpServer = app.listen(PORT, () => console.log(`Server on Port: ${PORT}`))
    const socketServer = new Server(httpServer)
    socketProducts(socketServer)
    // socketChat(socketServer)















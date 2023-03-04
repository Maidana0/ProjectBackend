import express from 'express';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js'

import './components/db/dbConfig.js';


import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'


import { SocketServer } from './socket/socket.js';
import cookieParser from 'cookie-parser';
import  session  from 'express-session';
import  FileStore  from 'session-file-store';
import MongoStore from 'connect-mongo';

import accountRouter from './routes/account.router.js'

const fileStore = FileStore(session)

const PORT = 8080
const app = express()

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use(cookieParser())
app.use(session({
    store: new fileStore({
        path: __dirname + '/sessions'
    }),
    secret: 'Nino',
    resave: false,
    saveUninitialized: false
}))

app.use(session({
    store: new MongoStore({
        mongoUrl: 'mongodb+srv://Maidana07:WoldEhtes@cluster0.2w1vbyb.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    secret: 'Nino',
    resave: false,
    saveUninitialized: false
}))

app.use(express.static(__dirname + '/../public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/views', viewsRouter)
app.use('/account', accountRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)



const httpServer = app.listen(PORT, () => console.log(`Server on Port: ${PORT}`))
const socketServer = new Server(httpServer)
SocketServer(socketServer)















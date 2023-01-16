import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'
import express from 'express';
import {__dirname} from './utils.js'

const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static(__dirname + '/../public'))

app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)




app.listen(PORT, () => console.log(`Server on Port: ${PORT}`))


// import ProductManager from "./components/ProductManager.js";
import products from "./components/Productos.json" assert { type: "json" };
import express from 'express';
const app = express()
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send(`Bienvenido a nuestro sitio web`)
})

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit)
    if(!limit) res.json({products})
    const prodLimit = products.filter(prode=>prode.id<=limit)
    res.json({prodLimit})

})

app.get('/products/:pid', (req, res) => {
    const idProduct = parseInt(req.params.pid)
    const producto = products.find(prod => prod.id === idProduct)
    if(!producto) res.send(`Ocurrio un Error. El producto con el ID: ${idProduct} no existe`)
    res.json({producto})
})





app.listen(8080, () => console.log(`Server on Port: ${8080}`))


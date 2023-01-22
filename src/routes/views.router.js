import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../components/js/ProductManager.js";
import CartManager from "../components/js/CartManager.js";

const router = Router()
const rutaProducts = __dirname + '/components/db/Productos.json'
const rutaCarts = __dirname + '/components/db/Carts.json'

const productManager = new ProductManager(rutaProducts)
const carts = new CartManager(rutaCarts,rutaProducts)


// const onlineURL = __dirname + '/dataProducts.json'
const onlineURL = __dirname + '/components/db/Productos.json'
const onlineProducts = new ProductManager(onlineURL)



// VIEWS PRODUCTOS
router.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit)
    const productos = await productManager.getProducts()
    if (!limit) return res.render('viewProducts', { 'list': productos, 'product': false })
    const prodLimit = await productos.filter(prode => prode.id <= limit)
    res.render('viewProducts', { 'list': prodLimit, 'product': false })
})
router.get('/products/:pid', async (req, res) => {
    const idProduct = parseInt(req.params.pid)
    const aProduct = await productManager.getProductById(idProduct)
    res.render('viewProducts', { 'list': aProduct, 'product': true })
})




// VIEWS CARTS
router.get('/carts', async (req, res) => {
  try {
    const allCarts = await carts.getCarts()
    res.render( 'viewCarts', {allCarts} )
  } catch (error) {
    console.log(error)
  }
})







// VIEWS REALTIMEPRODUCTS
router.get('/realtimeproducts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit)
    const products = await onlineProducts.getProducts()
    if (!limit)   return res.render('realTimeProducts', { 'list': products, 'product': false })
    
    const prodLimit = await products.filter(prode => prode.id <= limit)
    res.render('realTimeProducts', { 'list': prodLimit, 'product': false })

  } catch (error) {
    console.log(error)
  }

})

router.get('/realtimeproducts/:pid', async (req, res) => {
  try {
    const idProduct = parseInt(req.params.pid)
    const aProduct = await onlineProducts.getProductById(idProduct)
    res.render('realTimeProducts', { 'list': aProduct, 'product': true })

  } catch (error) {
    console.log(error)
  }
})




export default router
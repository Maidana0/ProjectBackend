import { Router } from "express";
// import { __dirname } from "../utils.js";
// import ProductManager from "../components/fileSystem/ProductManager.js";
// import CartManager from "../components/fileSystem/CartManager.js";
// const rutaProducts = __dirname + '/components/db/Productos.json'
// const rutaCarts = __dirname + '/components/db/Carts.json'
// const carts = new CartManager(rutaCarts,rutaProducts)
// const onlineURL = __dirname + '/components/db/Productos.json'
// const onlineProducts = new ProductManager(onlineURL)

const router = Router()

import { chatModel } from "../components/db/models/chat.models.js";
import { CartManagerDB } from "../components/mongoDB/CartManagerDB.js";
import { ProductManagerDB } from "../components/mongoDB/ProductManagerDB.js";
const onlineProducts = new ProductManagerDB()
const carts = new CartManagerDB()



//---------------------------------------------------------------------
//VIEWS CHAT
router.get('/chat', async (req, res) => {
  try {
    const chat =  await chatModel.find({})
    console.log(chat)
    res.render('chat',{chat})

  } catch (error) {
    console.log(error)
  }
})


//---------------------------------------------------------------------
// VIEWS CARTS
router.get('/carts', async (req, res) => {
  try {
    const allCarts = await carts.getCarts()
    console.log(allCarts)
    res.render('carts', { "allCarts": true, list: allCarts })
  } catch (error) {
    console.log(error)
  }
})
router.get('/carts/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const cart = await carts.getCart(cartId)
    console.log(cart)
    res.render('carts', { "allCarts": false, list: cart })
  } catch (error) {
    console.log(error)
  }
})


// VIEWS REALTIMEPRODUCTS
router.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit)
    const products = await onlineProducts.getProducts()
    if (!limit) return res.render('products', { 'list': products, 'product': false })

    const prodLimit = await products.filter(prode => prode.id <= limit)
    res.render('products', { 'list': prodLimit, 'product': false })

  } catch (error) {
    console.log(error)
  }

})

router.get('/products/:pid', async (req, res) => {
  try {
    const idProduct = parseInt(req.params.pid)
    const aProduct = await onlineProducts.getProductById(idProduct)
    res.render('products', { 'list': aProduct, 'product': true })

  } catch (error) {
    console.log(error)
  }
})




export default router
import { Router } from "express";
const router = Router()

import { chatModel } from "../components/db/models/chat.models.js";
import { cartsModel } from "../components/db/models/carts.model.js";
import { CartManagerDB } from "../components/mongoDB/CartManagerDB.js";
import { ProductManagerDB } from "../components/mongoDB/ProductManagerDB.js";
const onlineProducts = new ProductManagerDB()
const carts = new CartManagerDB()



//---------------------------------------------------------------------
//VIEWS CHAT
router.get('/chat', async (req, res) => {
  try {
    const chat = await chatModel.find({})
    console.log(chat)
    res.render('chat', { chat })

  } catch (error) {
    console.log(error)
  }
})


//---------------------------------------------------------------------
// VIEWS CARTS

router.get('/carts', async (req, res) => {
  try {
    const allCarts = await carts.getCarts()
    res.render('carts', { "viewsAll": true, allCarts })
    // res.json(allCarts)
  } catch (error) {
    console.log(error)
  }
})







router.get('/carts/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const cart = await carts.getCart(cartId)
    res.render('carts', { "viewsAll": false, cart })
  } catch (error) {
    console.log(error)
  }
})


// VIEWS REALTIMEPRODUCTS
// NO PUEDO USAR EL SOCKET POR QUE NO TENGO COMO PASARLE LOS REQ.QUERY xd espero respuesta ah
router.get('/products', async (req, res) => {
  try {
    function ordenar(orde) {
      if (orde == 'asc') return 1
      if (orde == 'desc') return -1
      else { return false }
    }

    const limit = req.query.limit ? Number(req.query.limit) : 10
    const page = req.query.page ? Number(req.query.page) : 1
    const query = req.query.query ? { category: req.query.query } : { status: true }
    const sort = req.query.sort ? { price: ordenar(req.query.sort) } : { _id: 1 }

    const obj = { limit, page, sort, query }

    const products = await onlineProducts.getProducts(obj)
    return res.render('products', { 'list': products.payload, 'product': false })


  } catch (error) {
    console.log(error)
  }

})

router.get('/products/:pid', async (req, res) => {
  try {
    const idProduct = req.params.pid
    const aProduct = await onlineProducts.getProductById(idProduct)
    console.log(aProduct)
    res.render('products', { 'list': aProduct, 'product': true })

  } catch (error) {
    console.log(error)
  }
})




export default router
import { Router } from "express";
const router = Router()
import { isLogged, auth } from "../middlewares/auth.middleware.js";

import { chatModel } from "../components/db/models/chat.models.js";
import { CartManagerDB } from "../components/mongoDB/CartManagerDB.js";
import { ProductManagerDB } from "../components/mongoDB/ProductManagerDB.js";
const onlineProducts = new ProductManagerDB()
const carts = new CartManagerDB()

//---------------------------------------------------------------------
//VIEWS CHAT
router.get('/chat', auth, async (req, res) => {
  try {
    const chat = await chatModel.find({})

    res.render('chat', { chat })

  } catch (error) {
    console.log(error)
  }
})
//---------------------------------------------------------------------
// VIEWS CARTS

router.get('/carts', auth, async (req, res) => {
  try {
    const allCarts = await carts.getCarts()
    res.render('carts', { "viewsAll": true, allCarts })
  } catch (error) {
    console.log(error)
  }
})
router.get('/carts/:cid', auth, async (req, res) => {
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
router.get('/products', auth, async (req, res) => {
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

    const admin = req.session.isAdmin
    const logged = req.session.logged

    return res.render('products', {
      'list': products.payload,
      'product': false,


      admin,
      email: req.session.email,
      logged
    })
    // ESTO DE ARRIBA ESTA DUDOSO XD USERS?

  } catch (error) {
    console.log(error)
  }

})

router.get('/products/:pid', auth, async (req, res) => {
  try {
    const idProduct = req.params.pid
    const aProduct = await onlineProducts.getProductById(idProduct)
    res.render('products', { 'list': aProduct[0], 'product': true })

  } catch (error) {
    console.log(error)
  }
})
//---------------------------------------------------------------------
//---------------------------------------------------------------------

// LOGIN
router.get('/login', isLogged, async (req, res) => {
  try {
    res.render('login', { login: true })
  } catch (error) {
    console.log(error)
  }
})
// REGISTER
router.get('/register', isLogged, async (req, res) => {
  try {
    res.render('login', { login: false, finish: false })
  } catch (error) {
    console.log(error)
  }
})




export default router
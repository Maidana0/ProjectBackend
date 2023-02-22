import { Router } from "express";
import { CartManagerDB } from "../components/mongoDB/CartManagerDB.js";
const router = Router()

const carts = new CartManagerDB()

router.post('/', async (req, res) => {
    try {
        const addCart = await carts.addCart()
        res.send(addCart)

    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const idCart = req.params.cid
        const aCart = await carts.getCart(idCart)
        // res.redirect(`/views/carts/${aCart._id}`)
        res.json(aCart)
    } catch (error) {
        console.log(error)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params

        const carti = await carts.addProduct(cid, pid)
        res.send(carti)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const currentCart = await carts.updateQuantity(cid, pid, quantity)
        res.json(currentCart)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const { products } = req.body
        const newProducts = await carts.updateCart(cid, products)
        res.json(newProducts)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const currentCart = await carts.deleteThisProduct(cid, pid)
        res.send(currentCart)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const deleteProducts = await carts.deleteAllProducts(cid)
        res.json(deleteProducts)
    } catch (error) {
        console.log(error)
    }
})










export default router
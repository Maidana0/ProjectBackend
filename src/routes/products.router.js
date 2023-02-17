import { Router } from "express";
// import ProductManager from "../components/fileSystem/ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router()
// const ruta = __dirname + '/components/db/Productos.json'
// const prod = new ProductManager(ruta)

import { ProductManagerDB } from "../components/mongoDB/ProductManagerDB.js";
const prod = new ProductManagerDB()


router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        if (!limit) res.redirect('/views/products')
        else {
            res.redirect(`/views/products?limit=${limit}`)
        }
    } catch (error) {
        console.log(error)
    }
})


router.get('/:pid', async (req, res) => {
    try {
        const idProduct = req.params.pid
        res.redirect(`/views/products/${idProduct}`)
    } catch (error) {
        console.log(error)
    }
})







router.post('/', async (req, res) => {
    try {
        const obj = req.body
        const addProduct = await prod.addProduct(obj)

        if (addProduct.error) return res.json(addProduct)
        res.json(addProduct)
        //  res.redirect('/views')
    } catch (error) {
        console.log(error)
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const idProd = req.params.pid
        const obj = req.body
        const updateProd = await prod.updateProduct(idProd, obj)
        res.json(updateProd)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const product = parseInt(req.params.pid)
        const deleteProduct = await prod.deleteProduct(product)
        res.json(deleteProduct)
    } catch (error) {
        console.log(error)
    }
})


export default router
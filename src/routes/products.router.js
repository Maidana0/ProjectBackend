import { Router } from "express";
import ProductManager from "../components/js/ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router()
const ruta = __dirname + '/components/db/Productos.json'
const prod = new ProductManager(ruta)


router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit)
    const productos = await prod.getProducts()

    if(!limit) res.json(productos)
    else{
    const prodLimit = await productos.filter(prode=>prode.id<=limit)
    res.json({prodLimit})
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const idProduct =  parseInt(req.params.pid)
        const aProduct = await prod.getProductById(idProduct)
        res.json(aProduct)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req,res)=>{
    try {
        const obj = req.body
        const addProduct= await prod.addProduct(obj)
        res.json(addProduct)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:pid', async(req,res)=>{
    try {
        const idProd =  parseInt(req.params.pid)
        const obj = req.body
        const updateProd = await prod.updateProduct(idProd,obj)
        res.json(updateProd)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res)=>{
    try {
        const product =  parseInt(req.params.pid)
        const deleteProduct = await prod.deleteProduct(product)
        res.json(deleteProduct)
    } catch (error) {
        console.log(error)
    }
})


export default router
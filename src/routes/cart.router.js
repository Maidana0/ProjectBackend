import { Router } from "express";
import CartManager from "../components/js/CartManager.js";
import { __dirname } from "../utils.js";

const router = Router()

const URLcarts = __dirname + '/components/db/Carts.json'
const URLproducts = __dirname + '/components/db/Productos.json'
console.log(URLproducts)
const carts = new CartManager(URLcarts,URLproducts)

router.post('/', async(req,res)=>{
    try {
        const addCart = await carts.addCart()
        res.send( addCart )

    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const idCart = parseInt(req.params.cid)
        const aCart = await carts.getCart(idCart)
        res.json(aCart)

    } catch (error) {
        console.log(error)
    }
})

router.post('/:cid/product/:pid', async(req,res)=>{
    try {
        const {cid,pid} = req.params

        const carti= await carts.addProduct(cid,pid)

        res.send(carti)
    } catch (error) {
        console.log(error)
    }
})






export default router
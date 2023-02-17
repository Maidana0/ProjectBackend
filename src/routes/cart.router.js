import { Router } from "express";
// import CartManager from "../components/fileSystem/CartManager.js";
// import { __dirname } from "../utils.js";
import { CartManagerDB } from "../components/mongoDB/CartManagerDB.js";

const router = Router()

// const URLcarts = __dirname + '/components/db/Carts.json'
// const URLproducts = __dirname + '/components/db/Productos.json'
// const carts = new CartManager(URLcarts,URLproducts)
const carts = new CartManagerDB()

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
        const idCart = req.params.cid
        const aCart = await carts.getCart(idCart)
        res.redirect(`/views/carts/${aCart._id}`)
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
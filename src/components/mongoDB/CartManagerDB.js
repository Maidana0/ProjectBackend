import { cartsModel } from "../db/models/carts.model.js";
import { productsModel } from "../db/models/products.model.js";

export class CartManagerDB {

    async getCarts() {
        try {
            const listCarts = await cartsModel.find({})
            return listCarts && listCarts
        } catch (error) { return { error } }
    }

    async getCart(getId) {
        try {
            const getCart = await cartsModel.findById(getId)
            if (getCart) return getCart
            return {
                "error": "El carrito que buscas no existe en nuestra base de datos."
            }

        } catch (error) { return { error } }
    }

    async addCart() {
        try {

            const newCart = await cartsModel.create({ "products": [] })
            return (
                { "sucess": "Carrito agregado con Exito!", newCart }
            )
        }

        catch (error) {
            return { error }
        }
    }
    async addProduct(cid, pid) {
        try {
            const product = await productsModel.findById(pid)
            const addprod = await cartsModel.findByIdAndUpdate(cid, { products: [{id:product._id, quantity: 1}] }, {new:true})

            return { addprod }

        } catch (error) {
            return { error }
        }
    }
    // deje esto aca para guiarme pero pienso preguntar como se hace xd
    // async addProduct(cid, pid) {
    //     try {
    //         const thisCart = await this.getCart(Number(cid))
    //         const addThisProduct = await this.products.find((prod) => prod.id === Number(pid))
    //         if (thisCart.error || !addThisProduct) {
    //             return { "error": "El carrito o producto no existe en nuestra base de datos." }
    //         }

    //         const indexCart = await this.carts.indexOf(thisCart)
    //         const repetido = this.carts[indexCart].products.find(products => products.product === addThisProduct.id)
    //         if (repetido) {
    //             repetido.quantity++
    //             fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts, null, 2))
    //             return { "sucess": "Producto agregado con exito!", thisCart }
    //         }

    //         const newProd = {
    //             "product": addThisProduct.id,
    //             "quantity": 1
    //         }
    //         await this.carts[indexCart].products.push(newProd)
    //         fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts, null, 2))
    //         return { "sucess": "Producto agregado con exito!", thisCart }


    //     } catch (er) {
    //         const error = String(er); return { error }
    //     }
    // }

}
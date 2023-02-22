import { cartsModel } from "../db/models/carts.model.js";
import { productsModel } from "../db/models/products.model.js";

export class CartManagerDB {

    async getCarts() {
        try {
            const listCarts = await cartsModel.find()
            return listCarts && listCarts
        } catch (error) { return { error } }
    }

    async getCart(getId) {
        try {
            const getCart = await cartsModel.find({_id:getId})
            if (getCart[0]) return getCart[0]
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

            const thisCart = await cartsModel.findById(cid)
            const thisProduct = await productsModel.findById(pid)
            const repetido = thisCart.products.find(item => item.product == pid)
            if (repetido === undefined) {
                thisCart.products.push(
                    {
                        product: pid,
                        quantity: 1
                    }
                )
            } else {
                const i = thisCart.products.indexOf(repetido)
                const re = { ...repetido, quantity: repetido.quantity + 1 }
                thisCart.products.splice(i, 1, re)
            }
            const currentCart = await thisCart.save()
            return { message: 'Producto Agregado!',currentCart }
        } catch (error) {
            return { error }
        }
    }
}
import { cartsModel } from "../db/models/carts.model.js";
import { productsModel } from "../db/models/products.model.js";

export class CartManagerDB {

    async getCarts() {
        try {
            // const listCarts = await cartsModel.find()
            // return listCarts && listCarts
            const infoProducts = await cartsModel.paginate({}, {lean:true})
            return infoProducts.docs
        } catch (error) { return { error } }
    }

    async getCart(getId) {
        try {
            // const getCart = await cartsModel.find({ _id: getId })
            const getCart = await cartsModel.paginate({_id:getId},{lean:true})
            console.log(getCart)
            if (getCart.docs) return getCart.docs[0]
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
            return { message: 'Producto Agregado!', currentCart }
        } catch (error) {
            return { error }
        }
    }

    async updateQuantity(cid, pid, quantity) {
        try {
            const thisCart = await cartsModel.findById(cid)
            const thisProduct = await thisCart.products.find(item => item.product == pid)
            const newProduct = { ...thisProduct, quantity }

            const i = thisCart.products.indexOf(thisProduct)
            if (i >= 0) {
                thisCart.products.splice(i, 1, newProduct)
                const currentCart = await thisCart.save()
                return { message: 'Cantidad Actualizada!', currentCart }
            }
            else {
                return { message: `El producto con el ID: ${pid} no se encuentra en el carrito con el ID: ${cid}` }
            }
        } catch (error) {
            return {
                message: `Ocurrio un error al intentar actualizar el producto (${pid}), en el carrito (${cid})`,
                error
            }
        }
    }

    async updateCart(cid, products) {
        try {
            console.log(products)
            const thisCart = await cartsModel.findById(cid)
            thisCart.products = products
            const currentCart = await thisCart.save()
            return { message: 'Productos Actualizados!', currentCart }
        } catch (error) {
            return {
                message: `Ocurrio un error al intentar actualizar el carrito con el id: ${cid}`,
                error
            }
        }
    }

    async deleteThisProduct(cid, pid) {
        try {
            const thisCart = await cartsModel.findById(cid)
            const thisProduct = thisCart.products.findIndex(item => item.product == pid)
            if (thisProduct >= 0) {
                thisCart.products.splice(thisProduct, 1)
                const currentCart = await thisCart.save()
                return { message: 'Producto Eliminado!', currentCart }
            }
            else {
                return { message: 'No se encuentra el producto solicitado!!' }
            }

        } catch (error) {
            return {
                message: `Ocurio un error, intentelo de nuevo verificando la id del carrito: ${cid}`,
                error
            }
        }
    }

    async deleteAllProducts(cid) {
        try {
            const thisCart = await cartsModel.findById(cid)
            thisCart.products = []
            const currentCart = await thisCart.save()
            return {
                message: 'Carrito vacio!', currentCart
            }

        } catch (error) {
            return {
                message: `No logramos encontrar el carrito con el id: ${cid}`,
                error
            }
        }

    }
}
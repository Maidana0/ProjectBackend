import fs from 'fs'

export class CartManager {
    constructor(URLcarts, URLproducts) {
        this.cartsPath = URLcarts
        this.productsPath = URLproducts

        const listCarts = fs.existsSync(this.cartsPath)
            ? JSON.parse(fs.readFileSync(this.cartsPath, 'utf-8'))
            : []
        const listProducts = JSON.parse(fs.readFileSync(this.productsPath, 'utf-8'))

        this.carts = listCarts
        this.products = listProducts
    }
    #generarId() {
        return this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1
    }

    async addCart() {
        try {
            const carts = await this.carts
            const newCart = {
                "id": this.#generarId(),
                "products": []
            }
            carts.push(newCart)
            fs.promises.writeFile(this.cartsPath, JSON.stringify(carts, null, 2))
            return (
                { "sucess": "Carrito agregado con Exito!", "newCart": newCart }
            )
        }

        catch (error) {
            return { "error": error }
        }
    }

    async getCart(getId) {
        try {
            const getCart = await this.carts.find(cart => cart.id === getId)
            if (getCart) return getCart
            else {
                return {
                    "error": "El carrito que buscas no existe en nuestra base de datos."
                }
            }
        } catch (er) { const error = String(er); return { "error": error } }
    }

    async addProduct(cid, pid) {
        try {
            const thisCart = await this.getCart(Number(cid))
            const addThisProduct = await this.products.find((prod) => prod.id === Number(pid))
            if (thisCart.error || !addThisProduct) {
                return { "error": "El carrito o producto no existe en nuestra base de datos." }
            }
            else {
                const indexCart = await this.carts.indexOf(thisCart)
                const repetido = this.carts[indexCart].products.find(products => products.product === addThisProduct.id)
                if (repetido) {
                    repetido.quantity++
                    fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts, null, 2))
                    return {"sucess": "Producto agregado con exito!", thisCart}
                }
                else {
                    const newProd = {
                        "product": addThisProduct.id,
                        "quantity": 1
                    }
                    await this.carts[indexCart].products.push(newProd)
                    fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts, null, 2))
                    return {"sucess": "Producto agregado con exito!", thisCart}
                }
            }


        } catch (error) {
            console.log(error)
        }
    }

}



export default CartManager
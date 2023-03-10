import fs from 'fs'


const textError = numero => `Ocurrio un Error. El producto con el id:"${numero}" no existe.`

export class ProductManager {
    constructor(ruta) {
        this.path = ruta
        const listProducts = fs.existsSync(this.path)
            ? JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            : []
        this.products = listProducts
    }
    #generarId() {
        return this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
    }

    async addProduct(obj) {
        try {
            const { title, description, code, price, status, stock, category, thumbnails } = obj
            const productos = await this.products
            const alReadyExist = productos.some(item => item.code === code)

            if (alReadyExist) return ({ "error": `Ocurrio un Error. El code "${code}" ya existe.` })

            const currentProduct = {
                title, description, code, price, status, stock, category, thumbnails
            }

            const incomplete = (Object.values(currentProduct)).includes(undefined||'')
            if (incomplete) {
                return (
                    {
                        "error": [
                            "Ocurrio un Error. Asegurese de completar todos los campos.",
                            "Campos Obligatorios: title, description, price, thumbnail, code, stock"
                        ],
                        "su-producto-actual": currentProduct
                    }
                )
            }

            const addedProduct = { id: this.#generarId(), ...currentProduct }
            productos.push(addedProduct)
            fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
            return ({ "sucess": "Producto Agregado con Exito!", "newProduct": addedProduct })


        }
        catch (er) {
            const error = String(er); return { "error": error }
        }
    }

    async getProducts() {
        try {
            return this.products
        } catch (er) {
            const error = String(er); return { "error": error }
        }
    }

    async getProductById(getId) {
        try {
            const getProduct = this.products.find(prod => prod.id === getId)
            if (getProduct) return getProduct;
            return { "error": textError(getId) }
        } catch (er) {
            const error = String(er); return { "error": error }
        }
    }

    async updateProduct(idProd, obj) {
        try {
            const updateThis = this.products.find(prod => prod.id === idProd)
            if (!updateThis) return { "error": textError(idProd) };

            const updateProd = { ...updateThis, ...obj }
            const changeThis = this.products.indexOf(updateThis)
            changeThis >= 0 && this.products.splice(changeThis, 1, updateProd)

            fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            return { "productoModificado": updateProd }

        }
        catch (er) {
            const error = String(er); return { "error": error }
        }
    }

    async deleteProduct(byId) {
        try {
            const deleteProd = await this.products.indexOf(this.products.find(prod => prod.id === Number(byId)))
            if (deleteProd >= 0) {
                await this.products.splice(deleteProd, 1)
                if (this.products.length > 0) {
                    fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
                    return { "sucess": "Producto Eliminado con exito!" }
                }
                fs.promises.unlink(this.path)
            }
            return { "error": textError(byId) }
        } catch (er) {
            const error = String(er); return { "error": error }
        }
    }

}


export default ProductManager


// const fs = require('fs')
import fs from 'fs'


const textError = numero => console.log(`Ocurrio un Error. El producto con el id:"${numero}" no existe.`)
class ProductManager {
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

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const productos = await this.products
            const alReadyExist = productos.some(item => item.code === code)

            if (alReadyExist) console.log(`Ocurrio un Error. El code "${code}" ya existe.`)
            else {
                const product = {
                    id: this.#generarId(),
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }

                const incomplete = (Object.values(product)).includes(undefined)
                if (incomplete) console.log('Ocurrio un Error. Asegurese de completar todos los campos.')
                else {
                    productos.push(product)
                    fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async getProducts() {
        try {
            console.log(this.products)
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(getId) {
        try {
            const getProduct = this.products.find(prod => prod.id === getId)
            getProduct ? console.log(getProduct) : textError(getId)
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(idProd, obj) {
        try {
            const updateThis = this.products.find(prod => prod.id === idProd)
            if (!updateThis) {
                console.log(textError(idProd))
            } else {
                const updateProd = {
                    id: updateThis.id,
                    title: obj.title ? obj.title : updateThis.title,
                    description: obj.description ? obj.description : updateThis.description,
                    price: obj.price ? obj.price : updateThis.price,
                    thumbnail: obj.thumbnail ? obj.thumbnail : updateThis.thumbnail,
                    code: obj.code ? obj.code : updateThis.code,
                    stock: obj.stock ? obj.stock : updateThis.stock,
                }
                const changeThis = this.products.indexOf(updateThis)
                changeThis >= 0 && this.products.splice(changeThis, 1, updateProd)

                fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(byId) {
        try {
            const deleteProd = await this.products.indexOf(this.products.find(prod => prod.id === byId))
            if (deleteProd >= 0) {
                await this.products.splice(deleteProd, 1)
                if (this.products.length > 0) {
                    fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
                } else {
                    fs.promises.unlink(this.path)
                }

            } else { textError(byId) }
        } catch (error) {
            console.log(error)
        }
    }

}

//  const ProductoManager = new ProductManager('Productos.json')
// for (let index = 1; index < 11; index++) {
//     const prueba=(numero,precio,stock)=>{
//          productManager.addProduct(
//             `Producto ${numero}`,
//             `Esta descripcion pertenece al producto numero: ${numero}`,
//             precio,
//             `Sin Imagen`,
//             `abc${numero}`,
//             stock
//         )
//     }
//     prueba(index,index*100,index*50)
// }
export default ProductManager
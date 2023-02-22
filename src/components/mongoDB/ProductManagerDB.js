import { productsModel } from "../db/models/products.model.js"


const textError = numero => `Ocurrio un Error. El producto con el id:"${numero}" no existe.`

export class ProductManagerDB {

    async getProducts() {
        try {
            const listProducts = await productsModel.find()

            return listProducts && listProducts

        } catch (error) {
            return { error }
        }
    }

    async getProductById(getId) {
        try {
            const getProduct = await productsModel.find({_id:getId})
            if (getProduct) {
                return getProduct
            }
            return { "error": textError(getId) }

        } catch (error) {
            return { error }
        }
    }

    async addProduct(obj) {
        try {
            const { title, description, code, price, status, stock, category, thumbnails } = obj
            const alReadyExist = await productsModel.find({ code: code })
            
            if (alReadyExist) return { "error": `Ocurrio un Error. El code "${code}" ya existe.` }

            const currentProduct = {
                title, description, code, price, status, stock, category,
                "thumbnails": [thumbnails]
            }

            const addedProduct = await productsModel.create(currentProduct)
            return {
                "sucess": "Producto Agregado con Exito!",
                "newProduct": addedProduct
            }
        }
        catch (error) {
            return { error }
        }
    }

    async updateProduct(idProd, obj) {
        try {
            const updateProd = await productsModel.findByIdAndUpdate(idProd, obj,
                { new: true })
            // if (!updateProd) return { "error": textError(idProd) };
            return { "productoModificado": updateProd }
        }
        catch (error) {
            return { error }
        }
    }

    async deleteProduct(byId) {
        try {
            const deleteThis = await productsModel.findByIdAndDelete(byId)
            if (deleteThis) {
                return {
                    "sucess": "Producto Eliminado con exito!",
                    "product": deleteThis
                }
            }
            // return { "error": textError(byId) }
        } catch (error) {
            return { error }
        }
    }
}



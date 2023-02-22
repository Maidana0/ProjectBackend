import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:{
        type: Array,
        default:[],
        
        product: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }]
        ,
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }
})

cartSchema.pre('find',function (next){
    this.populate('products.product')
    next()
  })

export const cartsModel = mongoose.model('carts', cartSchema)

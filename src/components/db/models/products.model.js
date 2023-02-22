import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true,
        index: true
    },
    status:{
        type: Boolean,
        required: true
        },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true,
        index: true
    },
    thumbnails:{
        type: Array,
        required: true
    }
})
productSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model('products', productSchema)
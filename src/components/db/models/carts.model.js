import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema({
//     products:{
//         id: {
//             type: String,
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true
//         }
//     },  
// })

const cartSchema = new mongoose.Schema({
    products:{
        type:Array,
        required: true
    }
})


// const cartProductsSchema = new mongoose.Schema({
//     // "_id":{
//     //     type: isObjectIdOrHexString
//     // },
//     "quantity": {
//         type: Number,
//         required: true
//     }
// })


export const cartsModel = mongoose.model('carts', cartSchema)

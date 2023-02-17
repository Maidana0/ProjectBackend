import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        minLength: 2
    }, 

    message: {
        type: String,
        required: true
    }
})

export const chatModel = mongoose.model('messages', chatSchema)
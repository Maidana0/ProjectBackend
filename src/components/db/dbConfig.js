import mongoose from 'mongoose'
const URL = 'mongodb+srv://Maidana07:WoldEhtes@cluster0.2w1vbyb.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.set('strictQuery', true)
mongoose.connect(URL, (error) => {
    error ? console.log('Error al intentar conectarse a la base de datos: ', error)
        : console.log('Conectado con exito a la base de datos')
})


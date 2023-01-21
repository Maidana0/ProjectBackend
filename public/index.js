const socket = io()

const contain = document.getElementById('contain')
const form = document.getElementById('formProduct')
const error = document.getElementById('error')

const inputTitle = document.querySelector('#title')
const inputDescription = document.querySelector('#description')
const inputCode = document.querySelector('#code')
const inputPrice = document.querySelector('#price')
const inputStock = document.querySelector('#stock')
const inputCategory = document.querySelector('#category')
const inputThumbnails = document.querySelector('#thumbnails')
const inputStatus = document.querySelector('#status')

form.onsubmit = (e) => {
    e.preventDefault()
    const obj = {
        "title": inputTitle.value,
        "description": inputDescription.value,
        "code": inputCode.value,
        "price": inputPrice.value,
        "stock": inputStock.value,
        "category": inputCategory.value,
        "thumbnails": inputThumbnails.value,
        "status": inputStatus.value
    }

    socket.emit('newProduct', obj)
    form.reset()
}
socket.on('error',(e)=>{
    error.textContent ="**" + e + "**"
})

socket.on('newProduct',async(obj)=>{
    let div = document.createElement('div')
    div.classList.add('list-products')
    div.innerHTML = `
    <div class="products-header">
    <p> ${obj.id}</p>
    <h3>${obj.title}</h3>
    <p>${obj.code}</p>
    </div>
    <p> Categoria: ${obj.category} </p>
    <p> ${obj.description} </p>
    <p> Precio: ${obj.price}</p>
    <p> Stock: ${obj.stock}</p>
    <p> Estado: ${obj.status}</p>
    <div>Imagenes:${obj.tumbnails}</div>
    `
        contain.appendChild(div)
})




// socket.on('listProducts',  async (obj) => {
// obj.forEach( obj=>{ //{ TENGO QUE HACER UNO FOREACH PARA EL PRINCIPIO Y UNO COMO EL DE ABAJO PARA EL PROGRESO
//     let div = document.createElement('div')
//     div.classList.add('list-products')
//     div.innerHTML = `
//     <div class="products-header">
//     <p> ${obj.id}</p>
//     <h3>${obj.title}</h3>
//     <p>${obj.code}</p>
//     </div>
//     <p> Categoria: ${obj.category} </p>
//     <p> ${obj.description} </p>
//     <p> Precio: ${obj.price}</p>
//     <p> Stock: ${obj.stock}</p>
//     <p> Estado: ${obj.status}</p>
//     <div>Imagenes:${obj.tumbnails}</div>
//     `
//     contain.append(div)
// });
// })
// socket.on('lastProducts', async (obje) => {
//     console.log(obje)
//     const obj = obje.newProduct
//     // await obj.forEach(obj =>{ //{ TENGO QUE HACER UNO FOREACH PARA EL PRINCIPIO Y UNO COMO EL DE ABAJO PARA EL PROGRESO
//         let div = document.createElement('div')
//         div.classList.add('list-products')
//         div.innerHTML = `
//         <div class="products-header">
//         <p> ${obj.id}</p>
//         <h3>${obj.title}</h3>
//         <p>${obj.code}</p>
//         </div>
//         <p> Categoria: ${obj.category} </p>
//         <p> ${obj.description} </p>
//         <p> Precio: ${obj.price}</p>
//         <p> Stock: ${obj.stock}</p>
//         <p> Estado: ${obj.status}</p>
//         <div>Imagenes:${obj.tumbnails}</div>
//         `
//         contain.append(div)
//     // });
// })




//PUBLIC 
const socketChat = io()

const containChat = document.getElementById('allMsg')

const sendForm = document.getElementById('msgForm')
const inputMsg = document.getElementById('newMsg')

    sendForm.onsubmit = (e) =>{
        e.preventDefault()
        console.log(inputMsg.value)
        
        sendForm.reset()

    }


/*
if(form){
    form.onsubmit = e => {
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
    
        socket.emit('client:newProduct', obj)
        form.reset()
    }
}

const addProduct = obj => {
    const div = document.createElement('div')
    div.classList.add('list-products')
    div.innerHTML = `
            <div class="products-header">
                <p> ${obj.id}</p>
                <h3>${obj.title}</h3>
            <p>${obj.code}</p>
            </div>
            <p> Categoria: ${obj.category} </p>
            <p> Descripcion: ${obj.description} </p>
            <p> Precio: ${obj.price}</p>
            <p> Stock: ${obj.stock}</p>
            <p> Estado: ${obj.status}</p>
            <div>
                Imagenes:${obj.thumbnails}
            </div>
            <button id="btn-update" data-id="${obj._id}">Editar</button>
            <button id="btn-delete" data-id="${obj._id}">Borrar</button>
    `
    if(!contain) return
    contain.appendChild(div)
    const btnUpdate = div.querySelector('#btn-update')
    const btnDelete = div.querySelector('#btn-delete')

    btnDelete.addEventListener('click', (e) => {
        e.preventDefault()
        socket.emit('client:deleteProd', btnDelete.dataset.id)
        console.log("Borrar elemento: " + btnDelete.dataset.id)
        const deleteThis= lista.find((producto)=>producto._id==btnDelete.dataset.id)
        const index = lista.indexOf(deleteThis)
        lista.splice(index,1)
    })

    btnUpdate.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(`El producto con el id: ${btnUpdate.dataset.id}, esta en proceso de ser modificado(?`)
    })
}


let lista = []
console.log(lista)
socket.on('server:list', async(data) => {
    await data.forEach((product) => {
        console.log(product)
        const repetido = lista.find((prod) => prod._id === product._id)
        if (!repetido) {
             lista.push(product)
             addProduct(product)
            return
        }
        console.log("producto repetido")
    })
})

socket.on('server:deleteProduct',async(data) => {
    console.log(data)
    lista = []
    await data.forEach((product) => {
        lista.push(product)
        addProduct(product)
    }) 
    contain.innerHTML=' '
    lista.forEach((dataa)=>addProduct(dataa))
})


const msjForm = document.getElementById('msj-form')
socket.on('server:error', (e) =>  msjForm.textContent = "**" + e + "**")
socket.on('server:newProduct', e => msjForm.textContent = e + "!!")

*/
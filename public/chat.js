//PUBLIC 
const socketChat = io()
const mainChatContain = document.getElementById('chatContain')
const logout = document.getElementById('logout')
const user = localStorage.getItem('user') ? localStorage.getItem('user') : false
logout.addEventListener('click', () => {
    localStorage.removeItem('user')
    location.reload()
})

if (!user) {
    mainChatContain.innerHTML = `
    <img class='bigLogo' src="../../images/batman_log.png">
    <form id="login" class="form">
        <input id="user" autocomplete="off" type="string" placeholder="Escriba su usario" required>
        <input type="submit" value="Ingresar">
    </from>
    `
    const formLogin = document.getElementById('login')
    const userName = document.getElementById('user')

    formLogin.onsubmit = (e => {
        e.preventDefault()
        localStorage.setItem('user', userName.value)
        location.reload()
    })

} else {
    mainChatContain.innerHTML = `
    <div id="allMsg" class="chat-msg">
        <div id="contain-newMsg" class="msg-byOTher">
        </div>
    </div>
    
    <form id="msgForm" class="chat-form">
        <input id="newMsg" type="text" autocomplete="off" placeholder="Ingrese su mensaje...">
        <input type="submit" value="Enviar">
    </form>
    `
    logout.classList.add('on')

    const containChat = document.getElementById('allMsg')
    const sendForm = document.getElementById('msgForm')
    const inputMsg = (document.getElementById('newMsg'))

    const addMsg = (obj, bool) => {
        containChat.scrollTo(100000,100000)

        const div =  document.createElement('div')
        div.classList.add('contain-newMsg')
        if(bool) div.classList.add('msg-byUser')
          div.innerHTML = `
        <div class="message">
        <strong> ${obj.user} </strong>
        <p>${obj.message} </p>
        </div>
        `

        if (!containChat) return
        containChat.appendChild(div)
    }

    sendForm.onsubmit = (e) => {
        e.preventDefault()
        const objMsg = {
            user: user,
            message: inputMsg.value
        }
        socketChat.emit('client:newMessage', objMsg)
        sendForm.reset()
        containChat.scrollTo(100000,100000)
    }



    let messages = []
    console.log(messages)
    socketChat.on('server:chat', async data => {
        await data.forEach((msg) => {
            console.log(msg)
            const repetido = messages.find((obj) => obj._id === msg._id)
            if (!repetido) {
                const eso = msg.user == user ? true : false
                messages.push(msg)
                addMsg(msg,eso)
                return
            }
        })
    })







}

/*



const msjForm = document.getElementById('msj-form')
socket.on('server:error', (e) =>  msjForm.textContent = "**" + e + "**")
socket.on('server:newProduct', e => msjForm.textContent = e + "!!")

*/
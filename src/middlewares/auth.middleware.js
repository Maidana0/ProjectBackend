import jwt from "jsonwebtoken"

export function auth(req, res, next) {
    if (req.session.logged) next()
    else {
        res.redirect('/views/login')
    }
}
export function isLogged(req, res, next) {
    if (req.session.logged) {
        res.redirect('/views/products')
    } else {
        next()
    }
}

export function jwtVerify(req, res, next) {
    const authorizationHeader = req.get('Authorization')

    const token = authorizationHeader.split(' ')[1]

    const isValid = jwt.verify(token, 'secretJWT')
    if (isValid) {
        req.user =  isValid.user

        req.user.email == 'adminCoder@coder.com' ? req.user.isAdmin = true
            : req.user.isAdmin = false
        req.user.logged = true

        next()
    }
    else{
        res.send('Ocurrio un error')
    }
}
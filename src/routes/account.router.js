import { Router } from "express";
const router = Router()

const users = []



// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const user = users.find((u) => {
//       (u.email == email) && (u.password == password)
//     })
//     if (user) {
//       for (const key in req.body) {
//         req.session[key] = req.body[key];
//       }
//       res.redirect('/views/products')
//     }
//     else {
//       res.render('login', { login: true, deny: true })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })


// router.post('/register', async (req, res) => {
//   try {
//     const alreadyExist = users.find((u) => u.email == email)
//     if (alreadyExist) {
//       res.render('login', { login: false, finish: false, denyEmail: true })
//     } else {
//       users.push(req.body)
//       res.render('login', { login: false, finish: true })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })


// ------------------------------MONGO-------------------------------------

// ------------------------------MONGO-------------------------------------
import { usersModel } from "../components/db/models/users.models.js";

// LOGIN

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await usersModel.find({email,password})

    if(email=='adminCoder@coder.com' && password=='adminCod3r123'){
      // localStorage.setItem('admin', true)
      req.session.isAdmin = true
    }else{
      // localStorage.setItem('admin', false)
      req.session.isAdmin = false
    }


    if (user.length !== 0) {
      for (const key in req.body) {
        req.session[key] = req.body[key];
      }
      req.session.logged = true
      res.redirect('/views/products')
    }
    else {
      res.render('login', { login: true, deny: true })
    }
  } catch (error) {
    console.log(error)
  }
})

// REGISTER

router.post('/register', async (req, res) => {
  try {
    const {email} = req.body.email
    const alreadyExist =await usersModel.find({email})
    if (alreadyExist.length !== 0) {
      res.render('login', { login: false, finish: false, denyEmail: true })
    } else {
      await usersModel.create(req.body)
      res.render('login', { login: false, finish: true })
    }
  } catch (error) {
    console.log(error)
  }
})

// LOGOUT

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) { console.log(error) }
      else {
        res.redirect('/views/login')
      }
    })
  } catch (error) {
    console.log(error)
  }
})




export default router
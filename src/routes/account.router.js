import { Router } from "express";
const router = Router()

// const users = []
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
import { tokenGenerator } from "../utils.js";
import { usersModel } from "../components/db/models/users.models.js";
import { hashPassword, comparePasswords } from "../utils.js";
import passport from "passport";
import { jwtVerify } from "../middlewares/auth.middleware.js";
// LOGIN

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await usersModel.find({ email })

    if (user.length !== 0) {
      const isPassword = await comparePasswords(password, user[0].password)
      if (isPassword) {
        email == 'adminCoder@coder.com' ? req.session.isAdmin = true
          : req.session.isAdmin = false

        for (const key in req.body) {
          req.session[key] = req.body[key];
        }

        req.session.logged = true
        return res.redirect('/views/products')
      }
    }

    res.render('login', { login: true, deny: true })
  } catch (error) {
    console.log(error)
  }
})

// REGISTER SIN PASSPORT
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body.email
//     const alreadyExist = await usersModel.find({ email })
//     if (alreadyExist.length !== 0) {
//       res.render('login', { login: false, finish: false, denyEmail: true })
//     } else {
//       const hashNewPassword = await hashPassword(password)
//       const newUser = { ...req.body, password: hashNewPassword }

//       await usersModel.create(newUser)

//       res.render('login', { login: false, finish: true })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })
//
// REGISTER CON PASSPORT 

router.post('/register', passport.authenticate('register', {
  failureRedirect: '/views/register/errorr',
  successRedirect: '/views/register/sucess',
  // successRedirect: '/views/products',
  passReqToCallback: true
}))




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

//JWT - (JSON WEB TOKEN)

router.post('/jwt/login', async (req, res) => {
  const { email, password } = req.body
  const user = await usersModel.findOne({ email, })

  if (user) {
    const isPassword = await comparePasswords(password, user.password)
    if (isPassword) {
      const token = tokenGenerator(user)
      // return res.redirect('/views/products')
      
      res.json({token})
    }
  }

  return res.render('login', { login: true, deny: true })
})
router.post ('/validation', jwtVerify, async (req,res)=>{
  res.json({message: req.user})
})



export default router
import { usersModel } from "../components/db/models/users.models.js";
import { hashPassword } from "../utils.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";


passport.use('githubLogin', new GithubStrategy({
    clientID: 'Iv1.9f4ba0b9218359f6',
    clientSecret: '8c0255315d9b833530dba5f0395aa007170b5064',
    callbackURL: 'http://localhost:8080/views/github'
}, async (acessToken, refreshToken, profile, done) => {
    const user = await usersModel.findOne({ email: profile._json.email })
    if (!user) {
        const newUser = {
            name: profile._json.name.split(' ')[0],
            lastName: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            password: ' '
        }

        const newUserDB = await usersModel.create(newUser)
        return done(null, newUserDB)
    } else {
        return done(null, user)
    }
}))





















passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    const user = await usersModel.find({ email })
    if (user.length !== 0) {
        return done(null, false)
    }
    const hashNewPassword = await hashPassword(password)
    const newUser = { ...req.body, password: hashNewPassword }

    const newUserDB = await usersModel.create(newUser)
    done(null, newUserDB)

}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
    const user = await usersModel.findById(_id)
    done(null, user)
})


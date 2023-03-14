import { dirname } from 'path'
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'
import  jwt from 'jsonwebtoken';
export const __dirname = dirname(fileURLToPath(import.meta.url))


export const hashPassword = async (password) => bcrypt.hash(password, 10)

export const comparePasswords = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

export const tokenGenerator = (user) =>  jwt.sign({user},'secretJWT')

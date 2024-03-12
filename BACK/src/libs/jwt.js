import { TOKEN } from "../config.js"
import jwt from 'jsonwebtoken'

export function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload,
            TOKEN,{
                expiresIn: 900010 ,
            }, 
            (err, token) => {
                if(err) reject(err)
                resolve(token)
            })
    })
}
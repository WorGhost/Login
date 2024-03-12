import jwt from 'jsonwebtoken'
import { TOKEN } from '../config.js'

export const authRequire = (req,res,next) => {

    const {token} = req.cookies

    if(!token) return res.status(401).json({
        message : "Authorization denied"
    })

    jwt.verify(token, TOKEN, (err, user) => {
        if(err) return res.status(403).json({
            message: "Invalid user"
        })

        req.user = user
    })

    next()

}
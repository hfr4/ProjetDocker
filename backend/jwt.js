const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('./models/user.model')

const generateJwt = (user) => {
    return jwt.sign(user, dotenv.parsed.JWT_SECRET, { expiresIn: '1h' })
}

const verifyJwt = (req, res, next) => {
    const token = req.body.token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const t = req.headers.authorization.split(' ')[1]
        console.log(t)
    }
  
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, dotenv.parsed.JWT_SECRET, async (err, token_user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }

        const user = await UserModel.findOne({
            username : token_user.username,
            password : token_user.password,
        })
    
        req.user = user
    
        next()
    })
}

module.exports = {
    generateJwt,
    verifyJwt,
}

const asyncHandler = require('express-async-handler')
const UserModel = require('../models/user.model')
const jwt = require('../jwt.js')
const bcrypt = require('bcryptjs')

const getUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find()

    // Don't send the passwords
    for (let user of users) {
        user.password = null
    }

    res.status(200).json(users)
})

const getUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    // Don't send the password
    user.password = null

    res.status(200).json(user)
})

const createUser = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.username || !req.body.password) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const user = await UserModel.findOne({
        username : req.body.username,
    })

    if (user) {
        res.status(400)
        throw new Error('User already exist')
    }

    const salt           = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    await UserModel.create({ 
        email    : req.body.email,
        username : req.body.username,
        password : hashedPassword,
    })

    res.status(201).json({ message : "User created" })
})

const loginUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findOne({
        username : req.body.username,
    })

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    bcrypt.compare(req.body.password, user.password, function(err, result) {  
        if (result) {
            const token = jwt.generateJwt({ username: user.username, password: user.password })
        
            const user_with_token = {
                userId   : user._id,
                username : user.username,
                email    : user.email,
                token    : token,
            }
        
            res.status(200).json(user_with_token)
        } else {
            res.status(401).json({ message : 'Bad password' })
        }
    });

})

const updateUser = asyncHandler(async (req, res) => {
    throw new Error('Not implemented')
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id)

    if (!user) {
        res.status(400).json({ message : 'User not found' })
    }

    await UserModel.deleteOne(user)

    res.status(200).json({ message : "User deleted" })
})

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
}

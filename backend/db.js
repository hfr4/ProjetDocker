const mongoose = require('mongoose')

const connectToMongoDB = async () => {
    try {
        const connexions = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB : ${ connexions.connection.host } - ${ connexions.connection.name }`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = {
    connectToMongoDB
}

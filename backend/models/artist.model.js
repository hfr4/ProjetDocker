const mongoose = require('mongoose')

const artistSchema = mongoose.Schema(
    {
        stageName: {
            type: String,
            required: [true],
        },
        avatar: {
            type: Buffer, 
            required: [true],
        },
        bio: {
            type: String,
            required: [true],
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Artist', artistSchema)

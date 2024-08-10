const mongoose = require('mongoose')

const trackSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true],
        },
        duration: {
            type: Number,
            required: [true],
        },
        artist: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Artist',
        },
        album: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Album',
        },
        genres: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Genre' ,
            }
        ],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Track', trackSchema)

const mongoose = require('mongoose')

const albumSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true],
        },
        cover: {
            type: Buffer, 
            required: [true],
        },
        releaseDate: {
            type: Date,
            required: [true],
        },
        artist: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Artist',
        },
        tracks: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Track' ,
            }
        ],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Album', albumSchema)

const asyncHandler = require('express-async-handler')
const GenreModel = require('../models/genre.model')
const TrackModel = require('../models/track.model')

const getGenres = asyncHandler(async (req, res) => {
    const genres = await GenreModel.find()

    res.status(200).json(genres)
})

const getGenre = asyncHandler(async (req, res) => {
    const genre = await GenreModel.findById(req.params.id)

    if (!genre) {
        res.status(400)
        throw new Error('Genre not found')
    }

    res.status(200).json(genre)
})

const getTracksOfGenre = asyncHandler(async (req, res) => {
    const genre = await GenreModel.findById(req.params.id)
    
    if (!genre) {
        res.status(400)
        throw new Error('Genre not found')
    }

    const tracks = await TrackModel.find({ genres : genre })

    res.status(200).json(tracks)
})

const createGenre = asyncHandler(async (req, res) => {
    throw new Error('Not implemented')
})

const updateGenre = asyncHandler(async (req, res) => {
    const genre = await GenreModel.findById(req.params.id)
    
    if (!genre) {
        res.status(400)
        throw new Error('Genre not found')
    }

    if (!req.body.title || !req.body.description) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    await GenreModel.findOneAndUpdate(genre, {
        title       : req.body.title,
        description : req.body.description,
    }, { new: true })
    
    res.status(200).json({ message : "Genre updated" })
})

// TODO : $pull on tracks doesn't work
const deleteGenre = asyncHandler(async (req, res) => {
    const genre = await GenreModel.findById(req.params.id)

    if (!genre) {
        res.status(400)
        throw new Error('Genre not found')
    }

    const tracks = await TrackModel.find({ genres : genre })

    for (let track of tracks) {
        await TrackModel.findOneAndUpdate(track, {
            $pull: {
                genres: { id: genre._id }
            }
        }, { new: true })
    }

    await GenreModel.deleteOne(genre)

    res.status(200).json({ message : "Genre deleted" })
})

module.exports = {
    getGenres,
    getGenre,
    getTracksOfGenre,
    createGenre,
    updateGenre,
    deleteGenre,
}


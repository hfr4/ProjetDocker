const asyncHandler = require('express-async-handler')
const ArtistModel = require('../models/artist.model')
const AlbumModel  = require('../models/album.model')
const TrackModel  = require('../models/track.model')
const utils = require('../utils')

const getArtists = asyncHandler(async (req, res) => {
    const artists = await ArtistModel.find()

    res.status(200).json(artists)
})

const getArtist = asyncHandler(async (req, res) => {
    const artist = await ArtistModel.findById(req.params.id)

    if (!artist) {
        res.status(400)
        throw new Error('Artist not found')
    }

    if (!req.query.image) {
        artist.avatar = null
    }

    res.status(200).json(artist)
})

const getAlbumsOfArtist = asyncHandler(async (req, res) => {
    const artist = await ArtistModel.findById(req.params.id)

    if (!artist) {
        res.status(400)
        throw new Error('Artist not found')
    }

    const albums = await AlbumModel.find({ artist : artist })

    res.status(200).json(albums)
})

const getTracksOfArtist = asyncHandler(async (req, res) => {
    const artist = await ArtistModel.findById(req.params.id)

    if (!artist) {
        res.status(400)
        throw new Error('Artist not found')
    }

    const tracks = await TrackModel.find({ artist : artist })

    res.status(200).json(tracks)
})

const createArtist = asyncHandler(async (req, res) => {
    throw new Error('Not implemented')
})

const updateArtist = asyncHandler(async (req, res) => {
    const artist = await ArtistModel.findById(req.params.id)

    if (!artist) {
        res.status(400)
        throw new Error('Artist not found')
    }

    if (!req.body.stageName || !req.body.avatar || !req.body.bio) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    await ArtistModel.findOneAndUpdate(artist, {
        stageName : req.body.stageName,
        avatar    : utils.base64UrlStringToBuffer(req.body.avatar),
        bio       : req.body.bio,
    }, { new: true })

    res.status(200).json({ message : "Artist updated" })
})

const deleteArtist = asyncHandler(async (req, res) => {
    const artist = await ArtistModel.findById(req.params.id)

    if (!artist) {
        res.status(400)
        throw new Error('Artist not found')
    }

    await AlbumModel.deleteMany({ artist : artist })
    await TrackModel.deleteMany({ artist : artist })
    await ArtistModel.deleteOne(artist)

    res.status(200).json({ message : "Artist deleted" })
})

module.exports = {
    getArtists,
    getArtist,
    getAlbumsOfArtist,
    getTracksOfArtist,
    createArtist,
    updateArtist,
    deleteArtist
}

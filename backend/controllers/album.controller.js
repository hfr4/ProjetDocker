const asyncHandler = require('express-async-handler')
const AlbumModel = require('../models/album.model')
const TrackModel = require('../models/track.model')
const utils = require('../utils')

const getAlbums = asyncHandler(async (req, res) => {
    const albums = await AlbumModel.find()

    res.status(200).json(albums)
})

const getAlbum = asyncHandler(async (req, res) => {
    const album = await AlbumModel.findById(req.params.id)

    if (!album) {
        res.status(400)
        throw new Error('Album not found')
    }

    if (!req.query.image) {
        album.cover = null
    }

    res.status(200).json(album)
})

const getTracksOfAlbum = asyncHandler(async (req, res) => {
    const album = await AlbumModel.findById(req.params.id)

    if (!album) {
        res.status(400)
        throw new Error('Album not found')
    }

    const tracks = await TrackModel.find({ album : album })

    res.status(200).json(tracks)
})

const createAlbum = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.cover || !req.body.releaseDate || !req.body.artist) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const album = await AlbumModel.create({ 
        title       : req.body.title,
        cover       : utils.base64UrlStringToBuffer(req.body.cover),
        releaseDate : req.body.releaseDate,
        artist      : req.body.artist,
    })

    res.status(201).json(album)
})

const createTrackOnAlbum = asyncHandler(async (req, res) => {
    const album = await AlbumModel.findById(req.params.id)

    if (!album) {
        res.status(400)
        throw new Error('Album not found')
    }

    if (!req.body.title || !req.body.duration || !req.body.genres) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    await TrackModel.create({
        album    : album._id,
        artist   : album.artist,
        title    : req.body.title,
        duration : req.body.duration,
        genres   : req.body.genres,
    })

    res.status(201).json({ message : "Track created" })
})

const updateAlbum = asyncHandler(async (req, res) => {
    const album = await AlbumModel.findById(req.params.id)

    if (!album) {
        res.status(400)
        throw new Error('Album not found')
    }

    if (!req.body.title || !req.body.cover || !req.body.releaseDate) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    await AlbumModel.findOneAndUpdate(album, {
        title       : req.body.title,
        cover       : utils.base64UrlStringToBuffer(req.body.cover),
        releaseDate : req.body.releaseDate,
    }, { new: true })

    res.status(200).json({ message : "Album updated" })
})

const deleteAlbum = asyncHandler(async (req, res) => {
    const album = await AlbumModel.findById(req.params.id)

    if (!album) {
        res.status(400)
        throw new Error('Album not found')
    }

    await TrackModel.deleteMany({ album : album })
    await AlbumModel.deleteOne(album)

    res.status(200).json({ message : "Album deleted" })
})

module.exports = {
    getAlbums,
    getTracksOfAlbum,
    getAlbum,
    createTrackOnAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
}

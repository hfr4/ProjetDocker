const asyncHandler = require('express-async-handler')
const TrackModel = require('../models/track.model')

const getTracks = asyncHandler(async (req, res) => {
    const tracks = await TrackModel.find()

    res.status(200).json(tracks)
})

const getTrack = asyncHandler(async (req, res) => {
    const track = await TrackModel.findById(req.params.id)

    if (!track) {
        res.status(400)
        throw new Error('Track not found')
    }

    res.status(200).json(track)
})

const createTrack = asyncHandler(async (req, res) => {
    throw new Error('Not implemented')
})

const updateTrack = asyncHandler(async (req, res) => {
    throw new Error('Not implemented')
})

const deleteTrack = asyncHandler(async (req, res) => {
    const track = await TrackModel.findById(req.params.id)

    if (!track) {
        res.status(400)
        throw new Error('Track not found')
    }

    await TrackModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ message : "Track deleted" })
})

module.exports = {
    getTracks,
    getTrack,
    createTrack,
    updateTrack,
    deleteTrack
}

const express = require('express')
const router = express.Router()
const jwt = require('../jwt.js')
const TrackController = require('../controllers/track.controller')

router.get   ('/'    , TrackController.getTracks)
router.get   ('/:id' , TrackController.getTrack)
router.post  ('/'    , jwt.verifyJwt, TrackController.createTrack)
router.put   ('/:id' , jwt.verifyJwt, TrackController.updateTrack)
router.delete('/:id' , jwt.verifyJwt, TrackController.deleteTrack)

module.exports = router

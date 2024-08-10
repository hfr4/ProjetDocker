const express = require('express')
const router = express.Router()
const jwt = require('../jwt.js')
const ArtistController = require('../controllers/artist.controller')

router.get   ('/'           , ArtistController.getArtists)
router.get   ('/:id'        , ArtistController.getArtist)
router.get   ('/:id/albums' , ArtistController.getAlbumsOfArtist)
router.get   ('/:id/tracks' , ArtistController.getTracksOfArtist)
router.post  ('/'           , jwt.verifyJwt, ArtistController.createArtist)
router.put   ('/:id'        , jwt.verifyJwt, ArtistController.updateArtist)
router.delete('/:id'        , jwt.verifyJwt, ArtistController.deleteArtist)

module.exports = router

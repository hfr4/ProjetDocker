const express = require('express')
const router = express.Router()
const jwt = require('../jwt.js')
const AlbumController = require('../controllers/album.controller')

router.get   ('/'           , AlbumController.getAlbums)
router.get   ('/:id'        , AlbumController.getAlbum)
router.get   ('/:id/tracks' , AlbumController.getTracksOfAlbum)
router.post  ('/'           , jwt.verifyJwt, AlbumController.createAlbum)
router.post  ('/:id/tracks' , jwt.verifyJwt, AlbumController.createTrackOnAlbum)
router.put   ('/:id'        , jwt.verifyJwt, AlbumController.updateAlbum)
router.delete('/:id'        , jwt.verifyJwt, AlbumController.deleteAlbum)

module.exports = router

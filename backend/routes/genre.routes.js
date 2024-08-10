const express = require('express')
const router = express.Router()
const jwt = require('../jwt.js')
const GenreController = require('../controllers/genre.controller')

router.get   ('/'           , GenreController.getGenres)
router.get   ('/:id/tracks' , GenreController.getTracksOfGenre)
router.get   ('/:id'        , GenreController.getGenre)
router.post  ('/'           , jwt.verifyJwt, GenreController.createGenre)
router.put   ('/:id'        , jwt.verifyJwt, GenreController.updateGenre)
router.delete('/:id'        , jwt.verifyJwt, GenreController.deleteGenre)

module.exports = router

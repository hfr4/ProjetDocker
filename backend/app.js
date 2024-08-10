const express    = require('express')
const bodyParser = require('body-parser')
const dotenv     = require('dotenv').config()
const cors       = require('cors')
const db         = require('./db')

// MongoDB connection
db.connectToMongoDB()

const app = express()

// CORS
app.use(cors())

// Accept large data
app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

// Accept form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/albums' , require('./routes/album.routes'))
app.use('/users'  , require('./routes/user.routes'))
app.use('/genres' , require('./routes/genre.routes'))
app.use('/tracks' , require('./routes/track.routes'))
app.use('/artists', require('./routes/artist.routes'))
app.use('/db'     , require('./routes/db.routes'))

app.listen(dotenv.parsed.PORT, () => {
    console.log(`Server started on ${ dotenv.parsed.PORT }`)
})

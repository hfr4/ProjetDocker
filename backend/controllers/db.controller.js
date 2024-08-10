const asyncHandler = require('express-async-handler')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const UserModel   = require('../models/user.model')
const AlbumModel  = require('../models/album.model')
const ArtistModel = require('../models/artist.model')
const TrackModel  = require('../models/track.model')
const GenreModel  = require('../models/genre.model')

const generateDb = asyncHandler(async (req, res) => {

    // Clear tables 

    await UserModel.deleteMany({})
    await AlbumModel.deleteMany({})
    await ArtistModel.deleteMany({})
    await TrackModel.deleteMany({})
    await GenreModel.deleteMany({})

    // Users
    const salt0           = await bcrypt.genSalt(10)
    const hashedPassword0 = await bcrypt.hash("password0", salt0)
    const user0 = await UserModel.create({
        username : "user0",
        email    : "user0@email.com",
        password : hashedPassword0,
    })

    const salt1           = await bcrypt.genSalt(10)
    const hashedPassword1 = await bcrypt.hash("password1", salt1)
    const user1 = await UserModel.create({
        username : "user1",
        email    : "user1@email.com",
        password : hashedPassword1,
    })

    const salt2           = await bcrypt.genSalt(10)
    const hashedPassword2 = await bcrypt.hash("password2", salt2)
    const user2 = await UserModel.create({
        username : "user2",
        email    : "user2@email.com",
        password : hashedPassword2,
    })

    // Genres 

    const genre0 = await GenreModel.create({
        title       : "Pop",
        description : "La musique pop est un genre musical apparu dans les années 1960 au Royaume-Uni et aux États-Unis. Les chansons pop parlent en général de l'amour ou des relations amoureuses.",
    })

    const genre1 = await GenreModel.create({
        title       : "Blues",
        description : "Le blues est un genre musical, vocal et instrumental dérivé des chants de travail des populations afro-américaines subissant la ségrégation raciale aux États-Unis.",
    })

    const genre2 = await GenreModel.create({
        title       : "Rock 'n' roll",
        description : "Le rock 'n' roll est un genre musical populaire apparu aux États-Unis à la fin des années 1940. Il découle directement de styles musicaux tels que le gospel, le blues, le jazz, le boogie woogie, le jump blues, le rhythm and blues et la musique country.",
    })

    const genre3 = await GenreModel.create({
        title       : "Rock",
        description : "Le rock est un genre musical apparu dans les années 1950 aux États-Unis et qui s'est développé en différents sous-genres à partir des années 1960, notamment aux États-Unis et au Royaume-Uni.",
    })

    const genre4 = await GenreModel.create({
        title       : "Jazz",
        description : "Le jazz est un genre musical originaire du Sud des États-Unis, créé à la fin du XIXᵉ siècle et au début du XXᵉ siècle au sein des communautés afro-américaines.",
    })

    // Artists

    const artist0 = await ArtistModel.create({
        stageName : "Michael Jackson",
        avatar    : fs.readFileSync("assets/michaeljackson.png"),
        bio       : "Michael Jackson, né le 29 août 1958 à Gary et mort le 25 juin 2009 à Los Angeles, est un auteur-compositeur-interprète, danseur-chorégraphe et acteur américain.",
    })

    const artist1 = await ArtistModel.create({
        stageName : "B. B. King",
        avatar    : fs.readFileSync("assets/bbking.png"),
        bio       : "B.B. King, de son vrai nom Riley B. King, né le 16 septembre 1925 à Itta Bena, dans le Mississippi aux États-Unis, et mort le 14 mai 2015 à Las Vegas, est un guitariste, compositeur et chanteur de blues américain.",
    })

    const artist2 = await ArtistModel.create({
        stageName : "Elvis Presley",
        avatar    : fs.readFileSync("assets/elvis.png"),
        bio       : "Elvis Presley, né le 8 janvier 1935 à Tupelo dans le Mississippi et mort le 16 août 1977 à Memphis dans le Tennessee, est un chanteur et acteur américain.",
    })

    // Albums

    const album0 = await AlbumModel.create({ 
        title       : "Thriller",
        cover       : fs.readFileSync("assets/thriller.png"),
        releaseDate : Date("1982"),
        artist      : artist0,
    })

    const album1 = await AlbumModel.create({ 
        title       : "Bad",
        cover       : fs.readFileSync("assets/bad.png"),
        releaseDate : Date("1987"),
        artist      : artist0,
    })

    const album2 = await AlbumModel.create({ 
        title       : "Lucille",
        cover       : fs.readFileSync("assets/lucille.png"),
        releaseDate : Date("1968"),
        artist      : artist1,
    })

    const album3 = await AlbumModel.create({ 
        title       : "Live in Cook County Jail",
        cover       : fs.readFileSync("assets/cookcountyjail.png"),
        releaseDate : Date("1971"),
        artist      : artist1,
    })

    const album4 = await AlbumModel.create({ 
        title       : "King Creole",
        cover       : fs.readFileSync("assets/kingcreole.png"),
        releaseDate : Date("1958"),
        artist      : artist2,
    })

    const album5 = await AlbumModel.create({ 
        title       : "Elvis Is Back!",
        cover       : fs.readFileSync("assets/elvisisback.png"),
        releaseDate : Date("1960"),
        artist      : artist2,
    })

    // Tracks

    await TrackModel.create({ artist : artist0, album : album0, title : "Wanna Be Startin' Somethin'"                , duration : 362         ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album0, title : "Baby Be Mine"                               , duration : 260         ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album0, title : "The Girl Is Mine"                           , duration : 222         ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album0, title : "Thriller"                                   , duration : 357         ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album0, title : "Beat It"                                    , duration : 257         ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album0, title : "Billie Jean"                                , duration : 294         ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album0, title : "Human Nature"                               , duration : 245         ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album0, title : "P. Y. T. (Pretty Young Thing)"              , duration : 238         ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album0, title : "The Lady in My Life"                        , duration : 299         ,  genres : [ genre0 ] })

    await TrackModel.create({ artist : artist0, album : album1, title : "Bad"                                        , duration : 4 * 60 +  8 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "The Way You Make Me Feel"                   , duration : 4 * 60 + 59 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "Speed Demon"                                , duration : 4 * 60 +  3 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "Liberian Girl"                              , duration : 3 * 60 + 55 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "Just Good Friends"                          , duration : 4 * 60 +  9 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "Another Part of Me"                         , duration : 3 * 60 + 55 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "Man in the Mirror"                          , duration : 5 * 60 + 21 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "I Just Can't Stop Loving You"               , duration : 4 * 60 + 27 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "Dirty Diana"                                , duration : 4 * 60 + 42 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "Smooth Criminal"                            , duration : 4 * 60 + 20 ,  genres : [ genre0 ] })
    await TrackModel.create({ artist : artist0, album : album1, title : "Leave Me Alone"                             , duration : 4 * 60 + 41 ,  genres : [ genre0 ] })

    await TrackModel.create({ artist : artist1, album : album2, title : "Lucille"                                    , duration : 10 * 60 + 16,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album2, title : "You Move Me So"                             , duration : 2  * 60 + 3 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album2, title : "Country Girl"                               , duration : 4  * 60 + 25,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album2, title : "Mo Money, No Luck Blues"                    , duration : 3  * 60 + 49,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album2, title : "I Need Your Love"                           , duration : 2  * 60 + 22,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album2, title : "Rainin' All the Time"                       , duration : 2  * 60 + 56,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album2, title : "I'm with You"                               , duration : 2  * 60 + 31,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album2, title : "Stop Putting the Hurt on Me"                , duration : 3  * 60 + 4 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album2, title : "Watch Yourself"                             , duration : 5  * 60 + 47,  genres : [ genre1 ] })

    await TrackModel.create({ artist : artist1, album : album3, title : "Introductions"                              , duration : 1 * 60 + 50 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album3, title : "Every Day I Have the Blues"                 , duration : 1 * 60 + 43 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album3, title : "How Blue Can You Get?"                      , duration : 5 * 60 +  9 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album3, title : "Worry, Worry, Worry"                        , duration : 9 * 60 + 57 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album3, title : "3 O'Clock Blues/Darlin' You Know I Love You", duration : 6 * 60 + 15 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album3, title : "Sweet Sixteen"                              , duration : 4 * 60 + 20 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album3, title : "The Thrill Is Gone"                         , duration : 5 * 60 + 31 ,  genres : [ genre1 ] })
    await TrackModel.create({ artist : artist1, album : album3, title : "Please Accept My Love"                      , duration : 4 * 60 +  2 ,  genres : [ genre1 ] })

    await TrackModel.create({ artist : artist2, album : album4, title : "King Creole"                                , duration : 2 * 60 + 16 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "As Long As I Have You"                      , duration : 1 * 60 + 50 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "Hard Headed Woman"                          , duration : 1 * 60 + 53 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "Trouble"                                    , duration : 2 * 60 + 16 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "Dixieland Rock"                             , duration : 1 * 60 + 46 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "Don't Ask Me Why"                           , duration : 2 * 60 +  6 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "Lover Doll"                                 , duration : 2 * 60 +  9 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "Crawfish"                                   , duration : 1 * 60 + 48 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "Young Dreams"                               , duration : 2 * 60 + 23 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "Steadfast, Loyal and True"                  , duration : 1 * 60 + 15 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album4, title : "New Orleans"                                , duration : 1 * 60 + 58 ,  genres : [ genre1, genre2 ] })

    await TrackModel.create({ artist : artist2, album : album5, title : "Make Me Know It"                            , duration : 1 * 60 + 58 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "Fever"                                      , duration : 3 * 60 + 31 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "The Girl of My Best Friend"                 , duration : 2 * 60 + 21 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "I Will Be Home Again"                       , duration : 2 * 60 + 33 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "Dirty, Dirty Feeling"                       , duration : 1 * 60 + 35 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "Thrill of Your Love"                        , duration : 2 * 60 + 59 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "Soldier Boy"                                , duration : 3 * 60 + 4  ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "Such a Night"                               , duration : 2 * 60 + 58 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "It Feels So Right"                          , duration : 2 * 60 + 9  ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "Girl Next Door Went A-Walking"              , duration : 2 * 60 + 12 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "Like a Baby"                                , duration : 2 * 60 + 38 ,  genres : [ genre1, genre2 ] })
    await TrackModel.create({ artist : artist2, album : album5, title : "Reconsider Baby"                            , duration : 3 * 60 + 39 ,  genres : [ genre1, genre2 ] })

    res.status(200).json("Database generation OK")
})

module.exports = {
    generateDb,
}


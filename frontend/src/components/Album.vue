<template>
    <div v-if="album && album.cover">
        <div class="cards_container">
            <div  class="card">
                <div class="card_header"> 
                    <div class="card_title"> {{ album.title }} </div> 
                </div>

                <div class="card_body" v-on:click="this.$router.push('/albums/' + album._id)">
                    <img class="card_img" v-bind:src="this.$utils.bufferToBase64PngUrlString(album.cover.data)" />
                </div>
            </div>
        </div>

        <h3>Artist</h3>
        <a v-bind:href="'/artists/' + artist._id">{{ artist.stageName }}</a>

        <h3>Release date</h3>
        <span> {{ this.$moment(album.releaseDate).format('ddd MMM DD YYYY')  }} </span>

        <h3>Tracks</h3>
        <table v-if="tracks.length">
            <thead slot="head">
                <tr>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Genre</th>
                </tr>
            </thead>

            <tbody slot="body">
                <tr v-for="track in tracks">
                    <td>{{ track.title }}</td>

                    <td>{{ this.$utils.durationToString(track.duration) }}</td>

                    <td>
                        <span v-if="track.genresData">
                            <span v-for="(genre, index) in track.genresData"> 
                                {{ genre.title }} <span v-if="index < track.genresData.length - 1">, </span>
                            </span>
                        </span>
                        <span v-else>
                            ...
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="this.$utils.loggedIn()">
            <div class="separation"></div>
            <div class="button" v-on:click="addTrack()"> Add Track </div>
            <div class="separation"></div>
            <div class="button_edit" v-on:click="editAlbum()"> Edit </div>
            <div class="separation"></div>
            <div class="button_delete" v-on:click="deleteAlbum()"> Delete </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getAlbum() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/albums/" + this.$route.params.id, { params: { image: true } } ).then((res) => {
                this.album = res.data

                this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + this.album.artist).then((res) => {
                    this.artist = res.data
                })
            })
        },
        getTracks() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/albums/" + this.$route.params.id + "/tracks").then((res) => {
                this.tracks = res.data
    
                for (let track of this.tracks) {
                    track.genresData = []
                    for (let genre of track.genres) {
                        this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/genres/" + genre).then((res) => {
                            track.genresData.push(res.data)
                        })
                    }
                }
            })
        },
        deleteAlbum() {
            this.$axios.delete("http://localhost:" + process.env.BACKEND_PORT + "/albums/" + this.$route.params.id, { data: { token : this.$utils.getCookie('token') } } ).then((res) => {
                this.$router.push('/albums')
            })
        },
        editAlbum() {
            this.$router.push('/albums/' + this.$route.params.id + '/edit')
        },
        addTrack() {
            this.$router.push('/albums/' + this.$route.params.id + '/tracks/new')
        },
    },
    data() {
        return {
            album  : {},
            artist : {},
            tracks : [],
        }
    },
    created() {
        this.getAlbum()
        this.getTracks()
    },
}
</script>

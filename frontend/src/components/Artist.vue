<template>
    <div v-if="artist && artist.avatar">
        <div class="cards_container" >
            <div class="card" >
                <div class="card_header"> 
                    <div class="card_title"> {{ artist.stageName }} </div> 
                </div>

                <div class="card_body" id="artist_card_body" v-on:click="this.$router.push('/artists/' + artist._id)">
                    <img class="card_img" v-bind:src="this.$utils.bufferToBase64PngUrlString(artist.avatar.data)" />
                </div>
            </div>
        </div>
        
        <h3>Biography</h3> 
        <div>{{ artist.bio }}</div>

        <h3>Albums</h3> 

        <div class="cards_container">
            <div v-for="album in albums" class="card">
                <div class="card_header"> 
                    <div class="card_title"> {{ album.title }} </div> 
                </div>

                <div class="card_body" v-on:click="this.$router.push('/albums/' + album._id)">
                    <img class="card_img" v-bind:src="this.$utils.bufferToBase64PngUrlString(album.cover.data)" />
                </div>
            </div>
        </div>

        <h3>Tracks</h3> 

        <table v-if="tracks.length">
            <thead slot="head">
                <tr>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Album</th>
                    <th>Genre</th>
                </tr>
            </thead>

            <tbody slot="body">
                <tr v-for="track in tracks">
                    <td>{{ track.title }}</td>

                    <td>{{ this.$utils.durationToString(track.duration) }}</td>

                    <td>
                        <span v-if="track.albumData"> 
                            <a v-bind:href="'/albums/' + track.albumData._id">{{ track.albumData.title }}</a> 
                        </span> 
                        <span v-else> ... </span> 
                    </td>

                    <td>
                        <span v-if="track.genresData">
                            <span v-for="(genre, index) in track.genresData"> {{ genre.title }}<span v-if="index < track.genresData.length - 1">, </span></span>
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
            <div class="button_edit" v-on:click="editArtist()"> Edit </div>
            <div class="separation"></div>
            <div class="button_delete" v-on:click="deleteArtist()"> Delete </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getArtist() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + this.$route.params.id, { params: { image: true } }).then((res) => {
                this.artist = res.data

                this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + this.$route.params.id + "/albums").then((res) => {
                    this.albums = res.data
        
                    this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + this.$route.params.id + "/tracks").then((res) => {
                        this.tracks = res.data
    
                        for (let track of this.tracks) {
                            track.albumData  = this.albums.filter((e) => e._id === track.album)[0]
                            track.genresData = []
    
                            for (let genre of track.genres) {
                                this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/genres/" + genre).then((res) => {
                                    track.genresData.push(res.data)
                                })
                            }
                        }
                    })
                })
            })
        },
        deleteArtist() {
            this.$axios.delete("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + this.$route.params.id, { data: { token : this.$utils.getCookie('token') } } ).then((res) => {
                this.$router.push('/artists')
            })
        },
        editArtist() {
            this.$router.push('/artists/' + this.$route.params.id + '/edit')
        },
    },
    data() {
        return {
            artist : {},
            albums : [],
            tracks : [],
        }
    },
    created() {
        this.getArtist()
    },
}
</script>

<style scoped>
#artist_card_body {
    cursor : default;
}
</style>

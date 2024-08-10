<template>
    <div v-if="genre">
        <h3>Title</h3>
        <div>{{ genre.title }}</div>
        
        <h3>Description</h3>
        <div>{{ genre.description }}</div>

        <h3>Tracks</h3>

        <table v-if="tracks.length">
            <thead slot="head">
                <tr>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Album</th>
                    <th>Artist</th>
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
                        <span v-if="track.artistData">
                            <a v-bind:href="'/artists/' + track.artistData._id">{{ track.artistData.stageName }}</a>
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
            <div class="button_edit" v-on:click="editGenre()"> Edit </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getGenre() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/genres/" + this.$route.params.id).then((res) => {
                this.genre = res.data

                this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/genres/" + this.$route.params.id + "/tracks").then((res) => {
                    this.tracks = res.data
                    
                    for (let track of this.tracks) {
                        this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + track.artist).then((res) => {
                            track.artistData = res.data
                        })
                        
                        this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/albums/" + track.album).then((res) => {
                            track.albumData = res.data
                        })    
                    }
                    
                    for (let track of this.tracks) {
                        track.genresData = []
                        for (let genre of track.genres) {
                            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/genres/" + genre).then((res) => {
                                track.genresData.push(res.data)
                            })
                        }
                    }
                })
            })
        },
        deleteGenre() {
            this.$axios.delete("http://localhost:" + process.env.BACKEND_PORT + "/genres/" + this.$route.params.id, { data: { token : this.$utils.getCookie('token') } } ).then((res) => {
                this.$router.push('/genres')
            })
        },
        editGenre() {
            this.$router.push('/genres/' + this.$route.params.id + '/edit')
        },
    },
    data() {
        return {
            genre  : {},
            tracks : [],
        }
    },
    created() {
        this.getGenre()
    },
}
</script>

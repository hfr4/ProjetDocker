<template>
    <h3>Artist</h3>
    <div v-if="artist"> {{ artist.stageName }} </div>

    <h3>Album</h3>
    <div v-if="album">{{ album.title }} </div>

    <h3>Title</h3>
	<input v-model="title" placeholder="Title" />

    <h3>Duration</h3>
    <input v-model="duration" type="time" step="1" />

    <h3>Genres</h3>
    <div v-if="genres.length">
        <select v-model="selectedGenres" multiple>
            <option default disabled value="">Select genres</option>
            <option v-for="genre in genres" v-bind:value="genre._id"> {{ genre.title }} </option>
        </select>
    </div>

    <div class="separation"> </div>

    <div class="button" v-on:click="createTrack()"> Create Track </div>
</template>

<script>
export default {
    methods: {
        getAlbum() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/albums/" + this.$route.params.id ).then((res) => {
                this.album = res.data
                
                this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + this.album.artist).then((res) => {
                    this.artist = res.data
                })
            })
        },
        getGenres() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/genres/").then((res) => {
                this.genres = res.data
            })
        },
        createTrack() {
            var duration_split = this.duration.split(':')
            var seconds        = parseInt(duration_split[0]) * 3600 + parseInt(duration_split[1]) * 60 + parseInt(duration_split[2])
            var track = {
                title    : this.title,
                duration : seconds,
                genres   : this.selectedGenres,
                token    : this.$utils.getCookie('token')
            }
            
            this.$axios.post("http://localhost:" + process.env.BACKEND_PORT + "/albums/" + this.album._id + "/tracks", track).then((res) => {
                this.$router.push('/albums/' + this.album._id)
            })
        }
    },
    data() {
        return {
            title          : '',
            duration       : '',
            artist         : null,
            album          : null,
            selectedGenres : [],
            genres         : [],
        }
    },
    created() {
        this.getAlbum()
        this.getGenres()
    },
}
</script>

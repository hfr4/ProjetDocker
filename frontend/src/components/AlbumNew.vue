<template>
    <h3>Artist</h3>
    <div v-if="artists.length">
        <select v-model="selectedArtist">
            <option default disabled value="">Select artist</option>
            <option v-for="artist in artists" v-bind:value="artist._id"> {{ artist.stageName }} </option>
        </select>
    </div>
    
    <h3>Title</h3>
	<input v-model="title" placeholder="Title" />
    
    <h3>Release date</h3>
    <input v-model="releaseDate" type="date" />

    <h3>Cover</h3>
    <input type="file" accept="image/png" v-on:change="previewCover">
        
    <div v-if="cover">
        <img :src="cover" />
    </div>

    <div class="separation"> </div>

    <div class="button" v-on:click="createAlbum()"> Create Album </div>
</template>

<script>
export default {
    methods: {
        getArtists() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/").then((res) => {
                this.artists = res.data
            })
        },
        createAlbum() {
            var album = {
                artist      : this.selectedArtist,
                releaseDate : new Date(this.releaseDate),
                cover       : this.cover,
                title       : this.title,
                token       : this.$utils.getCookie('token')
            }

            this.$axios.post("http://localhost:" + process.env.BACKEND_PORT + "/albums/", album).then((res) => {
                this.$router.push('/albums/' + res.data._id)
            })
        },
        previewCover(event) {
            var input = event.target

            if (input.files) {
                var reader = new FileReader()

                reader.onload = (e) => {
                    this.cover = e.target.result
                }

                reader.readAsDataURL(input.files[0])
            }
        },
    },
    data() {
        return {
            artists        :  [],
            selectedArtist :  '',
            title          :  '',
            releaseDate    :  '',
            cover          :  null,
        }
    },
    created() {
        this.getArtists()
    },
}
</script>

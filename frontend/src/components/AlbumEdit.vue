<template>
    <div v-if="album">
        <h3>Title</h3>
        <input v-model="title" />

        <h3>Cover</h3>
        <div v-if="cover">
            <img :src="cover" />
        </div>
        <input type="file" accept="image/png" v-on:change="previewCover">

        <h3>Release date</h3>
        <input type="date" v-model="releaseDate" />

        <div class="separation"></div>

        <div class="button" v-on:click="saveChangesAlbum()"> Save </div>
    </div>
</template>

<script>

export default {
    methods: {
        getAlbum() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/albums/" + this.$route.params.id, { params: { image: true } }).then((res) => {
                this.album       = res.data
                this.title       = this.album.title
                this.releaseDate = this.$moment(this.album.releaseDate).format('YYYY-MM-DD')
                this.cover       = this.$utils.bufferToBase64PngUrlString(this.album.cover.data)
            })
        },
        saveChangesAlbum() {
            var album = {
                title       : this.title,
                cover       : this.cover,
                releaseDate : this.$moment(this.releaseDate).toDate(),
                token       : this.$utils.getCookie('token'),
            }

            this.$axios.put("http://localhost:" + process.env.BACKEND_PORT + "/albums/" + this.$route.params.id, album).then((res) => {
                this.$router.push('/albums/' + this.album._id)
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
            album       : null,
            releaseDate : null,
            cover       : null,
            title       : null,
        }
    },
    created() {
        this.getAlbum()
    },
}
</script>

<template>
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

    <div v-if="this.$utils.loggedIn()">
        <div class="separation"></div>
        <div class="button" v-on:click="addAlbum()"> Add Album </div>
    </div>
</template>

<script>
export default {
    methods: {
        getAlbums() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/albums").then((res) => {
                this.albums = res.data
            })
        },
        addAlbum() {
            this.$router.push('/albums/new')
        },
    },
    data() {
        return {
            albums: [],
        }
    },
    created() {
        this.getAlbums()
    },
}
</script>

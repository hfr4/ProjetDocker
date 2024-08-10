<template>
    <div v-if="artists.length">
        <div class="cards_container">
            <div v-for="artist in artists" class="card">
                <div class="card_header"> 
                    <div class="card_title"> {{ artist.stageName }} </div> 
                </div>

                <div class="card_body" v-on:click="this.$router.push('/artists/' + artist._id)">
                    <img class="card_img" v-bind:src="this.$utils.bufferToBase64PngUrlString(artist.avatar.data)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getArtists() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/").then((res) => {
                this.artists = res.data
            })
        },
    },
    data() {
        return {
            artists: [],
        }
    },
    created() {
        this.getArtists()
    },
}
</script>

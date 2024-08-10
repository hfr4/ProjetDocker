<template>
    <div v-if="genres.length">
        <div v-for="genre in genres">
            <h2><a v-bind:href="'/genres/' + genre._id">{{ genre.title }}</a></h2>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getGenres() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/genres/").then((res) => {
                this.genres = res.data
            })
        },
    },
    data() {
        return {
            genres : [],
        }
    },
    created() {
        this.getGenres()
    },
}
</script>

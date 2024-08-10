<template>
    <div v-if="genre">
        <h3>Title</h3>
        <div> {{ genre.title }} </div>

        <h3>Description</h3>
        <textarea v-model="description">{{ description }}</textarea>

        <div class="separation"></div>

        <div class="button" v-on:click="saveChangesGenre()"> Save </div>
    </div>
</template>

<script>
export default {
    methods: {
        getGenre() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/genres/" + this.$route.params.id).then((res) => {
                this.genre = res.data
                this.description = this.genre.description
            })
        },
        saveChangesGenre() {
            var genre = {
                title       : this.genre.title,
                description : this.description,
                token       : this.$utils.getCookie('token'),
            }

            this.$axios.put("http://localhost:" + process.env.BACKEND_PORT + "/genres/" + this.$route.params.id, genre).then((res) => {
                this.$router.push('/genres/' + this.genre._id)
            })
        }
    },
    data() {
        return {
            genre       : {},
            description : '',
        }
    },
    created() {
        this.getGenre()
    },
}
</script>

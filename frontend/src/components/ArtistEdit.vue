<template>
    <div v-if="artist">
        <h3>Stage name</h3>
        <input v-model="stageName" />

        <h3>Avatar</h3>
        <div v-if="avatar">
            <img :src="avatar" />
        </div>
        <input type="file" accept="image/png" v-on:change="previewAvatar">

        <h3>Biography</h3>
        <textarea v-model="bio">{{ bio }}</textarea>

        <div class="separation"></div>

        <div class="button" v-on:click="saveChangesArtist()"> Save </div>
    </div>
</template>

<script>
export default {
    methods: {
        getArtist() {
            this.$axios.get("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + this.$route.params.id, { params: { image: true } }).then((res) => {
                this.artist    = res.data
                this.stageName = this.artist.stageName
                this.bio       = this.artist.bio
                this.avatar    = this.$utils.bufferToBase64PngUrlString(this.artist.avatar.data)
            })
        },
        saveChangesArtist() {
            var artist = {
                stageName : this.stageName,
                avatar    : this.avatar,
                bio       : this.bio,
                token     : this.$utils.getCookie('token'),
            }
            
            this.$axios.put("http://localhost:" + process.env.BACKEND_PORT + "/artists/" + this.$route.params.id, artist).then((res) => {
                this.$router.push('/artists/' + this.artist._id)
            })
        },
        previewAvatar(event) {
            var input = event.target
            
            if (input.files) {
                var reader = new FileReader()
                
                reader.onload = (e) => {
                    this.avatar = e.target.result
                }
                
                reader.readAsDataURL(input.files[0])
            }
        },
    },
    data() {
        return {
            artist    : null,
            bio       : null,
            avatar    : null,
            stageName : null,
        }
    },
    created() {
        this.getArtist()
    },
}
</script>

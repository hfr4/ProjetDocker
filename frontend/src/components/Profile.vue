<template>
    <div class="button_delete" v-on:click="deleteAccount()"> Delete account </div>
</template>

<script>
export default {
    methods: {
        deleteAccount() {
            // TODO : get user id from token
            this.$axios.delete("http://localhost:" + process.env.BACKEND_PORT + "/users/" + this.$utils.getCookie("userId"), { data: { token : this.$utils.getCookie('token') } } ).then((res) => {
                this.$utils.deleteCookie('token')
                this.$utils.deleteCookie('username')
                this.$utils.deleteCookie('email')
                this.$utils.deleteCookie('userId')
                this.$router.push('/')
                this.$emitter.emit('reload-navbar')
            })
        },
    },
}
</script>
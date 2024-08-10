<template>
    <center>
        <img src="/src/assets/logo1.png"/>
        <h3>Username</h3>
        <input v-model="username" placeholder="Username" />

        <h3>Password</h3>
        <input v-model="password" type="password" placeholder="Password" />
    </center>

    <div class="separation"></div>

    <div class="button" v-on:click="login()"> Log in </div>
</template>

<script>
export default {
    methods: {
        login() {
            var user = {
                username : this.username,
                password : this.password,
            }

            this.$axios.post("http://localhost:" + process.env.BACKEND_PORT + "/users/login", user).then((res) => {
                this.$utils.deleteCookie('token')
                this.$utils.deleteCookie('email')
                this.$utils.deleteCookie('username')
                this.$utils.deleteCookie('userId')

                this.$utils.setCookie('userId'  , res.data.userId)
                this.$utils.setCookie('token'   , res.data.token)
                this.$utils.setCookie('email'   , res.data.email)
                this.$utils.setCookie('username', res.data.username)

                this.$router.push('/')
                this.$emitter.emit('reload-navbar')
            })
        }
    },
    data() {
        return {
            username : '',
            password : '',
        }
    },
}
</script>

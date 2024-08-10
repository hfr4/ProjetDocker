<template>
    <center>
    <img src="/src/assets/logo1.png"  />

    <h3>Email</h3>
    <input v-model="email" placeholder="Email" />

    <h3>Username</h3>
    <input v-model="username" placeholder="Username" />
    
    <h3>Password</h3>
    <input v-model="password" placeholder="Password" />
    </center>
    <div class="separation"></div>

    <div class="button" v-on:click="signin()"> Sign in </div>
</template>

<script>
export default {
    methods: {
        signin() {
            var user = {
                email    : this.email,
                username : this.username,
                password : this.password,
            }

            this.$axios.post("http://localhost:" + process.env.BACKEND_PORT + "/users/signin", user).then(async (res) => {
                this.$router.push('/')
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

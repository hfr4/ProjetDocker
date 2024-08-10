<template>
    <div v-if="this.$utils.loggedIn()">
        <ul>
            <li><a href="/artists">Artists</a></li>
            <li><a href="/albums">Albums</a></li>
            <li><a href="/genres">Genres</a></li>
            <li><a href="/tracks" >Tracks</a></li>
            <li><div class="logout" v-on:click="logout()">Log out </div></li>
            <li><a href="/profile">Profile</a></li>
        </ul>
    </div>
    <div v-else>
        <ul>
            <li><a href="/artists">Artists</a></li>
            <li><a href="/albums">Albums</a></li>
            <li><a href="/genres">Genres</a></li>
            <li><a href="/tracks">Tracks</a></li>
            <li><a href="/login">Log in</a></li>
            <li><a href="/register">Register</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$emitter.on('reload-navbar', () => {
            this.$forceUpdate()
        })
    },
    methods: {
        logout() {
            this.$utils.deleteCookie('token')
            this.$utils.deleteCookie('email')
            this.$utils.deleteCookie('username')
            this.$utils.deleteCookie('userId')
            this.$router.push('/')
            this.$emitter.emit('reload-navbar')
        }
    },
}
</script>

<style scoped>

ul {
    list-style-type  : none;
    margin           : 0;
    padding          : 0;
    overflow         : hidden;
    background-color : green;
    border           :1px solid #ddd;
}

li {
    border-right : 1px solid #ddd;
    float        : left;
}

li a {
    display         : block;
    color           : white;
    text-align      : center;
    padding         : 15px 15px;
    text-decoration : none;
}

li a:hover {
    background-color : darkgreen;
    color            : white;
}

li:nth-last-child(1) {
    border-left : 1px solid #ddd;
    float       : right;
}

li:nth-last-child(2) {
    border-right : none;
    float        : right;
}

.logout {
    display          : block;
    color            : white;
    background-color : green;
    text-align       : center;
    padding          : 15px 15px;
    text-decoration  : none;
    cursor           : pointer;
}

.logout:hover {
    background-color : darkgreen;
}

</style>
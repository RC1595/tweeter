<template>
    <div>
        <nav>
            <v-btn @click="goHome">Home</v-btn>
            <v-btn @click="myProfile">My Profile</v-btn>
            <v-btn @click="discover">Discover</v-btn>
            <v-btn @click="logOut">Log Out</v-btn>
        </nav>
    </div>

</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        name: 'PageHeader',
        // data() {
        //     return {
        //         userId: this.userId
        //     }
        // },
        methods: {
            goHome (){
                this.$router.push('/')
            },
            myProfile (){
                this.$router.push('Profile')
            },
            discover (){
                console.log('discover button pressed');
            },
            logOut(){
                axios.request({
                    method: 'DELETE',
                    url: 'https://tweeterest.ml/api/login',
                    headers: {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data: {
                        loginToken: cookies.get('token')
                    }
                }).then(() => {
                    this.$router.push('/'),
                    cookies.remove('token'),
                    cookies.remove('userId')
                }).catch((error) => {
                console.log(error);
                })
            }
        }
    }

</script>


<style scoped>


</style>
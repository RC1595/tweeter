<template>
    <div>
        <!-- button from vuetify -->
        <v-btn
            @click="userLogin"
            small
            class="ma-2"
            outlined
            color="indigo">
            Sign In
        </v-btn>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "LoginButton",
        methods: {

            userLogin(){
                axios.request({
                    method: 'POST',
                    url: 'https://tweeterest.ml/api/login',
                    headers: {
                        ['X-Api-Key'] : process.env.VUE_APP_API_KEY,
                    } 
                }).then((response) => {
                    console.log(response);
                }).catch((error)=>{
                console.error(error+"error");
                })
            },
        }
    }
</script>

<style scoped>

</style>
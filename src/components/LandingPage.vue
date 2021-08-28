<template>
    <div>
        <v-btn
            elevation="2"
            outlined
            raised
            @click="userRegister"
        >Sign Up</v-btn>

        <v-btn
            elevation="2"
            outlined
            raised
            @click="userLogin"
        >Log In</v-btn>
    </div>
</template>

<script>
    export default {
        name: 'LandingPage',
        methods: {
            userLogin(){
                this.$router.push('LoginView');
            },
            userRegister(){
                this.$router.push('Register');
            }

        }
    }
</script>

<style scoped>

</style>
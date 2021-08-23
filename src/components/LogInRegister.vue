<template>
    <div>
        <div class="register">
            <RegisterNew/>
        </div>
        <div class="logIn">
            <LogIn/>
            <LoginButton/>
        </div>

    </div>
</template>

<script>
    import LogIn from './LogIn.vue'
    import RegisterNew from './RegisterNew.vue'
    import LoginButton from './LoginButton.vue'
    export default {
        name: 'LogInRegister',
        components: {
            LogIn,
            RegisterNew,
            LoginButton
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <div>
            <PageHeader/>
        </div>
        <RegisterNew/>
    </div>
</template>

<script>
import RegisterNew from '../components/RegisterNew.vue'
import PageHeader from '../components/PageHeader.vue'
    export default {
        components: { 
            RegisterNew,
            PageHeader
        },
    }
</script>

<style scoped>

</style>
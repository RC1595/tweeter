<template>
    <div>
<v-row justify="center">
    <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
    >
        <v-card ref="form">
        <v-card-text>
            <v-text-field
            ref="userName"
            v-model="userName"
            :rules="[() => !!userName || 'This field is required']"
            :error-messages="errorMessages"
            label="User Name"
            placeholder="Enter User Name"
            required
            ></v-text-field>

            <v-text-field
                :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.emailMatch]"
                :type="show4 ? 'text' : 'password'"
                name="input-10-2"
                label="Enter Password"
                hint="At least 8 characters"
                value=""
                error
                @click:append="show4 = !show4"
        ></v-text-field>

        </v-card-text>
        </v-card>
    </v-col>
</v-row>

    </div>
</template>

<script>
    export default {
        name: 'LogIn',
        data: () => ({
            errorMessages: '',
            userName: null,
            email: null,
            password: 'Password',
            formHasErrors: false,
            show4: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            }
        }),

    computed: {
        form () {
        return {
            userName: this.userName,
            email: this.email,
            password: this.password
        }
        },
    },

    watch: {
        name () {
        this.errorMessages = ''
        },
    },

    methods: {

    }
    }

</script>

<style scoped>

</style>
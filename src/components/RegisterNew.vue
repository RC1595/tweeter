<template v-slot:activator="{ on, attrs }">
    <div>
        <div>
            <h1>Register Now</h1>
        </div>
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
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Full Name"
            placeholder="John Doe"
            required
            ></v-text-field>

            <v-text-field
            ref="userName"
            v-model="userName"
            :rules="[
            () => !!userName || 'This field is required',
            () => !!userName && userName.length <= 10 || 'User Name must be less than 10 characters',
            userNameCheck
            ]"
            label="User Name"
            placeholder="enter user name"
            counter="10"
            required
        ></v-text-field>

        <v-text-field
            ref="city"
            v-model="city"
            :rules="[() => !!city || 'This field is required']"
            label="City"
            placeholder="El Paso"
            required
        ></v-text-field>

        <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
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
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
        <v-btn  text
                class="my-0"
                v-bind="attrs"
                @click="resetForm"
                v-on="on" >
            Cancel
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            color="primary"
            text
            @click="submit">
            Submit
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-col>
</v-row>

</div>

</template>


<script>
    import axios from 'axios'
    export default {
        name: 'RegisterNew',
        components: {
            
        },
        data: () => ({
            errorMessages: '',
            name: null,
            userName: null,
            city: null,
            email:'',
            password: 'Password',
            formHasErrors: false,
            show4: false,
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => (`The email and password you entered don't match`),
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
            }
        }),

    computed: {
        form () {
            return {
            name: this.name,
            userName: this.userName,
            city: this.city,
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
        userNameCheck () {
            this.errorMessages = this.userName && !this.name
            ? `Hey! I'm required`
            : ''

            return true
        },
        resetForm () {
            this.errorMessages = []
            this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
            this.$refs[f].reset()
            })
        },
        
        //Axios call to create user
        submit () {
            axios.request({
                method: 'POST',
                url: 'https://tweeterest.ml/api/users',
                headers: {
                    ['X-Api-Key'] : process.env.VUE_APP_API_KEY,
                } 
            }).then((response) => {
                    console.log(response);
            }).catch((error)=>{
                console.error(error+"error");
            }),

        Object.keys(this.form).forEach(f => {
            if (!this.form[f]) this.formHasErrors = true

            this.$refs[f].validate(true)
        })
        },
    },
    }

</script>

<style scoped>

</style>
<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Create account</v-card-title>
                    <v-divider></v-divider>
                    <v-form v-model="valid" ref="form" class="pa-5"
                        enctype="multipart/form-data">
                        <v-text-field label="Name" v-model="user.name" prepend-icon="mdi-account"
                            :rules="[rules.required]">
                        </v-text-field>
                        <v-text-field label="Email" v-model="user.email" prepend-icon="mdi-email"
                            :rules="[rules.email]">
                        </v-text-field>
                        <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-2"
                            hint="At least 8 characters" class="input-group--focused" @click:append="show = !show"
                            label="Password" v-model="user.password" prepend-icon="mdi-lock">
                        </v-text-field>
                        <v-btn @click="send" :disabled="!valid" class="mt-3 mr-2" color="primary">
                            Create Account
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from "../api/user";
import axios from "axios";

export default {
    data() {
        return {
            valid: true,
            show: false,
            user: {
                name: '',
                email: '',
                password: '',
            },
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                email: v => /\S+@\S+\.\S+/.test(v) || 'Email must be valid',
            },
        };
    },
    methods: {
        async send() {
            if (this.$refs.form.validate()) {
                return axios({
                    method: 'post',
                    data: {
                        name: this.user.name,
                        email: this.user.email,
                        password: this.user.password,
                    },
                    url: '/api/user/register',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(() => {
                        this.$swal({
                            title: 'Congrats!',
                            text: 'You\'ve created your account',
                            type: 'Success',
                        });
                        this.$router.push({ name: 'login' });
                    })
                    .catch((error) => {
                        const message = error.response.data.message;
                        // const message = error.message;
                        this.$swal({
                            title: 'Error',
                            text: `${message}`,
                            type: 'error',
                        });
                    });
            }
            return true;
        },
    },
};
</script>

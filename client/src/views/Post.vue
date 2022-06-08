<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4" mx-auto>
                <v-card class="pa-2">
                    <v-img :src="`/${post.image}`"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                <v-btn small outlined color="primary">{{ post.category }}</v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-btn v-if="author" small color="indigo" class="mr-2" outlined :to="{ name: 'edit-post', params: { id: post._id } }">Edit
                                </v-btn>
                                <v-btn v-if="author" small color="red" class="ml-2" outlined @click="removePost(post._id)">Delete</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{ post.title }}</h3>
                    </v-card-subtitle>
                    <v-card-text class="grey-text">
                        <p>{{ post.content }}</p>
                        <p>Posted by: {{ post.usr }}</p>
                        <p>{{ post.created }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api/post';

export default {
    data() {
        return {
            author: false,
            post: {},
        };
    },
    async created() {
        const response = await API.getPostByID(this.$route.params.id);
        this.post = response;
        const email = localStorage.getItem('usr');
        if ( email == this.post.usr) {
                this.author = true;
            }
    },
    methods: {
        async removePost(id) {
            const response = await API.deletePost(id);
            // this.$router.push({ name: 'home', params: { message: response.message } });
            this.$swal({
                // title: 'Congrats!',
                text: `${response.message}`,
                // type: 'Success',
            });
            this.$router.push({ name: 'home' });
        },
    },
}
</script>
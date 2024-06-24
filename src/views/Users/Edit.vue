<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                    Edit User
                    <RouterLink to="/users" class="btn btn-primary float-end">All Users</RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.user.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="email" v-model="model.user.email" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Password</label>
                    <input type="password" v-model="model.user.password" class="form-control">
                </div>
                <div class="mb-3">
                    <button type="button" @click="updateUser" class="btn btn-primary">Update</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'userEdit',
        data() {
            return {
                userId: '',
                errorList: '',
                model: {
                    user: {
                        name: '',
                        email: '',
                        password: '',
                    }
                }
            }
        },
        mounted(){
            this.getUser(this.$route.params.id);
            this.userId = this.$route.params.id;
        },
        methods: {
             getUser(userId){
                axios.get(`http://127.0.0.1:8000/api/users/${userId}`)
                .then(res => {
                    this.model.user = res.data.user
                })
                .catch(error => {
                    if (error.response) {
                        if(error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    }
                });

            },
            updateUser(){
                axios.put(`http://127.0.0.1:8000/api/users/${this.userId}`, this.model.user)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.errorList ='';
                    this.$router.push({ path: '/users' });
                })
                .catch(function (error) {
                    if (error.response) {
                        if(error.response.status == 422){
                            this.errorList = error.response.data.errors;
                        }
                        if(error.response.status == 404){
                            alert(error.response.data.message);
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
            }
        },
    }
</script>